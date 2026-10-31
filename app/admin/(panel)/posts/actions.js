"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { transaction } from "../../../lib/db";
import { authorize } from "../../../lib/session";
import { slugify } from "../../../lib/slug";
import { publicUrl } from "../../../lib/storage";
import { cleanArticle } from "../../../content/article";
import { POSTS_TAG } from "../../../lib/posts";

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/; // same rule as the database (003_blog.sql)
const STALE = "Someone else saved this post while you were editing. Reload to see their changes, then make yours again.";

// Creates a draft post (title + category) and its first revision, then opens it in the editor.
// Used with useActionState: returns { error } to show in the form, or redirects on success.
export async function createPost(_prev, formData) {
  const { user, error } = await authorize("post.edit");
  if (error) return { error };

  const title = String(formData.get("title") ?? "").trim();
  const categoryId = Number.parseInt(formData.get("category"), 10);
  const keep = { title, category: Number.isInteger(categoryId) ? String(categoryId) : "" }; // refilled into the form after an error
  if (!title) return { error: "Give the post a title.", ...keep };
  if (title.length > 200) return { error: "Keep the title under 200 characters.", ...keep };
  if (!Number.isInteger(categoryId)) return { error: "Choose a category.", ...keep };

  let postId;
  try {
    postId = await transaction(async (db) => {
      // Never trust the form: the category must really exist.
      const { rows: [category] } = await db.query(`select id from categories where id = $1`, [categoryId]);
      if (!category) throw new UserError("That category no longer exists. Reload and choose another.");

      // "my-title" is taken? Use the next free "my-title-2", "my-title-3"…
      const base = slugify(title);
      const { rows: taken } = await db.query(`select slug from posts where slug = $1 or slug ~ $2`, [base, `^${base}-[0-9]+$`]);
      const used = new Set(taken.map((r) => r.slug));
      let slug = base;
      for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;

      const { rows: [post] } = await db.query(
        `insert into posts (slug, created_by, updated_by) values ($1, $2, $2) returning id`,
        [slug, user.email],
      );
      const { rows: [rev] } = await db.query(
        `insert into post_revisions (post_id, number, title, author, category_id, note, created_by)
         values ($1, 1, $2, $3, $4, 'Created', $5) returning id`,
        [post.id, title, user.name || user.email, categoryId, user.email],
      );
      await db.query(`update posts set draft_revision_id = $1 where id = $2`, [rev.id, post.id]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'post.create', 'post', $3, $4)`,
        [user.id, user.email, slug, { title }],
      );
      return post.id;
    });
  } catch (e) {
    if (e instanceof UserError) return { error: e.message, ...keep };
    // 23505 = unique violation: someone created the same address at the same moment.
    if (e.code === "23505") return { error: "That address was just taken. Click Create again.", ...keep };
    console.error("[cms] createPost failed", e);
    return { error: "Could not create the post. Try again.", ...keep };
  }

  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${postId}`); // Post/Redirect/Get: refreshing can't create the post twice
}

// Saves the editor's fields (details, article, SEO) as a new draft revision.
// baseRevisionId = the draft the editor started from; if someone saved since, we refuse (optimistic locking).
export async function savePostDraft(postId, baseRevisionId, fields, note = "") {
  const { user, error } = await authorize("post.edit");
  if (error) return { error };

  let data;
  try {
    data = cleanFields(fields); // inside try: an unexpected value can't crash the request
    if (data.error) return { error: data.error };
    return await transaction(async (db) => {
      // "for update" locks this post's row until we commit, so two saves can't interleave.
      const { rows: [post] } = await db.query(`select draft_revision_id from posts where id = $1 for update`, [postId]);
      if (!post) throw new UserError("This post no longer exists.");
      if (String(post.draft_revision_id) !== String(baseRevisionId)) return { error: STALE, stale: true };

      const { rows: [category] } = await db.query(`select id from categories where id = $1`, [data.categoryId]);
      if (!category) throw new UserError("That category no longer exists. Choose another.");
      const { rows: [clash] } = await db.query(`select 1 from posts where slug = $1 and id <> $2`, [data.slug, postId]);
      if (clash) throw new UserError(`Another post already uses /blogs/${data.slug}/. Choose a different address.`);

      const { rows: [rev] } = await db.query(
        `insert into post_revisions (post_id, number, title, excerpt, author, category_id, cover_image, body, seo, note, created_by)
         select $1, (select max(number) + 1 from post_revisions where post_id = $1), $2, $3, $4, $5, $6, $10, $11, $7, $8
         from post_revisions d where d.id = $9 -- d = the current draft (checked above)
         returning id, number`,
        [postId, data.title, data.excerpt, data.author, data.categoryId, data.coverImage, String(note).trim().slice(0, 300) || null, user.email, baseRevisionId, data.body, data.seo],
      );
      await db.query(
        `update posts set slug = $1, draft_revision_id = $2, updated_by = $3, updated_at = now() where id = $4`,
        [data.slug, rev.id, user.email, postId],
      );
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'post.save_draft', 'post', $3, $4)`,
        [user.id, user.email, data.slug, { revision: rev.number }],
      );
      return { ok: `Draft saved (version ${rev.number}).`, revisionId: String(rev.id), number: rev.number, body: data.body, removed: data.removed };
    });
  } catch (e) {
    if (e instanceof UserError) return { error: e.message };
    if (e?.code === "23505") return { error: `Another post already uses /blogs/${data?.slug}/. Choose a different address.` };
    console.error("[cms] savePostDraft failed", e);
    return { error: "Could not save. Your changes are still in the editor — try again." };
  } finally {
    // The address lives on the post itself, so renaming a published post changes the live blog too.
    refreshPublic();
  }
}

// Makes the current draft the live version. revisionId = the draft the editor shows; if someone saved
// since, we refuse, so nobody publishes a version they haven't seen.
export async function publishPost(postId, revisionId) {
  const { user, error } = await authorize("post.publish");
  if (error) return { error };
  try {
    const result = await transaction(async (db) => {
      const { rows: [post] } = await db.query(`select slug, draft_revision_id from posts where id = $1 for update`, [postId]);
      if (!post) return { error: "This post no longer exists." };
      if (String(post.draft_revision_id) !== String(revisionId)) return { error: STALE, stale: true };
      // published_at is the date shown on the article: set the first time only, kept when fixing typos later.
      await db.query(
        `update posts set published_revision_id = draft_revision_id, status = 'published', published_at = coalesce(published_at, now()),
           updated_by = $1, updated_at = now() where id = $2`,
        [user.email, postId],
      );
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'post.publish', 'post', $3, $4)`,
        [user.id, user.email, post.slug, { revisionId: String(revisionId) }],
      );
      return { ok: "Published. The live blog now shows this version.", slug: post.slug };
    });
    if (result.ok) refreshPublic(); // only after the transaction committed
    return result;
  } catch (e) {
    console.error("[cms] publishPost failed", e);
    return { error: "Publishing failed. The live blog is unchanged." };
  }
}

// Takes a published post offline (visitors get "not found") or puts it back. Its versions are kept.
export async function setPostOffline(postId, offline) {
  const { user, error } = await authorize("post.publish");
  if (error) return { error };
  try {
    const result = await transaction(async (db) => {
      const { rows: [post] } = await db.query(`select slug, published_revision_id from posts where id = $1 for update`, [postId]);
      if (!post) return { error: "This post no longer exists." };
      if (!post.published_revision_id) return { error: "This post has never been published. Use Publish instead." };
      await db.query(`update posts set status = $1, updated_by = $2, updated_at = now() where id = $3`, [offline ? "unpublished" : "published", user.email, postId]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id) values ($1, $2, $3, 'post', $4)`,
        [user.id, user.email, offline ? "post.unpublish" : "post.republish", post.slug],
      );
      return { ok: offline ? "The post is offline. Visitors now get “page not found”." : "The post is live again.", slug: post.slug };
    });
    if (result.ok) refreshPublic();
    return result;
  } catch (e) {
    console.error("[cms] setPostOffline failed", e);
    return { error: "Could not change the post’s status." };
  }
}

// Copies an old version into a new draft. History is never rewritten; nothing goes live until published.
export async function restorePostRevision(postId, revisionId) {
  const { user, error } = await authorize("post.publish");
  if (error) return { error };
  try {
    return await transaction(async (db) => {
      const { rows: [post] } = await db.query(`select slug from posts where id = $1 for update`, [postId]);
      if (!post) return { error: "This post no longer exists." };
      const { rows: [old] } = await db.query(`select number from post_revisions where id = $1 and post_id = $2`, [revisionId, postId]);
      if (!old) return { error: "That version no longer exists." };
      const { rows: [rev] } = await db.query(
        `insert into post_revisions (post_id, number, title, excerpt, author, category_id, cover_image, body, seo, note, created_by)
         select post_id, (select max(number) + 1 from post_revisions where post_id = $1), title, excerpt, author, category_id, cover_image, body, seo, $3, $4
         from post_revisions where id = $2
         returning id, number`,
        [postId, revisionId, `Restored from version ${old.number}`, user.email],
      );
      await db.query(`update posts set draft_revision_id = $1, updated_by = $2, updated_at = now() where id = $3`, [rev.id, user.email, postId]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'post.restore', 'post', $3, $4)`,
        [user.id, user.email, post.slug, { from: old.number, to: rev.number }],
      );
      return { ok: `Version ${old.number} restored as a new draft (version ${rev.number}). Review it, then publish.` };
    });
  } catch (e) {
    console.error("[cms] restorePostRevision failed", e);
    return { error: "Could not restore that version." };
  } finally {
    revalidatePath("/admin/posts");
  }
}

// The admin list, plus the public blog pages, so visitors see the change right away.
// A failed refresh is logged, never turned into a failed save (the change is already stored).
function refreshPublic() {
  try {
    updateTag(POSTS_TAG);
    revalidatePath("/admin/posts");
    revalidatePath("/blogs/[slug]", "page");
    revalidatePath("/blogs/");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } catch (e) {
    console.error("[cms] refreshing blog pages failed", e);
  }
}

// Removes a post that has never been published (e.g. a test post), with all its versions.
// Published posts are taken offline instead, so their history is kept.
export async function deleteDraftPost(postId) {
  const { user, error } = await authorize("post.edit");
  if (error) return { error };
  try {
    await transaction(async (db) => {
      const { rows: [post] } = await db.query(
        `select p.slug, p.published_at, r.title from posts p join post_revisions r on r.id = p.draft_revision_id where p.id = $1 for update of p`,
        [postId],
      );
      if (!post) throw new UserError("This post no longer exists.");
      if (post.published_at) throw new UserError("This post has been published, so it can’t be deleted. Take it offline instead.");
      await db.query(`delete from posts where id = $1`, [postId]); // its revisions go too (on delete cascade)
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'post.delete', 'post', $3, $4)`,
        [user.id, user.email, post.slug, { title: post.title }],
      );
    });
  } catch (e) {
    if (e instanceof UserError) return { error: e.message };
    console.error("[cms] deleteDraftPost failed", e);
    return { error: "Could not delete the post. Try again." };
  }
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}


function cleanFields(fields) {
  const text = (v) => String(v ?? "").trim();
  const title = text(fields?.title);
  const slug = text(fields?.slug);
  const excerpt = text(fields?.excerpt);
  const author = text(fields?.author);
  const categoryId = Number.parseInt(fields?.categoryId, 10);

  if (!title) return { error: "Give the post a title." };
  if (title.length > 200) return { error: "Keep the title under 200 characters." };
  if (!SLUG.test(slug) || slug.length > 80) return { error: "The address may only use lowercase letters, numbers and single dashes (up to 80 characters)." };
  if (excerpt.length > 300) return { error: "Keep the excerpt under 300 characters." };
  if (author.length > 100) return { error: "Keep the author name under 100 characters." };
  if (!Number.isInteger(categoryId)) return { error: "Choose a category." };

  const coverImage = cleanImage(fields?.coverImage);
  if (coverImage === undefined) return { error: "The cover photo must come from the media library." };
  const article = cleanArticle(fields?.body);
  if (article.error) return { error: article.error };
  const seo = cleanSeo(fields?.seo);
  if (seo.error) return { error: seo.error };
  return { title, slug, excerpt, author, categoryId, coverImage, body: article.doc, removed: article.removed, seo };
}

// null = no cover. undefined = not allowed. Only our own storage or the site's /assets.
function cleanImage(image) {
  if (!image?.src) return null;
  const src = String(image.src);
  const ours = src.startsWith(publicUrl("")) || (src.startsWith("/assets/") && !src.includes(".."));
  const width = Number(image.width), height = Number(image.height);
  if (!ours || !Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0) return undefined;
  return { src, alt: String(image.alt ?? "").trim().slice(0, 200), width, height };
}

// Search and sharing settings. Empty title/description = use the post's title/excerpt when the page is shown,
// so they stay right if the post is renamed later. Returns { title, description, ogImage } or { error }.
function cleanSeo(seo) {
  const text = (v) => String(v ?? "").trim();
  const title = text(seo?.title).slice(0, 200);
  const description = text(seo?.description).slice(0, 400);
  const ogImage = cleanImage(seo?.ogImage);
  if (ogImage === undefined) return { error: "The sharing image must come from the media library." };
  return { title, description, ogImage };
}

// An error whose message is safe to show to the person using the form.
class UserError extends Error {}

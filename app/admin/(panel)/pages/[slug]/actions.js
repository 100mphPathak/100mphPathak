"use server";

import { revalidatePath, updateTag } from "next/cache";
import { PAGES } from "../../../../content/defaults";
import { validate } from "../../../../content/shape";
import { transaction } from "../../../../lib/db";
import { can } from "../../../../lib/permissions";
import { authorize } from "../../../../lib/session";

const STALE = "Someone else saved this page while you were editing. Reload to see their changes, then make yours again.";
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Global settings need the global permission on top of the normal one.
async function authorizePage(slug, action) {
  if (!PAGES[slug]) return { error: "Unknown page." };
  const result = await authorize(action);
  if (result.error) return result;
  if (slug === "global" && !can(result.user.role, "global.edit")) return { error: "Only super administrators can change site-wide settings." };
  return result;
}

// Clears the cached content and rebuilds every page that shows this document.
function refresh(slug) {
  const page = PAGES[slug];
  updateTag(`page:${slug}`);
  if (!page.route) revalidatePath("/", "layout");
  else for (const route of [page.route, ...(page.alsoRevalidate ?? [])]) revalidatePath(route);
  updateTag("sitemap");
  revalidatePath("/sitemap.xml");
}

export async function saveDraft(slug, baseRevisionId, content, seo, note = "") {
  const { user, error } = await authorizePage(slug, "page.edit");
  if (error) return { error };
  const page = PAGES[slug];

  const errors = validate(page.content, content).errors;
  if (slug !== "global") errors.push(...validate(page.seo, seo, "seo").errors);
  if (errors.length) return { error: "Some fields need attention.", errors };

  try {
    return await transaction(async (db) => {
      const { rows: [row] } = await db.query(
        `select p.draft_revision_id, r.seo from pages p join revisions r on r.id = p.draft_revision_id where p.slug = $1 for update of p`,
        [slug],
      );
      if (String(row.draft_revision_id) !== String(baseRevisionId)) return { error: STALE, stale: true };
      if (slug !== "global" && !same(row.seo, seo)) {
        if (!can(user.role, "page.seo")) return { error: "Only content administrators can change SEO settings." };
        if (Boolean(row.seo.noindex) !== Boolean(seo.noindex) && !can(user.role, "page.robots")) {
          return { error: "Only super administrators can hide a page from search engines." };
        }
      }
      const { rows: [rev] } = await db.query(
        `insert into revisions (page_slug, number, content, seo, note, created_by)
         select $1, coalesce(max(number), 0) + 1, $2, $3, $4, $5 from revisions where page_slug = $1
         returning id, number`,
        [slug, content, slug === "global" ? {} : seo, String(note).slice(0, 300) || null, user.email],
      );
      await db.query(`update pages set draft_revision_id = $1, updated_by = $2, updated_at = now() where slug = $3`, [rev.id, user.email, slug]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'page.save_draft', 'page', $3, $4)`,
        [user.id, user.email, slug, { revision: rev.number }],
      );
      return { ok: `Draft saved (version ${rev.number}).`, revisionId: String(rev.id), number: rev.number };
    });
  } catch (e) {
    console.error("[cms] saveDraft failed", e);
    return { error: "Could not save. Your changes are still in the editor — try again." };
  }
}

// Publishes exactly the revision the editor was looking at, so nothing unseen goes live.
export async function publish(slug, revisionId) {
  const { user, error } = await authorizePage(slug, "page.publish");
  if (error) return { error };
  try {
    const result = await transaction(async (db) => {
      const { rows: [row] } = await db.query(`select draft_revision_id from pages where slug = $1 for update`, [slug]);
      if (String(row.draft_revision_id) !== String(revisionId)) return { error: STALE, stale: true };
      await db.query(
        `update pages set published_revision_id = draft_revision_id, status = 'published', published_at = now(), updated_by = $1, updated_at = now() where slug = $2`,
        [user.email, slug],
      );
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'page.publish', 'page', $3, $4)`,
        [user.id, user.email, slug, { revisionId: String(revisionId) }],
      );
      return { ok: "Published. The live website now shows this version." };
    });
    if (result.ok) refresh(slug); // only after the transaction committed
    return result;
  } catch (e) {
    console.error("[cms] publish failed", e);
    return { error: "Publishing failed. The live website is unchanged." };
  }
}

export async function setUnpublished(slug, unpublished) {
  const { user, error } = await authorizePage(slug, "page.unpublish");
  if (error) return { error };
  if (["global", "home"].includes(slug)) return { error: "This page can’t be taken offline." };
  try {
    await transaction(async (db) => {
      await db.query(`update pages set status = $1, updated_by = $2, updated_at = now() where slug = $3`, [unpublished ? "unpublished" : "published", user.email, slug]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id) values ($1, $2, $3, 'page', $4)`,
        [user.id, user.email, unpublished ? "page.unpublish" : "page.republish", slug],
      );
    });
    refresh(slug);
    return { ok: unpublished ? "The page is offline. Visitors now get “page not found”." : "The page is live again." };
  } catch (e) {
    console.error("[cms] setUnpublished failed", e);
    return { error: "Could not change the page status." };
  }
}

// Copies an old version into a new draft. History is never rewritten.
export async function restoreRevision(slug, revisionId) {
  const { user, error } = await authorizePage(slug, "page.restore");
  if (error) return { error };
  try {
    return await transaction(async (db) => {
      const { rows: [old] } = await db.query(`select number, content, seo from revisions where id = $1 and page_slug = $2`, [revisionId, slug]);
      if (!old) return { error: "That version no longer exists." };
      await db.query(`select 1 from pages where slug = $1 for update`, [slug]);
      const { rows: [rev] } = await db.query(
        `insert into revisions (page_slug, number, content, seo, note, created_by)
         select $1, max(number) + 1, $2, $3, $4, $5 from revisions where page_slug = $1 returning id, number`,
        [slug, old.content, old.seo, `Restored from version ${old.number}`, user.email],
      );
      await db.query(`update pages set draft_revision_id = $1, updated_by = $2, updated_at = now() where slug = $3`, [rev.id, user.email, slug]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'page.restore', 'page', $3, $4)`,
        [user.id, user.email, slug, { from: old.number, to: rev.number }],
      );
      return { ok: `Version ${old.number} restored as a new draft (version ${rev.number}). Review it, then publish.` };
    });
  } catch (e) {
    console.error("[cms] restore failed", e);
    return { error: "Could not restore that version." };
  }
}

import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { cache } from "react";
import { sql } from "./db";

// Every cached blog query carries this tag; publishing, saving or restoring a post clears it (updateTag("posts")).
export const POSTS_TAG = "posts";

const columns = () => sql`
  p.id::text, p.slug, p.status, p.published_at, p.updated_at,
  r.title, r.excerpt, r.author, r.cover_image, r.body, r.seo, c.name as category, c.slug as category_slug`;

// The live version of a post, for visitors. Cached until something changes.
const loadPublished = unstable_cache(
  async (slug) => {
    const [row] = await sql`
      select ${columns()} from posts p
      join post_revisions r on r.id = p.published_revision_id
      join categories c on c.id = r.category_id
      where p.slug = ${slug} and p.status = 'published'`;
    return row ?? null;
  },
  ["post"],
  { tags: [POSTS_TAG] },
);

// The saved draft, for admins previewing (draft mode). Never cached.
async function loadDraft(slug) {
  const [row] = await sql`
    select ${columns()} from posts p
    join post_revisions r on r.id = p.draft_revision_id
    join categories c on c.id = r.category_id
    where p.slug = ${slug}`;
  return row ?? null;
}

// One post by its address, or null if it isn't (or is no longer) on the blog.
export const getPost = cache(async (slug) => {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  const preview = (await draftMode()).isEnabled;
  const row = preview ? await loadDraft(slug) : await loadPublished(slug);
  return row && { ...row, preview };
});

// Published posts, newest first, for the blog list, the home page and the sitemap.
export const listPublishedPosts = unstable_cache(
  async (limit = 100) => sql`
    select p.id::text, p.slug, p.published_at, p.updated_at, r.title, r.excerpt, r.author, r.cover_image, r.seo, c.name as category
    from posts p
    join post_revisions r on r.id = p.published_revision_id
    join categories c on c.id = r.category_id
    where p.status = 'published'
    order by p.published_at desc
    limit ${limit}`,
  ["published-posts"],
  { tags: [POSTS_TAG] },
);

// Like listPublishedPosts, but never breaks a page: if the database is unreachable the page shows no posts.
export async function publishedPosts(limit) {
  try {
    return await listPublishedPosts(limit);
  } catch (error) {
    console.error("[cms] could not load blog posts:", error.message);
    return [];
  }
}

// "31 October 2026", in India's time zone.
export const postDate = (date) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(date));

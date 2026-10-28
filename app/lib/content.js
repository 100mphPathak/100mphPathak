import { cache } from "react";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { sql } from "./db";
import { PAGES } from "../content/defaults";
import { merge } from "../content/shape";
import { seo } from "../seo";

const loadPublished = (slug) =>
  unstable_cache(
    async () => {
      const rows = await sql`
        select r.content, r.seo, p.status from pages p
        join revisions r on r.id = p.published_revision_id
        where p.slug = ${slug}`;
      return rows[0] ?? null;
    },
    ["page", slug],
    { tags: [`page:${slug}`] },
  )();

async function loadDraft(slug) {
  const rows = await sql`
    select r.content, r.seo, p.status from pages p
    join revisions r on r.id = coalesce(p.draft_revision_id, p.published_revision_id)
    where p.slug = ${slug}`;
  return rows[0] ?? null;
}

// Published content (or the draft, inside a preview), always complete thanks to defaults.
// If the database is unreachable the site keeps serving its built-in content.
export const getPage = cache(async (slug) => {
  const page = PAGES[slug];
  const preview = (await draftMode()).isEnabled;
  let row = null;
  try {
    row = preview ? await loadDraft(slug) : await loadPublished(slug);
  } catch (error) {
    console.error(`[cms] could not load "${slug}", using defaults:`, error.message);
  }
  return {
    ...page,
    preview,
    status: row?.status ?? "published",
    content: merge(page.content, row?.content),
    seo: { ...page.seo, ...row?.seo },
  };
});

export async function getContent(slug) {
  const page = await getPage(slug);
  if (page.status === "unpublished" && !page.preview) notFound();
  return page.content;
}

// generateMetadata for a page: CMS fields, then global defaults, then the built-in values.
export async function pageMetadata(slug) {
  const [page, global] = await Promise.all([getPage(slug), getPage("global")]);
  const s = page.seo;
  const g = global.content.seo;
  const metadata = seo(s.canonical || page.route, s.title || g.title, s.description || g.description, {
    ogTitle: s.ogTitle,
    ogDescription: s.ogDescription,
    ogImage: s.ogImage || g.ogImage,
  });
  if (s.noindex || page.preview) metadata.robots = { index: false, follow: !page.preview };
  return metadata;
}

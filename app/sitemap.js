import { unstable_cache } from "next/cache";
import { PAGES } from "./content/defaults";
import { sql } from "./lib/db";
import { SITE_URL } from "./seo";

const publishedPages = unstable_cache(
  () => sql`
    select p.slug, p.route, p.published_at, r.seo from pages p
    join revisions r on r.id = p.published_revision_id
    where p.status = 'published' and p.route like '/%'`,
  ["sitemap"],
  { tags: ["sitemap"] },
);

export default async function sitemap() {
  let pages;
  try {
    pages = await publishedPages();
    pages = pages.filter((p) => !p.seo?.noindex);
  } catch (error) {
    console.error("[cms] sitemap falling back to built-in pages:", error.message);
    pages = Object.values(PAGES).filter((p) => p.route);
  }
  return pages
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((page) => ({
      url: SITE_URL + page.route,
      ...(page.published_at && { lastModified: page.published_at }),
      changeFrequency: page.route === "/blogs/" ? "weekly" : "monthly",
      priority: page.route === "/" ? 1 : 0.8,
    }));
}

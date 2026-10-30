// Publishes the built-in content (app/content/defaults) as a NEW version of each page,
// keeping all history. Use after changing defaults in code, e.g. a client copy update.
// Refuses to touch a page that has unpublished admin edits unless you pass --force.
// Usage: node --env-file=.env.local scripts/publish-defaults.mjs "Client updates" [slug ...] [--force]
import postgres from "postgres";
import { PAGES } from "../app/content/defaults/index.js";

const args = process.argv.slice(2);
const force = args.includes("--force");
const [note = "Published from code", ...only] = args.filter((a) => a !== "--force");
const slugs = only.length ? only : Object.keys(PAGES);
const sql = postgres(process.env.DATABASE_URL, { prepare: false });

for (const slug of slugs) {
  const page = PAGES[slug];
  if (!page) throw new Error(`Unknown page "${slug}"`);
  const [row] = await sql`select draft_revision_id, published_revision_id from pages where slug = ${slug}`;
  if (!row) {
    console.log("missing ", slug, "(run scripts/seed.mjs first)");
    continue;
  }
  if (String(row.draft_revision_id) !== String(row.published_revision_id) && !force) {
    console.log("skipped ", slug, "- it has an unsaved-for-live draft from the admin panel (use --force to overwrite)");
    continue;
  }
  const route = page.route ?? `#${slug}`;
  const [rev] = await sql`
    insert into revisions (page_slug, number, content, seo, note, created_by)
    select ${slug}, max(number) + 1, ${JSON.stringify(page.content)}, ${JSON.stringify(page.seo)}, ${note}, 'publish-defaults script'
    from revisions where page_slug = ${slug}
    returning id, number`;
  await sql`
    update pages set draft_revision_id = ${rev.id}, published_revision_id = ${rev.id}, status = 'published',
      route = ${route}, title = ${page.title}, published_at = now(), updated_at = now(), updated_by = 'publish-defaults script'
    where slug = ${slug}`;
  await sql`insert into audit_log (actor_email, action, resource_type, resource_id, details)
            values ('publish-defaults script', 'page.publish', 'page', ${slug}, ${JSON.stringify({ revision: rev.number, note })})`;
  console.log("published", slug, "version", rev.number);
}

// Clear the website's content cache so the new versions show immediately.
// Set REVALIDATE_URL to the live site (e.g. https://www.pathak100mph.com) or it uses ADMIN_ORIGIN.
const origin = process.env.REVALIDATE_URL ?? process.env.ADMIN_ORIGIN;
if (origin && process.env.REVALIDATE_SECRET) {
  try {
    const res = await fetch(`${origin}/api/revalidate/`, { method: "POST", headers: { "x-revalidate-secret": process.env.REVALIDATE_SECRET } });
    console.log(res.ok ? `cache cleared on ${origin}` : `could not clear cache on ${origin} (${res.status}); redeploy or wait for the next build`);
  } catch {
    console.log(`${origin} is not reachable; the new content shows after the next build/deploy.`);
  }
}
await sql.end();

// Creates every CMS page with today's built-in content as published revision 1.
// Safe to re-run: pages that already exist are left alone.
// Usage: node --env-file=.env.local scripts/seed.mjs
import postgres from "postgres";
import { PAGES } from "../app/content/defaults/index.js";

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

for (const page of Object.values(PAGES)) {
  const [created] = await sql`
    insert into pages (slug, title, route, status, updated_by, published_at)
    values (${page.slug}, ${page.title}, ${page.route ?? `#${page.slug}`}, 'published', 'seed', now())
    on conflict (slug) do nothing
    returning slug`;
  if (!created) {
    console.log("exists ", page.slug);
    continue;
  }
  const [rev] = await sql`
    insert into revisions (page_slug, number, content, seo, note, created_by)
    values (${page.slug}, 1, ${page.content}, ${page.seo}, 'Initial content from the website', 'seed')
    returning id`;
  await sql`update pages set published_revision_id = ${rev.id}, draft_revision_id = ${rev.id} where slug = ${page.slug}`;
  await sql`insert into audit_log (actor_email, action, resource_type, resource_id) values ('seed', 'page.seed', 'page', ${page.slug})`;
  console.log("seeded ", page.slug);
}
await sql.end();

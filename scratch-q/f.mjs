import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
console.log(await sql`select slug, route from pages where slug in ('terms','privacy','return-policy') or route like '%terms%' or route like '%privacy%'`);
console.log(await sql`select p.slug from pages p join revisions r on r.id=p.published_revision_id where r.content::text ~ '"/(terms|privacy)/?"' or r.content::text ~ '\(/(terms|privacy)/?\)'`);
console.log(await sql`select p.slug, (p.draft_revision_id = p.published_revision_id) as no_draft from pages p where slug='global'`);
await sql.end();

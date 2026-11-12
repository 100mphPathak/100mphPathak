// Saved links to /terms and /privacy → /terms-conditions/ and /privacy-policy/, as a new published version (history kept).
import postgres from "postgres";
const DRY = process.argv[2] !== "--apply";
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
try {
  await sql.begin(async (db) => {
    const [p] = await db`select draft_revision_id d, published_revision_id pub from pages where slug='global' for update`;
    if (String(p.d) !== String(p.pub)) throw new Error("global has an unpublished draft; not touching it");
    const [r] = await db`select content from revisions where id=${p.pub}`;
    let text = JSON.stringify(r.content), n = 0;
    const swap = (re, to) => { text = text.replace(re, (m) => (n++, to(m))); };
    swap(/"\/terms\/?"/g, () => '"/terms-conditions/"');
    swap(/"\/privacy\/?"/g, () => '"/privacy-policy/"');
    swap(/\]\(\/privacy\/?\)/g, () => "](/privacy-policy/)");
    swap(/\]\(\/terms\/?\)/g, () => "](/terms-conditions/)");
    const [rev] = await db`insert into revisions (page_slug, number, content, seo, note, created_by)
      select 'global', max(number)+1, ${db.json(JSON.parse(text))}, '{}'::jsonb, 'Legal links moved to /terms-conditions/ and /privacy-policy/', 'system' from revisions where page_slug='global' returning id, number`;
    await db`update pages set draft_revision_id=${rev.id}, published_revision_id=${rev.id}, published_at=now(), updated_at=now(), updated_by='system' where slug='global'`;
    await db`insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ('system','system','page.publish','page','global',${db.json({ revision: rev.number, note: "legal links renamed" })})`;
    const c = JSON.parse(text);
    console.log({ linksChanged: n, newVersion: rev.number, legalLinks: c.footer.legalLinks.map((l) => l.href), notice: c.callbackForm.notice, dryRun: DRY });
    if (DRY) throw new Error("dry run, rolled back");
  });
} catch (e) { console.log(e.message); }
await sql.end();

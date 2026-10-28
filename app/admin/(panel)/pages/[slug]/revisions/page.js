import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGES } from "../../../../../content/defaults";
import { sql } from "../../../../../lib/db";
import { can } from "../../../../../lib/permissions";
import { requirePage } from "../../../../../lib/session";
import { when } from "../../../format";
import RestoreButton from "./restore-button";

export const metadata = { title: "Version history" };

// { "hero.heading": "…", "posts[0].title": "…" } so two versions can be compared field by field.
function flatten(value, path = "", out = {}) {
  if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) flatten(v, path ? `${path}.${k}` : k, out);
  else out[path] = value;
  return out;
}

export default async function Revisions({ params, searchParams }) {
  const { slug } = await params;
  const { compare } = await searchParams;
  const page = PAGES[slug];
  if (!page) notFound();
  const user = await requirePage(slug === "global" ? "global.edit" : "page.view");

  const [[meta], revisions] = await Promise.all([
    sql`select draft_revision_id::text as draft, published_revision_id::text as live from pages where slug = ${slug}`,
    sql`select id::text, number, note, created_by, created_at from revisions where page_slug = ${slug} order by number desc limit 100`,
  ]);

  let diff = null;
  if (compare && /^\d+$/.test(compare)) {
    const [a, b] = await Promise.all([
      sql`select number, content, seo from revisions where id = ${compare} and page_slug = ${slug}`,
      sql`select number, content, seo from revisions where id = ${meta.draft}`,
    ]);
    if (a[0]) {
      const before = flatten({ content: a[0].content, seo: a[0].seo });
      const after = flatten({ content: b[0].content, seo: b[0].seo });
      const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].filter((k) => before[k] !== after[k]);
      diff = { from: a[0].number, to: b[0].number, rows: keys.map((k) => [k, before[k], after[k]]) };
    }
  }

  return (
    <>
      <div className="a-top">
        <div>
          <p className="small muted" style={{ margin: 0 }}><Link href={`/admin/pages/${slug}`}>{page.title}</Link> /</p>
          <h1>Version history</h1>
        </div>
      </div>

      {diff && (
        <div className="a-card">
          <h2>Version {diff.from} compared with the current draft (version {diff.to})</h2>
          {diff.rows.length === 0 ? (
            <p className="muted">No differences.</p>
          ) : (
            <div className="a-table-wrap">
              <table className="a-table diff">
                <thead><tr><th>Field</th><th>Version {diff.from}</th><th>Current draft</th></tr></thead>
                <tbody>
                  {diff.rows.map(([key, before, after]) => (
                    <tr key={key}>
                      <td className="path">{key}</td>
                      <td className="before">{before === undefined ? "—" : String(before)}</td>
                      <td className="after">{after === undefined ? "—" : String(after)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Version</th><th>Saved</th><th>By</th><th>Note</th><th></th></tr></thead>
          <tbody>
            {revisions.map((rev) => (
              <tr key={rev.id}>
                <td>
                  {rev.number}
                  {rev.id === meta.live && <> <span className="badge published">live</span></>}
                  {rev.id === meta.draft && <> <span className="badge draft">current draft</span></>}
                </td>
                <td className="small">{when(rev.created_at)}</td>
                <td className="small">{rev.created_by}</td>
                <td className="small">{rev.note}</td>
                <td className="actions-row">
                  {rev.id !== meta.draft && <Link className="btn secondary small" href={`?compare=${rev.id}`}>Compare</Link>}
                  {rev.id !== meta.draft && can(user.role, "page.restore") && <RestoreButton number={rev.number} revisionId={rev.id} slug={slug} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

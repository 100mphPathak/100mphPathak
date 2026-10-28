import Link from "next/link";
import { sql } from "../../../lib/db";
import { requirePage } from "../../../lib/session";
import { can } from "../../../lib/permissions";
import { when } from "../format";

export const metadata = { title: "Pages" };

const PER_PAGE = 20;
const STATUSES = ["published", "draft", "unpublished"];

export default async function Pages({ searchParams }) {
  const user = await requirePage();
  const params = await searchParams;
  const q = String(params.q ?? "").slice(0, 100);
  const status = STATUSES.includes(params.status) ? params.status : "";
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  const like = `%${q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
  const showGlobal = can(user.role, "global.edit");

  const rows = await sql`
    select slug, title, route, status, updated_at, updated_by,
      (draft_revision_id is distinct from published_revision_id) as has_draft,
      count(*) over()::int as total
    from pages
    where (title ilike ${like} or route ilike ${like})
      and (${status} = '' or status = ${status})
      and (${showGlobal} or slug <> 'global')
    order by case when slug = 'home' then 0 when slug = 'global' then 2 else 1 end, title
    limit ${PER_PAGE} offset ${(page - 1) * PER_PAGE}`;
  const total = rows[0]?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const link = (n) => `/admin/pages?${new URLSearchParams({ ...(q && { q }), ...(status && { status }), page: n })}`;

  return (
    <>
      <div className="a-top"><h1>Pages</h1></div>
      <form className="a-card actions-row" role="search">
        <label className="sr-only" htmlFor="q">Search pages</label>
        <input defaultValue={q} id="q" name="q" placeholder="Search by name or address" style={{ flex: "1 1 240px" }} type="search" />
        <label htmlFor="status" className="small">Status</label>
        <select defaultValue={status} id="status" name="status" style={{ width: "auto" }}>
          <option value="">All</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn secondary" type="submit">Filter</button>
      </form>
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Page</th><th>Address</th><th>Status</th><th>Last updated</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug}>
                <td>
                  <Link href={`/admin/pages/${row.slug}`}>{row.title}</Link>
                  {row.has_draft && <> <span className="badge draft">unpublished changes</span></>}
                </td>
                <td className="small">{row.route.startsWith("/") ? row.route : "Every page"}</td>
                <td><span className={`badge ${row.status}`}>{row.status}</span></td>
                <td className="small">{when(row.updated_at)} · {row.updated_by}</td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan="4" className="muted">No pages match.</td></tr>}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <p className="actions-row" style={{ marginTop: 14 }}>
          {page > 1 && <Link className="btn secondary small" href={link(page - 1)}>Previous</Link>}
          <span className="small">Page {page} of {pages}</span>
          {page < pages && <Link className="btn secondary small" href={link(page + 1)}>Next</Link>}
        </p>
      )}
    </>
  );
}

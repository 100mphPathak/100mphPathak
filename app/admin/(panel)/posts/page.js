import Link from "next/link";
import { sql } from "../../../lib/db";
import { requirePage } from "../../../lib/session";
import { when } from "../format";

export const metadata = { title: "Blog posts" };

const PER_PAGE = 20;
const STATUSES = ["published", "draft", "unpublished"];

export default async function Posts({ searchParams }) {
  await requirePage("post.edit");
  // Filters come from the address (?q=…&status=…&category=…&page=…), so back/refresh/share keep them.
  const params = await searchParams;
  const q = String(params.q ?? "").slice(0, 100);
  const status = STATUSES.includes(params.status) ? params.status : "";
  const category = /^\d+$/.test(params.category ?? "") ? params.category : "";
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  const like = `%${q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`; // search % and _ literally

  const [rows, categories] = await Promise.all([
    // The list shows each post's latest draft: that's what editors are working on.
    sql`
      select p.id::text, p.slug, p.status, p.updated_at, p.updated_by, r.title, r.author, c.name as category,
        (p.published_revision_id is not null and p.draft_revision_id is distinct from p.published_revision_id) as has_draft,
        count(*) over()::int as total
      from posts p
      join post_revisions r on r.id = p.draft_revision_id
      join categories c on c.id = r.category_id
      where (r.title ilike ${like} or p.slug ilike ${like})
        and (${status} = '' or p.status = ${status})
        and (${category} = '' or r.category_id::text = ${category})
      order by p.updated_at desc
      limit ${PER_PAGE} offset ${(page - 1) * PER_PAGE}`,
    sql`select id::text, name from categories order by name`,
  ]);
  const total = rows[0]?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const link = (n) => `/admin/posts?${new URLSearchParams({ ...(q && { q }), ...(status && { status }), ...(category && { category }), page: n })}`;

  return (
    <>
      <div className="a-top">
        <h1>Blog posts</h1>
        <Link className="btn" href="/admin/posts/new">New post</Link>
      </div>
      <form className="a-card actions-row" role="search">
        <label className="sr-only" htmlFor="q">Search posts</label>
        <input defaultValue={q} id="q" name="q" placeholder="Search by title or address" style={{ flex: "1 1 240px" }} type="search" />
        <label htmlFor="status" className="small">Status</label>
        <select defaultValue={status} id="status" name="status" style={{ width: "auto" }}>
          <option value="">All</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="category" className="small">Category</label>
        <select defaultValue={category} id="category" name="category" style={{ width: "auto" }}>
          <option value="">All</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="btn secondary" type="submit">Filter</button>
      </form>
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Author</th><th>Last updated</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.title}
                  {row.has_draft && <> <span className="badge draft">unpublished changes</span></>}
                  <div className="small muted">/blogs/{row.slug}/</div>
                </td>
                <td className="small">{row.category}</td>
                <td><span className={`badge ${row.status}`}>{row.status}</span></td>
                <td className="small">{row.author}</td>
                <td className="small">{when(row.updated_at)} · {row.updated_by}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan="5" className="muted">{q || status || category ? "No posts match." : "No posts yet. Click “New post” to write the first one."}</td></tr>
            )}
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

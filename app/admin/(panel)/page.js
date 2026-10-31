import Link from "next/link";
import { sql } from "../../lib/db";
import { requirePage } from "../../lib/session";
import { can } from "../../lib/permissions";
import { ToastOnLoad } from "../feedback";
import { when } from "./format";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }) {
  const user = await requirePage();
  const { denied } = await searchParams;
  const [[counts], recent, media, activity] = await Promise.all([
    sql`select count(*)::int as total,
          count(*) filter (where status = 'published')::int as published,
          count(*) filter (where draft_revision_id is distinct from published_revision_id)::int as drafts,
          count(*) filter (where status = 'unpublished')::int as unpublished
        from pages`,
    sql`select slug, title, status, updated_at, updated_by from pages order by updated_at desc limit 6`,
    sql`select count(*)::int as files, coalesce(sum(size), 0)::bigint as bytes from media`,
    can(user.role, "audit.view")
      ? sql`select actor_email, action, resource_id, at from audit_log order by at desc limit 8`
      : Promise.resolve([]),
  ]);
  return (
    <>
      <div className="a-top"><h1>Dashboard</h1></div>
      {denied && <ToastOnLoad text="You don’t have permission to open that page." type="error" />}
      <div className="a-grid">
        <div className="a-card a-stat"><strong>{counts.total}</strong>Managed pages</div>
        <div className="a-card a-stat"><strong>{counts.published}</strong>Published</div>
        <div className="a-card a-stat"><strong>{counts.drafts}</strong>With unpublished changes</div>
        <div className="a-card a-stat"><strong>{media[0].files}</strong>Uploaded images</div>
      </div>
      <div className="a-card">
        <h2>Recently edited</h2>
        <div className="a-table-wrap">
          <table className="a-table">
            <thead><tr><th>Page</th><th>Status</th><th>Last change</th></tr></thead>
            <tbody>
              {recent.map((page) => (
                <tr key={page.slug}>
                  <td><Link href={`/admin/pages/${page.slug}`}>{page.title}</Link></td>
                  <td><span className={`badge ${page.status}`}>{page.status}</span></td>
                  <td className="small">{when(page.updated_at)} · {page.updated_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {activity.length > 0 && (
        <div className="a-card">
          <h2>Recent activity</h2>
          <ul className="small">
            {activity.map((row, i) => (
              <li key={i}>{when(row.at)} — <strong>{row.actor_email ?? "system"}</strong> {row.action} {row.resource_id}</li>
            ))}
          </ul>
          <Link href="/admin/audit">Full activity log</Link>
        </div>
      )}
    </>
  );
}

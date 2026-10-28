import Link from "next/link";
import { sql } from "../../../lib/db";
import { requirePage } from "../../../lib/session";
import { when } from "../format";

export const metadata = { title: "Activity log" };

const PER_PAGE = 50;

export default async function Audit({ searchParams }) {
  await requirePage("audit.view");
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page, 10) || 1);
  const action = /^[a-z_.]{0,40}$/.test(params.action ?? "") ? (params.action ?? "") : "";
  const [rows, actions] = await Promise.all([
    sql`select actor_email, action, resource_type, resource_id, details, at, count(*) over()::int as total
        from audit_log where (${action} = '' or action = ${action})
        order by at desc limit ${PER_PAGE} offset ${(page - 1) * PER_PAGE}`,
    sql`select distinct action from audit_log order by action`,
  ]);
  const pages = Math.max(1, Math.ceil((rows[0]?.total ?? 0) / PER_PAGE));
  const link = (n) => `/admin/audit?${new URLSearchParams({ ...(action && { action }), page: n })}`;
  return (
    <>
      <div className="a-top"><h1>Activity log</h1></div>
      <form className="a-card actions-row">
        <label htmlFor="action" className="small">Show</label>
        <select defaultValue={action} id="action" name="action" style={{ width: "auto" }}>
          <option value="">All activity</option>
          {actions.map((a) => <option key={a.action} value={a.action}>{a.action}</option>)}
        </select>
        <button className="btn secondary" type="submit">Filter</button>
      </form>
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>When</th><th>Who</th><th>What</th><th>Item</th><th>Details</th></tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="small">{when(row.at)}</td>
                <td className="small">{row.actor_email ?? "system"}</td>
                <td>{row.action}</td>
                <td className="small">{row.resource_type} {row.resource_id}</td>
                <td className="small">{Object.keys(row.details ?? {}).length ? JSON.stringify(row.details) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <p className="actions-row" style={{ marginTop: 14 }}>
          {page > 1 && <Link className="btn secondary small" href={link(page - 1)}>Newer</Link>}
          <span className="small">Page {page} of {pages}</span>
          {page < pages && <Link className="btn secondary small" href={link(page + 1)}>Older</Link>}
        </p>
      )}
    </>
  );
}

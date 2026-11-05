import { sql } from "../../../lib/db";
import { ROLES } from "../../../lib/permissions";
import { requirePage } from "../../../lib/session";
import { when } from "../format";
import AddUserForm from "./add-user-form";
import DeleteUser from "./delete-user";
import RoleSelect from "./role-select";

export const metadata = { title: "Users" };

export default async function Users() {
  const me = await requirePage("users.manage");
  const users = await sql`
    select u.id::text, u.raw_user_meta_data->>'name' as name, u.email, u.created_at, c.role
    from auth.users u left join cms_users c on c.user_id = u.id
    order by (c.role is null) desc, u.created_at desc
    limit 200`;
  return (
    <>
      <div className="a-top"><h1>Users</h1></div>
      <div className="a-card small">
        <p>
          Public sign-up is closed. Add an admin with the form below and share the password with them privately (in person or by phone,
          not in a group chat). They can change it later with “Forgot your password?” on the sign-in page.
          “No access” locks someone out but keeps their login; “Delete” removes the login for good.
        </p>
        <ul>
          <li><strong>{ROLES.editor}</strong>: edit and save drafts, upload images, preview.</li>
          <li><strong>{ROLES.content_admin}</strong>: everything an editor can do, plus publish, take pages offline, SEO, restore versions, delete unused images.</li>
          <li><strong>{ROLES.super_admin}</strong>: everything, plus site-wide settings, hiding pages from Google, users and the activity log.</li>
        </ul>
      </div>
      <AddUserForm />
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Name</th><th>Email</th><th>Signed up</th><th>Access</th><th><span className="sr-only">Delete</span></th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}{!u.role && <> <span className="badge draft">waiting</span></>}</td>
                <td>{u.email}</td>
                <td className="small">{when(u.created_at)}</td>
                <td>{u.id === me.id ? <span className="small">{ROLES[u.role]} (you)</span> : <RoleSelect role={u.role ?? ""} userId={u.id} />}</td>
                <td>{u.id !== me.id && <DeleteUser email={u.email} userId={u.id} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

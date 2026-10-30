import Link from "next/link";
import { requirePage } from "../../lib/session";
import { can, ROLES } from "../../lib/permissions";
import { signOut } from "../(auth)/actions";
import NavLink from "./nav-link";

export default async function PanelLayout({ children }) {
  const user = await requirePage();
  return (
    <div className="a-shell">
      <aside className="a-side">
        <Link className="a-logo" href="/admin">Pathak100MPH admin</Link>
        <nav aria-label="Admin">
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/pages">Pages</NavLink>
          {can(user.role, "post.edit") && <NavLink href="/admin/posts">Blog</NavLink>}
          <NavLink href="/admin/media">Media</NavLink>
          {can(user.role, "global.edit") && <NavLink href="/admin/pages/global">Site-wide settings</NavLink>}
          {can(user.role, "users.manage") && <NavLink href="/admin/users">Users</NavLink>}
          {can(user.role, "audit.view") && <NavLink href="/admin/audit">Activity log</NavLink>}
          <a href="/" target="_blank" rel="noopener">View website ↗</a>
        </nav>
        <div className="a-user">
          <div>{user.name || user.email}</div>
          <div className="small" style={{ opacity: 0.8 }}>{ROLES[user.role]}</div>
          <form action={signOut}>
            <button className="btn small" type="submit">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="a-main" id="main">{children}</main>
    </div>
  );
}

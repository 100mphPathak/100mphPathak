import { cache } from "react";
import { redirect } from "next/navigation";
import { sql } from "./db";
import { can } from "./permissions";
import { supabase } from "./auth";

// The signed-in user plus their CMS role (null = signed in but not approved yet).
export const currentUser = cache(async () => {
  const { data: { user } } = await (await supabase()).auth.getUser();
  if (!user) return null;
  const [row] = await sql`select role from cms_users where user_id = ${user.id}`;
  return { id: user.id, email: user.email, name: user.user_metadata?.name ?? "", role: row?.role ?? null };
});

// For admin pages: sends visitors to sign-in, unapproved users to the waiting page,
// and users without the permission to the dashboard.
export async function requirePage(action = "page.view") {
  const user = await currentUser();
  if (!user) redirect("/admin/sign-in");
  if (!user.role) redirect("/admin/pending");
  if (!can(user.role, action)) redirect("/admin?denied=1");
  return user;
}

// For server actions: never trust the UI, check again here.
export async function authorize(action) {
  const user = await currentUser();
  if (!user?.role) return { error: "Please sign in again." };
  if (!can(user.role, action)) return { error: "You don't have permission to do that." };
  return { user };
}

export async function audit(user, action, resourceType, resourceId, details = {}) {
  await sql`
    insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details)
    values (${user?.id ?? null}, ${user?.email ?? null}, ${action}, ${resourceType}, ${resourceId}, ${JSON.stringify(details)})`;
}

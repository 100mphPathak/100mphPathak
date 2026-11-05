"use server";

import { revalidatePath } from "next/cache";
import { authAdmin } from "../../../lib/auth";
import { sql } from "../../../lib/db";
import { ROLES } from "../../../lib/permissions";
import { audit, authorize } from "../../../lib/session";

// role = null removes access. Access changes apply on the user's very next request.
export async function setRole(userId, role) {
  const { user, error } = await authorize("users.manage");
  if (error) return { error };
  if (role !== null && !(role in ROLES)) return { error: "Unknown role." };
  if (userId === user.id) return { error: "You can’t change your own access. Ask another super administrator." };
  const [target] = await sql`select email from auth.users where id = ${userId}`;
  if (!target) return { error: "That account no longer exists." };

  if (role) {
    await sql`
      insert into cms_users (user_id, role, granted_by) values (${userId}, ${role}, ${user.id})
      on conflict (user_id) do update set role = excluded.role, granted_by = excluded.granted_by, granted_at = now()`;
  } else {
    await sql`delete from cms_users where user_id = ${userId}`;
  }
  await audit(user, role ? "user.set_role" : "user.remove_access", "user", target.email, { role });
  revalidatePath("/admin/users");
  return { ok: role ? `${target.email} is now a ${ROLES[role].toLowerCase()}.` : `${target.email} no longer has access.` };
}

const NO_KEY = "Creating and deleting logins needs SUPABASE_SERVICE_ROLE_KEY in the server settings. Ask your developer.";

// "Add admin" form (useActionState): makes a confirmed login with the password typed, then gives it a role.
export async function createUser(_prev, form) {
  const { user, error } = await authorize("users.manage");
  if (error) return { error };
  const name = String(form.get("name") ?? "").trim().slice(0, 80);
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const role = String(form.get("role") ?? "");
  const keep = { name, email, role }; // refill the form (never the password) if something is wrong
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ...keep, error: "Enter a name and a valid email." };
  if (password.length < 10) return { ...keep, error: "The password must be at least 10 characters." };
  if (!(role in ROLES)) return { ...keep, error: "Choose an access level." };
  const admin = authAdmin();
  if (!admin) return { ...keep, error: NO_KEY };

  const { data, error: authError } = await admin.createUser({ email, password, email_confirm: true, user_metadata: { name } });
  if (authError) return { ...keep, error: `Could not create the login: ${authError.message}` };
  await sql`insert into cms_users (user_id, role, granted_by) values (${data.user.id}, ${role}, ${user.id})`;
  await audit(user, "user.create", "user", email, { role });
  revalidatePath("/admin/users");
  return { ok: `${email} can now sign in as ${ROLES[role].toLowerCase()}. Share the password with them privately.`, done: Date.now() };
}

// Deletes the login itself; their role goes with it (on delete cascade). Saved versions and the activity log keep their email.
export async function deleteUser(userId) {
  const { user, error } = await authorize("users.manage");
  if (error) return { error };
  if (userId === user.id) return { error: "You can’t delete your own account. Ask another super administrator." };
  const [target] = await sql`select email from auth.users where id = ${userId}`;
  if (!target) return { error: "That account no longer exists." };
  const admin = authAdmin();
  if (!admin) return { error: NO_KEY };
  const { error: authError } = await admin.deleteUser(userId);
  if (authError) return { error: `Could not delete the login: ${authError.message}` };
  await audit(user, "user.delete", "user", target.email);
  revalidatePath("/admin/users");
  return { ok: `${target.email} was deleted and can no longer sign in.` };
}

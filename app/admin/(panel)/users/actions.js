"use server";

import { revalidatePath } from "next/cache";
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

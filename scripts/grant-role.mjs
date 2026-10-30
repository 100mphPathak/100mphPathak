// Gives an existing account a CMS role. Use it once for the first super administrator;
// after that, roles are managed in /admin/users.
// Usage: node --env-file=.env.local scripts/grant-role.mjs you@example.com super_admin
import postgres from "postgres";

const [email, role] = process.argv.slice(2);
const ROLES = ["editor", "content_admin", "super_admin"];
if (!email || !ROLES.includes(role)) {
  console.error(`Usage: node --env-file=.env.local scripts/grant-role.mjs <email> <${ROLES.join("|")}>`);
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const [user] = await sql`select id, email from auth.users where lower(email) = lower(${email})`;
if (!user) {
  console.error(`No account for ${email}. Sign up at /admin/sign-up first.`);
  await sql.end();
  process.exit(1);
}
await sql`
  insert into cms_users (user_id, role) values (${user.id}, ${role})
  on conflict (user_id) do update set role = excluded.role, granted_at = now()`;
await sql`insert into audit_log (actor_email, action, resource_type, resource_id, details)
          values ('grant-role script', 'user.set_role', 'user', ${user.email}, ${JSON.stringify({ role })})`;
console.log(`${user.email} is now ${role}.`);
await sql.end();

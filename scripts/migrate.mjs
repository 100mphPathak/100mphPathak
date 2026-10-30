// Applies db/migrations/*.sql in order, once each. Usage: node --env-file=.env.local scripts/migrate.mjs
import postgres from "postgres";
import { readdir, readFile } from "node:fs/promises";

// onnotice: hides Postgres' "already exists, skipping" notices, which are expected here.
const sql = postgres(process.env.DATABASE_URL, { prepare: false, onnotice: () => {} });
const dir = new URL("../db/migrations/", import.meta.url);

await sql`create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())`;
const done = new Set((await sql`select name from _migrations`).map((r) => r.name));

for (const name of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) {
  if (done.has(name)) continue;
  await sql.begin(async (tx) => {
    await tx.unsafe(await readFile(new URL(name, dir), "utf8"));
    await tx`insert into _migrations (name) values (${name})`;
  });
  console.log("applied", name);
}
await sql.end();

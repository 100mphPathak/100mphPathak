// Applies db/migrations/*.sql in order, once each. Usage: node --env-file=.env.local scripts/migrate.mjs
import { Pool } from "@neondatabase/serverless";
import { readdir, readFile } from "node:fs/promises";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const dir = new URL("../db/migrations/", import.meta.url);

await pool.query("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
const { rows } = await pool.query("select name from _migrations");
const done = new Set(rows.map((r) => r.name));

for (const name of (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort()) {
  if (done.has(name)) continue;
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(await readFile(new URL(name, dir), "utf8"));
    await client.query("insert into _migrations (name) values ($1)", [name]);
    await client.query("commit");
    console.log("applied", name);
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
  }
}
await pool.end();

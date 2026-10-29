import { neon, Pool } from "@neondatabase/serverless";

// One-shot queries over HTTP: sql`select ... where id = ${id}` (values are always parameterised).
// Pages cache their content through unstable_cache (lib/content.js), which publishing clears by tag.
export const sql = neon(process.env.DATABASE_URL ?? "postgresql://missing@localhost/missing");

// Multi-statement transactions (publish, restore) need a real connection.
export async function transaction(fn) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    await client.query("begin");
    const result = await fn(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

import postgres from "postgres";

// Queries: sql`select ... where id = ${id}` (values are always parameterised).
// prepare: false is required by Supabase's transaction pooler (port 6543).
export const sql = postgres(process.env.DATABASE_URL ?? "postgres://missing@localhost/missing", { prepare: false });

// Multi-statement transactions (publish, restore). Keeps the old db.query(text, params) shape.
export async function transaction(fn) {
  return sql.begin((tx) => fn({ query: async (text, params = []) => ({ rows: await tx.unsafe(text, params) }) }));
}
import { sql } from "../../lib/db";

export const dynamic = "force-dynamic";

// Vercel Cron calls this once a day (vercel.json) so Supabase never pauses the free project.
export async function GET(request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  await sql`select 1`;
  return Response.json({ ok: true });
}

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "../../../../lib/db";
import { can } from "../../../../lib/permissions";
import { currentUser } from "../../../../lib/session";

// Turns on draft mode for this browser only, then opens the post showing its saved draft.
export async function GET(_request, { params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return new Response("Not found", { status: 404 });
  const user = await currentUser();
  if (!user?.role || !can(user.role, "page.preview")) return new Response("Not allowed", { status: 403 });
  const [post] = await sql`select slug from posts where id = ${id}`;
  if (!post) return new Response("Not found", { status: 404 });
  (await draftMode()).enable();
  redirect(`/blogs/${post.slug}/`);
}

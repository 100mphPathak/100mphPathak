import { notFound } from "next/navigation";
import { sql } from "../../../../lib/db";
import { requirePage } from "../../../../lib/session";
import PostEditor from "./post-editor";

export const metadata = { title: "Edit post" };

// Loads the post's latest draft on the server and hands it to the editor form as plain data.
export default async function EditPost({ params }) {
  await requirePage("post.edit");
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const [[post], categories] = await Promise.all([
    sql`
      select p.id::text, p.slug, p.status, p.published_at is not null as was_published,
        r.id::text as revision_id, r.number, r.title, r.excerpt, r.author, r.category_id::text, r.cover_image
      from posts p join post_revisions r on r.id = p.draft_revision_id
      where p.id = ${id}`,
    sql`select id::text, name from categories order by name`,
  ]);
  if (!post) notFound();

  return <PostEditor categories={categories} post={post} />;
}

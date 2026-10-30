import Link from "next/link";
import { sql } from "../../../../lib/db";
import { requirePage } from "../../../../lib/session";
import NewPostForm from "./new-post-form";

export const metadata = { title: "New post" };

export default async function NewPost() {
  await requirePage("post.edit");
  const categories = await sql`select id::text, name from categories order by name`;
  return (
    <>
      <div className="a-top">
        <h1>New post</h1>
        <Link className="btn secondary small" href="/admin/posts">Back to posts</Link>
      </div>
      <div className="a-card" style={{ maxWidth: 560 }}>
        <p className="muted small" style={{ marginTop: 0 }}>Start with a title and a category. You’ll write the article itself in the editor.</p>
        <NewPostForm categories={categories} />
      </div>
    </>
  );
}

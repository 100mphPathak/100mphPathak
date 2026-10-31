import Link from "next/link";
import { notFound } from "next/navigation";
import { sql } from "../../../../../lib/db";
import { can } from "../../../../../lib/permissions";
import { requirePage } from "../../../../../lib/session";
import { when } from "../../../format";
import RestoreButton from "./restore-button";

export const metadata = { title: "Post version history" };

export default async function PostRevisions({ params }) {
  const user = await requirePage("post.edit");
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const [[post], revisions] = await Promise.all([
    sql`select p.draft_revision_id::text as draft, p.published_revision_id::text as live, r.title
        from posts p join post_revisions r on r.id = p.draft_revision_id where p.id = ${id}`,
    sql`select id::text, number, title, note, created_by, created_at from post_revisions where post_id = ${id} order by number desc limit 100`,
  ]);
  if (!post) notFound();

  return (
    <>
      <div className="a-top">
        <div>
          <p className="small muted" style={{ margin: 0 }}><Link href="/admin/posts">Blog</Link> / <Link href={`/admin/posts/${id}`}>{post.title}</Link> /</p>
          <h1>Version history</h1>
        </div>
      </div>
      <div className="a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Version</th><th>Title</th><th>Saved</th><th>By</th><th>Note</th><th></th></tr></thead>
          <tbody>
            {revisions.map((rev) => (
              <tr key={rev.id}>
                <td>
                  {rev.number}
                  {rev.id === post.live && <> <span className="badge published">live</span></>}
                  {rev.id === post.draft && <> <span className="badge draft">current draft</span></>}
                </td>
                <td className="small">{rev.title}</td>
                <td className="small">{when(rev.created_at)}</td>
                <td className="small">{rev.created_by}</td>
                <td className="small">{rev.note}</td>
                <td>{rev.id !== post.draft && can(user.role, "post.publish") && <RestoreButton number={rev.number} postId={id} revisionId={rev.id} />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

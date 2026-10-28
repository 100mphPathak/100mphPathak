import { notFound } from "next/navigation";
import { PAGES } from "../../../../content/defaults";
import { COLORS, merge } from "../../../../content/shape";
import { sql } from "../../../../lib/db";
import { can } from "../../../../lib/permissions";
import { requirePage } from "../../../../lib/session";
import Editor from "./editor";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: PAGES[slug] ? `Edit ${PAGES[slug].title}` : "Not found" };
}

export default async function EditPage({ params }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();
  const user = await requirePage(slug === "global" ? "global.edit" : "page.view");

  const [row] = await sql`
    select p.status, p.draft_revision_id, p.published_revision_id, p.updated_at, p.updated_by,
      r.number, r.content, r.seo
    from pages p join revisions r on r.id = p.draft_revision_id
    where p.slug = ${slug}`;
  if (!row) notFound();

  return (
    <Editor
      colors={Object.keys(COLORS)}
      content={merge(page.content, row.content)}
      hasUnpublished={String(row.draft_revision_id) !== String(row.published_revision_id)}
      permissions={{
        publish: can(user.role, "page.publish"),
        unpublish: can(user.role, "page.unpublish") && !["global", "home"].includes(slug),
        seo: can(user.role, "page.seo"),
        robots: can(user.role, "page.robots"),
        restore: can(user.role, "page.restore"),
      }}
      revision={{ id: String(row.draft_revision_id), number: row.number }}
      route={page.route}
      seo={slug === "global" ? null : merge(page.seo, row.seo)}
      slug={slug}
      status={row.status}
      template={page.content}
      title={page.title}
    />
  );
}

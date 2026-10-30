"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { transaction } from "../../../lib/db";
import { authorize } from "../../../lib/session";
import { slugify } from "../../../lib/slug";

// Creates a draft post (title + category) and its first revision.
// Used with useActionState: returns { error } to show in the form, or redirects on success.
export async function createPost(_prev, formData) {
  const { user, error } = await authorize("post.edit");
  if (error) return { error };

  const title = String(formData.get("title") ?? "").trim();
  const categoryId = Number.parseInt(formData.get("category"), 10);
  const keep = { title, category: Number.isInteger(categoryId) ? String(categoryId) : "" }; // refilled into the form after an error
  if (!title) return { error: "Give the post a title.", ...keep };
  if (title.length > 200) return { error: "Keep the title under 200 characters.", ...keep };
  if (!Number.isInteger(categoryId)) return { error: "Choose a category.", ...keep };

  try {
    await transaction(async (db) => {
      // Never trust the form: the category must really exist.
      const { rows: [category] } = await db.query(`select id from categories where id = $1`, [categoryId]);
      if (!category) throw new UserError("That category no longer exists. Reload and choose another.");

      // "my-title" is taken? Use the next free "my-title-2", "my-title-3"…
      const base = slugify(title);
      const { rows: taken } = await db.query(`select slug from posts where slug = $1 or slug ~ $2`, [base, `^${base}-[0-9]+$`]);
      const used = new Set(taken.map((r) => r.slug));
      let slug = base;
      for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;

      const { rows: [post] } = await db.query(
        `insert into posts (slug, created_by, updated_by) values ($1, $2, $2) returning id`,
        [slug, user.email],
      );
      const { rows: [rev] } = await db.query(
        `insert into post_revisions (post_id, number, title, author, category_id, note, created_by)
         values ($1, 1, $2, $3, $4, 'Created', $5) returning id`,
        [post.id, title, user.name || user.email, categoryId, user.email],
      );
      await db.query(`update posts set draft_revision_id = $1 where id = $2`, [rev.id, post.id]);
      await db.query(
        `insert into audit_log (actor_id, actor_email, action, resource_type, resource_id, details) values ($1, $2, 'post.create', 'post', $3, $4)`,
        [user.id, user.email, slug, { title }],
      );
    });
  } catch (e) {
    if (e instanceof UserError) return { error: e.message, ...keep };
    // 23505 = unique violation: someone created the same address at the same moment.
    if (e.code === "23505") return { error: "That address was just taken. Click Create again.", ...keep };
    console.error("[cms] createPost failed", e);
    return { error: "Could not create the post. Try again.", ...keep };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts"); // Post/Redirect/Get: refreshing the list can't create the post twice
}

// An error whose message is safe to show to the person using the form.
class UserError extends Error {}

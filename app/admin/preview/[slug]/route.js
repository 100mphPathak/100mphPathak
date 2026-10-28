import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { PAGES } from "../../../content/defaults";
import { can } from "../../../lib/permissions";
import { currentUser } from "../../../lib/session";

// Turns on draft mode for this browser only, then opens the page showing its saved draft.
export async function GET(_request, { params }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return new Response("Not found", { status: 404 });
  const user = await currentUser();
  if (!user?.role || !can(user.role, "page.preview")) return new Response("Not allowed", { status: 403 });
  (await draftMode()).enable();
  redirect(page.route ?? "/");
}

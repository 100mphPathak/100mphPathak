import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { PAGES } from "../../content/defaults";

export async function POST(request) {

  const secret = process.env.REVALIDATE_SECRET ?? "";
  const given = request.headers.get("x-revalidate-secret") ?? "";
  const ok = secret.length >= 16 && given.length === secret.length && timingSafeEqual(Buffer.from(given), Buffer.from(secret));
  if (!ok) return Response.json({ error: "Not allowed" }, { status: 401 });
    
  for (const slug of Object.keys(PAGES)) revalidateTag(`page:${slug}`, { expire: 0 });
  revalidateTag("sitemap", { expire: 0 });
  revalidatePath("/", "layout");
  return Response.json({ ok: true, cleared: Object.keys(PAGES).length });

}

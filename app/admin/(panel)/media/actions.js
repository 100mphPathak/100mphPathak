"use server";

import { randomUUID } from "node:crypto";
import { imageSize } from "image-size";
import { PAGES } from "../../../content/defaults";
import { sql } from "../../../lib/db";
import { audit, authorize } from "../../../lib/session";
import { deleteObject, publicUrl, putImage, sniffImage } from "../../../lib/storage";

const MAX_UPLOAD = 4 * 1024 * 1024; // Vercel's request body limit is 4.5 MB
const PER_PAGE = 48;

// Images that ship with the website (public/assets), found by walking the default content.
function builtInImages() {
  const found = new Map();
  const walk = (v) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") {
      if (typeof v.src === "string" && v.src.startsWith("/assets/") && !found.has(v.src)) {
        found.set(v.src, { id: `asset:${v.src}`, url: v.src, filename: v.src.split("/").pop(), width: v.width, height: v.height, alt: v.alt, builtIn: true });
      }
      Object.values(v).forEach(walk);
    }
  };
  Object.values(PAGES).forEach((page) => walk(page.content));
  return [...found.values()];
}

export async function listMedia({ q = "", page = 1 } = {}) {
  const { error } = await authorize("media.view");
  if (error) return { error };
  const like = `%${String(q).slice(0, 100).replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
  const offset = (Math.max(1, Number(page) || 1) - 1) * PER_PAGE;
  const rows = await sql`
    select id::text, url, filename, mime, size, width, height, alt, uploaded_by, created_at, count(*) over()::int as total
    from media where filename ilike ${like} or alt ilike ${like}
    order by created_at desc limit ${PER_PAGE} offset ${offset}`;
  const builtIn = builtInImages().filter((m) => !q || `${m.filename} ${m.alt}`.toLowerCase().includes(String(q).toLowerCase()));
  return { items: rows, total: rows[0]?.total ?? 0, perPage: PER_PAGE, builtIn };
}

export async function uploadMedia(formData) {
  const { user, error } = await authorize("media.upload");
  if (error) return { error };
  const file = formData.get("file");
  if (!file || typeof file === "string" || file.size === 0) return { error: "Choose an image to upload." };
  if (file.size > MAX_UPLOAD) return { error: "That image is larger than 4 MB. Please resize or compress it first." };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const type = sniffImage(bytes);
  if (!type) return { error: "Only JPEG, PNG, WebP or AVIF images can be uploaded (SVG is not allowed for security reasons)." };
  let size;
  try {
    size = imageSize(bytes);
  } catch {
    return { error: "That file doesn’t look like a valid image." };
  }

  const key = `uploads/${new Date().getUTCFullYear()}/${randomUUID()}.${type.ext}`;
  const filename = String(file.name || `image.${type.ext}`).replace(/[^\w.\- ]+/g, "").slice(0, 120) || `image.${type.ext}`;
  const alt = String(formData.get("alt") ?? "").trim().slice(0, 300);
  try {
    await putImage(key, bytes, type.mime);
  } catch (e) {
    console.error("[cms] upload failed", e);
    return { error: "The upload failed. Please try again." };
  }
  const [row] = await sql`
    insert into media (storage_key, url, filename, mime, size, width, height, alt, uploaded_by)
    values (${key}, ${publicUrl(key)}, ${filename}, ${type.mime}, ${file.size}, ${size.width}, ${size.height}, ${alt}, ${user.email})
    returning id::text, url, filename, mime, size, width, height, alt, created_at`;
  await audit(user, "media.upload", "media", row.id, { filename, size: file.size });
  return { ok: "Image uploaded.", item: row };
}

export async function updateAlt(id, alt) {
  const { user, error } = await authorize("media.upload");
  if (error) return { error };
  const [row] = await sql`update media set alt = ${String(alt).trim().slice(0, 300)} where id = ${id} returning id`;
  if (!row) return { error: "That image no longer exists." };
  await audit(user, "media.update", "media", id);
  return { ok: "Description saved." };
}

// Pages whose current draft or live version uses this image.
async function usage(url) {
  return sql`
    select distinct p.slug, p.title from pages p
    join revisions r on r.id in (p.draft_revision_id, p.published_revision_id)
    where strpos(r.content::text, ${url}) > 0 or strpos(r.seo::text, ${url}) > 0`;
}

export async function mediaUsage(id) {
  const { error } = await authorize("media.view");
  if (error) return { error };
  const [row] = await sql`select url from media where id = ${id}`;
  return row ? { pages: await usage(row.url) } : { pages: [] };
}

export async function deleteMedia(id) {
  const { user, error } = await authorize("media.delete");
  if (error) return { error };
  const [row] = await sql`select storage_key, url, filename from media where id = ${id}`;
  if (!row) return { error: "That image no longer exists." };
  const used = await usage(row.url);
  if (used.length) return { error: `This image is still used on: ${used.map((p) => p.title).join(", ")}. Replace it there first.` };
  try {
    await deleteObject(row.storage_key);
  } catch (e) {
    console.error("[cms] delete failed", e);
    return { error: "Could not delete the file. Please try again." };
  }
  await sql`delete from media where id = ${id}`;
  await audit(user, "media.delete", "media", id, { filename: row.filename });
  return { ok: "Image deleted." };
}

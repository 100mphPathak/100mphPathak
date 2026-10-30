// The default content of each page is also its schema: same keys, same types.
// Field rules come from key names, so no page needs its own validation code.

const MAX_TEXT = 5000;
const MAX_ITEMS = 50;
export const SAFE_HREF = /^(\/(?!\/)|#[\w-]*$|https?:\/\/[^\s"'<>]+$|tel:\+?[\d\s-]+$|mailto:[^\s"'<>]+$)/;
const LOCAL_IMAGE = /^\/assets\/[\w.-]+$/;
// Inline links inside text: [label](/path)
export const INLINE_LINK = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
const EMBED_ID = /^[\w-]{5,40}$/;

// Card colours map to the existing .art-N classes.
export const COLORS = { blue: "art-0", sand: "art-1", green: "art-2", purple: "art-3" };

const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// Public address of uploaded images (same as publicUrl("") in lib/storage.js, without loading the S3 client).
export function mediaPrefix() {
  const site = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return site ? `${site}/storage/v1/object/public/${process.env.MEDIA_BUCKET ?? "media"}/` : null;
}

function checkString(key, value, template) {
  if (value === "" && template === "") return null; // optional field left empty
  if (value.length > MAX_TEXT) return `is longer than ${MAX_TEXT} characters`;
  if (/[\u0000-\u0008\u000b-\u001f\u007f]/.test(value)) return "contains control characters";
  if (key === "href" && value && !SAFE_HREF.test(value)) return "must be a link starting with /, #, https://, tel: or mailto:";
  if (key === "src") {
    const prefix = mediaPrefix();
    if (!LOCAL_IMAGE.test(value) && !(prefix && value.startsWith(prefix) && !value.includes(".."))) return "must be an image from the media library";
  }
  for (const [, , target] of value.matchAll(INLINE_LINK)) {
    if (!SAFE_HREF.test(target)) return `has an unsafe link target "${target}"`;
  }
  if (key === "color" && !Object.hasOwn(COLORS, value)) return `must be one of: ${Object.keys(COLORS).join(", ")}`;
  if (key === "platform" && !["youtube", "instagram"].includes(value)) return "must be youtube or instagram";
  if (key === "canonical" && value && !/^\/[\w\-/]*$/.test(value)) return "must be a path on this site, like /blogs/";
  if (/(^|[a-z])(videoId|reelId)$/i.test(key) || key === "id") {
    if (!EMBED_ID.test(value)) return "must be a YouTube or Instagram id like -iHp0AR06XE";
  }
  return null;
}

// Validates `input` against the shape of `template`. Returns { ok, errors: [{ path, message }] }.
export function validate(template, input, path = "", errors = []) {
  const key = path.split(".").pop().replace(/\[\d+\]$/, "");
  if (Array.isArray(template)) {
    if (!Array.isArray(input)) errors.push({ path, message: "must be a list" });
    else if (input.length > MAX_ITEMS) errors.push({ path, message: `can have at most ${MAX_ITEMS} items` });
    else input.forEach((item, i) => validate(template[0], item, `${path}[${i}]`, errors));
  } else if (isObject(template)) {
    if (!isObject(input)) errors.push({ path, message: "must be a group of fields" });
    else {
      for (const k of Object.keys(template)) {
        if (!(k in input)) errors.push({ path: join(path, k), message: "is missing" });
        else validate(template[k], input[k], join(path, k), errors);
      }
      for (const k of Object.keys(input)) if (!(k in template)) errors.push({ path: join(path, k), message: "is not a known field" });
    }
  } else if (typeof template === "number") {
    if (!Number.isInteger(input) || input < 1 || input > 10000) errors.push({ path, message: "must be a whole number between 1 and 10000" });
  } else if (typeof template === "boolean") {
    if (typeof input !== "boolean") errors.push({ path, message: "must be on or off" });
  } else if (typeof input !== "string") {
    errors.push({ path, message: "must be text" });
  } else {
    const message = checkString(key, input, template);
    if (message) errors.push({ path, message });
  }
  return { ok: errors.length === 0, errors };
}

const join = (path, key) => (path ? `${path}.${key}` : key);

// Fills anything missing from stored content with defaults and drops unknown keys,
// so fields added in code later still render before an editor touches them.
export function merge(template, value) {
  if (Array.isArray(template)) return Array.isArray(value) ? value.map((item) => merge(template[0], item)) : template;
  if (isObject(template)) {
    if (!isObject(value)) return template;
    return Object.fromEntries(Object.keys(template).map((k) => [k, merge(template[k], value[k])]));
  }
  return typeof value === typeof template ? value : template;
}

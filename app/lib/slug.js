// "How to Bowl Faster!" -> "how-to-bowl-faster". Matches the database rule on slugs:
// lowercase letters and digits, joined by single dashes.
export function slugify(text, maxLength = 80) {
  const slug = String(text)
    .normalize("NFKD") // "é" -> "e" + accent mark…
    .replace(/[\u0300-\u036f]/g, "") // …then drop the accent mark
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // anything else (spaces, symbols, Hindi) becomes a dash
    .replace(/^-+|-+$/g, "");
  // Cut long titles at a word boundary so the address doesn't end mid-word.
  const short = slug.length > maxLength ? slug.slice(0, maxLength).replace(/-[^-]*$/, "") : slug;
  return short || "post"; // e.g. a title written only in Hindi
}

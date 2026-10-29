// Regression gate: compares built page HTML against .baseline/ (taken before the CMS work).
// Ignores things that legitimately change between builds: script/CSS chunk hashes, font
// class hashes, React's <!-- --> text separators and the RSC payload.
// Usage: npm run build && node scripts/html-diff.mjs [page ...]
import { readFile, readdir } from "node:fs/promises";

const base = new URL(`../${process.env.BASELINE ?? ".baseline"}/`, import.meta.url);
const built = new URL("../.next/server/app/", import.meta.url);

const normalize = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<link[^>]*>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<meta[^>]*>|<title>.*?<\/title>/g, "")
    .replace(/<!-- -->/g, "")
    .replace(/<!--\$-->|<!--\/\$-->/g, "")
    .replace(/\b[\w-]*__[\w-]+\b/g, "FONT")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .replace(/<body>.*?(<a class="skip")/s, "<body>$1") // hidden RSC templates before the shell
    .trim();

const pages = process.argv.slice(2).length
  ? process.argv.slice(2).map((p) => `${p}.html`)
  : (await readdir(base)).filter((f) => f.endsWith(".html") && !f.startsWith("_"));

let failed = 0;
for (const file of pages) {
  const [a, b] = await Promise.all([readFile(new URL(file, base), "utf8"), readFile(new URL(file, built), "utf8")]).then((x) => x.map(normalize));
  if (a === b) {
    console.log("same   ", file);
    continue;
  }
  failed++;
  let i = 0;
  while (a[i] === b[i]) i++;
  console.log("DIFFERS", file, "at", i);
  console.log("  before:", a.slice(Math.max(0, i - 150), i + 150));
  console.log("  after: ", b.slice(Math.max(0, i - 150), i + 150));
}
process.exit(failed ? 1 : 0);

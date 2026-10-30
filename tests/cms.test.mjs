// Run: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { PAGES } from "../app/content/defaults/index.js";
import { merge, validate } from "../app/content/shape.js";
import { can } from "../app/lib/permissions.js";
import { sniffImage } from "../app/lib/storage.js";
import { seo } from "../app/seo.js";
import { slugify } from "../app/lib/slug.js";
import { getSchema } from "@tiptap/core";
import { cleanArticle, youtubeId } from "../app/content/article.js";
import { articleExtensions } from "../app/content/article-extensions.js";

const clone = (v) => structuredClone(v);
const messages = (r) => r.errors.map((e) => `${e.path} ${e.message}`).join("\n");

test("every page's built-in content and SEO pass validation", () => {
  for (const page of Object.values(PAGES)) {
    const content = validate(page.content, page.content);
    assert.ok(content.ok, `${page.slug}: ${messages(content)}`);
    const seoResult = validate(page.seo, page.seo);
    assert.ok(seoResult.ok, `${page.slug} seo: ${messages(seoResult)}`);
  }
});

test("validator rejects wrong types, unknown and missing fields", () => {
  const t = PAGES.home.content;
  const bad = clone(t);
  bad.hero.heading = 42;
  bad.hero.injected = "<script>";
  delete bad.hero.eyebrow;
  bad.stats = "not a list";
  const r = validate(t, bad);
  const paths = r.errors.map((e) => e.path);
  assert.ok(paths.includes("hero.heading"));
  assert.ok(paths.includes("hero.injected"));
  assert.ok(paths.includes("hero.eyebrow"));
  assert.ok(paths.includes("stats"));
});

test("validator blocks unsafe links, images, embeds and colours", () => {
  const t = PAGES.blogs.content;
  const cases = [
    ["posts[0].href", (c) => (c.posts[0].href = "javascript:alert(1)")],
    ["posts[0].href", (c) => (c.posts[0].href = "//evil.example/x")],
    ["posts[0].text", (c) => (c.posts[0].text = "see [here](javascript:alert(1))")],
    ["posts[0].color", (c) => (c.posts[0].color = "constructor")],
    ["closing.button.href", (c) => (c.closing.button.href = "data:text/html,hi")],
  ];
  for (const [path, mutate] of cases) {
    const c = clone(t);
    mutate(c);
    assert.ok(validate(t, c).errors.some((e) => e.path === path), `expected an error at ${path}`);
  }
  const home = clone(PAGES.home.content);
  home.coach.photo.src = "https://evil.example/x.png";
  home.hero.videoId = "x\" onload=\"alert(1)";
  const r = validate(PAGES.home.content, home);
  assert.ok(r.errors.some((e) => e.path === "coach.photo.src"));
  assert.ok(r.errors.some((e) => e.path === "hero.videoId"));
});

test("validator accepts edits that keep the shape, including longer lists", () => {
  const t = PAGES.blogs.content;
  const c = clone(t);
  c.hero.heading = "New heading";
  c.posts.push({ ...c.posts[0], title: "Another post", href: "/blogs/" });
  c.posts[0].text = "Read the [admission guide](/assessment-trial/).";
  assert.ok(validate(t, c).ok, messages(validate(t, c)));
});

test("merge fills new fields from defaults and drops unknown ones", () => {
  const t = { a: "x", list: [{ b: "y", c: "z" }], n: 1 };
  const merged = merge(t, { a: "edited", list: [{ b: "kept" }], extra: "gone", n: "wrong type" });
  assert.deepEqual(merged, { a: "edited", list: [{ b: "kept", c: "z" }], n: 1 });
  assert.deepEqual(merge(t, null), t);
});

test("permission table: each role gets exactly its level", () => {
  assert.ok(can("editor", "page.edit"));
  assert.ok(!can("editor", "page.publish"));
  assert.ok(!can("editor", "page.seo"));
  assert.ok(can("content_admin", "page.publish"));
  assert.ok(!can("content_admin", "global.edit"));
  assert.ok(!can("content_admin", "users.manage"));
  assert.ok(can("super_admin", "users.manage"));
  assert.ok(!can(null, "page.view"));
  assert.ok(!can("admin", "page.view")); // an unknown role grants nothing
  assert.throws(() => can("super_admin", "page.typo"));
});

test("slugify: titles become safe addresses", () => {
  const rule = /^[a-z0-9]+(-[a-z0-9]+)*$/; // the same rule the database enforces (003_blog.sql)
  assert.equal(slugify("How to Bowl Faster!"), "how-to-bowl-faster");
  assert.equal(slugify("  Pace & Performance -- 2026  "), "pace-performance-2026");
  assert.equal(slugify("Café élite"), "cafe-elite");
  assert.equal(slugify("तेज़ गेंदबाज़ी"), "post"); // nothing usable left
  const long = slugify("word ".repeat(40));
  assert.ok(long.length <= 80 && !long.endsWith("-"));
  for (const s of ["How to Bowl Faster!", "Café élite", "तेज़", "word ".repeat(40), "---"]) assert.match(slugify(s), rule);
});

test("blog permissions: editors write, content admins publish and manage categories", () => {
  assert.ok(can("editor", "post.edit"));
  assert.ok(!can("editor", "post.publish"));
  assert.ok(!can("editor", "category.manage"));
  assert.ok(can("content_admin", "post.publish"));
  assert.ok(can("content_admin", "category.manage"));
  assert.ok(can("super_admin", "post.publish"));
});

test("upload type is decided by file bytes, not by name", () => {
  const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
  const jpg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const webp = new TextEncoder().encode("RIFF\0\0\0\0WEBPVP8 ");
  const avif = new TextEncoder().encode("\0\0\0\x1cftypavif");
  const svg = new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
  assert.equal(sniffImage(png).mime, "image/png");
  assert.equal(sniffImage(jpg).mime, "image/jpeg");
  assert.equal(sniffImage(webp).mime, "image/webp");
  assert.equal(sniffImage(avif).mime, "image/avif");
  assert.equal(sniffImage(svg), null);
});

test("SEO: sharing fields fall back to the page title and description", () => {
  const plain = seo("/events/", "Events", "Upcoming events");
  assert.equal(plain.openGraph.title, "Events");
  assert.equal(plain.alternates.canonical, "/events/");
  const custom = seo("/events/", "Events", "Upcoming events", {
    ogTitle: "Speed Contest",
    ogImage: { src: "/assets/ground.webp", alt: "Ground", width: 1512, height: 2016 },
  });
  assert.equal(custom.openGraph.title, "Speed Contest");
  assert.equal(custom.openGraph.description, "Upcoming events");
  assert.equal(custom.openGraph.images[0].url, "/assets/ground.webp");
  assert.equal(custom.twitter.images[0], "/assets/ground.webp");
});

test("article cleaner keeps normal writing and removes anything unsafe", () => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://abc.supabase.co";
  const p = (...content) => ({ type: "paragraph", content });
  const t = (text, marks) => (marks ? { type: "text", text, marks } : { type: "text", text });
  const ours = "https://abc.supabase.co/storage/v1/object/public/media/uploads/2026/a.webp";
  const body = {
    type: "doc",
    content: [
      { type: "heading", attrs: { level: 2, textAlign: "center" }, content: [t("Arm speed")] },
      p(t("It comes from the "), t("whole body", [{ type: "bold" }]), t(".")),
      p(t("evil", [{ type: "link", attrs: { href: "javascript:alert(1)" } }]), t("good", [{ type: "link", attrs: { href: "/admission/" } }])),
      p(t("red", [{ type: "textStyle", attrs: { color: "#D92D20" } }]), t("css", [{ type: "textStyle", attrs: { color: "red; background:url(x)" } }])),
      { type: "script", content: [t("alert(1)")] },
      { type: "paragraph", attrs: { onclick: "alert(1)", textAlign: "middle" }, content: [t("x")] },
      { type: "image", attrs: { src: ours, alt: "Run-up", width: 800, height: 600, onerror: "alert(1)" } },
      { type: "image", attrs: { src: "https://evil.example/track.png" } },
      { type: "youtube", attrs: { src: "https://youtu.be/-iHp0AR06XE?t=5", start: 5 } },
      { type: "youtube", attrs: { src: "https://evil.example/embed/-iHp0AR06XE" } },
      { type: "ctaButton", attrs: { label: "Book now", href: "/assessment-booking/" } },
      { type: "ctaButton", attrs: { label: "Click", href: "data:text/html,hi" } },
      { type: "bulletList", content: [{ type: "listItem", content: [{ type: "script" }] }] },
    ],
  };
  const { doc, removed } = cleanArticle(body);
  assert.deepEqual(doc.content[0], { type: "heading", attrs: { level: 2, textAlign: "center" }, content: [t("Arm speed")] });
  assert.deepEqual(doc.content[1], body.content[1]); // normal paragraph unchanged
  assert.deepEqual(doc.content[2], p(t("evil"), t("good", [{ type: "link", attrs: { href: "/admission/" } }])));
  assert.deepEqual(doc.content[3], p(t("red", [{ type: "textStyle", attrs: { color: "#d92d20" } }]), t("css")));
  assert.deepEqual(doc.content[4], p(t("x"))); // script gone, unknown attributes gone
  assert.deepEqual(doc.content[5], { type: "image", attrs: { src: ours, alt: "Run-up", width: 800, height: 600 } });
  assert.deepEqual(doc.content[6], { type: "youtube", attrs: { src: "https://www.youtube.com/watch?v=-iHp0AR06XE", start: 5 } });
  assert.deepEqual(doc.content[7], { type: "ctaButton", attrs: { label: "Book now", href: "/assessment-booking/" } });
  assert.equal(doc.content.length, 8); // foreign image, fake video, unsafe button and emptied list removed
  assert.ok(removed >= 8);
  assert.equal(cleanArticle(doc).removed, 0); // cleaning twice changes nothing
  getSchema(articleExtensions).nodeFromJSON(doc).check(); // what the cleaner keeps, the editor can open

  assert.ok(cleanArticle({ type: "doc", content: [p(t("x".repeat(600_000)))] }).error);
  assert.ok(cleanArticle("<script>").error);
  assert.deepEqual(cleanArticle(null).doc, { type: "doc", content: [] });
  assert.equal(youtubeId("https://www.youtube.com/watch?v=-iHp0AR06XE&list=x"), "-iHp0AR06XE");
  assert.equal(youtubeId("https://www.youtube.com.evil.example/watch?v=-iHp0AR06XE"), null);
});

test("the editor's blocks and styles are exactly the ones the cleaner allows", () => {
  const schema = getSchema(articleExtensions);
  const t = { type: "text", text: "x" };
  const cell = (type) => ({ type, content: [{ type: "paragraph", content: [t] }] });
  const sample = {
    type: "doc",
    content: [
      { type: "paragraph", content: [t, { type: "hardBreak" }, { type: "text", text: "y", marks: ["bold", "italic", "underline", "strike"].map((type) => ({ type })) }] },
      { type: "blockquote", content: [{ type: "paragraph", content: [t] }] },
      { type: "orderedList", attrs: { start: 3 }, content: [{ type: "listItem", content: [{ type: "paragraph", content: [t] }] }] },
      { type: "bulletList", content: [{ type: "listItem", content: [{ type: "paragraph", content: [t] }] }] },
      { type: "horizontalRule" },
      { type: "table", content: [{ type: "tableRow", content: [cell("tableHeader")] }, { type: "tableRow", content: [cell("tableCell")] }] },
      { type: "image", attrs: { src: "/assets/ground.webp", alt: "Ground", width: 10, height: 10 } },
      { type: "youtube", attrs: { src: "https://www.youtube.com/watch?v=-iHp0AR06XE" } },
      { type: "ctaButton", attrs: { label: "Go", href: "/" } },
    ],
  };
  const { doc, removed } = cleanArticle(sample);
  assert.equal(removed, 0);
  schema.nodeFromJSON(doc).check();
  // Code blocks are switched off in the editor, so the cleaner must not know them either.
  assert.equal(schema.nodes.codeBlock, undefined);
  assert.equal(cleanArticle({ type: "doc", content: [{ type: "codeBlock", content: [t] }] }).removed, 1);
});

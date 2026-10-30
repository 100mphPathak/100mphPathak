// Run: npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { PAGES } from "../app/content/defaults/index.js";
import { merge, validate } from "../app/content/shape.js";
import { can } from "../app/lib/permissions.js";
import { sniffImage } from "../app/lib/storage.js";
import { seo } from "../app/seo.js";

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

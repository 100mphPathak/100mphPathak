// The rulebook for blog articles. The editor (Tiptap) saves a tree of JSON nodes; before it is
// stored, cleanArticle() rebuilds that tree keeping ONLY the node types, styles and attributes
// listed here. Anything else — pasted scripts, unknown blocks, unsafe links — is dropped.
// No Tiptap import here, so the server can run it without loading the editor.

import { mediaPrefix, SAFE_HREF } from "./shape.js";

const MAX_SIZE = 500_000; // characters of JSON (~a very long article)
const MAX_DEPTH = 20;

// Text colours editors may use. Anything else is removed.
export const PALETTE = [
  { name: "Blue", value: "#2458ee" },
  { name: "Slate", value: "#526783" },
  { name: "Grey", value: "#70757e" },
  { name: "Red", value: "#d92d20" },
  { name: "Green", value: "#079455" },
];

export const EMPTY_ARTICLE = { type: "doc", content: [] };

// youtube.com/watch?v=ID, youtu.be/ID, /embed/ID, /shorts/ID → ID (11 characters)
const YOUTUBE = /^https?:\/\/(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})(?:[?&#]|$)/;
export const youtubeId = (url) => YOUTUBE.exec(String(url ?? ""))?.[1] ?? null;

export const ownImage = (src) => {
  const prefix = mediaPrefix();
  return typeof src === "string" && !src.includes("..") && (src.startsWith("/assets/") || Boolean(prefix && src.startsWith(prefix)));
};

const int = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : undefined);
const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const align = (v) => (["left", "center", "right"].includes(v) ? v : undefined);

// Allowed nodes → how to clean their attributes. Returning null from attrs drops the whole node.
const NODES = {
  doc: {},
  paragraph: { attrs: (a) => ({ textAlign: align(a.textAlign) }) },
  heading: { attrs: (a) => ({ level: a.level === 3 ? 3 : 2, textAlign: align(a.textAlign) }) },
  text: {},
  hardBreak: {},
  horizontalRule: {},
  blockquote: { needsContent: true },
  bulletList: { needsContent: true },
  orderedList: { needsContent: true, attrs: (a) => ({ start: int(a.start, 1, 10000) }) },
  listItem: { needsContent: true },
  table: { needsContent: true },
  tableRow: { needsContent: true },
  tableHeader: { needsContent: true, attrs: cellAttrs },
  tableCell: { needsContent: true, attrs: cellAttrs },
  image: {
    attrs: (a) =>
      ownImage(a.src) ? { src: a.src, alt: text(a.alt, 200), width: int(a.width, 1, 10000), height: int(a.height, 1, 10000) } : null,
  },
  // Only the video id is trusted; the address is rebuilt so it can only ever point at YouTube.
  youtube: {
    attrs: (a) => {
      const id = youtubeId(a.src);
      return id ? { src: `https://www.youtube.com/watch?v=${id}`, start: int(a.start, 0, 86400) } : null;
    },
  },
  ctaButton: {
    attrs: (a) => {
      const label = text(a.label, 80);
      const href = text(a.href, 500);
      return label && SAFE_HREF.test(href) ? { label, href } : null;
    },
  },
};

function cellAttrs(a) {
  return { colspan: int(a.colspan, 1, 20), rowspan: int(a.rowspan, 1, 50) };
}

// Allowed text styles. Returning null drops the style (the text itself stays).
const MARKS = {
  bold: () => ({}),
  italic: () => ({}),
  underline: () => ({}),
  strike: () => ({}),
  link: (a) => (typeof a.href === "string" && SAFE_HREF.test(a.href) ? { href: a.href } : null),
  textStyle: (a) => {
    const color = PALETTE.find((c) => c.value === String(a.color ?? "").toLowerCase())?.value;
    return color ? { color } : null;
  },
};

// Returns { doc, removed } (the cleaned article and how many blocks/styles were dropped) or { error }.
export function cleanArticle(body) {
  if (body == null) return { doc: EMPTY_ARTICLE, removed: 0 };
  if (body.type !== "doc") return { error: "The article could not be read. Reload and try again." };
  if (JSON.stringify(body).length > MAX_SIZE) return { error: "The article is too long. Split it into two posts." };
  const stats = { removed: 0 };
  return { doc: cleanNode(body, 0, stats) ?? EMPTY_ARTICLE, removed: stats.removed };
}

function cleanNode(node, depth, stats) {
  const rule = node && typeof node === "object" && Object.hasOwn(NODES, node.type) ? NODES[node.type] : null;
  const drop = () => (stats.removed++, null);
  if (!rule || depth > MAX_DEPTH) return drop();

  if (node.type === "text") {
    if (typeof node.text !== "string" || node.text === "") return drop(); // ProseMirror rejects empty text
    const marks = cleanMarks(node.marks, stats);
    return marks.length ? { type: "text", text: node.text, marks } : { type: "text", text: node.text };
  }

  const out = { type: node.type };
  if (rule.attrs) {
    const attrs = rule.attrs(node.attrs && typeof node.attrs === "object" ? node.attrs : {});
    if (attrs === null) return drop();
    const kept = Object.fromEntries(Object.entries(attrs).filter(([, v]) => v !== undefined));
    if (Object.keys(kept).length) out.attrs = kept;
  }
  if (Array.isArray(node.content)) {
    const content = node.content.map((child) => cleanNode(child, depth + 1, stats)).filter(Boolean);
    if (content.length) out.content = content;
  }
  if (rule.needsContent && !out.content) return drop(); // e.g. a list whose items were all removed
  return out;
}

function cleanMarks(marks, stats) {
  if (!Array.isArray(marks)) return [];
  const seen = new Set();
  return marks.flatMap((mark) => {
    const clean = mark && Object.hasOwn(MARKS, mark.type) && !seen.has(mark.type) ? MARKS[mark.type](mark.attrs ?? {}) : null;
    if (!clean) return stats.removed++, [];
    seen.add(mark.type);
    return Object.keys(clean).length ? [{ type: mark.type, attrs: clean }] : [{ type: mark.type }];
  });
}

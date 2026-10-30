// The Tiptap building blocks a blog article may use. The admin editor uses this list now; the public
// article page will render with the same list (Task 7), so both always agree on what exists.
// Keep it in step with NODES/MARKS in article.js, which the server enforces on every save.

import { mergeAttributes, Node } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { SAFE_HREF } from "./shape.js";

// A call-to-action button: { label, href }, drawn with the site's existing .button style.
export const CtaButton = Node.create({
  name: "ctaButton",
  group: "block",
  atom: true, // edited as one piece, not letter by letter
  draggable: true,
  addAttributes() {
    return { label: { default: "Book an assessment" }, href: { default: "/assessment-booking/" } };
  },
  parseHTML() {
    return [
      {
        tag: "a[data-cta]",
        getAttrs: (el) => (SAFE_HREF.test(el.getAttribute("href") ?? "") ? { label: el.textContent, href: el.getAttribute("href") } : false),
      },
    ];
  },
  renderHTML({ node }) {
    return ["p", { class: "article-cta" }, ["a", mergeAttributes({ "data-cta": "", class: "button", href: node.attrs.href }), node.attrs.label]];
  },
});

export const articleExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] }, // the post title is the page's h1
    code: false,
    codeBlock: false,
    link: {
      openOnClick: false,
      defaultProtocol: "https",
      HTMLAttributes: { target: null, rel: "noopener" },
      isAllowedUri: (url) => SAFE_HREF.test(url),
    },
  }),
  TextStyle,
  Color,
  TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right"] }),
  Image,
  Youtube.configure({ nocookie: true, modestBranding: true, width: 640, height: 360 }),
  TableKit.configure({ table: { resizable: false } }),
  CtaButton,
];

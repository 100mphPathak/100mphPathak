"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { useState } from "react";
import { articleExtensions } from "../../../../content/article-extensions";
import { PALETTE, youtubeId } from "../../../../content/article";
import { SAFE_HREF } from "../../../../content/shape";
import { askText, toast } from "../../../feedback";
import MediaPicker from "../../media/picker";

const LINK_RULE = "Use an address starting with https://, /, #, mailto: or tel:";

// The WordPress-style article editor. `content` is the saved JSON; every change is reported to onChange.
export default function ArticleEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: articleExtensions,
    content,
    immediatelyRender: false, // the page is rendered on the server first; the editor starts in the browser
    editorProps: { attributes: { class: "article-body", "aria-label": "Article" } },
    // getJSON() reuses ProseMirror's attribute objects, which have no prototype (e.g. a link's { href }).
    // React sends those to the server as unreadable placeholders, so copy everything into plain data first.
    onUpdate: ({ editor: e }) => onChange(JSON.parse(JSON.stringify(e.getJSON()))),
  });

  // The editor is created after the first render, so it's null for a moment. The toolbar is drawn only
  // once it exists: useEditorState reads its first value immediately and would keep a null forever.
  if (!editor) return <p className="muted small">Loading the editor…</p>;
  return (
    <div className="article-editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

function Toolbar({ editor }) {
  const [picking, setPicking] = useState(false);

  // The toolbar only re-renders when one of these values changes, not on every keystroke.
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      ({
        block: e.isActive("heading", { level: 2 }) ? "h2" : e.isActive("heading", { level: 3 }) ? "h3" : "p",
        bold: e.isActive("bold"),
        italic: e.isActive("italic"),
        underline: e.isActive("underline"),
        strike: e.isActive("strike"),
        color: e.getAttributes("textStyle").color ?? "",
        align: ["center", "right"].find((a) => e.isActive({ textAlign: a })) ?? "left",
        bullet: e.isActive("bulletList"),
        ordered: e.isActive("orderedList"),
        quote: e.isActive("blockquote"),
        link: e.isActive("link"),
        table: e.isActive("table"),
        undo: e.can().undo(),
        redo: e.can().redo(),
      }),
  });

  const run = () => editor.chain().focus();

  const setBlock = (value) => {
    if (value === "p") run().setParagraph().run();
    else run().setHeading({ level: value === "h2" ? 2 : 3 }).run();
  };

  // The editor keeps its selection while the dialog is open; run() puts the cursor back afterwards.
  const editLink = async () => {
    const href = await askText(`Link address (leave empty to remove the link).\n${LINK_RULE}`, editor.getAttributes("link").href ?? "https://");
    if (href === null) return;
    if (!href.trim() || href.trim() === "https://") return run().extendMarkRange("link").unsetLink().run();
    if (!SAFE_HREF.test(href.trim())) return toast.error(LINK_RULE);
    run().extendMarkRange("link").setLink({ href: href.trim() }).run();
  };

  const addVideo = async () => {
    const url = await askText("Paste the YouTube video address (e.g. https://www.youtube.com/watch?v=…)");
    if (!url) return;
    if (!youtubeId(url)) return toast.error("That doesn’t look like a YouTube video address.");
    run().setYoutubeVideo({ src: url }).run();
  };

  const addButton = async () => {
    const label = await askText("Button text", "Book an assessment");
    if (!label?.trim()) return;
    const href = await askText(`Where should the button go?\n${LINK_RULE}`, "/assessment-booking/");
    if (!href || !SAFE_HREF.test(href.trim())) return href && toast.error(LINK_RULE);
    run().insertContent({ type: "ctaButton", attrs: { label: label.trim().slice(0, 80), href: href.trim() } }).run();
  };

  const addImage = async (media) => {
    setPicking(false);
    const alt = await askText("Describe the image for people who can’t see it (alt text)", media.alt ?? "");
    run().setImage({ src: media.url, alt: (alt ?? media.alt ?? "").slice(0, 200), width: media.width, height: media.height }).run();
  };

  return (
    <>
      <div aria-label="Formatting" className="article-toolbar" role="toolbar">
        <select aria-label="Text type" onChange={(e) => setBlock(e.target.value)} value={s.block}>
          <option value="p">Paragraph</option>
          <option value="h2">Heading</option>
          <option value="h3">Subheading</option>
        </select>
        <span className="sep" />
        <Tool label="Bold" on={s.bold} onClick={() => run().toggleBold().run()}><b>B</b></Tool>
        <Tool label="Italic" on={s.italic} onClick={() => run().toggleItalic().run()}><i>I</i></Tool>
        <Tool label="Underline" on={s.underline} onClick={() => run().toggleUnderline().run()}><u>U</u></Tool>
        <Tool label="Strikethrough" on={s.strike} onClick={() => run().toggleStrike().run()}><s>S</s></Tool>
        <select
          aria-label="Text colour"
          onChange={(e) => (e.target.value ? run().setColor(e.target.value).run() : run().unsetColor().run())}
          style={{ color: s.color || undefined }}
          value={PALETTE.some((c) => c.value === s.color) ? s.color : ""}
        >
          <option value="">Colour</option>
          {PALETTE.map((c) => <option key={c.value} style={{ color: c.value }} value={c.value}>{c.name}</option>)}
        </select>
        <span className="sep" />
        {["left", "center", "right"].map((a) => (
          <Tool key={a} label={`Align ${a}`} on={s.align === a} onClick={() => run().setTextAlign(a).run()}>{{ left: "⯇", center: "≡", right: "⯈" }[a]}</Tool>
        ))}
        <span className="sep" />
        <Tool label="Bullet list" on={s.bullet} onClick={() => run().toggleBulletList().run()}>•</Tool>
        <Tool label="Numbered list" on={s.ordered} onClick={() => run().toggleOrderedList().run()}>1.</Tool>
        <Tool label="Quote" on={s.quote} onClick={() => run().toggleBlockquote().run()}>❝</Tool>
        <Tool label="Divider line" onClick={() => run().setHorizontalRule().run()}>―</Tool>
        <span className="sep" />
        <Tool label="Link" on={s.link} onClick={editLink}>🔗</Tool>
        <Tool label="Image" onClick={() => setPicking(true)}>🖼</Tool>
        <Tool label="YouTube video" onClick={addVideo}>▶</Tool>
        <Tool label="Table" onClick={() => run().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>▦</Tool>
        <Tool label="Button" onClick={addButton}>Button</Tool>
        <span className="sep" />
        <Tool disabled={!s.undo} label="Undo" onClick={() => run().undo().run()}>↶</Tool>
        <Tool disabled={!s.redo} label="Redo" onClick={() => run().redo().run()}>↷</Tool>
      </div>

      {s.table && (
        <div aria-label="Table" className="article-toolbar sub" role="toolbar">
          <span className="small muted">Table:</span>
          <Tool label="Add row below" onClick={() => run().addRowAfter().run()}>+ Row</Tool>
          <Tool label="Add column right" onClick={() => run().addColumnAfter().run()}>+ Column</Tool>
          <Tool label="Delete row" onClick={() => run().deleteRow().run()}>− Row</Tool>
          <Tool label="Delete column" onClick={() => run().deleteColumn().run()}>− Column</Tool>
          <Tool label="Delete table" onClick={() => run().deleteTable().run()}>Delete table</Tool>
        </div>
      )}

      {picking && <MediaPicker onClose={() => setPicking(false)} onPick={addImage} />}
    </>
  );
}

function Tool({ label, on, disabled, onClick, children }) {
  return (
    <button aria-label={label} aria-pressed={on} className={on ? "tool on" : "tool"} disabled={disabled} onClick={onClick} title={label} type="button">
      {children}
    </button>
  );
}

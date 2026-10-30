"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { slugify } from "../../../../lib/slug";
import ImageField from "../../image-field";
import ArticleEditor from "./article-editor";
import { deleteDraftPost, savePostDraft } from "../actions";

// The post editor form. Holds every field in state; nothing is stored until "Save draft".
export default function PostEditor({ post, categories }) {
  const [fields, setFields] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author: post.author,
    categoryId: post.category_id,
    coverImage: post.cover_image,
    body: post.body,
  });
  const [revision, setRevision] = useState({ id: post.revision_id, number: post.number });
  const [savedSlug, setSavedSlug] = useState(post.slug);
  const [bodyVersion, setBodyVersion] = useState(0); // bumped to reload the editor with what the server kept
  const [note, setNote] = useState("");
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState(null);
  const [pending, startTransition] = useTransition();

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = (name, value) => {
    setFields((f) => ({ ...f, [name]: value }));
    setDirty(true);
  };

  // ImageField reports changes as (path, value): ["coverImage"] for a new image, ["coverImage", "alt"] for the description.
  const setImage = (path, value) =>
    set("coverImage", path.length === 1 ? (value.src ? value : null) : { ...fields.coverImage, [path[1]]: value });

  const save = () =>
    startTransition(async () => {
      const result = await savePostDraft(post.id, revision.id, fields, note);
      setMessage(result.ok ? { type: "ok", text: result.ok } : { type: "err", text: result.error });
      if (result.ok) {
        // The server removes anything not allowed (e.g. images pasted from other websites); show what was kept.
        if (result.removed) {
          setFields((f) => ({ ...f, body: result.body }));
          setBodyVersion((v) => v + 1);
          setMessage({ type: "ok", text: `${result.ok} Some pasted content (outside images or unsafe links) was removed.` });
        }
        setRevision({ id: result.revisionId, number: result.number });
        setSavedSlug(fields.slug);
        setDirty(false);
        setNote("");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  const remove = () => {
    if (!window.confirm(`Delete “${fields.title}” and all its versions? This can’t be undone.`)) return;
    setDirty(false); // the page is about to go away on purpose
    startTransition(async () => {
      const result = await deleteDraftPost(post.id); // on success the server redirects to the list
      if (result?.error) setMessage({ type: "err", text: result.error });
    });
  };

  const canDelete = !post.was_published;
  const slugChangedAfterPublish = post.was_published && fields.slug !== savedSlug;

  return (
    <>
      <div className="a-top">
        <div>
          <p className="small muted" style={{ margin: 0 }}><Link href="/admin/posts">Blog</Link> / version {revision.number}</p>
          <h1>{fields.title || "Untitled"}</h1>
        </div>
        {canDelete && <button className="btn danger small" disabled={pending} onClick={remove} type="button">Delete draft</button>}
      </div>

      {message && <div className={`notice ${message.type}`} role={message.type === "err" ? "alert" : "status"}>{message.text}</div>}

      <div className="a-card">
        <label className="field">
          <span>Title</span>
          <input maxLength={200} onChange={(e) => set("title", e.target.value)} type="text" value={fields.title} />
        </label>

        <label className="field">
          <span>Address</span>
          <div className="actions-row">
            <span className="small muted">/blogs/</span>
            <input maxLength={80} onChange={(e) => set("slug", e.target.value)} style={{ flex: "1 1 200px" }} type="text" value={fields.slug} />
            <span className="small muted">/</span>
            <button className="btn secondary small" onClick={() => set("slug", slugify(fields.title))} type="button">Make from title</button>
          </div>
          <span className="hint">Lowercase letters, numbers and dashes only.</span>
          {slugChangedAfterPublish && <span className="hint over">This post is published: changing its address breaks links people have already shared.</span>}
        </label>

        <label className="field">
          <span>Excerpt (shown on the blog card)</span>
          <textarea maxLength={300} onChange={(e) => set("excerpt", e.target.value)} rows={3} value={fields.excerpt} />
          <span className={`hint ${fields.excerpt.length > 160 ? "over" : ""}`}>{fields.excerpt.length} characters · aim for 160 or fewer.</span>
        </label>

        <div className="actions-row" style={{ alignItems: "flex-start" }}>
          <label className="field" style={{ flex: "1 1 200px" }}>
            <span>Category</span>
            <select onChange={(e) => set("categoryId", e.target.value)} value={fields.categoryId}>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="field" style={{ flex: "1 1 200px" }}>
            <span>Author</span>
            <input maxLength={100} onChange={(e) => set("author", e.target.value)} type="text" value={fields.author} />
          </label>
        </div>

        <ImageField label="Cover photo" onChange={setImage} path={["coverImage"]} removable value={fields.coverImage} />

        <fieldset className="group">
          <legend>Article</legend>
          <ArticleEditor content={fields.body} key={bodyVersion} onChange={(body) => set("body", body)} />
        </fieldset>
      </div>

      <div className="a-card actions-row">
        <label className="sr-only" htmlFor="note">Note about this change</label>
        <input id="note" maxLength={300} onChange={(e) => setNote(e.target.value)} placeholder="Note about this change (optional)" style={{ flex: "1 1 260px" }} type="text" value={note} />
        <button className="btn" disabled={pending || !dirty} onClick={save} type="button">{pending ? "Saving…" : "Save draft"}</button>
      </div>
    </>
  );
}

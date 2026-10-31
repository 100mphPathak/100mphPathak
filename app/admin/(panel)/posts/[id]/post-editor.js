"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { slugify } from "../../../../lib/slug";
import ImageField from "../../image-field";
import ArticleEditor from "./article-editor";
import SeoPanel from "./seo-panel";
import { askConfirm, showResult, toast } from "../../../feedback";
import { callServer } from "../../call-server";
import { deleteDraftPost, publishPost, savePostDraft, setPostOffline } from "../actions";

// The post editor form. Holds every field in state; nothing is stored until "Save draft".
export default function PostEditor({ post, categories, canPublish }) {
  const [fields, setFields] = useState({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author: post.author,
    categoryId: post.category_id,
    coverImage: post.cover_image,
    body: post.body,
    seo: { title: "", description: "", ogImage: null, ...post.seo }, // old posts have seo = {}
  });
  const [revision, setRevision] = useState({ id: post.revision_id, number: post.number });
  const [savedSlug, setSavedSlug] = useState(post.slug);
  const [status, setStatus] = useState(post.status);
  const [liveRevisionId, setLiveRevisionId] = useState(post.published_revision_id);
  const [bodyVersion, setBodyVersion] = useState(0); // bumped to reload the editor with what the server kept
  const [note, setNote] = useState("");
  const [dirty, setDirty] = useState(false);
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
      const result = await callServer(() => savePostDraft(post.id, revision.id, fields, note));
      if (!result.ok) return void toast.error(result.error);
      if (result.ok) {
        // The server removes anything not allowed (e.g. images pasted from other websites); show what was kept.
        if (result.removed) {
          setFields((f) => ({ ...f, body: result.body }));
          setBodyVersion((v) => v + 1);
          toast.success(`${result.ok} Some pasted content (outside images or unsafe links) was removed.`, { duration: 8000 });
        } else toast.success(result.ok);
        setRevision({ id: result.revisionId, number: result.number });
        setSavedSlug(fields.slug);
        setDirty(false);
        setNote("");
      }
    });

  // Publish / take offline / put back online. All refuse while there are unsaved changes.
  const act = (action, after) =>
    startTransition(async () => {
      const result = await callServer(action);
      showResult(result);
      if (result.ok) after();
    });
  const publish = async () => {
    if (!(await askConfirm(post.was_published || liveRevisionId ? "Publish these changes to the live blog?" : "Publish this post? It will appear on the blog."))) return;
    act(() => publishPost(post.id, revision.id), () => {
      setStatus("published");
      setLiveRevisionId(revision.id);
    });
  };
  const toggleOffline = async () => {
    const offline = status !== "unpublished";
    if (offline && !(await askConfirm("Take this post offline? Visitors will get “page not found” until you put it back.", { danger: true }))) return;
    act(() => setPostOffline(post.id, offline), () => setStatus(offline ? "unpublished" : "published"));
  };

  const remove = async () => {
    if (!(await askConfirm(`Delete “${fields.title}” and all its versions? This can’t be undone.`, { danger: true }))) return;
    setDirty(false); // the page is about to go away on purpose
    startTransition(async () => {
      const result = await callServer(() => deleteDraftPost(post.id)); // on success the server redirects to the list
      if (result?.error) toast.error(result.error);
    });
  };

  const canDelete = !post.was_published && !liveRevisionId;
  const hasUnpublished = revision.id !== liveRevisionId;
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

        <SeoPanel onChange={(key, value) => set("seo", { ...fields.seo, [key]: value })} post={fields} seo={fields.seo} />
      </div>

      <div className="a-card actions-row">
        <label className="sr-only" htmlFor="note">Note about this change</label>
        <input id="note" maxLength={300} onChange={(e) => setNote(e.target.value)} placeholder="Note about this change (optional)" style={{ flex: "1 1 260px" }} type="text" value={note} />
        <button className="btn" disabled={pending || !dirty} onClick={save} type="button">{pending ? "Working…" : "Save draft"}</button>
      </div>

      <div className="a-card actions-row">
        <span className={`badge ${status}`}>{status}</span>
        {liveRevisionId && hasUnpublished && <span className="badge draft">unpublished changes</span>}
        <span style={{ flex: 1 }} />
        <a
          aria-disabled={dirty}
          className="btn secondary"
          href={dirty ? undefined : `/admin/preview/post/${post.id}`}
          rel="noopener"
          target="_blank"
          title={dirty ? "Save your changes first" : "Opens the saved draft in a new tab"}
        >
          Preview ↗
        </a>
        <Link className="btn secondary" href={`/admin/posts/${post.id}/revisions`}>Version history</Link>
        {canPublish ? (
          <>
            {liveRevisionId && (
              <button className="btn danger" disabled={pending || dirty} onClick={toggleOffline} type="button">
                {status === "unpublished" ? "Put back online" : "Take offline"}
              </button>
            )}
            <button className="btn" disabled={pending || dirty || !hasUnpublished} onClick={publish} title={dirty ? "Save your draft first" : undefined} type="button">
              Publish
            </button>
          </>
        ) : (
          <span className="small muted">A content administrator will publish your saved draft.</span>
        )}
      </div>
      {canPublish && dirty && <p className="small muted">Save your draft before publishing.</p>}
    </>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import { bytes, when } from "../format";
import { deleteMedia, listMedia, mediaUsage, updateAlt, uploadMedia } from "./actions";
import { prepareUpload, sendUpload } from "./prepare-upload";

export default function Library({ canDelete }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [pending, startTransition] = useTransition();

  const load = (query = q, p = page) => startTransition(async () => setData(await listMedia({ q: query, page: p })));
  useEffect(() => load("", 1), []); // eslint-disable-line react-hooks/exhaustive-deps

  const act = (fn) =>
    startTransition(async () => {
      const result = await fn();
      setMessage(result.ok ? { type: "ok", text: result.ok } : { type: "err", text: result.error });
      if (result.ok) setData(await listMedia({ q, page }));
    });

  const pages = data ? Math.max(1, Math.ceil(data.total / data.perPage)) : 1;
  return (
    <>
      {message && <p className={`notice ${message.type}`} role={message.type === "err" ? "alert" : "status"}>{message.text}</p>}
      <form
        className="a-card actions-row"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          act(async () => {
            const result = await sendUpload(uploadMedia, await prepareUpload(form));
            if (result.ok) form.reset();
            return result;
          });
        }}
      >
        <label className="small" style={{ flex: "1 1 240px" }}>
          Upload an image (JPEG, PNG, WebP or AVIF; large photos are resized automatically)
          <input accept="image/jpeg,image/png,image/webp,image/avif" name="file" required type="file" />
        </label>
        <input aria-label="Image description" name="alt" placeholder="Describe the image (for screen readers)" style={{ flex: "1 1 240px" }} type="text" />
        <button className="btn" disabled={pending} type="submit">{pending ? "Working…" : "Upload"}</button>
      </form>
      <form
        className="actions-row"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          load(q, 1);
        }}
        role="search"
        style={{ marginBottom: 16 }}
      >
        <input aria-label="Search images" onChange={(e) => setQ(e.target.value)} placeholder="Search by file name or description" style={{ flex: 1 }} type="search" value={q} />
        <button className="btn secondary" type="submit">Search</button>
      </form>

      {!data ? (
        <p className="muted">Loading…</p>
      ) : data.error ? (
        <p className="notice err">{data.error}</p>
      ) : (
        <>
          <h2>Uploaded images ({data.total})</h2>
          <div className="media-grid" style={{ marginBottom: 24 }}>
            {data.items.map((item) => (
              <MediaTile canDelete={canDelete} disabled={pending} item={item} key={item.id} onAct={act} />
            ))}
            {data.items.length === 0 && <p className="muted">No uploads yet.</p>}
          </div>
          {pages > 1 && (
            <p className="actions-row">
              <button className="btn secondary small" disabled={page <= 1} onClick={() => { setPage(page - 1); load(q, page - 1); }} type="button">Previous</button>
              <span className="small">Page {page} of {pages}</span>
              <button className="btn secondary small" disabled={page >= pages} onClick={() => { setPage(page + 1); load(q, page + 1); }} type="button">Next</button>
            </p>
          )}
          <h2>Built into the website</h2>
          <p className="small muted">These images ship with the site. They can be chosen on any page but not changed or deleted here.</p>
          <div className="media-grid">
            {data.builtIn.map((item) => (
              <div className="media-tile" key={item.id}>
                <img alt={item.alt} loading="lazy" src={item.url} />
                <strong>{item.filename}</strong>
                <span className="muted">{item.width}×{item.height}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function MediaTile({ item, canDelete, disabled, onAct }) {
  const [alt, setAlt] = useState(item.alt);
  const [used, setUsed] = useState(null);
  return (
    <div className="media-tile">
      <a href={item.url} rel="noopener" target="_blank"><img alt={item.alt} loading="lazy" src={item.url} /></a>
      <strong style={{ wordBreak: "break-all" }}>{item.filename}</strong>
      <span className="muted">{item.width}×{item.height} · {bytes(item.size)} · {item.mime.replace("image/", "")}</span>
      <span className="muted">{when(item.created_at)}</span>
      <label className="small">
        Description
        <input onChange={(e) => setAlt(e.target.value)} type="text" value={alt} />
      </label>
      <div className="actions-row">
        <button className="btn secondary small" disabled={disabled || alt === item.alt} onClick={() => onAct(() => updateAlt(item.id, alt))} type="button">Save</button>
        <button className="btn secondary small" onClick={async () => setUsed(await mediaUsage(item.id))} type="button">Where used?</button>
        {canDelete && (
          <button
            className="btn danger small"
            disabled={disabled}
            onClick={() => window.confirm(`Delete ${item.filename}? This can’t be undone.`) && onAct(() => deleteMedia(item.id))}
            type="button"
          >
            Delete
          </button>
        )}
      </div>
      {used && <span className="small">{used.pages?.length ? `Used on: ${used.pages.map((p) => p.title).join(", ")}` : "Not used on any page."}</span>}
      <span className="small muted">Note: changing the description here doesn’t change text already placed on pages.</span>
    </div>
  );
}

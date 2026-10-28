"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { listMedia, uploadMedia } from "./actions";

// Modal to choose an image (uploaded or built-in) or upload a new one.
export default function MediaPicker({ onPick, onClose }) {
  const dialog = useRef(null);
  const [q, setQ] = useState("");
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [pending, startTransition] = useTransition();

  const load = (query = q) => startTransition(async () => setData(await listMedia({ q: query })));

  useEffect(() => {
    dialog.current?.showModal();
    load("");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const upload = (form) =>
    startTransition(async () => {
      const result = await uploadMedia(new FormData(form));
      if (result.error) return setMessage({ type: "err", text: result.error });
      onPick(result.item);
    });

  const items = data ? [...data.items, ...data.builtIn] : [];
  return (
    <dialog aria-labelledby="picker-title" className="a-dialog" onClose={onClose} ref={dialog}>
      <div className="a-top">
        <h2 id="picker-title">Choose an image</h2>
        <button className="btn secondary small" onClick={() => dialog.current.close()} type="button">Close</button>
      </div>
      <form
        className="a-card actions-row"
        onSubmit={(e) => {
          e.preventDefault();
          upload(e.currentTarget);
        }}
      >
        <label className="small" style={{ flex: "1 1 220px" }}>
          Upload a new image (JPEG, PNG, WebP or AVIF, up to 4 MB)
          <input accept="image/jpeg,image/png,image/webp,image/avif" name="file" required type="file" />
        </label>
        <input aria-label="Image description" name="alt" placeholder="Describe the image" style={{ flex: "1 1 200px" }} type="text" />
        <button className="btn" disabled={pending} type="submit">Upload and use</button>
      </form>
      {message && <p className={`notice ${message.type}`} role="alert">{message.text}</p>}
      <form
        className="actions-row"
        onSubmit={(e) => {
          e.preventDefault();
          load();
        }}
        role="search"
        style={{ marginBottom: 14 }}
      >
        <input aria-label="Search images" onChange={(e) => setQ(e.target.value)} placeholder="Search by file name or description" style={{ flex: 1 }} type="search" value={q} />
        <button className="btn secondary" type="submit">Search</button>
      </form>
      {!data ? (
        <p className="muted">Loading…</p>
      ) : data.error ? (
        <p className="notice err">{data.error}</p>
      ) : (
        <div className="media-grid">
          {items.map((item) => (
            <div className="media-tile" key={item.id}>
              <button className="pick" onClick={() => onPick(item)} type="button">
                <img alt={item.alt} loading="lazy" src={item.url} />
                <span>{item.filename}</span>
              </button>
              <span className="muted">{item.width}×{item.height}{item.builtIn && " · built-in"}</span>
            </div>
          ))}
          {items.length === 0 && <p className="muted">No images found.</p>}
        </div>
      )}
    </dialog>
  );
}

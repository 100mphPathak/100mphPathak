"use client";

import { useState } from "react";
import MediaPicker from "./media/picker";

// Image chooser with preview and alt text, used by the page editor and the post editor.
// value: { src, alt, width, height } or null. removable: show a "Remove" button (for optional images).
export default function ImageField({ label, value, path, onChange, removable = false }) {
  const [picking, setPicking] = useState(false);
  const image = value ?? {}; // a new post has no cover image yet
  return (
    <fieldset className="group">
      <legend>{label}</legend>
      <div className="image-field">
        {image.src ? <img alt="" src={image.src} /> : <div className="muted small">No image</div>}
        <div className="image-meta">
          <p className="small muted" style={{ wordBreak: "break-all" }}>{image.src || "—"} {image.src && `(${image.width}×${image.height})`}</p>
          <div className="actions-row" style={{ marginBottom: 10 }}>
            <button className="btn secondary small" onClick={() => setPicking(true)} type="button">Choose image</button>
            {image.src && removable && (
              <button className="btn secondary small" onClick={() => onChange(path, { ...image, src: "", alt: "" })} type="button">Remove</button>
            )}
          </div>
          <label className="field">
            <span>Image description (alt text)</span>
            <input onChange={(e) => onChange([...path, "alt"], e.target.value)} type="text" value={image.alt ?? ""} />
          </label>
        </div>
      </div>
      {picking && (
        <MediaPicker
          onClose={() => setPicking(false)}
          onPick={(media) => {
            onChange(path, { src: media.url, alt: image.alt || media.alt, width: media.width, height: media.height });
            setPicking(false);
          }}
        />
      )}
    </fieldset>
  );
}
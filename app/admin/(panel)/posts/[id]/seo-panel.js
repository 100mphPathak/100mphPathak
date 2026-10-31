"use client";

import ImageField from "../../image-field";

// Search (Google) and sharing (WhatsApp, Facebook) settings for one post.
// Empty fields fall back to the post's own title, excerpt and cover photo.
// seo: { title, description, ogImage }. onChange(key, value). post: the post's other fields, for the fallbacks.
export default function SeoPanel({ seo, onChange, post }) {
  const title = seo.title || post.title;
  const description = seo.description || post.excerpt;

  // ImageField reports (["ogImage"], image) for a new image and (["ogImage", "alt"], text) for its description.
  const setImage = (path, value) =>
    onChange("ogImage", path.length === 1 ? (value.src ? value : null) : { ...seo.ogImage, alt: value });

  return (
    <fieldset className="group">
      <legend>Search &amp; sharing</legend>

      <p className="small muted">How this post looks in Google:</p>
      <div className="google-preview" aria-label="Google preview">
        <span className="g-url">pathak100mph.com › blogs › {post.slug}</span>
        <span className="g-title">{cut(title, 60)}</span>
        <span className="g-text">{cut(description, 160) || "Google will pick some text from the article."}</span>
      </div>

      <label className="field">
        <span>Search title</span>
        <input maxLength={200} onChange={(e) => onChange("title", e.target.value)} placeholder={post.title} type="text" value={seo.title} />
        <Counter limit={60} value={title} />
      </label>

      <label className="field">
        <span>Search description</span>
        <textarea maxLength={400} onChange={(e) => onChange("description", e.target.value)} placeholder={post.excerpt || "A one- or two-sentence summary of the post"} rows={3} value={seo.description} />
        <Counter limit={160} value={description} />
      </label>

      <ImageField label="Sharing image (leave empty to use the cover photo)" onChange={setImage} path={["ogImage"]} removable value={seo.ogImage} />
    </fieldset>
  );
}

// Google cuts long titles and descriptions with "…"; the preview does the same.
function cut(text, limit) {
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}

function Counter({ value, limit }) {
  return (
    <span className={`hint ${value.length > limit ? "over" : ""}`}>
      {value.length} characters · aim for {limit} or fewer so Google doesn’t cut it off.
    </span>
  );
}

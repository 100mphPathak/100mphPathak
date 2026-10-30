"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState, useTransition } from "react";
import ImageField from "../../image-field";
import { publish, saveDraft, setUnpublished } from "./actions";

const SECTION_LABELS = {
  seo: "Default SEO and sharing",
  announcement: "Announcement bar (top of every page)",
  header: "Header and main menu",
  mobileMenu: "Mobile menu",
  callbackForm: "“Request a call back” form",
  whatsappButton: "Floating WhatsApp button",
  callbackPrompt: "Call-back reminder pop-up",
  footer: "Footer",
  playerResults: "Player results",
  partners: "Partners",
  hero: "Top of page",
  closing: "Closing section (bottom of page)",
  faq: "Questions and answers",
  steps: "Steps",
  bookingDialog: "Booking pop-up",
};

const LABELS = {
  eyebrow: "Small label above the heading",
  heading: "Heading",
  headingAccent: "Heading — second line (lighter colour)",
  text: "Text",
  button: "Button",
  href: "Link address",
  label: "Link text",
  videoId: "YouTube video id",
  videoTitle: "Video title (read by screen readers)",
  reelId: "Instagram reel id",
  alt: "Image description (alt text)",
  linkDescription: "Link description (read by screen readers)",
  wideLogo: "Wide logo",
  highlighted: "Highlight this plan",
  show: "Show this card",
  color: "Card colour",
  art: "Card artwork text",
  hint: "Small note beside the heading",
  note: "Small print",
};

const humanize = (key) => {
  const words = String(key).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
};
const labelFor = (key) => LABELS[key] ?? humanize(key);
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isImage = (v) => isObject(v) && "src" in v && "alt" in v;
const isLink = (v) => isObject(v) && Object.keys(v).length === 2 && "label" in v && "href" in v;
const setIn = (obj, [key, ...rest], value) => {
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[key] = rest.length ? setIn(obj[key], rest, value) : value;
  return copy;
};
const pathName = (path) => path.map((p, i) => (typeof p === "number" ? `[${p}]` : i ? `.${p}` : p)).join("");

const Ctx = createContext({ errors: {}, colors: [] });

export default function Editor(props) {
  const { slug, title, route, template, permissions, colors } = props;
  const [content, setContent] = useState(props.content);
  const [seo, setSeo] = useState(props.seo);
  const [revision, setRevision] = useState(props.revision);
  const [hasUnpublished, setHasUnpublished] = useState(props.hasUnpublished);
  const [status, setStatus] = useState(props.status);
  const [dirty, setDirty] = useState(false);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(null);
  const [tab, setTab] = useState("content");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const editContent = (path, value) => { setContent((c) => setIn(c, path, value)); setDirty(true); };
  const editSeo = (path, value) => { setSeo((s) => setIn(s, path, value)); setDirty(true); };

  const run = (fn, after) =>
    startTransition(async () => {
      const result = await fn();
      setMessage(result.ok ? { type: "ok", text: result.ok } : { type: "err", text: result.error, errors: result.errors });
      if (result.ok) after?.(result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  const save = () =>
    run(() => saveDraft(slug, revision.id, content, seo ?? {}, note), (r) => {
      setRevision({ id: r.revisionId, number: r.number });
      setHasUnpublished(true);
      setDirty(false);
      setNote("");
    });

  const doPublish = () => {
    if (!window.confirm(`Publish version ${revision.number} of “${title}” to the live website?`)) return;
    run(() => publish(slug, revision.id), () => { setHasUnpublished(false); setStatus("published"); });
  };

  const toggleOnline = () => {
    const goingOffline = status !== "unpublished";
    if (goingOffline && !window.confirm(`Take “${title}” offline? Visitors will see “page not found” until you put it back.`)) return;
    run(() => setUnpublished(slug, goingOffline), () => setStatus(goingOffline ? "unpublished" : "published"));
  };

  const errors = Object.fromEntries((message?.errors ?? []).map((e) => [e.path, e.message]));

  return (
    <Ctx.Provider value={{ errors, colors }}>
      <div className="a-top">
        <div>
          <p className="small muted" style={{ margin: 0 }}><Link href="/admin/pages">Pages</Link> /</p>
          <h1>{title}</h1>
        </div>
        {route && <a className="btn secondary" href={route} rel="noopener" target="_blank">View live page ↗</a>}
      </div>

      {message && (
        <div className={`notice ${message.type}`} role={message.type === "err" ? "alert" : "status"}>
          {message.text}
          {message.errors?.length > 0 && (
            <ul>{message.errors.map((e) => <li key={e.path}><strong>{e.path}</strong> {e.message}</li>)}</ul>
          )}
        </div>
      )}

      <div className="editor">
        <div>
          {seo && (
            <div className="tabs" role="tablist">
              <button aria-selected={tab === "content"} onClick={() => setTab("content")} role="tab" type="button">Content</button>
              <button aria-selected={tab === "seo"} onClick={() => setTab("seo")} role="tab" type="button">SEO &amp; sharing</button>
            </div>
          )}
          {tab === "content" ? (
            Object.keys(template).map((key, i) => (
              <details className="section" key={key} open={i === 0}>
                <summary>{SECTION_LABELS[key] ?? humanize(key)}</summary>
                <div className="section-body">
                  <Field bare name={key} onChange={editContent} path={[key]} template={template[key]} value={content[key]} />
                </div>
              </details>
            ))
          ) : (
            <SeoForm onChange={editSeo} permissions={permissions} slug={slug} value={seo} />
          )}
        </div>

        <aside className="editor-side a-card">
          <p><span className={`badge ${status}`}>{status}</span>{hasUnpublished && <> <span className="badge draft">unpublished changes</span></>}</p>
          <p className="small muted">Editing version {revision.number}{dirty && " · unsaved changes"}</p>
          <label className="field">
            <span>Note for this version (optional)</span>
            <input maxLength={300} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Updated prices" type="text" value={note} />
          </label>
          <div className="actions-row" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <button className="btn" disabled={pending || !dirty} onClick={save} type="button">{pending ? "Working…" : "Save draft"}</button>
            {route ? (
              <a
                aria-disabled={dirty}
                className="btn secondary"
                href={dirty ? undefined : `/admin/preview/${slug}`}
                rel="noopener"
                target="_blank"
                title={dirty ? "Save your changes first" : "Opens the draft in a new tab"}
              >
                Preview draft ↗
              </a>
            ) : (
              <a className="btn secondary" href={dirty ? undefined : "/admin/preview/global"} rel="noopener" target="_blank">Preview on home page ↗</a>
            )}
            {permissions.publish && (
              <button className="btn" disabled={pending || dirty || !hasUnpublished} onClick={doPublish} type="button">Publish</button>
            )}
            {permissions.unpublish && (
              <button className="btn danger" disabled={pending || dirty} onClick={toggleOnline} type="button">
                {status === "unpublished" ? "Put page back online" : "Take page offline"}
              </button>
            )}
            <Link className="btn secondary" href={`/admin/pages/${slug}/revisions`}>Version history</Link>
          </div>
          {!permissions.publish && <p className="small muted" style={{ marginTop: 12 }}>A content administrator will publish your saved draft.</p>}
          {dirty && <p className="small muted" style={{ marginTop: 12 }}>Save your draft before previewing or publishing.</p>}
        </aside>
      </div>
    </Ctx.Provider>
  );
}

function Field({ name, template, value, path, onChange, bare = false }) {
  const { errors, colors } = useContext(Ctx);
  const error = errors[pathName(path)];
  const label = labelFor(name);

  if (Array.isArray(template)) return <ListField label={label} onChange={onChange} path={path} template={template} value={value} />;
  if (isImage(template)) return <ImageField label={label} onChange={onChange} path={path} removable={path.at(-1) === "ogImage"} value={value} />;
  if (isLink(template)) {
    return (
      <fieldset className="group">
        <legend>{label}</legend>
        <Field name="label" onChange={onChange} path={[...path, "label"]} template={template.label} value={value.label} />
        <Field name="href" onChange={onChange} path={[...path, "href"]} template={template.href} value={value.href} />
      </fieldset>
    );
  }
  if (isObject(template)) {
    const fields = Object.keys(template).map((key) => (
      <Field key={key} name={key} onChange={onChange} path={[...path, key]} template={template[key]} value={value[key]} />
    ));
    return bare ? fields : (
      <fieldset className="group">
        <legend>{label}</legend>
        {fields}
      </fieldset>
    );
  }
  if (typeof template === "boolean") {
    return (
      <label className="checkbox">
        <input checked={value} onChange={(e) => onChange(path, e.target.checked)} type="checkbox" /> {label}
      </label>
    );
  }
  if (name === "color" || name === "platform") {
    const options = name === "color" ? colors : ["youtube", "instagram"];
    return (
      <label className="field">
        <span>{label}</span>
        <select onChange={(e) => onChange(path, e.target.value)} value={value}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {error && <span className="hint over">{error}</span>}
      </label>
    );
  }
  const multiline = template.length > 70 || template.includes("\n") || ["text", "answer", "address", "art"].includes(name);
  return (
    <label className="field">
      <span>{label}</span>
      {multiline ? (
        <textarea aria-invalid={Boolean(error)} onChange={(e) => onChange(path, e.target.value)} rows={Math.min(8, Math.max(2, Math.ceil(value.length / 80) + value.split("\n").length - 1))} value={value} />
      ) : (
        <input aria-invalid={Boolean(error)} onChange={(e) => onChange(path, e.target.value)} type="text" value={value} />
      )}
      {error ? (
        <span className="hint over">{error}</span>
      ) : (
        multiline && <span className="hint">Press Enter for a new line. Write [link text](/page/) to add a link.</span>
      )}
    </label>
  );
}

function ListField({ label, template, value, path, onChange }) {
  const item = template[0];
  const update = (next) => onChange(path, next);
  const move = (i, by) => {
    const next = [...value];
    [next[i], next[i + by]] = [next[i + by], next[i]];
    update(next);
  };
  const summary = (v) => (typeof v === "string" ? v : v?.heading ?? v?.title ?? v?.question ?? v?.name ?? v?.label ?? v?.alt ?? "");
  return (
    <fieldset className="group">
      <legend>{label}</legend>
      {value.map((entry, i) => (
        <div className="list-item" key={i}>
          <div className="list-item-head">
            <span>{i + 1}. {String(summary(entry)).slice(0, 60)}</span>
            <span className="actions-row">
              <button aria-label={`Move item ${i + 1} up`} className="btn secondary small" disabled={i === 0} onClick={() => move(i, -1)} type="button">↑</button>
              <button aria-label={`Move item ${i + 1} down`} className="btn secondary small" disabled={i === value.length - 1} onClick={() => move(i, 1)} type="button">↓</button>
              <button
                aria-label={`Remove item ${i + 1}`}
                className="btn danger small"
                onClick={() => window.confirm("Remove this item?") && update(value.filter((_, j) => j !== i))}
                type="button"
              >
                Remove
              </button>
            </span>
          </div>
          <Field bare name={typeof item === "string" ? "text" : "item"} onChange={onChange} path={[...path, i]} template={item} value={entry} />
        </div>
      ))}
      <button className="btn secondary small" onClick={() => update([...value, structuredClone(item)])} style={{ marginBottom: 12 }} type="button">+ Add item</button>
    </fieldset>
  );
}



function Counter({ value, limit }) {
  return <span className={`hint ${value.length > limit ? "over" : ""}`}>{value.length} characters · aim for {limit} or fewer so search results don’t cut it off.</span>;
}

function SeoForm({ value, onChange, permissions, slug }) {
  const disabled = !permissions.seo;
  const text = (key, label, limit, extra) => (
    <label className="field">
      <span>{label}</span>
      {limit > 80 ? (
        <textarea disabled={disabled} onChange={(e) => onChange([key], e.target.value)} rows={3} value={value[key]} />
      ) : (
        <input disabled={disabled} onChange={(e) => onChange([key], e.target.value)} type="text" value={value[key]} />
      )}
      {limit ? <Counter limit={limit} value={value[key]} /> : extra}
    </label>
  );
  return (
    <div className="a-card">
      {disabled && <p className="notice warn">Only content administrators can change SEO settings.</p>}
      {text("title", "Page title (shown in Google and the browser tab)", 60)}
      {text("description", "Meta description (the snippet under the title in Google)", 160)}
      {text("canonical", "Canonical address (leave empty to use this page’s own address)", 0, <span className="hint">Only set this if another page should rank instead, e.g. /blogs/</span>)}
      <label className="checkbox">
        <input checked={value.noindex} disabled={disabled || !permissions.robots} onChange={(e) => onChange(["noindex"], e.target.checked)} type="checkbox" />
        Hide this page from search engines (noindex)
      </label>
      {value.noindex && <p className="notice warn">This page will disappear from Google. {slug === "home" && "This is your home page — are you sure?"}</p>}
      <h3>Social sharing (WhatsApp, Facebook, LinkedIn)</h3>
      <p className="small muted">Leave empty to reuse the page title and description.</p>
      {text("ogTitle", "Sharing title", 60)}
      {text("ogDescription", "Sharing description", 160)}
      {!disabled && <ImageField label="Sharing image (1200×630 works best)" onChange={onChange} path={["ogImage"]} removable value={value.ogImage} />}
    </div>
  );
}

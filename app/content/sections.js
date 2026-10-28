import { T } from "./text";

// FAQ block used on most pages: { eyebrow, heading, items: [{ question, answer }] }.
export function Faq({ v }) {
  return (
    <section className="wrap seo-faq">
      <div>
        <p className="eyebrow">{v.eyebrow}</p>
        <h2><T v={v.heading} /></h2>
      </div>
      <div>
        {v.items.map((item, i) => (
          <details key={i}>
            <summary>{item.question}</summary>
            <p><T v={item.answer} brand /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Larger FAQ list with a "+" marker: { eyebrow, heading, text, items: [{ question, answer }] }.
export function FaqList({ v }) {
  return (
    <section className="wrap faq-section">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2><T v={v.heading} /></h2>
        </div>
        <p>{v.text}</p>
      </div>
      <div className="faqs">
        {v.items.map((item, i) => (
          <details className="reveal" key={i}>
            <summary>{item.question}<span>+</span>
            </summary>
            <p><T v={item.answer} brand /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Numbered process steps: { eyebrow, heading, text?, items: [{ title, text }] }.
export function Steps({ v, id }) {
  return (
    <section className="wrap compact-process" id={id}>
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2><T v={v.heading} /></h2>
        </div>
        {"text" in v && <p>{v.text}</p>}
      </div>
      <div className="steps">
        {v.items.map((step, i) => (
          <details key={i}>
            <summary>{step.title}{" +"}</summary>
            <p>{step.text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Payment placeholder dialog opened by [data-book] buttons.
export function BookingDialog({ v }) {
  return (
    <dialog id="booking-dialog" aria-labelledby="booking-title">
      <button aria-label="Close booking" className="modal-close">×</button>
      <span className="eyebrow">{v.eyebrow}</span>
      <h2 id="booking-title">{v.heading}</h2>
      <p>{v.text}</p>
      <p className="form-notice">{v.notice}</p>
      <a className="button" href={v.button.href}>{v.button.label}{" "}<span>↗</span></a>
    </dialog>
  );
}

const ALLOW ="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

// Rail of YouTube Shorts: { eyebrow, heading, hint, shorts: [{ videoId, title }] }.
export function ShortsRail({ v }) {
  return (
    <section className="wrap reel-section">
      <div className="section-head">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2><T v={v.heading} /></h2>
        </div>
        <span className="swipe-hint"><T v={v.hint} brand /></span>
      </div>
      <div aria-label={v.eyebrow} className="reel-rail" tabIndex="0">
        {v.shorts.map((short, i) => (
          <article className="native-reel video-story" key={i}>
            <iframe allow={ALLOW} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={`https://www.youtube-nocookie.com/embed/${short.videoId}?rel=0`} title={short.title}>
            </iframe>
            <a className="video-fallback" href={`https://www.youtube.com/shorts/${short.videoId}`} rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}

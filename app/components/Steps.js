import { Text } from "./Text";

// Numbered process steps as cards: { eyebrow, heading, text?, items: [{ title, text }] }.
// One row of cards; more than three scroll sideways (styles: home.css, .approach-timeline).
export default function Steps({ v, id, highlight }) {
  return (
    <section className="wrap approach-timeline" id={id}>
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2><Text highlight={highlight} v={v.heading} /></h2>
        </div>
        {"text" in v && <p>{v.text}</p>}
      </div>
      <ol className="timeline">
        {v.items.map((step, i) => (
          <li data-step={String(i + 1).padStart(2, "0")} key={i}>
            <span aria-hidden="true" className="timeline-dot">{String(i + 1).padStart(2, "0")}</span>
            {/* Older content titles start with "01 / "; the number is shown separately. */}
            <h3>{String(step.title).replace(/^\d+\s*\/\s*/, "")}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

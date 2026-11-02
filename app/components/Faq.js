import { Text } from "./Text";

// FAQ block used on most pages: { eyebrow, heading, items: [{ question, answer }] }.
export function Faq({ v }) {
  return (
    <section className="wrap seo-faq">
      <div>
        <p className="eyebrow">{v.eyebrow}</p>
        <h2><Text v={v.heading} /></h2>
      </div>
      <div>
        {v.items.map((item, i) => (
          <details key={i}>
            <summary><h3 className="inline-heading">{item.question}</h3></summary>
            <p><Text v={item.answer} brand /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Larger FAQ list with a "+" marker: { eyebrow, heading, text, items: [{ question, answer }] }.
// `highlight`: a phrase in the heading shown in the accent colour (e.g. "Clear answers.").
export function FaqList({ v, highlight }) {
  return (
    <section className="wrap faq-section">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2><Text highlight={highlight} v={v.heading} /></h2>
        </div>
        <p>{v.text}</p>
      </div>
      <div className="faqs">
        {v.items.map((item, i) => (
          <details className="reveal" key={i}>
            <summary><h3 className="inline-heading">{item.question}</h3><span>+</span>
            </summary>
            <p><Text v={item.answer} brand /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

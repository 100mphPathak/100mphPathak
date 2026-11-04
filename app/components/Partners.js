import { getContent } from "../lib/content";
import { Img, Text } from "./Text";

export default async function Partners({ data }) {
  const p = data ?? (await getContent("global")).partners;
  const cards = [
    {
      logo: p.sponsor.logo,
      role: p.sponsor.eyebrow,
      name: p.sponsor.heading,
      text: p.sponsor.text,
      label: p.sponsor.link.label,
      href: p.sponsor.link.href,
      linkDescription: p.sponsor.link.label,
    },
    ...p.cards.map((card) => ({
      logo: card.logo,
      role: card.role,
      name: card.name,
      text: card.text,
      label: [card.codeLabel, card.code].filter(Boolean).join(" "),
      href: card.href,
      linkDescription: card.linkDescription,
    })),
  ];

  return (
    <section className="wrap partners-showcase">
      <div className="ps-head">
        <p className="eyebrow">{p.eyebrow}</p>
        <h2><Text brand v={p.heading} /></h2>
        <p>{p.text}</p>
      </div>
      <div aria-label="Academy partners" className="ps-grid" tabIndex="0">
        {cards.map((card, i) => (
          <article className="ps-card" key={i}>
            <div className="ps-logo">
              <Img loading="lazy" v={card.logo} />
            </div>
            <span className="ps-role"><Text v={card.role} /></span>
            <h3>{card.name}</h3>
            {card.text && <p className="ps-text"><Text brand v={card.text} /></p>}
            <a aria-label={card.linkDescription} className="ps-action" href={card.href} rel="noopener noreferrer" target="_blank">
              <span>{card.label}</span>
              <b aria-hidden="true">
                {/* A drawn arrow: the ↗︎ character shows as a blue emoji square on iPhones */}
                <svg fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </b>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

// Kept so the pages that import it keep working; it is the same section.
export const HomePartners = Partners;

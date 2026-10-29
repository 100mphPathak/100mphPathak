import { Fragment } from "react";
import Link from "next/link";
import { getContent } from "../lib/content";
import { Img, Text } from "./Text";

export default async function Partners({ data, current = false }) {
  const p = data ?? (await getContent("global")).partners;
  return (
    <section className={current ? "wrap partners facilities-partners" : "wrap partners"}>
      <div className="partner-heading">
        <p className="eyebrow">{p.eyebrow}</p>
        <h2>{p.heading}</h2>
        <p>{p.text}</p>
      </div>
      {"\n"}
      <article className="partner-feature">
        <div className="partner-copy">
          <span className="eyebrow">{p.sponsor.eyebrow}</span>
          <h3>{p.sponsor.heading}</h3>
          <p>
            {p.sponsor.text}
          </p>
          <Link
            className="partner-visit"
            href={p.sponsor.link.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {p.sponsor.link.label}{" ↗"}
          </Link>
        </div>
        <div className="partner-logo">
          <Img v={p.sponsor.logo} loading="lazy" />
        </div>
      </article>
      {"\n"}
      <div aria-label="Academy partners" className="partner-grid" tabIndex="0">
        {p.cards.map((card, i) => (
          <PartnerCard card={card} key={i} />
        ))}
        {p.future?.show && <article className="partner-card future-partner">
          <div className="partner-art">
            <span aria-hidden="true">{"＋"}</span>
          </div>
          <span className="partner-role">{p.future.role}</span>
          <h3>{p.future.name}</h3>
          <div className="partner-pending">
            {p.future.text}
          </div>
        </article>}
      </div>
    </section>
  );
}

function PartnerCard({ card }) {
  return (
    <>
      <article className="partner-card">
        <div className="partner-art">
          <Img v={card.logo} className={card.wideLogo ? "apx-logo" : undefined} loading="lazy" />
        </div>
        <span className="partner-role">
          <Text v={card.role} brand />
        </span>
        <h3>{card.name}</h3>
        <Link
          aria-label={card.linkDescription}
          className="partner-code"
          href={card.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="code-label">
            {card.codeLabel}
            <strong>{card.code}</strong>
          </span>
          <b aria-hidden="true">{"↗"}</b>
        </Link>
      </article>
      {"\n"}
    </>
  );
}

// The home page's partners section. The client wants it identical wherever partners appear
// on the coach and admission pages.
export async function HomePartners() {
  const { partners: p } = await getContent("global");
  return (
    <section className="wrap partners">
      <div className="partner-heading">
        <p className="eyebrow">{p.eyebrow}</p>
        <h2><Text v={p.heading} brand /></h2>
        <p>{p.text}</p>
      </div>
      {"\n"}
      <article className="partner-feature">
        <div className="partner-copy">
          <span className="eyebrow">{p.sponsor.eyebrow}</span>
          <h3>{p.sponsor.heading}</h3>
          <p><Text v={p.sponsor.text} brand /></p>
          <a className="partner-visit" href={p.sponsor.link.href} rel="noopener noreferrer" target="_blank"><span>{p.sponsor.link.label}</span><span aria-hidden="true">{" ↗"}</span></a>
        </div>
        <div className="partner-logo">
          <Img v={p.sponsor.logo} loading="lazy" />
        </div>
      </article>
      {"\n"}
      <div aria-label="Academy partners" className="partner-grid" tabIndex="0">
        {p.cards.map((card, i) => (
          <Fragment key={i}>
          <article className="partner-card">
            <div className="partner-art">
              <Img v={card.logo} className={card.wideLogo ? "apx-logo" : undefined} loading="lazy" />
            </div>
            <span className="partner-role">
              <Text v={card.role} brand /></span>
            <h3>{card.name}</h3>
            <a aria-label={card.linkDescription} className="partner-code" href={card.href} rel="noopener noreferrer" target="_blank">
              <span className="code-label">{card.codeLabel}<strong>{card.code}</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </article>
          {"\n"}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

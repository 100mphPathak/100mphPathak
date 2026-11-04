import Link from "next/link";
import { getContent } from "../lib/content";
import { Img } from "./Text";

// Site footer: logo + tagline + Call / WhatsApp buttons, then the page links, then a dark legal bar.
// Desktop shows the links as one grid; phones show "Academy" and "Training" as two columns.
// Content: Admin → Site-wide settings → Footer.
export default async function Footer() {
  const { footer: f } = await getContent("global");
  const groups = [f.academy, f.training];
  return (
    <footer className="site-footer">
      <div className="wrap sf-body">
        <div className="sf-top">
          <Link aria-label="Pathak100MPH home" className="sf-logo" href="/">
            <Img v={f.logo} loading="lazy" />
          </Link>
          <p className="sf-tagline">
            {f.tagline}
            <br />
            <strong>{f.taglineBold}</strong>
          </p>
          <div className="sf-actions">
            <a className="button" href={f.buttons.call.href}>
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" /></svg>
              {f.buttons.call.label}
            </a>
            <a className="button secondary" href={f.buttons.whatsapp.href} rel="noopener noreferrer" target="_blank">
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 32 32"><path d="M16 .8C7.6.8.8 7.5.8 15.8c0 2.6.7 5.2 2 7.5L.7 31.2l8.1-2.1c2.2 1.2 4.7 1.8 7.2 1.8 8.4 0 15.2-6.7 15.2-15.1S24.4.8 16 .8zm0 27.5c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5a12.3 12.3 0 0 1-1.9-6.5C3.4 8.9 9 3.3 16 3.3s12.6 5.6 12.6 12.5S23 28.3 16 28.3zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.8-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2.1-.5 0-.7-.1-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z" /></svg>
              {f.buttons.whatsapp.label}
            </a>
          </div>
        </div>

        <p className="eyebrow sf-explore">{f.exploreHeading}</p>
        <nav aria-label="Footer" className="sf-links">
          {groups.map((group, i) => (
            <div className="sf-group" key={i}>
              <p className="eyebrow">{group.heading}</p>
              {group.links.map((item, j) => <Link href={item.href} key={j}>{item.label}</Link>)}
            </div>
          ))}
          <div className="sf-more">
            {f.more.map((item, i) => <Link href={item.href} key={i}>{item.label}</Link>)}
            <a className="sf-directions" href={f.directions.href} rel="noopener noreferrer" target="_blank">
              {f.directions.label} <span aria-hidden="true">{"↗︎"}</span>
            </a>
          </div>
        </nav>
      </div>
      <div className="sf-legal">
        <div className="wrap">
          <span>{f.copyright}</span>
          <nav aria-label="Legal">
            {f.legalLinks.map((item, i) => <Link href={item.href} key={i}>{item.label}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}

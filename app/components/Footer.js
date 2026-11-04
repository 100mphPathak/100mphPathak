import Link from "next/link";
import { getContent } from "../lib/content";
import { Img } from "./Text";

// Site footer: logo + tagline + Call button (same gradient as the navbar button), then the page links, then a dark legal bar.
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
              {f.buttons.call.label}
              <span aria-hidden="true">{"↗︎"}</span>
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
            {f.emails.map((item, i) => <a href={item.href} key={i}>{item.label}</a>)}
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

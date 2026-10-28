import Link from "next/link";
import { getContent } from "./lib/content";
import { Img, T } from "./content/text";

export default async function SiteFooter() {
  const { footer: f } = await getContent("global");
  return (
    <footer className="footer-v13">
      <div className="wrap footer-shell">
        <div className="footer-signature">
          <Link aria-label="Pathak100MPH home" className="brand" href="/">
            <Img v={f.logo} loading="lazy" />
          </Link>
          <div>
            <span className="tiny">{f.kicker}</span>
            <p>
              {f.tagline}
              <br />
              <strong>{f.taglineBold}</strong>
            </p>
          </div>
          <Link className="footer-phone" href={f.phone.href}>
            {f.phoneLead}{" "}
            <span>{f.phone.label}{" ↗"}</span>
          </Link>
        </div>
        <div className="footer-directory">
          <nav aria-label="Academy footer links">
            <span className="tiny">{f.academyHeading}</span>
            {f.academyLinks.map((item, i) => (
              <Link href={item.href} key={i}>{item.label}</Link>
            ))}
          </nav>
          <nav aria-label="Training footer links">
            <span className="tiny">{f.trainingHeading}</span>
            {f.trainingLinks.map((item, i) => (
              <Link href={item.href} key={i}>{item.label}</Link>
            ))}
          </nav>
          <div className="footer-location">
            <span className="tiny">{f.locationHeading}</span>
            <p>
              <T v={f.address} />
            </p>
            <Link
              href={f.whatsapp.href}
              rel="noopener"
              target="_blank"
            >
              {f.whatsapp.label}{" ↗"}
            </Link>
          </div>
        </div>
        <div className="footer-legal">
          <span>{f.copyright}</span>
          <nav aria-label="Legal">
            {f.legalLinks.map((item, i) => (
              <Link href={item.href} key={i}>{item.label}</Link>
            ))}
          </nav>
          <span>{f.motto}</span>
        </div>
      </div>
    </footer>
  );
}

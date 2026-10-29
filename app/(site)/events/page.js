import Link from "next/link";
import Partners from "../../components/Partners";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { Faq } from "../../components/Faq";
import { Img, Text } from "../../components/Text";

export const generateMetadata = () => pageMetadata("events");

export default async function Events() {
  const [c, { header }] = await Promise.all([getContent("events"), getContent("global")]);
  return (
    <main id="main" className="events-page">
      <section className="wrap page-hero">
        <p className="eyebrow reveal"><Text v={c.hero.eyebrow} brand /></p>
        <h1 className="reveal hero-title">{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></h1>
        <p className="lede reveal">
          <Text v={c.hero.text} brand />
        </p>
        <div className="events-grid">
          <article className="event speed">
            <span className="event-number">{c.featured.number}</span>
            <div aria-hidden="true" className="speed-graphic">100<span>MPH</span></div>
            <div>
              <span className="pill">{c.featured.badge}</span>
              <h3><Text v={c.featured.heading} brand /></h3>
            </div>
          </article>
          {c.upcoming.map((event, i) => (
            <article className="event pending" key={i}>
              <span className="event-number">{event.number}</span>
              <div aria-hidden="true" className="event-orbit" />
              <div>
                <span className="pill">{event.badge}</span>
                <h3>{event.heading}<br /><span>{event.headingAccent}</span></h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Faq v={c.faq} />
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </Link>
        <h2><Text v={c.closing.heading} /></h2>
        <p><Text v={c.closing.text} brand /></p>
        <div className="actions">
          <Link className="button" href={c.closing.button.href}>{c.closing.button.label}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

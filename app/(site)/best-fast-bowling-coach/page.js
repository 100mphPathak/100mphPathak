import Link from "next/link";
import { Insights, SiteFaq } from "../../components/SiteSections";
import PageHero from "../../components/PageHero";
import { HomePartners } from "../../components/Partners";
import PlayerResults from "../../components/PlayerResults";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import Steps from "../../components/Steps";
import { Img, Text } from "../../components/Text";

export const generateMetadata = () => pageMetadata("ankit-pathak");

// Line icons for the coach stats, in order: experience (coach and player), selections (trophy).
const icon = (paths) => (
  <svg fill="none" height="26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24" width="26">{paths}</svg>
);
const STAT_ICONS = [
  icon(<><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><path d="M15.5 6.5a2.6 2.6 0 1 1 0 5.2M17.5 14.4c1.6.7 2.7 2.3 3 4.6" /></>),
  icon(<><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4" /><path d="M12 13v4M9 20h6M10 17h4" /></>),
];

export default async function AnkitPathak() {
  const [c, { header }] = await Promise.all([getContent("ankit-pathak"), getContent("global")]);
  return (
    <main id="main" className="coach-page">
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={<>{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></>}
        description={c.hero.text}
        labelIsH1
        videoId={c.hero.videoId}
        videoTitle={c.hero.videoTitle}
        trust={c.hero.trustLine}
        actions={
          <Link className="button" href={c.hero.button.href}>
            {c.hero.button.label}{" "}<span aria-hidden="true">↗︎</span>
          </Link>
        }
      />
      <section className="wrap coach-meet reveal">
        <div className="cm-photo">
          <Img sizes="(max-width: 900px) 100vw, 640px" v={c.coach.photo} loading="lazy" />
          <span className="cm-credit"><Text v={c.coach.photoCredit} /></span>
        </div>
        <div className="cm-copy">
          <p className="eyebrow cm-eyebrow">{c.coach.eyebrow}</p>
          <h2>
            {c.coach.heading}
            <br />
            <span className="cm-accent"><Text v={c.coach.headingAccent} brand /></span>
          </h2>
          <p className="cm-text"><Text v={c.coach.text} brand /></p>
          <div className="cm-stats">
            {c.coach.facts.map((fact, i) => (
              <div className="cm-stat" key={i}>
                <span aria-hidden="true" className="cm-icon">{STAT_ICONS[i % STAT_ICONS.length]}</span>
                <span>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Steps highlight="Coaching Approach" v={c.approach} />
      <PlayerResults />
      <SiteFaq items={c.faq.items} />
      <HomePartners />
      <Insights />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </Link>
        <h2><Text v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <Link className="button" href={c.closing.button.href}>{c.closing.button.label}<span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import PageHero from "../../page-hero";
import Partners from "../../partners";
import PlayerResults from "../../player-results";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { Faq, Steps } from "../../content/sections";
import { Img, T } from "../../content/text";

export const generateMetadata = () => pageMetadata("ankit-pathak");

export default async function AnkitPathak() {
  const [c, { header }] = await Promise.all([getContent("ankit-pathak"), getContent("global")]);
  return (
    <main id="main" className="coach-page">
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={<>{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></>}
        description={c.hero.text}
        videoTitle={c.hero.videoTitle}
        videoId={c.hero.videoId}
        actions={
          <Link className="button" href={c.hero.button.href}>
            {c.hero.button.label}{" "}<span aria-hidden="true">↗</span>
          </Link>
        }
      />
      <section className="wrap coach-feature reveal">
        <div className="coach-photo">
          <Img v={c.coach.photo} loading="lazy" />
          <span className="photo-credit"><T v={c.coach.photoCredit} /></span>
        </div>
        <div className="coach-copy">
          <p className="eyebrow">{c.coach.eyebrow}</p>
          <h2>{c.coach.heading}<br/>
            <span className="muted"><T v={c.coach.headingAccent} brand /></span>
          </h2>
          <p>
            <T v={c.coach.text} brand /></p>
          <Link className="glass-link" href={c.coach.button.href}>{c.coach.button.label}{" "}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <Steps v={c.approach} />
      <PlayerResults />
      <Faq v={c.faq} />
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </Link>
        <h2><T v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <Link className="button" href={c.closing.button.href}>{c.closing.button.label}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

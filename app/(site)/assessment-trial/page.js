import PageHero from "../../page-hero";
import Partners from "../../partners";
import AssessmentBooking from "./assessment-booking";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { FaqList, ShortsRail, Steps } from "../../content/sections";
import { Img, T } from "../../content/text";

export const generateMetadata = () => pageMetadata("assessment-trial");

export default async function AssessmentTrial() {
  const [c, { header }] = await Promise.all([getContent("assessment-trial"), getContent("global")]);
  return (
    <main id="main" className="assessment-page">
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={<>{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></>}
        description={<T v={c.hero.text} brand />}
        videoTitle={c.hero.videoTitle}
        videoId={c.hero.videoId}
        actions={<a className="button" href={c.hero.button.href}>{c.hero.button.label}{" ↗"}</a>}
        trust={c.hero.trustLine}
      />
      <section className="wrap intro-line reveal">
        <h2>{c.intro.heading}<br/>
          <span className="muted">{c.intro.headingAccent}</span>
        </h2>
        <p>{c.intro.text}</p>
      </section>
      <AssessmentBooking v={c.booking} />
      <Steps v={c.steps} />
      <ShortsRail v={c.videos} />
      <FaqList v={c.faq} />
      <Partners current />
      <section className="closing wrap reveal">
        <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </a>
        <h2><T v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <a className="button" href={c.closing.button.href}>{c.closing.button.label}{" ↗"}</a>
        </div>
      </section>
    </main>
  );
}

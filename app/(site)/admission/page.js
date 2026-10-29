import PageHero from "../../components/PageHero";
import { HomePartners } from "../../components/Partners";
import PlayerResults from "../../components/PlayerResults";
import AssessmentBooking from "./assessment-booking";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { FaqList } from "../../components/Faq";
import VideoRail from "../../components/VideoRail";
import Steps from "../../components/Steps";
import { Img, Text } from "../../components/Text";

export const generateMetadata = () => pageMetadata("assessment-trial");

export default async function AssessmentTrial() {
  const [c, { header }] = await Promise.all([getContent("assessment-trial"), getContent("global")]);
  return (
    <main id="main" className="assessment-page">
      <PageHero
        eyebrow={c.hero.eyebrow}
        labelIsH1
        title={<>{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></>}
        description={<Text v={c.hero.text} brand />}
        videoTitle={c.hero.videoTitle}
        videoId={c.hero.videoId}
        showYoutubeLink={false}
        actions={<a className="button" href={c.hero.button.href} rel="noopener" target="_blank">{c.hero.button.label}{" ↗"}</a>}
        trust={c.hero.trustLine}
      />
      <AssessmentBooking v={c.booking} />
      <Steps variant="journey" v={c.steps} />
      {c.videos.show && <VideoRail v={c.videos} />}
      <PlayerResults />
      <FaqList v={c.faq} />
      <HomePartners />
      <section className="closing wrap reveal">
        <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </a>
        <h2><Text v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <a className="button" href={c.closing.button.href} rel="noopener" target="_blank">{c.closing.button.label}{" ↗"}</a>
        </div>
      </section>
    </main>
  );
}

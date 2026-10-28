import Image from "next/image";
import Link from "next/link";
import PageHero from "../../page-hero";
import Partners from "../../partners";
import PlayerResults from "../../player-results";
import "../../home.css";
import { seo } from "../../seo";

export const metadata = seo("/ankit-pathak/", "Ankit Pathak | Best Fast Bowling Coach for Your Game", "Looking for the best fast bowling coach for your game? Meet Ankit Pathak: 13+ years of experience and an approach built around technique, preparation and mindset.");

export default function AnkitPathak() {
  return (
    <main id="main" className="coach-page">
      <PageHero
        eyebrow="ANKIT PATHAK · FOUNDER &amp; HEAD COACH"
        title={<>Your action. Your ambition.<br /><span>His attention.</span></>}
        description="Looking for the best fast bowling coach for your game? Meet Ankit Pathak: 13+ years of experience and an approach built around technique, preparation and mindset."
        videoTitle="Meet Ankit Pathak | Pathak100MPH"
        actions={
          <Link className="button" href="/assessment-trial/">
            Book online assessment · ₹1,199 <span aria-hidden="true">↗</span>
          </Link>
        }
      />
      <section className="wrap coach-feature reveal">
        <div className="coach-photo">
          <Image alt="Ankit Pathak at the cricket ground" height="1023" loading="lazy" src="/assets/portrait.webp" width="952" />
          <span className="photo-credit">ANKIT PATHAK<br/>FOUNDER &amp; HEAD COACH</span>
        </div>
        <div className="coach-copy">
          <p className="eyebrow">THE COACH &amp; THE ACADEMY</p>
          <h2>13+ years of experience.<br/>
            <span className="muted">5 years of <span className="brand-name">Pathak100MPH</span>.</span>
          </h2>
          <p>
            <span className="brand-name">Pathak100MPH</span> was founded on 1 October 2021. Ankit Pathak’s experience goes beyond the academy’s five-year journey. His approach brings together technical understanding, physical preparation and mindset, with guidance shaped around the individual player.</p>
          <Link className="glass-link" href="/assessment-trial/">Book online assessment · ₹1,199 <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="wrap compact-process">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">THE APPROACH</p>
            <h2>Every bowler is different.<br/>The attention should be too.</h2>
          </div>
          <p>Technique, physical preparation and mindset work together. Coaching starts by understanding the player.</p>
        </div>
        <div className="steps">
          <details>
            <summary>01 / Understand  +</summary>
            <p>Look closely at your action, current ability and cricketing goals.</p>
          </details>
          <details>
            <summary>02 / Refine  +</summary>
            <p>Develop technique, speed, accuracy and cricket-specific strength.</p>
          </details>
          <details>
            <summary>03 / Progress  +</summary>
            <p>Build the discipline and confidence to carry your work into competition.</p>
          </details>
        </div>
      </section>
      <PlayerResults />
      <section className="wrap seo-faq">
        <div>
          <p className="eyebrow">BEFORE YOUR NEXT STEP</p>
          <h2>Clear answers.<br/>Confident decisions.</h2>
        </div>
        <div>
          <details>
            <summary>How do I choose the best fast bowling coach for me?</summary>
            <p>Look for a coach who understands your action, explains the purpose of training, gives useful feedback and considers your goals. Review the coaching approach and player experiences, then choose the level of support you need.</p>
          </details>
          <details>
            <summary>Can I work with Ankit Pathak online?</summary>
            <p>Yes. Book a <Link href="/assessment-trial/">personal online assessment session</Link> on Google Meet or explore <Link href="/online-training/">ongoing online training</Link> with Ankit sir and the team.</p>
          </details>
          <details>
            <summary>How much coaching experience does Ankit Pathak have?</summary>
            <p>Ankit Pathak has 13+ years of experience. He founded <span className="brand-name">Pathak100MPH</span> on 1 October 2021 and is its head coach.</p>
          </details>
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
        </Link>
        <h2>Let’s look at<br/>your action.</h2>
        <p>A personal online assessment with Ankit Pathak. Personal guidance for fast bowlers.</p>
        <div className="actions">
          <Link className="button" href="/assessment-trial/">Book online assessment · ₹1,199<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

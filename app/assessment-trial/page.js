import Image from "next/image";
import PageHero from "../page-hero";
import Partners from "../partners";
import AssessmentBooking from "./assessment-booking";
import "../home.css";
import { seo } from "../seo";

export const metadata = seo("/assessment-trial/", "Cricket Academy Admission assessment & Online Assessment | Pathak100MPH", "Book your ₹1,199 personal online assessment with Ankit Pathak. Share your bowling videos, meet on Google Meet and discuss your development or academy admission.");

export default function AssessmentTrial() {
  return (
    <main id="main" className="assessment-page">
      <PageHero
        eyebrow="FAST BOWLING ACADEMY ADMISSION"
        title={<>Your next chapter.<br /><span>Starts with an assessment.</span></>}
        description={<>Admission to <span className="brand-name">Pathak100MPH</span> or personal guidance from Ankit sir begins with an assessment. Book your online assessment for ₹1,199, share your bowling videos and meet Ankit sir on Google Meet.</>}
        videoTitle="Why your assessment matters | Pathak100MPH"
        videoId="dCaSesjCBvs"
        actions={<a className="button" href="#book-assessment">Book online assessment · ₹1,199 ↗</a>}
        trust="Personal guidance from Ankit Pathak · Online first · Admission subject to selection and seats"
      />
      <section className="wrap intro-line reveal">
        <h2>A place is earned.<br/>
          <span className="muted">A player is understood.</span>
        </h2>
        <p>Understand your technique, discuss your goals and leave with clearer priorities. Whether you are exploring academy admission or want Ankit sir’s personal guidance, your assessment is the first step. Online training is a separate program with direct enrolment.</p>
      </section>
      <AssessmentBooking />
      <section className="wrap compact-process">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">WHAT HAPPENS NEXT</p>
            <h2>Clarity at every step.</h2>
          </div>
        </div>
        <div className="steps">
          <details>
            <summary>01 / Book online · ₹1,199 +</summary>
            <p>Book your online assessment. Our team contacts you within 24 to 48 hours after payment.</p>
          </details>
          <details>
            <summary>02 / Share your videos +</summary>
            <p>The team confirms your session date and time and requests your bowling footage.</p>
          </details>
          <details>
            <summary>03 / Meet Ankit sir +</summary>
            <p>Join Google Meet for a personal review of your technique and guidance on your next steps. Academy admission remains subject to selection and available seats.</p>
          </details>
        </div>
      </section>
      <section className="wrap reel-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">COACHING THAT STARTS WITH UNDERSTANDING</p>
            <h2>From your first assessment.<br/>To the next chapter.</h2>
          </div>
          <span className="swipe-hint">From the <span className="brand-name">Pathak100MPH</span> community</span>
        </div>
        <div aria-label="COACHING THAT STARTS WITH UNDERSTANDING" className="reel-rail" tabIndex="0">
          <article className="native-reel video-story">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/0UvEsF50YCY?rel=0" title="Pathak100MPH player experience">
            </iframe>
            <a className="video-fallback" href="https://www.youtube.com/shorts/0UvEsF50YCY" rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
          </article>
          <article className="native-reel video-story">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/ME2vMALm5Qw?rel=0" title="Pathak100MPH player experience">
            </iframe>
            <a className="video-fallback" href="https://www.youtube.com/shorts/ME2vMALm5Qw" rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
          </article>
          <article className="native-reel video-story">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/2uEEB9cXvMY?rel=0" title="Pathak100MPH player experience">
            </iframe>
            <a className="video-fallback" href="https://www.youtube.com/shorts/2uEEB9cXvMY" rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
          </article>
        </div>
      </section>
      <section className="wrap faq-section">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">A LITTLE MORE CLARITY</p>
            <h2>Good questions.<br/>Clear answers.</h2>
          </div>
          <p>Everything you need to take the next step.</p>
        </div>
        <div className="faqs">
          <details className="reveal">
            <summary>Is online assessment the main option?<span>+</span>
            </summary>
            <p>Yes. Book your ₹1,199 online assessment, share your bowling videos and meet Ankit sir on Google Meet.</p>
          </details>
          <details className="reveal">
            <summary>Does booking guarantee academy admission?<span>+</span>
            </summary>
            <p>No. Ankit sir personally decides selection, and admission is subject to available seats. Academy admission is for players aged 10 to 23; ages 12 to 17 are recommended.</p>
          </details>
          <details className="reveal">
            <summary>Do I need this assessment for online training?<span>+</span>
            </summary>
            <p>No. You can choose an online training plan and enrol directly without an assessment.</p>
          </details>
          <details className="reveal">
            <summary>Is the assessment fee the academy training fee?<span>+</span>
            </summary>
            <p>No. ₹1,199 covers the assessment only. Speak with admissions about academy training and accommodation.</p>
          </details>
          <details className="reveal">
            <summary>Can I reschedule or get a refund?<span>+</span>
            </summary>
            <p>Rescheduling needs prior academy approval and is not guaranteed. Payments are non-refundable. Read the Return Policy before booking.</p>
          </details>
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
        </a>
        <h2>Ready to take<br/>the first step?</h2>
        <p>A better understanding of your game starts here.</p>
        <div className="actions">
          <a className="button" href="#book-assessment">Book online assessment · ₹1,199 ↗</a>
        </div>
      </section>
    </main>
  );
}

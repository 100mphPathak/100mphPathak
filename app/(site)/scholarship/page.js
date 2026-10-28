import Image from "next/image";
import PageHero from "../../page-hero";
import Partners from "../../partners";
import "../../home.css";
import { seo } from "../../seo";

export const metadata = seo("/scholarship/", "Fast Bowling Scholarship in India | Pathak100MPH", "A performance-based fast bowling scholarship for players aged 11 to 23. Explore the assessment criteria, waiting list, academy sponsorship and ₹5,000 registration.");

export default function Scholarship() {
  return (
    <>
      <main id="main" className="scholarship-page">
        <PageHero
          eyebrow="FAST BOWLING SCHOLARSHIP IN INDIA"
          title={<>Earn the opportunity.<br /><span>Keep raising your standard.</span></>}
          description="A performance-based fast bowling scholarship in India for players aged 11 to 23. Qualify for the waiting list for full academy training and facilities. Up to 25 players sponsored at a time."
          videoTitle="The scholarship explained | Pathak100MPH"
          videoActions={
            <a className="button" href="#scholarship-booking">
              Register for assessment · ₹5,000 <span aria-hidden="true">↗</span>
            </a>
          }
        />
        <section className="wrap scholarship-standard">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">THE STANDARD</p>
              <h2>Four checks.<br/>One opportunity.</h2>
            </div>
            <p>For fast bowlers aged 11 to 23. The same criteria apply to every applicant.</p>
          </div>
          <div className="facts">
            <div>
              <strong>125+</strong>
              <span>km/h bowling speed</span>
            </div>
            <div>
              <strong>80%</strong>
              <span>Accuracy</span>
            </div>
            <div>
              <strong>2K + Bronco</strong>
              <span>Fitness tests: pass</span>
            </div>
            <div>
              <strong>Q&amp;A</strong>
              <span>Ankit sir’s assessment: pass</span>
            </div>
          </div>
        </section>
        <section className="wrap compact-process">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">KNOW WHAT YOU’RE REGISTERING FOR</p>
              <h2>Qualify first.<br/>Join the waiting list.</h2>
            </div>
            <p>Registrations are not capped. Active sponsorships are capped at 25. Passing does not guarantee an immediate place.</p>
          </div>
          <div className="steps">
            <details>
              <summary>01 / Register  +</summary>
              <p>Pay ₹5,000 to register. Our team confirms your payment and the expected assessment month. The exact date will be announced once confirmed.</p>
            </details>
            <details>
              <summary>02 / Attend &amp; qualify  +</summary>
              <p>The team coordinates date and time during the assessment month. Pass all criteria to enter the sponsorship waiting list.</p>
            </details>
            <details>
              <summary>03 / Receive an opportunity  +</summary>
              <p>Priority considers qualification date and Ankit sir’s decision. When a place opens, a player is invited. If they decline, the opportunity moves to the next player.</p>
            </details>
          </div>
        </section>
        <section className="wrap two-notes">
          <article className="note reveal">
            <p className="eyebrow">WHAT’S COVERED</p>
            <h3>100% academy facilities.</h3>
            <p>Full academy training and facilities. Accommodation and residential facilities are excluded.</p>
          </article>
          <article className="note reveal">
            <p className="eyebrow">THE ONGOING COMMITMENT</p>
            <h3>Reassessed every 3 months.</h3>
            <p>Pass to continue your sponsorship. Failing a reassessment means sponsorship ends.</p>
          </article>
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
              <summary>What does the ₹5,000 payment cover?<span>+</span>
              </summary>
              <p>Registration for the scholarship assessment event. It does not purchase or guarantee sponsorship.</p>
            </details>
            <details className="reveal">
              <summary>What if I do not qualify?<span>+</span>
              </summary>
              <p>You can register for a future event after a three-month cooling period. A new ₹5,000 fee applies.</p>
            </details>
            <details className="reveal">
              <summary>Are registration payments refundable?<span>+</span>
              </summary>
              <p>No. All payments are non-refundable.</p>
            </details>
            <details className="reveal">
              <summary>When will my assessment take place?<span>+</span>
              </summary>
              <p>Your team confirmation includes the approximate event month. Exact dates and times are coordinated during that month.</p>
            </details>
          </div>
        </section>
        <Partners current />
        <section className="closing wrap reveal" id="scholarship-booking">
          <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
            <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
          </a>
          <h2>The opportunity is real.<br/>So is the standard.</h2>
          <p>For committed fast bowlers aged 11 to 23.</p>
          <div className="actions">
            <button className="button" data-book="Scholarship Assessment · ₹5,000">Register · ₹5,000 <span>↗</span>
            </button>
          </div>
        </section>
      </main>
      <dialog id="booking-dialog" aria-labelledby="booking-title">
        <button aria-label="Close booking" className="modal-close">×</button>
        <span className="eyebrow">YOUR NEXT STEP</span>
        <h2 id="booking-title">Scholarship Assessment · ₹5,000</h2>
        <p>Your chosen program is ready for the next step. The live website will take you to its dedicated payment page.</p>
        <p className="form-notice">Design reference: checkout link to be connected by your developer.</p>
        <a className="button" href="tel:+918882390596">Call admissions <span>↗</span></a>
      </dialog>
    </>
  );
}

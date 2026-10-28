import PageHero from "../page-hero";
import Link from "next/link";
import Partners from "../partners";
import CommunityReels from "../community-reels";
import { seo } from "../seo";

export const metadata = seo("/action-analysis/", "Bowling Action Analysis with Ankit Pathak | ₹499", "Personal fast bowling action analysis with Ankit Pathak on Google Meet for ₹499. Share your videos and get guidance on your next steps.");

export default function ActionAnalysis() {
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow={<> {"Professional Bowling Action Analysis"} </>}
          title={
            <>
              {" "}
              {"Understand your action."}
              <br />
              <span>{"With Ankit Pathak."}</span>{" "}
            </>
          }
          videoTitle="Inside your Action Analysis | Pathak100MPH"
          description={
            <>
              {" "}
              {
                "Personal fast bowling action analysis on Google Meet for ₹499. Share your videos and get guidance on what to work on next."
              }{" "}
            </>
          }
        />
        <section className="wrap v3-section reveal">
          <p className="eyebrow">{"WHAT THE SESSION IS FOR"}</p>
          <h2>
            {"Understand the details."}
            <br />
            {"Leave with direction."}
          </h2>
          <div className="v3-benefits">
            <article>
              <h3>{"Your action, reviewed"}</h3>
              <p>
                {
                  "Share your bowling videos ahead of your scheduled Google Meet so your own action is the focus of the session."
                }
              </p>
            </article>
            <article>
              <h3>{"Your improvement priorities"}</h3>
              <p>
                {
                  "Discuss your action and get personal guidance on what to work on."
                }
              </p>
            </article>
            <article>
              <h3>{"Your next step"}</h3>
              <p>
                {
                  "Use the guidance to make better-informed training decisions. Ongoing online coaching is a separate program."
                }
              </p>
            </article>
          </div>
        </section>
        <section className="wrap">
          <div className="steps">
            <article className="reveal">
              <span className="step-no">{"01"}</span>
              <h3>{"Book · ₹499"}</h3>
              <p>
                {
                  "Complete your payment. Our team contacts you within 24–48 hours."
                }
              </p>
            </article>
            <article className="reveal">
              <span className="step-no">{"02"}</span>
              <h3>{"Share your videos"}</h3>
              <p>
                {
                  "The team confirms your session date and time and requests bowling footage."
                }
              </p>
            </article>
            <article className="reveal">
              <span className="step-no">{"03"}</span>
              <h3>{"Meet Ankit sir"}</h3>
              <p>
                {
                  "Join Google Meet for action analysis and guidance on how to improve."
                }
              </p>
            </article>
          </div>
        </section>
        <CommunityReels
          eyebrow="PLAYER EXPERIENCES"
          title="A closer look."
          subtitle="In their own words."
        />
        <section className="wrap faq-section">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">{"A LITTLE MORE CLARITY"}</p>
              <h2>
                {"Good questions."}
                <br />
                {"Clear answers."}
              </h2>
            </div>
            <p>{"Everything you need to take the next step."}</p>
          </div>
          <div className="faqs">
            <details className="reveal">
              <summary>
                {"Is this available for batting?"}
                <span>{"+"}</span>
              </summary>
              <p>{"No. Action Analysis is exclusively for fast bowlers."}</p>
            </details>
            <details className="reveal">
              <summary>
                {"Is there an age or playing-level restriction?"}
                <span>{"+"}</span>
              </summary>
              <p>{"No. Fast bowlers of any age and level can book."}</p>
            </details>
            <details className="reveal">
              <summary>
                {"Can I reschedule?"}
                <span>{"+"}</span>
              </summary>
              <p>
                {
                  "Yes, one reschedule is permitted. All payments are non-refundable."
                }
              </p>
            </details>
            <details className="reveal">
              <summary>
                {"Is this mandatory for online training?"}
                <span>{"+"}</span>
              </summary>
              <p>
                {
                  "No. You can enrol in online training directly without booking Action Analysis."
                }
              </p>
            </details>
          </div>
        </section>
        <Partners />
        <section className="closing wrap reveal">
          <p className="eyebrow">{"PATHAK100MPH"}</p>
          <h2>
            {"Understand more."}
            <br />
            {"Bowl with direction."}
          </h2>
          <p>{"Personal action analysis with Ankit Pathak. ₹499."}</p>
          <div className="actions">
            <button className="button" data-book="Action Analysis · ₹499">
              {"Book your analysis "}
              <span>{"↗"}</span>
            </button>
          </div>
        </section>
      </main>
      <dialog id="booking-dialog" aria-labelledby="booking-title">
        <button aria-label="Close booking" className="modal-close">
          ×
        </button>
        <span className="eyebrow">YOUR NEXT STEP</span>
        <h2 id="booking-title">Action Analysis · ₹499</h2>
        <p>
          Your chosen program is ready for the next step. The live website will
          take you to its dedicated payment page.
        </p>
        <p className="form-notice">
          Design reference: checkout link to be connected by your developer.
        </p>
        <a className="button" href="tel:+918882390596">
          Call admissions <span>↗</span>
        </a>
      </dialog>
    </>
  );
}

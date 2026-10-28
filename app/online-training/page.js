import PageHero from "../page-hero";
import Image from "next/image";
import Link from "next/link";
import Partners from "../partners";
import "../home.css";
import { seo } from "../seo";
export const metadata = seo("/online-training/", "Online Fast Bowling Training | Pathak100MPH", "Personalised online fast bowling training with Coach Ankit Pathak’s team. Regular drills, video analysis and monthly live guidance through your private WhatsApp group.");
export default function OnlineTraining() {
  return (
    <main id="main" className="training-page">
      <PageHero
        eyebrow={<> {"ONLINE FAST BOWLING TRAINING"} </>}
        title={
          <>
            {" "}
            {"Train anywhere."}
            <br />
            <span>{"Improve with direction."}</span>{" "}
          </>
        }
        videoTitle="How online training works | Pathak100MPH"
        videoId="wzldKpk_c2Y"
        description={
          <>
            {" "}
            {
              "Personalised online fast bowling training with Coach Ankit Pathak’s team. Regular drills, video analysis and monthly live guidance, coordinated through your private WhatsApp group."
            }{" "}
          </>
        }
        actions={
          <a className="button" href="#plans">
            Choose your training plan <span aria-hidden="true">↗</span>
          </a>
        }
      />
      <section className="wrap reel-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">PLAYER EXPERIENCES</p>
            <h2>Online training.<br />In their own words.</h2>
          </div>
          <span className="swipe-hint">From the <span className="brand-name">Pathak100MPH</span> community</span>
        </div>
        <div aria-label="PLAYER EXPERIENCES" className="reel-rail" tabIndex={0}>
          <article className="native-reel video-story">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              src="https://www.youtube-nocookie.com/embed/C2aQtRpzcDs?rel=0"
              title="Pathak100MPH player experience"
            />
            <a className="video-fallback" href="https://www.youtube.com/shorts/C2aQtRpzcDs" rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
          </article>
          <article className="native-reel video-story instagram-story">
            <iframe
              allowFullScreen
              loading="lazy"
              src="https://www.instagram.com/reel/DZAVjmKyhtt/embed/"
              title="Pathak100MPH online training feedback on Instagram"
            />
            <a className="video-fallback" href="https://www.instagram.com/reel/DZAVjmKyhtt/" rel="noopener noreferrer" target="_blank">Watch on Instagram ↗</a>
          </article>
        </div>
      </section>
      <section className="wrap" id="plans">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{"CHOOSE YOUR COMMITMENT"}</p>
            <h2>
              {"One coaching approach."}
              <br />
              {"Three ways to begin."}
            </h2>
          </div>
        </div>
        <div className="plans">
          <article className="plan reveal">
            <span className="eyebrow">{"STARTER"}</span>
            <h3>{"1 month"}</h3>
            <div className="price">{"₹3,999"}</div>
            <p>{"A focused start."}</p>
            <ul className="checklist">
              <li>{"Daily personalised bowling drills"}</li>
              <li>{"Daily strength & conditioning"}</li>
              <li>{"Weekly bowling video analysis"}</li>
              <li>{"Monthly live career guidance"}</li>
              <li>{"WhatsApp support"}</li>
            </ul>
            <Link
              className="button secondary"
              href="https://pages.razorpay.com/ot-1m"
              rel="noopener"
              target="_blank"
            >
              {"Enrol now "}
              <span>{"↗"}</span>
            </Link>
            <small>{"Total plan fee · Non-refundable"}</small>
          </article>
          <article className="plan reveal popular">
            <span className="plan-badge">{"6-MONTH PLAN"}</span>
            <span className="eyebrow">{"ELITE"}</span>
            <h3>{"6 months"}</h3>
            <div className="price">{"₹9,999"}</div>
            <p>{"Time to build consistency."}</p>
            <ul className="checklist">
              <li>{"Daily personalised bowling drills"}</li>
              <li>{"Daily strength & conditioning"}</li>
              <li>{"Weekly bowling video analysis"}</li>
              <li>{"Monthly live career guidance"}</li>
              <li>{"WhatsApp support"}</li>
            </ul>
            <Link
              className="button"
              href="https://pages.razorpay.com/ot-6m"
              rel="noopener"
              target="_blank"
            >
              {"Enrol now "}
              <span>{"↗"}</span>
            </Link>
            <small>{"Total plan fee · Non-refundable"}</small>
          </article>
          <article className="plan reveal">
            <span className="eyebrow">{"CHAMPION"}</span>
            <h3>{"12 months"}</h3>
            <div className="price">{"₹14,999"}</div>
            <p>{"Commit to the long game."}</p>
            <ul className="checklist">
              <li>{"Daily personalised bowling drills"}</li>
              <li>{"Daily strength & conditioning"}</li>
              <li>{"Weekly bowling video analysis"}</li>
              <li>{"Monthly live career guidance"}</li>
              <li>{"WhatsApp support"}</li>
            </ul>
            <Link
              className="button secondary"
              href="https://pages.razorpay.com/ot-12m"
              rel="noopener"
              target="_blank"
            >
              {"Enrol now "}
              <span>{"↗"}</span>
            </Link>
            <small>{"Total plan fee · Non-refundable"}</small>
          </article>
        </div>
      </section>
      <section className="wrap v3-section reveal">
        <p className="eyebrow">{"WHAT YOUR PLAN GIVES YOU"}</p>
        <h2>
          {"Know what to train."}
          <br />
          {"Know what to work on."}
        </h2>
        <div className="v3-benefits">
          <article>
            <h3>{"Your daily work"}</h3>
            <p>
              {
                "Personalised bowling drills and strength & conditioning plans delivered through WhatsApp."
              }
            </p>
          </article>
          <article>
            <h3>{"Your weekly review"}</h3>
            <p>
              {
                "Submit bowling footage for technical analysis and feedback on your next areas of focus."
              }
            </p>
          </article>
          <article>
            <h3>{"Your monthly direction"}</h3>
            <p>
              {
                "Live progress review and career guidance with Ankit sir and the team."
              }
            </p>
          </article>
        </div>
        <div className="sample-panel">
          <span className="pill">
            {"ILLUSTRATIVE WORKFLOW · NOT A PLAYER RESULT"}
          </span>
          <div className="sample-flow">
            <span>{"You share bowling videos"}</span>
            <b>{"→"}</b>
            <span>{"Your coaches review"}</span>
            <b>{"→"}</b>
            <span>{"Your plan & feedback"}</span>
          </div>
          <p>
            {
              "Your coach reviews your footage and sets drills and priorities for your training."
            }
          </p>
        </div>
      </section>
      <section className="wrap compact-process">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{"PERSONAL. EVEN FROM A DISTANCE."}</p>
            <h2>
              {"A plan built around you."}
              <br />
              {"Feedback that moves you forward."}
            </h2>
          </div>
          <p>
            {
              "Your action, your goals and your progress shape the coaching. Open to every age, level and location. No assessment required."
            }
          </p>
        </div>
        <div className="steps">
          <details>
            <summary>{"01 / Enrol  +"}</summary>
            <p>
              {
                "Choose your plan and pay. Your private WhatsApp group is created within 48 hours."
              }
            </p>
          </details>
          <details>
            <summary>{"02 / Get your plan  +"}</summary>
            <p>
              {
                "Share bowling videos and payment confirmation. Ankit sir and the team review your action and personalise your training."
              }
            </p>
          </details>
          <details>
            <summary>{"03 / Train. Review. Refine.  +"}</summary>
            <p>
              {
                "Follow daily drills and strength work. Submit weekly videos and join monthly live guidance sessions."
              }
            </p>
          </details>
        </div>
      </section>
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
              {"Who can enrol?"}
              <span>{"+"}</span>
            </summary>
            <p>
              {
                "Anyone. The program is open to male and female bowlers of any age and playing level, in India or abroad."
              }
            </p>
          </details>
          <details className="reveal">
            <summary>
              {"Do I need an assessment first?"}
              <span>{"+"}</span>
            </summary>
            <p>
              {
                "No. You can enrol directly. Your videos help us build your personalised plan after enrolment."
              }
            </p>
          </details>
          <details className="reveal">
            <summary>
              {"Is batting coaching available online?"}
              <span>{"+"}</span>
            </summary>
            <p>{"No. Our online training program is for bowling only."}</p>
          </details>
          <details className="reveal">
            <summary>
              {"How do I get support?"}
              <span>{"+"}</span>
            </summary>
            <p>
              {
                "Use your private WhatsApp group for training communication and questions. Weekly video analysis and monthly live guidance are included."
              }
            </p>
          </details>
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
        </Link>
        <h2>
          {"Same ambition."}
          <br />
          {"Anywhere in the world."}
        </h2>
        <p>{"Your next session starts with a plan."}</p>
        <div className="actions">
          <a className="button" href="#plans">
            {"Choose your plan"}
            <span aria-hidden="true">{"↗"}</span>
          </a>
        </div>
      </section>
    </main>
  );
}

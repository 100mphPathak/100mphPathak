import PageHero from "../page-hero";
import Image from "next/image";
import Link from "next/link";
import { seo } from "../seo";
export const metadata = seo("/facilities/", "Cricket Academy with Hostel in Delhi NCR | Pathak100MPH", "Explore Pathak100MPH’s 5-acre cricket training environment, gym, facilities and residential support in Delhi NCR.");
export default function Facilities() {
  return (
    <>
      <main id="main" className="facilities-page">
        <PageHero
          eyebrow={<> {"CRICKET ACADEMY WITH HOSTEL"} </>}
          title={
            <>
              {" "}
              {"Room to train."}
              <br />
              <span>{"Space to grow."}</span>{" "}
            </>
          }
          videoTitle="Explore our academy | Pathak100MPH"
          description={
            <>
              {" "}
              {"Looking for a cricket academy with hostel facilities? Explore "}
              <span className="brand-name">{"Pathak100MPH"}</span>
              {
                "’s 5-acre training environment and residential support in Delhi NCR. Admission begins with an assessment."
              }{" "}
            </>
          }
          actions={
            <>
              {" "}
              <Link className="button" href="/assessment-trial/">
                {"Explore admission assessments"}
                <span aria-hidden="true">{"↗"}</span>
              </Link>{" "}
            </>
          }
        />
        <section className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">{"BUILT AROUND YOUR DEVELOPMENT"}</p>
              <h2>
                {"Every part of the game."}
                <br />
                {"Every part of the player."}
              </h2>
            </div>
            <p>
              {
                "Facilities for cricket practice, strength training and recovery."
              }
            </p>
          </div>
          <div className="facility-list">
            <article className="reveal">
              <span>{"01"}</span>
              <h3>{"Training environment"}</h3>
              <p>
                {
                  "5-acre practice ground, turf and cement nets, speed radar, floodlights and regular practice matches. Practise your skills, measure pace and apply your work in match situations."
                }
              </p>
            </article>
            <article className="reveal">
              <span>{"02"}</span>
              <h3>{"Strength & conditioning"}</h3>
              <p>
                {
                  "Specialist cricket gym, bowler-focused equipment, mobility, agility and core training with fitness coaching, supporting physical preparation alongside skill work."
                }
              </p>
            </article>
            <article className="reveal">
              <span>{"03"}</span>
              <h3>{"Residential support"}</h3>
              <p>
                {
                  "Accommodation, daily room cleaning, RO drinking water, CCTV, power backup and supervision. Enquire for availability."
                }
              </p>
            </article>
          </div>
        </section>
        <section className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">{"A LOOK INSIDE"}</p>
              <h2>
                {"The environment."}
                <br />
                {"In real life."}
              </h2>
            </div>
            <p>{"A closer look at the people and places behind the work."}</p>
          </div>
          <div className="gallery">
            <button
              aria-label="Enlarge academy photograph"
              data-photo="/assets/team.webp"
            >
              <Image
                alt="Ankit Pathak with academy players"
                height="1024"
                loading="lazy"
                sizes="(max-width: 760px) 90vw, 33vw"
                src="/assets/team.webp"
                width="825"
              />
            </button>
            <button
              aria-label="Enlarge academy photograph"
              data-photo="/assets/ground.webp"
            >
              <Image
                alt="Players on the academy ground"
                height="2016"
                loading="lazy"
                sizes="(max-width: 760px) 90vw, 33vw"
                src="/assets/ground.webp"
                width="1512"
              />
            </button>
            <button
              aria-label="Enlarge academy photograph"
              data-photo="/assets/practice.webp"
            >
              <Image
                alt="Coaching on the cricket field"
                height="2016"
                loading="lazy"
                sizes="(max-width: 760px) 90vw, 33vw"
                src="/assets/practice.webp"
                width="1512"
              />
            </button>
          </div>
          <div className="photo-placeholders">
            <div>
              {"GYM PHOTOGRAPH"}
              <span>{"New image coming soon"}</span>
            </div>
            <div>
              {"ACCOMMODATION PHOTOGRAPH"}
              <span>{"New image coming soon"}</span>
            </div>
          </div>
        </section>
        <section className="wrap seo-faq">
          <div>
            <p className="eyebrow">{"BEFORE YOUR NEXT STEP"}</p>
            <h2>
              {"Clear answers."}
              <br />
              {"Confident decisions."}
            </h2>
          </div>
          <div>
            <details>
              <summary>
                {"Is hostel admission automatic after an assessment?"}
              </summary>
              <p>
                {
                  "No. Academy admission is subject to selection and seats. Residential arrangements and availability must be confirmed with the admissions team."
                }
              </p>
            </details>
            <details>
              <summary>{"What does residential support include?"}</summary>
              <p>
                {
                  "The academy offers accommodation and residential support for enrolled players. Discuss room arrangements, meals and the current facilities with the team before joining."
                }
              </p>
            </details>
            <details>
              <summary>
                {"Does scholarship sponsorship include the hostel?"}
              </summary>
              <p>
                {"No. The "}
                <Link href="/scholarship/">
                  {"scholarship program"}
                </Link>
                {
                  " covers academy training and facilities, excluding accommodation and residential facilities."
                }
              </p>
            </details>
          </div>
        </section>
        <section className="wrap partners facilities-partners">
          <div className="partner-heading">
            <p className="eyebrow">{"OUR PARTNERS"}</p>
            <h2>{"Stronger, together."}</h2>
            <p>{"The brands supporting our players and academy."}</p>
          </div>
          {"\n"}
          <article className="partner-feature">
            <div className="partner-copy">
              <span className="eyebrow">{"OUR ACADEMY SPONSOR"}</span>
              <h3>{"Powered by STAG Global."}</h3>
              <p>
                {
                  "STAG Global supports our academy with cricket gear and merchandise for training and match days."
                }
              </p>
              <Link
                className="partner-visit"
                href="https://stag.global/"
                rel="noopener noreferrer"
                target="_blank"
              >
                {"Explore STAG Global ↗"}
              </Link>
            </div>
            <div className="partner-logo">
              <Image
                alt="STAG Global"
                loading="lazy"
                src="/assets/stag-global.png"
                width="500"
                height="500"
              />
            </div>
          </article>
          {"\n"}
          <div
            aria-label="Academy partners"
            className="partner-grid"
            tabIndex="0"
          >
            <article className="partner-card">
              <div className="partner-art">
                <Image
                  alt="Naturaltein"
                  loading="lazy"
                  src="/assets/naturaltein.svg"
                  width="500"
                  height="500"
                />
              </div>
              <span className="partner-role">
                <span className="brand-name">{"Pathak100MPH"}</span>
                {" NUTRITION PARTNER"}
              </span>
              <h3>{"Naturaltein"}</h3>
              <Link
                aria-label="Code 100MPH. Visit Naturaltein"
                className="partner-code"
                href="https://naturaltein.in/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="code-label">
                  {"USE CODE"}
                  <strong>{"100MPH"}</strong>
                </span>
                <b aria-hidden="true">{"↗"}</b>
              </Link>
            </article>
            {"\n"}
            <article className="partner-card">
              <div className="partner-art">
                <Image
                  alt="APX Collection"
                  className="apx-logo"
                  height="406"
                  loading="lazy"
                  src="/assets/apx-official.png"
                  width="720"
                />
              </div>
              <span className="partner-role">
                <span className="brand-name">{"Pathak100MPH"}</span>
                {" CRICKET GEAR PARTNER"}
              </span>
              <h3>{"APX Collection"}</h3>
              <Link
                aria-label="Code 100MPH. Visit cricket collection"
                className="partner-code"
                href="https://stag.global/collections/cricket"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="code-label">
                  {"USE CODE"}
                  <strong>{"100MPH"}</strong>
                </span>
                <b aria-hidden="true">{"↗"}</b>
              </Link>
            </article>
            {"\n"}
          </div>
        </section>
        <section className="closing wrap reveal">
          <Link
            aria-label="Pathak100MPH home"
            className="closing-logo"
            href="/"
          >
            <Image
              alt="Pathak100MPH"
              height="170"
              src="/assets/logo.webp"
              width="367"
            />
          </Link>
          <h2>
            {"Come for the coaching."}
            <br />
            {"Grow with the environment."}
          </h2>
          <p>
            {
              "Near Chhapraula Police Chowki, KRBL Rice Mill, Bisnauli, Uttar Pradesh 203207."
            }
          </p>
          <div className="actions">
            <button className="text-link" data-enquire="">
              {"Request a call back"}
              <span aria-hidden="true">{"↗"}</span>
            </button>
          </div>
        </section>
      </main>
      <dialog id="photo-dialog" aria-label="Academy photograph enlarged">
        <button aria-label="Close photo" className="modal-close">
          ×
        </button>
        <img alt="Academy photo enlarged" />
      </dialog>
    </>
  );
}

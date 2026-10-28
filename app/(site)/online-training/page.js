import PageHero from "../../page-hero";
import Link from "next/link";
import { Fragment } from "react";
import Partners from "../../partners";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { FaqList, Steps } from "../../content/sections";
import { Img, T } from "../../content/text";

export const generateMetadata = () => pageMetadata("online-training");

const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default async function OnlineTraining() {
  const [c, { header }] = await Promise.all([getContent("online-training"), getContent("global")]);
  return (
    <main id="main" className="training-page">
      <PageHero
        eyebrow={<> {c.hero.eyebrow} </>}
        title={<>{" "}{c.hero.heading}<br /><span>{c.hero.headingAccent}</span>{" "}</>}
        videoTitle={c.hero.videoTitle}
        videoId={c.hero.videoId}
        description={<>{" "}{c.hero.text}{" "}</>}
        actions={
          <a className="button" href={c.hero.button.href}>
            {c.hero.button.label}{" "}<span aria-hidden="true">↗</span>
          </a>
        }
      />
      <section className="wrap reel-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">{c.experiences.eyebrow}</p>
            <h2><T v={c.experiences.heading} /></h2>
          </div>
          <span className="swipe-hint"><T v={c.experiences.hint} brand /></span>
        </div>
        <div aria-label={c.experiences.eyebrow} className="reel-rail" tabIndex={0}>
          {c.experiences.videos.map((video, i) =>
            video.platform === "instagram" ? (
              <article className="native-reel video-story instagram-story" key={i}>
                <iframe
                  allowFullScreen
                  loading="lazy"
                  src={`https://www.instagram.com/reel/${video.videoId}/embed/`}
                  title={video.title}
                />
                <a className="video-fallback" href={`https://www.instagram.com/reel/${video.videoId}/`} rel="noopener noreferrer" target="_blank">Watch on Instagram ↗</a>
              </article>
            ) : (
              <article className="native-reel video-story" key={i}>
                <iframe
                  allow={ALLOW}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0`}
                  title={video.title}
                />
                <a className="video-fallback" href={`https://www.youtube.com/shorts/${video.videoId}`} rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
              </article>
            ),
          )}
        </div>
      </section>
      <section className="wrap" id="plans">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{c.plans.eyebrow}</p>
            <h2>
              <T v={c.plans.heading} />
            </h2>
          </div>
        </div>
        <div className="plans">
          {c.plans.items.map((plan, i) => (
            <article className={plan.highlighted ? "plan reveal popular" : "plan reveal"} key={i}>
              {plan.badge && <span className="plan-badge">{plan.badge}</span>}
              <span className="eyebrow">{plan.tier}</span>
              <h3>{plan.duration}</h3>
              <div className="price">{plan.price}</div>
              <p>{plan.text}</p>
              <ul className="checklist">
                {plan.features.map((feature, j) => (
                  <li key={j}>{feature}</li>
                ))}
              </ul>
              <Link
                className={plan.highlighted ? "button" : "button secondary"}
                href={plan.button.href}
                rel="noopener"
                target="_blank"
              >
                {plan.button.label}{" "}
                <span>{"↗"}</span>
              </Link>
              <small>{plan.note}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap v3-section reveal">
        <p className="eyebrow">{c.benefits.eyebrow}</p>
        <h2>
          <T v={c.benefits.heading} />
        </h2>
        <div className="v3-benefits">
          {c.benefits.items.map((item, i) => (
            <article key={i}>
              <h3>{item.heading}</h3>
              <p>
                {item.text}
              </p>
            </article>
          ))}
        </div>
        <div className="sample-panel">
          <span className="pill">
            {c.benefits.sampleLabel}
          </span>
          <div className="sample-flow">
            {c.benefits.sampleFlow.map((step, i) => (
              <Fragment key={i}>
                {i > 0 && <b>{"→"}</b>}
                <span>{step}</span>
              </Fragment>
            ))}
          </div>
          <p>
            {c.benefits.sampleText}
          </p>
        </div>
      </section>
      <Steps v={c.steps} />
      <FaqList v={c.faq} />
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </Link>
        <h2>
          <T v={c.closing.heading} />
        </h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <a className="button" href={c.closing.button.href}>
            {c.closing.button.label}
            <span aria-hidden="true">{"↗"}</span>
          </a>
        </div>
      </section>
    </main>
  );
}

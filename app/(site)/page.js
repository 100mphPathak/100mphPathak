import "../home.css";
import PlayerResults from "../player-results";
import { getContent, pageMetadata } from "../lib/content";
import { COLORS } from "../content/shape";
import { Img, T } from "../content/text";

export const generateMetadata = () => pageMetadata("home");

export default async function Home() {
  const [c, { posts }, { partners: p, header }] = await Promise.all([getContent("home"), getContent("blogs"), getContent("global")]);
  return (
    <main id="main" className="home-page">
      <section className="home-hero wrap">
        <div className="hero-intro">
          <p className="eyebrow reveal">{c.hero.eyebrow}</p>
          <h1 className="reveal">{c.hero.heading}<br/>
            <span>{c.hero.headingAccent}</span>
          </h1>
          <p className="lede">
            <T v={c.hero.text} brand /></p>
          <div className="hero-side reveal">
            <a className="text-link home-capsule" href={c.hero.button.href}>{c.hero.button.label}{" "}<span>↓</span>
            </a>
          </div>
        </div>
        <div className="vsl-player">
          <div className="vsl-frame">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={`https://www.youtube-nocookie.com/embed/${c.hero.videoId}?rel=0`} title={c.hero.videoTitle}>
            </iframe>
          </div>
          <a className="video-fallback" href={`https://www.youtube.com/watch?v=${c.hero.videoId}`} rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
        </div>
        <div className="hero-caption">
          <span>{c.hero.captionLeft}</span>
          <span>
            <T v={c.hero.captionRight} brand /></span>
        </div>
      </section>
      <section className="wrap stats reveal">
        <div className="facts">
          {c.stats.map((stat, i) => (
            <div key={i}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap coach-feature reveal">
        <div className="coach-photo">
          <Img v={c.coach.photo} loading="lazy" />
          <span className="photo-credit"><T v={c.coach.photoCredit} /></span>
        </div>
        <div className="coach-copy">
          <p className="eyebrow">{c.coach.eyebrow}</p>
          <h2><T v={c.coach.heading} /><br/>
            <span className="muted">{c.coach.headingAccent}</span>
          </h2>
          <p>{c.coach.text}</p>
          <a className="text-link home-capsule" href={c.coach.button.href}>{c.coach.button.label}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="wrap pathways" id="pathways">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{c.pathways.eyebrow}</p>
            <h2><T v={c.pathways.heading} /></h2>
          </div>
        </div>
        <div className="equal-paths three-paths">
          {c.pathways.cards.map((card, i) => (
            <article className="path-card" key={i}>
              <span className="eyebrow">{card.eyebrow}</span>
              <h3>
                <T v={card.heading} brand /></h3>
              <p>{card.text}</p>
              <a className="home-capsule product-capsule" href={card.button.href}>{card.button.label}</a>
            </article>
          ))}
        </div>
      </section>
      <PlayerResults />
      <section className="wrap partners">
        <div className="partner-heading">
          <p className="eyebrow">{p.eyebrow}</p>
          <h2>{p.heading}</h2>
          <p>{p.text}</p>
        </div>
        <article className="partner-feature">
          <div className="partner-copy">
            <span className="eyebrow">{p.sponsor.eyebrow}</span>
            <h3>{p.sponsor.heading}</h3>
            <p>{p.sponsor.text}</p>
            <a className="partner-visit" href={p.sponsor.link.href} rel="noopener noreferrer" target="_blank">{p.sponsor.link.label}{" ↗"}</a>
          </div>
          <div className="partner-logo">
            <Img v={p.sponsor.logo} loading="lazy" />
          </div>
        </article>
        <div aria-label="Academy partners" className="partner-grid" tabIndex="0">
          {p.cards.map((card, i) => (
            <article className="partner-card" key={i}>
              <div className="partner-art">
                <Img v={card.logo} className={card.wideLogo ? "apx-logo" : undefined} loading="lazy" />
              </div>
              <span className="partner-role">
                <T v={card.role} brand /></span>
              <h3>{card.name}</h3>
              <a aria-label={card.linkDescription} className="partner-code" href={card.href} rel="noopener noreferrer" target="_blank">
                <span className="code-label">{card.codeLabel}<strong>{card.code}</strong>
                </span>
                <b aria-hidden="true">↗</b>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{c.events.eyebrow}</p>
            <h2>{c.events.heading}</h2>
          </div>
          <p><T v={c.events.text} brand /></p>
        </div>
        <div className="events-grid">
          <article className="event speed">
            <span className="event-number">{c.events.featured.number}</span>
            <div aria-hidden="true" className="speed-graphic">100<span>MPH</span>
            </div>
            <div>
              <span className="pill">{c.events.featured.badge}</span>
              <h3>
                <T v={c.events.featured.heading} brand /></h3>
            </div>
          </article>
          {c.events.upcoming.map((event, i) => (
            <article className="event pending" key={i}>
              <span className="event-number">{event.number}</span>
              <div aria-hidden="true" className="event-orbit">
              </div>
              <div>
                <span className="pill">{event.badge}</span>
                <h3>{event.heading}<br/>
                  <span>{event.headingAccent}</span>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap insights">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{c.insights.eyebrow}</p>
            <h2><T v={c.insights.heading} /></h2>
          </div>
          <p>{c.insights.text}</p>
        </div>
        <div className="blog-grid">
          {posts.slice(0, 3).map((post, i) => (
            <a className="blog-card reveal" href={post.href} key={i}>
              <div className={`blog-art ${COLORS[post.color]}`}>
                <span><T v={post.art} /></span>
                <b>↗</b>
              </div>
              <p className="tiny">{post.category}</p>
              <h3><T v={post.title} brand /></h3>
              <p><T v={post.text} brand /></p>
            </a>
          ))}
        </div>
        <a className="text-link centered glass-link" href={c.insights.button.href}>{c.insights.button.label}<span aria-hidden="true">↗</span>
        </a>
      </section>
      <section className="closing wrap reveal">
        <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </a>
        <h2><T v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <button className="button secondary" data-enquire="">{c.closing.button}<span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </main>
  );
}

import "../../home.css";
import PageHero from "../../components/PageHero";
import PlayerResults from "../../components/PlayerResults";
import { HomePartners } from "../../components/Partners";
import { getContent, pageMetadata } from "../../lib/content";
import { COLORS } from "../../content/shape";
import { Img, Text } from "../../components/Text";

export const generateMetadata = () => pageMetadata("home");

// Markup mirrors the reference homepage (sam.harsh-4844.chatgpt.site, v17).
// The results arrows are wired up in SiteInteractions.js.
export default async function Home() {
  const [c, { posts }, { header }] = await Promise.all([getContent("home"), getContent("blogs"), getContent("global")]);
  return (
    <main id="main" className="home-page">
      <PageHero
        eyebrow={c.hero.eyebrow}
        labelIsH1
        title={<>{c.hero.statement}<br /><span>{c.hero.statementAccent}</span></>}
        description={c.hero.text && <Text v={c.hero.text} brand />}
        slides={c.hero.slides.map((slide) => slide.image)}
        actions={<a className="button" href={c.hero.button.href}>{c.hero.button.label}{" "}<span aria-hidden="true">↓</span></a>}
        caption={c.hero.caption}
      />
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
          <span className="photo-credit"><Text v={c.coach.photoCredit} /></span>
        </div>
        <div className="coach-copy">
          <p className="eyebrow">{c.coach.eyebrow}</p>
          <h2><Text v={c.coach.heading} brand /></h2>
          <p>{c.coach.text}</p>
          <a className="text-link home-capsule" href={c.coach.button.href}>{c.coach.button.label}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="wrap pathways" id="pathways">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{c.pathways.eyebrow}</p>
            <h2><Text v={c.pathways.heading} brand /></h2>
          </div>
        </div>
        <div className="equal-paths three-paths">
          {c.pathways.cards.map((card, i) => (
            <article className="path-card" key={i}>
              <span className="eyebrow">{card.eyebrow}</span>
              <h3><Text v={card.heading} brand /></h3>
              <p>{card.text}</p>
              <a className="home-capsule product-capsule" href={card.button.href}>{card.button.label}</a>
            </article>
          ))}
        </div>
      </section>
      <PlayerResults />
      <HomePartners />
      <section className="wrap insights">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{c.insights.eyebrow}</p>
            <h2><Text v={c.insights.heading} brand /></h2>
          </div>
          <p>{c.insights.text}</p>
        </div>
        <div className="blog-grid" tabIndex="0">
          {posts.slice(0, 3).map((post, i) => (
            <a className="blog-card reveal" href={post.href} key={i}>
              <div className={`blog-art ${COLORS[post.color]}`}>
                <span><Text v={post.art} /></span>
                <b>↗</b>
              </div>
              <p className="tiny">{post.category}</p>
              <h3><Text v={post.title} brand /></h3>
              <p><Text v={post.text} brand /></p>
            </a>
          ))}
        </div>
        <a className="text-link centered glass-link" href={c.insights.button.href}>{c.insights.button.label}<span aria-hidden="true">↗</span></a>
      </section>
      <section className="closing wrap reveal">
        <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </a>
        <h2><Text v={c.closing.heading} brand /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <button className="button secondary" data-enquire="">{c.closing.button}<span aria-hidden="true">↗</span></button>
        </div>
      </section>
    </main>
  );
}

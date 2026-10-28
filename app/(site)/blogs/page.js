import Link from "next/link";
import Partners from "../../partners";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { COLORS } from "../../content/shape";
import { Img, T } from "../../content/text";

export const generateMetadata = () => pageMetadata("blogs");

export default async function Blogs() {
  const [c, { header }] = await Promise.all([getContent("blogs"), getContent("global")]);
  return (
    <main id="main">
      <section className="wrap page-hero">
        <p className="eyebrow reveal">{c.hero.eyebrow}</p>
        <h1 className="reveal">{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></h1>
        <p className="lede reveal">
          {c.hero.text}
        </p>
      </section>
      <section className="wrap blog-list">
        <div className="blog-grid">
          {c.posts.map((post, i) => (
            <a className={i < 4 ? "blog-card reveal" : "blog-card"} href={post.href} key={i}>
              <div className={`blog-art ${COLORS[post.color]}`}><span><T v={post.art} /></span><b>↗</b></div>
              <p className="tiny">{post.category}</p>
              <h3><T v={post.title} brand /></h3>
              <p><T v={post.text} brand /></p>
            </a>
          ))}
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </Link>
        <h2><T v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <Link className="button" href={c.closing.button.href}>{c.closing.button.label}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

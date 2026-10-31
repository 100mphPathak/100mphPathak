import Link from "next/link";
import Partners from "../../components/Partners";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import { COLORS } from "../../content/shape";
import { Img, Text } from "../../components/Text";
import PostCard from "../../components/PostCard";
import { publishedPosts } from "../../lib/posts";

export const generateMetadata = () => pageMetadata("blogs");

export default async function Blogs() {
  const [c, { header }, live] = await Promise.all([getContent("blogs"), getContent("global"), publishedPosts()]);
  return (
    <main id="main">
      <section className="wrap page-hero">
        <p className="eyebrow reveal">{c.hero.eyebrow}</p>
        <h1 className="reveal hero-title">{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></h1>
        <p className="lede reveal">
          {c.hero.text}
        </p>
      </section>
      <section className="wrap blog-list">
        <div className="blog-grid">
          {/* Posts written in the CMS. Until the first one is published, the original cards stay. */}
          {live.length > 0 && live.map((post, i) => <PostCard index={i} key={post.id} post={post} reveal={i < 4} />)}
          {live.length === 0 && c.posts.map((post, i) => (
            <a className={i < 4 ? "blog-card reveal" : "blog-card"} href={post.href} key={i}>
              <div className={`blog-art ${COLORS[post.color]}`}><span><Text v={post.art} /></span><b>↗</b></div>
              <p className="tiny">{post.category}</p>
              <h3><Text v={post.title} brand /></h3>
              <p><Text v={post.text} brand /></p>
            </a>
          ))}
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Img v={header.logo} />
        </Link>
        <h2><Text v={c.closing.heading} /></h2>
        <p>{c.closing.text}</p>
        <div className="actions">
          <Link className="button" href={c.closing.button.href}>{c.closing.button.label}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}

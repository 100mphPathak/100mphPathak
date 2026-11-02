import { COLORS } from "../content/shape";
import { getContent } from "../lib/content";
import { publishedPosts } from "../lib/posts";
import { FaqList } from "./Faq";
import PostCard from "./PostCard";
import { Text } from "./Text";

// Sections that look the same on every page (client request). Their content comes from the Home page
// (Admin → Pages → Home), so editing it there updates every page.

// "Fast Bowling Insights": the 3 newest blog posts (the original cards until the first post is published).
export async function Insights() {
  const [{ insights }, { posts }, live] = await Promise.all([getContent("home"), getContent("blogs"), publishedPosts(3)]);
  return (
    <section className="wrap insights">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{insights.eyebrow}</p>
          <h2><Text brand highlight="Insights" v={insights.heading} /></h2>
        </div>
        <p>{insights.text}</p>
      </div>
      <div className="blog-grid" tabIndex="0">
        {live.length > 0 && live.map((post, i) => <PostCard index={i} key={post.id} post={post} />)}
        {live.length === 0 && posts.slice(0, 3).map((post, i) => (
          <a className="blog-card reveal" href={post.href} key={i}>
            <div className={`blog-art ${COLORS[post.color]}`}>
              <span><Text v={post.art} /></span>
              <b>↗︎</b>
            </div>
            <p className="tiny">{post.category}</p>
            <h3><Text brand v={post.title} /></h3>
            <p><Text brand v={post.text} /></p>
          </a>
        ))}
      </div>
      <a className="text-link centered glass-link" href={insights.button.href}>{insights.button.label}<span aria-hidden="true">↗︎</span></a>
    </section>
  );
}

// Q&A: the Home page's label, heading and description on every page; each page keeps its own questions.
export async function SiteFaq({ items }) {
  const { faq } = await getContent("home");
  return <FaqList highlight="Clear answers." v={{ ...faq, items: items ?? faq.items }} />;
}

import Link from "next/link";
import { Img } from "./Text";

// One article card (Insights library and "Related reading"). Styles in app/(site)/blogs/blogs.css.
// post: { slug, title, excerpt, category, cover_image, minutes }
export default function ArticleCard({ post, heading: Heading = "h2" }) {
  const href = `/blogs/${post.slug}/`;
  return (
    <article className="article-card">
      <Link className="article-cover" href={href} tabIndex={-1}>
        {post.cover_image?.src ? (
          <Img sizes="(max-width: 760px) 92vw, 400px" v={{ ...post.cover_image, alt: post.cover_image.alt || "" }} />
        ) : (
          <span>{post.category}</span>
        )}
      </Link>
      <p className="article-meta">{post.category} <span aria-hidden="true">·</span> {post.minutes} min read</p>
      <Heading><Link href={href}>{post.title}</Link></Heading>
      {post.excerpt && <p>{post.excerpt}</p>}
      <Link aria-hidden="true" className="article-more" href={href} tabIndex={-1}>
        Read the article <span>→</span>
      </Link>
    </article>
  );
}

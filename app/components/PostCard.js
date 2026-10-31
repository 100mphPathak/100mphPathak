import Link from "next/link";
import { COLORS } from "../content/shape";
import { postDate } from "../lib/posts";
import { Img } from "./Text";

const SHADES = Object.values(COLORS);

// A published blog post as a card (blog list and home page). Same look as the original cards,
// with the cover photo in the coloured box; posts without a cover get a coloured box with the category.
export default function PostCard({ post, index = 0, reveal = true }) {
  return (
    <Link className={`blog-card${reveal ? " reveal" : ""}`} href={`/blogs/${post.slug}/`}>
      <div className={`blog-art ${post.cover_image?.src ? "has-cover" : SHADES[index % SHADES.length]}`}>
        {post.cover_image?.src ? (
          <Img sizes="(max-width: 760px) 90vw, 400px" v={{ ...post.cover_image, alt: post.cover_image.alt || "" }} />
        ) : (
          <span>{post.category}</span>
        )}
        <b>↗</b>
      </div>
      <p className="tiny">{post.category} · {postDate(post.published_at)}</p>
      <h3>{post.title}</h3>
      {post.excerpt && <p>{post.excerpt}</p>}
    </Link>
  );
}

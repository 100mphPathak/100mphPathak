"use client";

import Link from "next/link";
import { useState } from "react";
import { Img } from "../../components/Text";

// The guide library: category chips + search over the published posts, then the cards.
// posts: [{ id, slug, title, excerpt, category, cover_image, minutes }]
export default function Library({ posts, labels }) {
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState("");
  const categories = [...new Set(posts.map((post) => post.category))];
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = posts.filter(
    (post) =>
      (!category || post.category === category) &&
      words.every((word) => `${post.title} ${post.excerpt ?? ""} ${post.category}`.toLowerCase().includes(word)),
  );

  return (
    <section className="wrap guide-library" id="guides">
      <div className="library-toolbar">
        <div aria-label="Filter guides by category" className="library-chips" role="group">
          {[null, ...categories].map((name) => (
            <button aria-pressed={category === name} className="chip" key={name ?? "all"} onClick={() => setCategory(name)} type="button">
              {name ?? labels.allLabel}
            </button>
          ))}
        </div>
        <label className="library-search">
          <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <span className="sr-only">Search guides</span>
          <input onChange={(e) => setQuery(e.target.value)} placeholder={labels.searchPlaceholder} type="search" value={query} />
        </label>
      </div>
      <p aria-live="polite" className="library-count">{shown.length} {shown.length === 1 ? "article" : "articles"}</p>
      {shown.length === 0 && <p className="library-empty">{labels.empty}</p>}
      <div className="library-grid">
        {shown.map((post) => (
          <article className="article-card" key={post.id}>
            <Link className="article-cover" href={`/blogs/${post.slug}/`} tabIndex={-1}>
              {post.cover_image?.src ? (
                <Img sizes="(max-width: 760px) 92vw, 400px" v={{ ...post.cover_image, alt: post.cover_image.alt || "" }} />
              ) : (
                <span>{post.category}</span>
              )}
            </Link>
            <p className="article-meta">{post.category} <span aria-hidden="true">·</span> {post.minutes} min read</p>
            <h2><Link href={`/blogs/${post.slug}/`}>{post.title}</Link></h2>
            {post.excerpt && <p>{post.excerpt}</p>}
            <Link aria-hidden="true" className="article-more" href={`/blogs/${post.slug}/`} tabIndex={-1}>
              Read the article <span>→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

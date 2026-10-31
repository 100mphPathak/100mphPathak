import Link from "next/link";
import { notFound } from "next/navigation";
import "../../../home.css";
import "../../../post.css";
import ArticleBody from "../../../components/ArticleBody";
import { Img } from "../../../components/Text";
import { getPost, postDate } from "../../../lib/posts";
import { SITE_URL, seo } from "../../../seo";

// Search title/description/image from the SEO panel; empty fields fall back to the post's own.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  const s = post.seo ?? {};
  const metadata = seo(`/blogs/${post.slug}/`, s.title || post.title, s.description || post.excerpt, {
    ogImage: s.ogImage?.src ? s.ogImage : post.cover_image,
  });
  metadata.openGraph.type = "article";
  if (post.published_at) metadata.openGraph.publishedTime = new Date(post.published_at).toISOString();
  if (post.preview) metadata.robots = { index: false, follow: false };
  return metadata;
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}/`;
  const image = post.seo?.ogImage?.src || post.cover_image?.src;
  // Article structured data: lets Google show the date, author and image in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.description || post.excerpt || undefined,
    ...(image && { image: [image.startsWith("/") ? SITE_URL + image : image] }),
    ...(post.published_at && { datePublished: new Date(post.published_at).toISOString() }),
    dateModified: new Date(post.updated_at).toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Pathak100MPH", url: SITE_URL },
    mainEntityOfPage: url,
  };

  return (
    <main id="main">
      <article className="wrap post">
        <header className="post-head">
          <p className="eyebrow">
            <Link href="/blogs/">Blog</Link> · {post.category}
          </p>
          <h1 className="post-title">{post.title}</h1>
          {post.excerpt && <p className="post-lede">{post.excerpt}</p>}
          <p className="post-meta">
            By {post.author}
            {post.published_at ? <> · <time dateTime={new Date(post.published_at).toISOString()}>{postDate(post.published_at)}</time></> : " · Not published yet"}
          </p>
        </header>
        {post.cover_image?.src && <Img className="post-cover" priority sizes="(max-width: 860px) 100vw, 860px" v={post.cover_image} />}
        <ArticleBody content={post.body} />
        <p className="post-back">
          <Link className="button secondary" href="/blogs/">← All articles</Link>
        </p>
      </article>
      {/* JSON.stringify escapes quotes; "<" is escaped too so text can never close the script tag. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
    </main>
  );
}

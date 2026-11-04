import Link from "next/link";
import { notFound } from "next/navigation";
import "../../../home.css";
import "../../../post.css";
import "../blogs.css";
import ArticleCard from "../../../components/ArticleCard";
import ArticleBody, { articleToc } from "../../../components/ArticleBody";
import Partners from "../../../components/Partners";
import { Img } from "../../../components/Text";
import { getContent } from "../../../lib/content";
import { getPost, postDate, publishedPosts, readMinutes } from "../../../lib/posts";
import { SITE_URL, seo } from "../../../seo";
import TocSpy from "./toc-spy";

// Lists the published posts so their pages are built ahead and cached (without this, every visit renders
// the page again). Posts published later are built on their first visit, then cached; publishing refreshes them.
export async function generateStaticParams() {
  return (await publishedPosts()).map((post) => ({ slug: post.slug }));
}

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
  const [{ author, related }, recent] = await Promise.all([getContent("blogs"), publishedPosts(4)]);
  const toc = articleToc(post.body);
  const others = recent.filter((other) => other.slug !== post.slug).slice(0, 3);
  const tocLinks = toc.map((item) => <a href={`#${item.id}`} key={item.id}>{item.text}</a>);

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
    <main className="article-page" id="main">
      {/* Reading progress along the top of the screen (CSS only, see post.css) */}
      <div aria-hidden="true" className="reading-progress" />
      <article className="wrap post">
        <nav aria-label="Breadcrumb" className="post-breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">›</span>
          <Link href="/blogs/">Insights</Link><span aria-hidden="true">›</span>
          <span aria-current="page">{post.title}</span>
        </nav>
        <header className="post-head">
          <p className="eyebrow">{post.category}</p>
          <h1 className="post-title">{post.title}</h1>
          {post.excerpt && <p className="post-lede">{post.excerpt}</p>}
          <div className="post-byline">
            <Img className="post-avatar" v={{ ...author.photo, alt: post.author }} />
            <div className="post-author"><span>Author</span><strong>{post.author}</strong><small>{author.role}</small></div>
            <div className="post-meta">
              <span>{post.published_at ? <>Updated <time dateTime={new Date(post.updated_at).toISOString()}>{postDate(post.updated_at)}</time></> : "Draft preview"}</span>
              <span>{readMinutes(post.body)} min read</span>
            </div>
          </div>
        </header>
        {post.cover_image?.src && <Img className="post-cover" priority sizes="(max-width: 1000px) 100vw, 1000px" v={post.cover_image} />}

        <div className={toc.length ? "post-layout" : "post-layout no-toc"}>
          {toc.length > 0 && (
            <aside aria-label="In this guide" className="post-toc">
              <p className="eyebrow">In this guide</p>
              <nav>{tocLinks}</nav>
              <TocSpy />
            </aside>
          )}
          <div className="post-main">
            {toc.length > 0 && (
              <details className="post-toc-mobile">
                <summary>In this guide</summary>
                <nav>{tocLinks}</nav>
              </details>
            )}
            <ArticleBody content={post.body} />
            <aside className="post-author-note">
              <Img className="post-author-photo" sizes="96px" v={{ ...author.photo, alt: post.author }} />
              <div>
                <h2>{post.author}</h2>
                <p className="post-author-role">{author.role}</p>
                <p>{author.bio}</p>
                <Link className="text-link" href={author.link.href}>{author.link.label}<span aria-hidden="true">↗︎</span></Link>
              </div>
            </aside>
            {post.published_at && (
              <p className="post-dates">
                Originally published {postDate(post.published_at)}. Updated {postDate(post.updated_at)}.
              </p>
            )}
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="wrap post-related">
          <div className="post-related-head">
            <div>
              <p className="eyebrow">{related.eyebrow}</p>
              <h2>{related.heading}</h2>
            </div>
            <Link className="text-link" href={related.link.href}>{related.link.label}<span aria-hidden="true">↗︎</span></Link>
          </div>
          <div className="library-grid">
            {others.map((other) => <ArticleCard heading="h3" key={other.id} post={{ ...other, minutes: readMinutes(other.body) }} />)}
          </div>
        </section>
      )}

      <Partners />
      {/* JSON.stringify escapes quotes; "<" is escaped too so text can never close the script tag. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </main>
  );
}

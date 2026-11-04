import Link from "next/link";
import Partners from "../../components/Partners";
import "../../home.css";
import "./blogs.css";
import { getContent, pageMetadata } from "../../lib/content";
import { Img, Text } from "../../components/Text";
import { publishedPosts, readMinutes } from "../../lib/posts";
import Library from "./library";

export const generateMetadata = () => pageMetadata("blogs");

export default async function Blogs() {
  const [c, live] = await Promise.all([getContent("blogs"), publishedPosts()]);
  // Only what the cards need goes to the browser (not the article bodies).
  const posts = live.map(({ id, slug, title, excerpt, category, cover_image, body }) => ({ id, slug, title, excerpt, category, cover_image, minutes: readMinutes(body) }));
  const [featured] = posts;

  return (
    <main className="insights-page" id="main">
      <section className="wrap hub-hero">
        <div>
          <p className="eyebrow">{c.intro.eyebrow}</p>
          <h1>{c.intro.heading}<br /><span>{c.intro.headingAccent}</span></h1>
        </div>
        <p>{c.intro.text}</p>
      </section>

      {featured && (
        <section className="wrap hub-feature">
          <Link aria-label={featured.title} className="hub-feature-image" href={`/blogs/${featured.slug}/`}>
            {featured.cover_image?.src ? (
              <Img priority sizes="(max-width: 760px) 92vw, 600px" v={{ ...featured.cover_image, alt: featured.cover_image.alt || "" }} />
            ) : (
              <span>{featured.category}</span>
            )}
          </Link>
          <div>
            <p className="eyebrow">{c.featured.eyebrow}</p>
            <h2>{featured.title}</h2>
            {featured.excerpt && <p>{featured.excerpt}</p>}
            <Link className="button" href={`/blogs/${featured.slug}/`}>{c.featured.button}<span aria-hidden="true">↗︎</span></Link>
          </div>
        </section>
      )}

      <Library labels={c.library} posts={posts} />

      <section className="wrap hub-coach">
        <Img loading="lazy" sizes="(max-width: 760px) 92vw, 560px" v={c.coach.photo} />
        <div>
          <p className="eyebrow">{c.coach.eyebrow}</p>
          <h2><Text highlight="Ankit Pathak" v={c.coach.heading} /></h2>
          <p>{c.coach.text}</p>
          <Link className="text-link" href={c.coach.link.href}>{c.coach.link.label}<span aria-hidden="true">↗︎</span></Link>
        </div>
      </section>

     <Partners/>
     

    </main>
  );
}

import Link from "next/link";
import "../home.css";
import "../post.css";
import Partners from "./Partners";
import { Text } from "./Text";
import { getContent } from "../lib/content";
import TocSpy from "../(site)/blogs/[slug]/toc-spy";

// Legal pages (Terms, Return Policy): same layout as a blog article (see blogs/[slug]/page.js and post.css), without images.
const lines = (text) => text.split("\n").filter(Boolean);

export default async function LegalPage({ slug }) {
  const c = await getContent(slug);
  const sections = c.sections.map((section, i) => ({ ...section, id: `section-${i + 1}` }));
  const words = [c.lede, c.intro, ...sections.flatMap((s) => [s.heading, s.text, ...s.points, s.note, ...(s.subsections ?? []).flatMap((sub) => [sub.heading, sub.text])])].join(" ").split(/\s+/).length;
  const tocLinks = sections.map((s) => <a href={`#${s.id}`} key={s.id}>{s.heading}</a>);

  return (
    <main className="article-page" id="main">
      <div aria-hidden="true" className="reading-progress" />
      <article className="wrap post">
        <nav aria-label="Breadcrumb" className="post-breadcrumb legal-center">
          <Link href="/">Home</Link><span aria-hidden="true">›</span>
          <span aria-current="page">{c.title}</span>
        </nav>
        <header className="post-head legal-center">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1 className="post-title">{c.title}</h1>
          <p className="post-lede">{c.lede}</p>
          <div className="post-byline">
            <div className="post-meta legal-meta">
              <span>Last updated {c.updated}</span>
              <span>{Math.max(1, Math.round(words / 200))} min read</span>
            </div>
          </div>
        </header>

        <div className="post-layout">
          <aside aria-label="On this page" className="post-toc">
            <p className="eyebrow">On this page</p>
            <nav>{tocLinks}</nav>
            <TocSpy />
          </aside>
          <div className="post-main">
            <details className="post-toc-mobile">
              <summary>On this page</summary>
              <nav>{tocLinks}</nav>
            </details>
            <div className="post-body">
              {lines(c.intro).map((line, i) => <p key={i}><Text v={line} /></p>)}
              {sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.heading}</h2>
                  {lines(s.text).map((line, i) => <p key={i}><Text v={line} /></p>)}
                  {s.points.length > 0 && <ul>{s.points.map((point, i) => <li key={i}><Text v={point} /></li>)}</ul>}
                  {lines(s.note).map((line, i) => <p key={i}><Text v={line} /></p>)}
                  {s.subsections?.map((sub, i) => (
                    <div className="legal-sub" key={i}>
                      <h3>{sub.heading}</h3>
                      {lines(sub.text).map((line, j) => <p key={j}><Text v={line} /></p>)}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>
      <Partners />
    </main>
  );
}

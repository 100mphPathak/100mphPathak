import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { youtubeId } from "../content/article";
import { articleExtensions } from "../content/article-extensions";

// Turns a saved article (Tiptap JSON, already cleaned on save) into HTML on the server.
// Same building blocks as the admin editor, but no editor code reaches the visitor's browser.
// No dangerouslySetInnerHTML: every block becomes a React element, so text can never become code.
const nodeMapping = {
  // Our own iframe: only the video id is used, always on youtube-nocookie.com.
  youtube: ({ node }) => {
    const id = youtubeId(node.attrs.src);
    if (!id) return null;
    const start = Number.isInteger(node.attrs.start) && node.attrs.start > 0 ? `?start=${node.attrs.start}` : "";
    return (
      <div className="post-video">
        <iframe
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          src={`https://www.youtube-nocookie.com/embed/${id}${start}`}
          title="YouTube video"
        />
      </div>
    );
  },
  // Main headings get an id, so the "In this guide" list can link to them.
  heading: ({ node, children }) => {
    const Tag = node.attrs.level === 3 ? "h3" : "h2";
    const align = node.attrs.textAlign;
    return <Tag id={Tag === "h2" ? (isFaqHeading(node) ? "common-questions" : headingId(node)) : undefined} style={align && align !== "left" ? { textAlign: align } : undefined}>{children}</Tag>;
  },
  image: ({ node }) => (
    // eslint-disable-next-line @next/next/no-img-element -- article images keep their own size; next/image needs it known
    <img alt={node.attrs.alt ?? ""} decoding="async" height={node.attrs.height ?? undefined} loading="lazy" src={node.attrs.src} width={node.attrs.width ?? undefined} />
  ),
};

const renderNodes = (nodes) => renderToReactElement({
  content: { type: "doc", content: nodes },
  extensions: articleExtensions,
  options: { nodeMapping },
});

// Works on saved JSON and on the renderer's own nodes (which have .textContent and type.name).
const headingText = (node) =>
  (typeof node?.textContent === "string" ? node.textContent : (node?.content ?? []).map((child) => child.text ?? "").join("")).trim();
// ponytail: two headings with the same text get the same id; the list then jumps to the first one.
const headingId = (node) => headingText(node).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
const isFaqHeading = (node) => (node.type?.name ?? node.type) === "heading" && node.attrs?.level === 2 && /faq|common questions|frequently asked|good questions/i.test(headingText(node));
const FAQ_TITLE = "Good questions. Clear answers.";

// The article's main headings, for the "In this guide" list: [{ id, text }].
export function articleToc(content) {
  const toc = [];
  for (const node of content?.content ?? []) {
    if (node.type !== "heading" || node.attrs?.level === 3 || !headingText(node)) continue;
    toc.push(isFaqHeading(node) ? { id: "common-questions", text: FAQ_TITLE } : { id: headingId(node), text: headingText(node) });
  }
  return toc;
}

export default function ArticleBody({ content }) {
  const blocks = content?.content ?? [];
  const faqIndex = blocks.findIndex(isFaqHeading);
  const faqEnd = faqIndex < 0 ? -1 : blocks.findIndex((node, index) => index > faqIndex && node.type === "heading" && node.attrs?.level === 2);
  const faqBlocks = faqIndex < 0 ? [] : blocks.slice(faqIndex + 1, faqEnd < 0 ? blocks.length : faqEnd);
  const questions = [];
  for (const node of faqBlocks) {
    if (node.type === "heading" && node.attrs?.level === 3) {
      questions.push({ question: headingText(node), answer: [] });
    } else if (questions.length) {
      questions.at(-1).answer.push(node);
    }
  }

  if (!questions.length) return <div className="post-body">{renderToReactElement({ content, extensions: articleExtensions, options: { nodeMapping } })}</div>;

  const end = faqEnd < 0 ? blocks.length : faqEnd;
  const title = FAQ_TITLE;
  return (
    <>
      <div className="post-body">{renderNodes(blocks.slice(0, faqIndex))}</div>
      <section aria-labelledby="post-faq-title" className="post-faqs" id="common-questions">
        <div className="post-faq-heading">
          <p className="eyebrow">Common questions</p>
          <h2 id="post-faq-title">{title}</h2>
        </div>
        <div className="post-faq-list">
          {questions.map(({ question, answer }, index) => (
            <details key={`${question}-${index}`}>
              <summary><h3>{question}</h3><span aria-hidden="true">+</span></summary>
              {answer.length > 0 && <div className="post-faq-answer post-body">{renderNodes(answer)}</div>}
            </details>
          ))}
        </div>
      </section>
      {faqEnd >= 0 && <div className="post-body">{renderNodes(blocks.slice(end))}</div>}
    </>
  );
}

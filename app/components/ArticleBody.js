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
  image: ({ node }) => (
    // eslint-disable-next-line @next/next/no-img-element -- article images keep their own size; next/image needs it known
    <img alt={node.attrs.alt ?? ""} decoding="async" height={node.attrs.height ?? undefined} loading="lazy" src={node.attrs.src} width={node.attrs.width ?? undefined} />
  ),
};

export default function ArticleBody({ content }) {
  return <div className="post-body">{renderToReactElement({ content, extensions: articleExtensions, options: { nodeMapping } })}</div>;
}

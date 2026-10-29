import { getContent } from "../lib/content";

// Small "Request a call back" reminder that appears after 30 seconds.
export default async function CallbackPrompt() {
  const { callbackPrompt: prompt } = await getContent("global");
  return (
    <>
      <aside
        aria-label="Callback invitation"
        className="callback-prompt"
        hidden
      >
        <button
          aria-label="Dismiss callback invitation"
          className="prompt-close"
        >
          {"×"}
        </button>
        <span className="eyebrow">{prompt.eyebrow}</span>
        <strong>{prompt.heading}</strong>
        <button className="text-link" data-enquire="">
          {prompt.button}{" "}
          <span>{"↗"}</span>
        </button>
      </aside>
    </>
  );
}

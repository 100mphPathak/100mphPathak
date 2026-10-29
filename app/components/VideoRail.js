import { Text } from "./Text";

const ALLOW ="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

// Rail of YouTube Shorts (VideoRail): { eyebrow, heading, hint, shorts: [{ videoId, title }] }.
export default function VideoRail({ v }) {
  return (
    <section className="wrap reel-section">
      <div className="section-head">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2><Text v={v.heading} /></h2>
        </div>
        <span className="swipe-hint"><Text v={v.hint} brand /></span>
      </div>
      <div aria-label={v.eyebrow} className="reel-rail" tabIndex="0">
        {v.shorts.map((short, i) => (
          <article className="native-reel video-story" key={i}>
            <iframe allow={ALLOW} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src={`https://www.youtube-nocookie.com/embed/${short.videoId}?rel=0`} title={short.title}>
            </iframe>
            <a className="video-fallback" href={`https://www.youtube.com/shorts/${short.videoId}`} rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
          </article>
        ))}
      </div>
    </section>
  );
}

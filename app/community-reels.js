import Link from "next/link";
import { T } from "./content/text";

// Instagram reels rail: { eyebrow, heading, hint, items: [{ reelId }] }.
export default function CommunityReels({ v }) {
  return (
    <section className="wrap reel-section">
      <div className="section-head">
        <div>
          <p className="eyebrow">{v.eyebrow}</p>
          <h2>
            <T v={v.heading} />
          </h2>
        </div>
        <span className="swipe-hint">{v.hint}</span>
      </div>
      <div aria-label={v.eyebrow} className="reel-rail" tabIndex={0}>
        {v.items.map(({ reelId }, i) => {
          const url = `https://www.instagram.com/reel/${reelId}/`;
          return (
            <article className="native-reel" key={i}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
              >
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  View this post on Instagram
                </Link>
              </blockquote>
            </article>
          );
        })}
      </div>
    </section>
  );
}

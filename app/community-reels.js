import Link from "next/link";

const reels = ["DbPxoFiyA-5", "Da0KkjAy0Rh", "Da2wvF5ye3p"];

export default function CommunityReels({ eyebrow, title, subtitle }) {
  return (
    <section className="wrap reel-section">
      <div className="section-head">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>
            {title}
            <br />
            {subtitle}
          </h2>
        </div>
        <span className="swipe-hint">From the Pathak100MPH community</span>
      </div>
      <div aria-label={eyebrow} className="reel-rail" tabIndex={0}>
        {reels.map((id) => {
          const url = `https://www.instagram.com/reel/${id}/`;
          return (
            <article className="native-reel" key={id}>
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

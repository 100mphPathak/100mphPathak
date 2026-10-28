import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  description,
  videoTitle,
  videoId = "-iHp0AR06XE",
  actions,
  videoActions,
  trust,
  caption,
}) {
  return (
    <section className="page-hero wrap mobile-video-first">
      <div className="hero-copy">
        <p className="eyebrow reveal">{eyebrow}</p>
        <h1 className="reveal">{title}</h1>
        {description && <p className="lede reveal">{description}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      <div className="vsl-player">
        <div className="vsl-frame">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
            title={videoTitle}
          />
        </div>
        <Link
          className="video-fallback"
          href={`https://www.youtube.com/watch?v=${videoId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Watch on YouTube ↗
        </Link>
        {videoActions && <div className="hero-actions">{videoActions}</div>}
      </div>
      {trust && <div className="service-trust">{trust}</div>}
      {caption && <div className="hero-caption">{caption}</div>}
    </section>
  );
}

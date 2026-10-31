import HeroCarousel from "./HeroCarousel";
import YouTubePlayer from "./YouTubePlayer";
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
  labelIsH1 = false,
  slides,
}) {
  const Title = labelIsH1 ? "div" : "h1";
  return (
    <section className="page-hero wrap mobile-video-first">
      <div className="hero-copy">
        {labelIsH1 ? <h1 className="eyebrow reveal">{eyebrow}</h1> : <p className="eyebrow reveal">{eyebrow}</p>}
        <Title className="reveal hero-title">{title}</Title>
        {description && <p className="lede reveal">{description}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
      {slides ? (
        <HeroCarousel slides={slides} />
      ) : (
        <div className="vsl-player">
          <div className="vsl-frame">
            <YouTubePlayer title={videoTitle} videoId={videoId} />
          </div>
          {videoActions && <div className="hero-actions">{videoActions}</div>}
        </div>
      )}
      {trust && <div className="service-trust">{trust}</div>}
      {caption && <div className="hero-caption">{caption}</div>}
    </section>
  );
}

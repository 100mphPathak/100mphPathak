import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
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
  showYoutubeLink = true,
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
        
          {videoActions && <div className="hero-actions">{videoActions}</div>}
        </div>
    
      {trust && <div className="service-trust">{trust}</div>}
      {caption && <div className="hero-caption">{caption}</div>}
    </section>
  );
}

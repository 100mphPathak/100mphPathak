"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DELAY = 5000;

// Swipeable image carousel for page heroes. Native scroll-snap does the sliding; this
// component only adds autoplay (paused on hover, focus, hidden tab and reduced motion),
// arrows and dots.
export default function HeroCarousel({ slides, label = "Academy photos" }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = (i) => {
    const el = track.current;
    if (!el) return;
    const next = (i + count) % count;
    el.scrollTo({ left: next * el.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  useEffect(() => {
    const el = track.current;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (!document.hidden) go(index + 1);
    }, DELAY);
    return () => clearInterval(timer);
  }, [index, paused, count]); // eslint-disable-line react-hooks/exhaustive-deps

  const first = slides[0];
  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      className="vsl-player page-carousel"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
    >
      <div className="vsl-frame carousel-frame" style={{ aspectRatio: `${first.width} / ${first.height}` }}>
        <div className="carousel-track" ref={track}>
          {slides.map((slide, i) => (
            <div aria-label={`${i + 1} of ${count}`} aria-roledescription="slide" className="carousel-slide" key={i} role="group">
              <Image
                alt={slide.alt}
                height={slide.height}
                loading={i === 0 ? undefined : "eager"}
                preload={i === 0}
                sizes="(max-width: 999px) 100vw, 1000px"
                src={slide.src}
                width={slide.width}
              />
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}

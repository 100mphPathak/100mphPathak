"use client";

import { useState } from "react";

// Shows the video's thumbnail with a play button; YouTube's player (~1 MB of scripts) loads only
// when someone clicks. Pages open much faster, and visitors who don't watch never download it.
export default function YouTubePlayer({ videoId, title }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&autoplay=1`}
        title={title}
      />
    );
  }
  return (
    <button aria-label={title ? `Play video: ${title}` : "Play video"} className="vsl-play" onClick={() => setPlaying(true)} type="button">
      {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail */}
      <img alt="" decoding="async" height="360" loading="lazy" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} width="480" />
      <span aria-hidden="true" className="vsl-play-icon" />
    </button>
  );
}

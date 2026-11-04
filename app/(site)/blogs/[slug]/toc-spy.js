"use client";

import { useEffect } from "react";

// Marks the "In this guide" link of the section being read (aria-current; styled in post.css).
export default function TocSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll(".post-toc a")];
    const targets = links.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
    if (!targets.length) return;
    const mark = () => {
      // The last heading that has passed the upper third of the screen.
      const line = window.innerHeight / 3;
      let current = targets[0];
      for (const target of targets) if (target.getBoundingClientRect().top <= line) current = target;
      for (const link of links) link.setAttribute("aria-current", link.hash === `#${current.id}` ? "true" : "false");
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
    return () => window.removeEventListener("scroll", mark);
  }, []);
  return null;
}

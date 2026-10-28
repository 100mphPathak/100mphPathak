import global from "./global";
import home from "./home";
import blogs from "./blogs";

// Per-page SEO fields. Empty values fall back to the global defaults (see lib/content.js).
const seo = (title, description) => ({
  title,
  description,
  canonical: "",
  noindex: false,
  ogTitle: "",
  ogDescription: "",
  ogImage: { src: "", alt: "", width: 1200, height: 630 },
});

// Every CMS-managed document. `route` is null for site-wide content.
// `alsoRevalidate` lists other routes that render this document's content.
export const PAGES = {
  global: { slug: "global", title: "Site-wide settings", route: null, content: global, seo: {} },
  home: {
    slug: "home",
    title: "Home",
    route: "/",
    content: home,
    seo: seo("Best Fast Bowling Academy in India | Pathak100MPH", "Pathak100MPH is a high-performance fast bowling academy in India, with 65+ selections in five years. Explore academy assessments, online training and scholarships."),
  },
  blogs: {
    slug: "blogs",
    title: "Insights (blog list)",
    route: "/blogs/",
    alsoRevalidate: ["/"],
    content: blogs,
    seo: seo("Fast Bowling Coaching Tips & Guides | Pathak100MPH", "Fast bowling coaching tips and practical guides on pace, technique, training and preparation."),
  },
};

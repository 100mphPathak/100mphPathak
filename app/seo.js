export const SITE_URL = "https://www.pathak100mph.com";

// Every public route; the sitemap is generated from this list.
export const ROUTES = [
  "/",
  "/ankit-pathak/",
  "/assessment-trial/",
  "/online-training/",
  "/action-analysis/",
  "/scholarship/",
  "/facilities/",
  "/events/",
  "/blogs/",
];

// ponytail: one shared share-image; add per-page images if social previews need them.
const image = { url: "/assets/team.webp", width: 825, height: 1024, alt: "Ankit Pathak with Pathak100MPH players" };

// Next merges metadata shallowly, so each page needs its own full openGraph/twitter block.
export function seo(path, title, description) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Pathak100MPH", locale: "en_IN", url: path, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

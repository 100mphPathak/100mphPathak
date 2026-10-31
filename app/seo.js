export const SITE_URL = "https://www.pathak100mph.com";

// Fallback share image; pages and site-wide settings can override it from the CMS.
const image = { url: "/assets/nepal-team.webp", width: 1920, height: 912, alt: "Pathak100MPH players with the Nepal team" };

// Next merges metadata shallowly, so each page needs its own full openGraph/twitter block.
export function seo(path, title, description, { ogTitle, ogDescription, ogImage } = {}) {
  const shareTitle = ogTitle || title;
  const shareDescription = ogDescription || description;
  const shareImage = ogImage?.src ? { url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt } : image;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "Pathak100MPH", locale: "en_IN", url: path, title: shareTitle, description: shareDescription, images: [shareImage] },
    twitter: { card: "summary_large_image", title: shareTitle, description: shareDescription, images: [shareImage.url] },
  };
}

import { ROUTES, SITE_URL } from "./seo";

export default function sitemap() {
  return ROUTES.map((path) => ({
    url: SITE_URL + path,
    changeFrequency: path === "/blogs/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}

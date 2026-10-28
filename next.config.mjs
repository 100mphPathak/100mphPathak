export default {
  devIndicators: false,
  // Internal links all end in "/"; match them so pages are not served via a 308 redirect.
  trailingSlash: true,
  async headers() {
    return [
      {
        // public/assets filenames aren't hashed, so cache for a week and revalidate in the background.
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

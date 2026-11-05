// Uploaded media lives in the Supabase storage bucket; next/image may only fetch from there.
const mediaBase = process.env.NEXT_PUBLIC_SUPABASE_URL && `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.MEDIA_BUCKET ?? "media"}/**`;

export default {
  devIndicators: false,
  // Internal links all end in "/"; match them so pages are not served via a 308 redirect.
  trailingSlash: true,
  images: {
    remotePatterns: mediaBase ? [new URL(mediaBase)] : [],
  },
  experimental: {
    // Image uploads go through a server action; 4 MB file + multipart overhead (Vercel caps bodies at 4.5 MB).
    serverActions: { bodySizeLimit: "4.4mb" },
  },
  // Old addresses keep working (and pass their search ranking) after the client's URL changes.
  async redirects() {
    return [
      // pathak100mph.com → www.pathak100mph.com (one address for visitors and Google).
      { source: "/:path(.*)", has: [{ type: "host", value: "pathak100mph.com" }], destination: "https://www.pathak100mph.com/:path", permanent: true },
      // Password-reset emails sometimes land on the home page (Supabase falls back to its Site URL): hand the code to the reset flow.
      { source: "/", has: [{ type: "query", key: "code", value: "(?<code>[A-Za-z0-9-]{8,100})" }], destination: "/api/auth/callback/?code=:code&next=/admin/reset-password/", permanent: false },
      { source: "/ankit-pathak/", destination: "/best-fast-bowling-coach/", permanent: true },
      { source: "/assessment-trial/", destination: "/admission/", permanent: true },
      { source: "/online-training/", destination: "/online-bowling-training/", permanent: true },
      { source: "/facilities/", destination: "/our-facilities/", permanent: true },
      { source: "/action-analysis/", destination: "/admission/", permanent: true }, // page removed; assessment is the closest service
    ];
  },
  async headers() {
    return [
      {
        // Basic browser protections for every page.
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" }, // no clickjacking: other sites can't show us in a frame
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" }, // same rule, modern form
          { key: "Strict-Transport-Security", value: "max-age=31536000" }, // browsers always use HTTPS for this site
          { key: "X-Content-Type-Options", value: "nosniff" }, // files are only treated as what they say they are
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // other sites see our domain, not full addresses
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // public/assets filenames aren't hashed, so cache for a week and revalidate in the background.
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

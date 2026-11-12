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
  // All permanent moves are 301 and go straight to https://www… in one hop, from both pathak100mph.com and www.
  // Specific moves come first (first match wins); the bare-domain → www rule is last.
  async redirects() {
    const WWW = "https://www.pathak100mph.com";
    const moved = [
      ["/about/", "/best-fast-bowling-coach/"],
      ["/ankit-pathak/", "/best-fast-bowling-coach/"],
      ["/assessment-trial/", "/admission/"],
      ["/online-training/", "/online-bowling-training/"],
      ["/action-analysis/", "/admission/"], // page removed; assessment is the closest service
      ["/facilities/", "/our-facilities/"],
      ["/terms/", "/terms-conditions/"],
      ["/privacy/", "/privacy-policy/"],
      // Old WordPress blog addresses (posts lived at the site root).
      ...[
        "admission-fees-process-2026",
        "five-useful-tips-to-enhance-bowling",
        "injury-prevention-tips-for-fast-bowlers",
        "best-gym-workouts-for-fast-bowlers",
        "perfect-fast-bowling-technique",
        "ankit-pathaks-favorite-brace-leg-drills-to-bowl-fast",
        "arm-speed-fast-bowling-blueprint-ankit-pathak",
        "fast-bowling-run-up-drills-ankit-pathak",
        "fast-bowling-drills-ankit-pathak",
      ].map((slug) => [`/${slug}/`, `/blogs/${slug}/`]),
    ];
    return [
      // Password-reset emails sometimes land on the home page (Supabase falls back to its Site URL): hand the code to the reset flow.
      { source: "/", has: [{ type: "query", key: "code", value: "(?<code>[A-Za-z0-9-]{8,100})" }], destination: "/api/auth/callback/?code=:code&next=/admin/reset-password/", permanent: false },
      ...moved.map(([source, to]) => ({ source, destination: WWW + to, statusCode: 301 })),
      // pathak100mph.com/anything → https://www.pathak100mph.com/anything
      { source: "/:path(.*)", has: [{ type: "host", value: "pathak100mph.com" }], destination: `${WWW}/:path`, statusCode: 301 },
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

// Uploaded media lives in the Neon storage bucket; next/image may only fetch from there.
const mediaBase = process.env.AWS_ENDPOINT_URL_S3 && `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.MEDIA_BUCKET ?? "media"}/**`;

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

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const BUCKET = process.env.MEDIA_BUCKET ?? "media";

const client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "", secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "" },
  forcePathStyle: true,
  requestChecksumCalculation: "WHEN_REQUIRED",
});

// The bucket is public-read, so this URL is what pages render.
export const publicUrl = (key) => `${process.env.AWS_ENDPOINT_URL_S3}/${BUCKET}/${key}`;

export async function putImage(key, body, contentType) {
  await client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      // Keys are unique per upload, so browsers and CDNs may keep them forever.
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
}

export async function deleteObject(key) {
  await client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
}

// Identify the real file type from its first bytes; the browser-supplied type can't be trusted.
export function sniffImage(bytes) {
  const b = bytes;
  const ascii = (from, to) => String.fromCharCode(...b.subarray(from, to));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { mime: "image/jpeg", ext: "jpg" };
  if (b[0] === 0x89 && ascii(1, 4) === "PNG" && b[4] === 0x0d && b[5] === 0x0a) return { mime: "image/png", ext: "png" };
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { mime: "image/webp", ext: "webp" };
  if (ascii(4, 8) === "ftyp" && ["avif", "avis"].includes(ascii(8, 12))) return { mime: "image/avif", ext: "avif" };
  return null;
}

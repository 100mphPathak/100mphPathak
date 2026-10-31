// Runs in the browser before an upload. Phone photos are often 4–10 MB, and the server only accepts
// about 4 MB, so big or very large images are resized (longest side 2400 px) and re-saved as WebP
// (JPEG where the browser can't make WebP). Small images are sent unchanged.
const MAX_SIDE = 2400;
const KEEP_UNDER = 1.5 * 1024 * 1024;

export async function prepareUpload(form) {
  const data = new FormData(form);
  const file = data.get("file");
  if (!(file instanceof File) || !file.size) return data;

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return data; // a format this browser can't open: let the server explain
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  if (file.size <= KEEP_UNDER && scale === 1) return data;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise((done) => canvas.toBlob(done, "image/webp", 0.85));
  const smaller = blob?.type === "image/webp" ? blob : await new Promise((done) => canvas.toBlob(done, "image/jpeg", 0.85));
  if (!smaller) return data;

  const ext = smaller.type === "image/webp" ? "webp" : "jpg";
  const name = `${file.name.replace(/\.[^.]+$/, "") || "image"}.${ext}`;
  data.set("file", new File([smaller], name, { type: smaller.type }));
  return data;
}

// The server's answer, or a readable error if the upload never reached it (no signal, file too big…).
export async function sendUpload(upload, data) {
  try {
    return await upload(data);
  } catch {
    return { error: "The upload didn’t reach the server. Check your connection and try again, or try a smaller image." };
  }
}

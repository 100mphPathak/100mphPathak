// Calls a server action from the browser. If the request itself fails — no internet, the server timed out,
// the admin was updated since this tab was opened (Next answers "Server Action unavailable"), or the server
// code crashed — it returns { error } like the actions do, instead of throwing and crashing the whole screen.
export const SERVER_UNREACHABLE =
  "Couldn’t reach the server. The admin may have just been updated, or your connection dropped. Your changes are still on this screen: copy anything important, then reload the page and try again.";

export async function callServer(fn) {
  try {
    return await fn();
  } catch (error) {
    if (typeof error?.digest === "string" && error.digest.startsWith("NEXT_")) throw error; // a redirect or "not found" from the server: let Next handle it
    console.error("[admin] server request failed:", error);
    // A crash in our server code arrives with a digest: the same code appears next to the error in the Vercel logs.
    if (error?.digest) {
      return { error: `The server ran into an error (code ${error.digest}). Your changes are still on this screen. Try again; if it keeps happening, send this code to your developer.` };
    }
    return { error: SERVER_UNREACHABLE };
  }
}

// Calls a server action from the browser. If the request itself fails — no internet, the server timed out,
// or the admin was updated since this tab was opened (Next answers "Server Action unavailable") — it
// returns { error } like the actions do, instead of throwing and crashing the whole screen.
export const SERVER_UNREACHABLE =
  "Couldn’t reach the server. The admin may have just been updated, or your connection dropped. Your changes are still on this screen: copy anything important, then reload the page and try again.";

export async function callServer(fn) {
  try {
    return await fn();
  } catch (error) {
    if (typeof error?.digest === "string" && error.digest.startsWith("NEXT_")) throw error; // a redirect or "not found" from the server: let Next handle it
    console.error("[admin] server request failed:", error);
    return { error: SERVER_UNREACHABLE };
  }
}

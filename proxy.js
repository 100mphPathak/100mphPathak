import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ADMIN = ["/admin/sign-in", "/admin/forgot-password", "/admin/reset-password"];

export default async function proxy(request) {
  let response = NextResponse.next({ request });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  // Checks the login token's signature locally with Supabase's public key (no network trip),
  // and refreshes the session cookie when the token is about to expire.
  // A malformed cookie makes getClaims() throw: treat it as signed out, so the sign-in page still opens.
  const claims = await supabase.auth.getClaims().then((r) => r.data?.claims, () => null);
  const signedIn = Boolean(claims?.sub);

  if (PUBLIC_ADMIN.some((path) => request.nextUrl.pathname.startsWith(path))) {
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }
  if (!signedIn) return NextResponse.redirect(new URL("/admin/sign-in/", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
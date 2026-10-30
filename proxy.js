import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_ADMIN = ["/admin/sign-in", "/admin/sign-up", "/admin/forgot-password", "/admin/reset-password"];

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
  const { data: { user } } = await supabase.auth.getUser(); // also refreshes the session cookie

  if (PUBLIC_ADMIN.some((path) => request.nextUrl.pathname.startsWith(path))) {
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }
  if (!user) return NextResponse.redirect(new URL("/admin/sign-in/", request.url));
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

// First line of defence for /admin: no session, no admin pages.
// Roles are checked again in every admin page and server action (app/lib/session.js).
const PUBLIC_ADMIN = ["/admin/sign-in", "/admin/sign-up", "/admin/forgot-password", "/admin/reset-password"];
const protect = auth.middleware({ loginUrl: "/admin/sign-in" });

export default function proxy(request) {
  const { pathname } = request.nextUrl;
  if (PUBLIC_ADMIN.some((path) => pathname.startsWith(path))) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex");
    return response;
  }
  return protect(request);
}

export const config = { matcher: ["/admin/:path*"] };

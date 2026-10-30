import { NextResponse } from "next/server";
import { supabase } from "../../../lib/auth";


export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/admin/";
  if (code) await (await supabase()).auth.exchangeCodeForSession(code);
  return NextResponse.redirect(new URL(next.startsWith("/admin") ? next : "/admin/", url.origin));
}
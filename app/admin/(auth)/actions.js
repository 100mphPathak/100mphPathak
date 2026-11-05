"use server";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { audit, clientIp, tooMany } from "../../lib/session";
import { SITE_URL } from "../../seo";
import { supabase } from "../../lib/auth";

const text = (formData, key) => String(formData.get(key) ?? "").trim();

export async function signIn(_prev, formData) {
  const email = text(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };
  // Password guessing: 5 wrong tries per email or 20 per IP in 15 minutes, then wait.
  const ip = await clientIp();
  if (await tooMany("auth.sign_in_failed", email, ip, { perEmail: 5, perIp: 20, minutes: 15 })) {
    return { error: "Too many wrong attempts. Wait 15 minutes, or use “Forgot your password?”.", email };
  }
  const { data, error } = await (await supabase()).auth.signInWithPassword({ email, password });
  if (error) {
    await audit(null, "auth.sign_in_failed", "user", email, { ip });
    return { error: "Email or password is incorrect.", email };
  }
  await audit({ id: data.user.id, email }, "auth.sign_in", "user", data.user.id);
  redirect("/admin");
}

export async function requestReset(_prev, formData) {
  const email = text(formData, "email").toLowerCase();
  if (!email) return { error: "Enter your email." };
  // Stops reset-email floods: 3 per email or 10 per IP an hour.
  const ip = await clientIp();
  if (await tooMany("auth.reset_requested", email, ip, { perEmail: 3, perIp: 10, minutes: 60 })) {
    return { error: "Too many reset requests. Check your inbox (and spam), or try again in an hour." };
  }
  await audit(null, "auth.reset_requested", "user", email, { ip });
  // Never build this from the Host header: a forged host would send the reset link elsewhere.
  const origin = process.env.ADMIN_ORIGIN ?? SITE_URL;
  const { error } = await (await supabase()).auth.resetPasswordForEmail(email, { redirectTo: `${origin}/api/auth/callback/?next=/admin/reset-password/` });
  if (error) console.error("Password reset email failed:", error.message); // shows in Vercel → Logs
  // Same answer whether or not the account exists, so emails can't be probed.
  return { ok: "If that email has an account, a reset link is on its way." };
}

// The email link signs the user in (via /api/auth/callback), so no token is needed here.
export async function resetPassword(_prev, formData) {
  const password = String(formData.get("password") ?? "");
  if (password.length < 10) return { error: "Use a password of at least 10 characters." };
  const client = await supabase();
  const { error } = await client.auth.updateUser({ password });
  if (error) return { error: "This reset link has expired. Request a new one." };
  await client.auth.signOut();
  redirect("/admin/sign-in?reset=1");
}

export async function signOut() {
  (await draftMode()).disable(); // previews end with the session
  await (await supabase()).auth.signOut();
  redirect("/admin/sign-in");
}
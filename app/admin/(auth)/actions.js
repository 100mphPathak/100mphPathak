"use server";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { audit } from "../../lib/session";
import { SITE_URL } from "../../seo";
import { supabase } from "../../lib/auth";

const text = (formData, key) => String(formData.get(key) ?? "").trim();

export async function signIn(_prev, formData) {
  const email = text(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };
  const { data, error } = await (await supabase()).auth.signInWithPassword({ email, password });
  if (error) {
    await audit(null, "auth.sign_in_failed", "user", email);
    return { error: "Email or password is incorrect.", email };
  }
  await audit({ id: data.user.id, email }, "auth.sign_in", "user", data.user.id);
  redirect("/admin");
}

export async function signUp(_prev, formData) {
  const name = text(formData, "name");
  const email = text(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!name || !email) return { error: "Enter your name and email.", name, email };
  if (password.length < 10) return { error: "Use a password of at least 10 characters.", name, email };
  const origin = process.env.ADMIN_ORIGIN ?? SITE_URL;
  const { data, error } = await (await supabase()).auth.signUp({
    email, password,
    options: { data: { name }, emailRedirectTo: `${origin}/api/auth/callback/?next=/admin/pending/` },
  });
  if (error) return { error: error.message || "Could not create the account.", name, email };
  await audit({ id: data.user.id, email }, "auth.sign_up", "user", data.user.id);
  if (!data.session) return { ok: "Check your email and click the link to confirm your account." };
  redirect("/admin/pending");
}

export async function requestReset(_prev, formData) {
  const email = text(formData, "email").toLowerCase();
  if (!email) return { error: "Enter your email." };
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
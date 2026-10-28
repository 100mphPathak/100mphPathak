"use server";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import { audit } from "../../lib/session";
import { SITE_URL } from "../../seo";

const text = (formData, key) => String(formData.get(key) ?? "").trim();
const serviceDown = (error) => error?.code?.startsWith?.("NETWORK");

export async function signIn(_prev, formData) {
  const email = text(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };
  const { data, error } = await auth.signIn.email({ email, password });
  if (error) {
    await audit(null, "auth.sign_in_failed", "user", email);
    return { error: serviceDown(error) ? "The sign-in service is unreachable. Try again shortly." : "Email or password is incorrect.", email };
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
  const { data, error } = await auth.signUp.email({ name, email, password });
  if (error) return { error: serviceDown(error) ? "The sign-up service is unreachable. Try again shortly." : error.message || "Could not create the account.", name, email };
  await audit({ id: data.user.id, email }, "auth.sign_up", "user", data.user.id);
  redirect("/admin/pending");
}

export async function requestReset(_prev, formData) {
  const email = text(formData, "email").toLowerCase();
  if (!email) return { error: "Enter your email." };
  // Never build this from the Host header: a forged host would send the reset token elsewhere.
  const origin = process.env.ADMIN_ORIGIN ?? SITE_URL;
  await auth.requestPasswordReset({ email, redirectTo: `${origin}/admin/reset-password` });
  // Same answer whether or not the account exists, so emails can't be probed.
  return { ok: "If that email has an account, a reset link is on its way." };
}

export async function resetPassword(_prev, formData) {
  const token = text(formData, "token");
  const password = String(formData.get("password") ?? "");
  if (!token) return { error: "This reset link is invalid. Request a new one." };
  if (password.length < 10) return { error: "Use a password of at least 10 characters." };
  const { error } = await auth.resetPassword({ newPassword: password, token });
  if (error) return { error: "This reset link has expired. Request a new one." };
  redirect("/admin/sign-in?reset=1");
}

export async function signOut() {
  (await draftMode()).disable(); // previews end with the session
  await auth.signOut();
  redirect("/admin/sign-in");
}

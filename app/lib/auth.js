import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Supabase client for server code; the login session lives in cookies.
export async function supabase() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      // Pages can't set cookies (only actions and routes can); the proxy refreshes them instead.
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {} },
    },
  });
} 


// Supabase admin API (create/delete logins). Server-only: the key bypasses all security rules, never send it to the browser.
// Needs SUPABASE_SERVICE_ROLE_KEY (Supabase → Project Settings → API Keys → service_role / secret key).
export function authAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, key, { auth: { persistSession: false, autoRefreshToken: false } }).auth.admin;
}

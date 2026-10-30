import { createServerClient } from "@supabase/ssr";
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


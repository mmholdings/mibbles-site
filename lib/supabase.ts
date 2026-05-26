import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Singleton Supabase client for server-side use.
 *
 * Uses the SERVICE_ROLE_KEY because all writes go through API routes — never
 * exposed to the browser. If you ever need an anon-key client for browser
 * code, create a separate file.
 */
let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    // In dev or when Supabase isn't configured yet, return null so callers
    // can fall back to console.log instead of crashing.
    return null;
  }

  if (!_client) {
    _client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _client;
}

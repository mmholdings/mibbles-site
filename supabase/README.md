# Supabase

Mibbles uses Supabase as the backend for newsletter / waitlist signups.

## Setup

1. Create a new Supabase project at https://supabase.com/dashboard.
2. Open the SQL editor and paste the contents of `migrations/0001_subscribers.sql`. Run it.
3. From **Project Settings → API**, copy:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
4. Add both to your Railway environment variables (or `.env.local` for dev).

## Local verification

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"manual-test"}'
```

You should see a row appear in `public.subscribers` in the Supabase Table Editor.

## Notes

- Row-level security is **on**, and only the `service_role` key can read/write. This is intentional — the API route on the server holds the key; the browser never sees it.
- Inserting a duplicate email returns success but does not create a duplicate row (unique constraint).
- Adding new columns later is fine — the JSON `meta` column is a sandbox for tracking UTMs, referral codes, etc., without a schema change.

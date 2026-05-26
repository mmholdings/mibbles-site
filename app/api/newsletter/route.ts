import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs"; // Supabase JS needs Node, not Edge

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

/**
 * Newsletter / waitlist endpoint.
 *
 * Primary backend: Supabase `subscribers` table (see supabase/migrations).
 * If Supabase env vars aren't set, we log to console — useful in dev,
 * harmless in prod.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source } = schema.parse(body);

    const supabase = getSupabaseAdmin();

    if (supabase) {
      const { error } = await supabase
        .from("subscribers")
        .insert({
          email: email.toLowerCase(),
          source: source ?? "unknown",
        });

      if (error) {
        // Unique-violation = already subscribed. Treat as success.
        if (error.code === "23505") {
          return NextResponse.json({ ok: true, alreadySubscribed: true });
        }
        console.error("Supabase insert error", error);
        return new NextResponse("Provider error", { status: 502 });
      }
    } else {
      // Supabase not configured — log so the form works in dev.
      console.log(`[newsletter:dev] ${email} from ${source}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse("Invalid email", { status: 400 });
    }
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}

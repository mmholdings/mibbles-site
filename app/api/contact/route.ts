import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(200),
  message: z.string().min(10).max(5000),
  hp: z.string().max(0).optional(), // honeypot
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Honeypot — silently drop bots
    if (data.hp) return NextResponse.json({ ok: true });

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Mibbles Contact <hello@mibbles.app>",
          to: "hello@mibbles.app",
          reply_to: data.email,
          subject: `[Contact] ${data.subject}`,
          text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
        }),
      });
    } else {
      console.log("[contact:dev]", data);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new NextResponse("Invalid input", { status: 400 });
    }
    console.error(err);
    return new NextResponse("Server error", { status: 500 });
  }
}

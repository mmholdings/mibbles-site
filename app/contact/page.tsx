"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  hp?: string;
}

export default function ContactPage() {
  const { register, handleSubmit, formState, reset } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section className="pt-16 md:pt-24">
      <Container size="md">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <Eyebrow>Get in touch</Eyebrow>
            <h1 className="font-serif text-display-xl mt-5 mb-6 text-balance">
              We&apos;re a small team. Email reaches a real human.
            </h1>
            <div className="space-y-6 text-ink-700">
              <div>
                <div className="text-sm uppercase tracking-widest text-ink-500 mb-1">General</div>
                <a href="mailto:hello@mibbles.app" className="text-lg underline underline-offset-4 hover:text-terracotta-700">
                  hello@mibbles.app
                </a>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest text-ink-500 mb-1">Support</div>
                <a href="mailto:support@mibbles.app" className="text-lg underline underline-offset-4 hover:text-terracotta-700">
                  support@mibbles.app
                </a>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest text-ink-500 mb-1">Press</div>
                <a href="mailto:press@mibbles.app" className="text-lg underline underline-offset-4 hover:text-terracotta-700">
                  press@mibbles.app
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl bg-cream-50 border border-ink-100 p-8 md:p-10">
            <input type="text" tabIndex={-1} autoComplete="off" {...register("hp")} className="hidden" />

            <div>
              <label className="text-sm font-medium text-ink-700 block mb-1">Your name</label>
              <input {...register("name", { required: true })} className="w-full h-11 rounded-lg border border-ink-200 px-4 bg-cream" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink-700 block mb-1">Email</label>
              <input type="email" {...register("email", { required: true })} className="w-full h-11 rounded-lg border border-ink-200 px-4 bg-cream" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink-700 block mb-1">Subject</label>
              <input {...register("subject", { required: true })} className="w-full h-11 rounded-lg border border-ink-200 px-4 bg-cream" />
            </div>
            <div>
              <label className="text-sm font-medium text-ink-700 block mb-1">Message</label>
              <textarea {...register("message", { required: true, minLength: 10 })} rows={5} className="w-full rounded-lg border border-ink-200 px-4 py-3 bg-cream" />
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send message"}
            </Button>

            {status === "success" && (
              <p className="text-sm text-terracotta-700">Got it. We&apos;ll reply soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-terracotta-700">Something went wrong — try emailing hello@mibbles.app directly.</p>
            )}
            {formState.errors && Object.keys(formState.errors).length > 0 && (
              <p className="text-xs text-ink-500">Please fill in all required fields.</p>
            )}
          </form>
        </div>
      </Container>
    </Section>
  );
}

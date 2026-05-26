"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});
type FormData = z.infer<typeof schema>;

interface Props {
  source?: string;
  className?: string;
  variant?: "inline" | "stacked";
  heading?: string;
  subheading?: string;
}

export function Newsletter({
  source = "default",
  className,
  variant = "inline",
  heading,
  subheading,
}: Props) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string>("");
  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again?");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("flex items-center gap-2 text-ink-700", className)}>
        <Check className="h-5 w-5 text-terracotta-600" />
        <span>You&apos;re in. Watch your inbox.</span>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      {heading && <h3 className="font-serif text-2xl mb-2 text-ink-900">{heading}</h3>}
      {subheading && <p className="text-ink-600 mb-4">{subheading}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "flex gap-2",
          variant === "stacked" ? "flex-col" : "flex-col sm:flex-row"
        )}
      >
        <label className="sr-only" htmlFor={`email-${source}`}>Email</label>
        <input
          id={`email-${source}`}
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          {...register("email", { required: true })}
          className="flex-1 h-12 rounded-full border border-ink-200 bg-cream-50 px-5 text-[15px] text-ink-900 placeholder:text-ink-400 focus:border-terracotta-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 px-6 rounded-full bg-ink-900 text-cream font-medium tracking-tight hover:bg-ink-700 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      {formState.errors.email && (
        <p className="mt-2 text-sm text-terracotta-700">{formState.errors.email.message}</p>
      )}
      {errorMsg && <p className="mt-2 text-sm text-terracotta-700">{errorMsg}</p>}
      <p className="mt-3 text-xs text-ink-500">One email a week. Unsubscribe anytime.</p>
    </div>
  );
}

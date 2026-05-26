"use client";

import * as React from "react";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  detail: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Luna went from pacing the apartment to actually watching the bird channel for 20 minutes. It's like she finally has something to do.",
    author: "Sarah K.",
    detail: "Brooklyn, NY · cat parent to Luna",
  },
  {
    quote: "I leave Mibbles running before work and check the Cat Cam from the office. Game changer for working from a cubicle.",
    author: "Marcus D.",
    detail: "Austin, TX · cat parent to Otis & Pickle",
  },
  {
    quote: "My vet recommended more enrichment for our anxious rescue. Mibbles is the easiest piece of the routine to actually keep up with.",
    author: "Priya R.",
    detail: "Toronto, ON · cat parent to Saffron",
  },
  {
    quote: "Worth it just for the fish screen. My cat is OBSESSED.",
    author: "Jamie L.",
    detail: "Portland, OR · cat parent to Biscuit",
  },
];

export function TestimonialCarousel() {
  return (
    <div className="overflow-hidden">
      <div className="flex gap-6 overflow-x-auto pb-4 px-5 sm:px-6 lg:px-8 snap-x snap-mandatory no-scrollbar">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="snap-start shrink-0 w-[85%] sm:w-[420px] rounded-2xl bg-cream-50 border border-ink-100 p-8 shadow-card"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-terracotta-500 text-terracotta-500" />
              ))}
            </div>
            <blockquote className="font-serif text-xl text-ink-900 leading-snug mb-6 text-balance">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="text-sm">
              <div className="font-medium text-ink-900">{t.author}</div>
              <div className="text-ink-500">{t.detail}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

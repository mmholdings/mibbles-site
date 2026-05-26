import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Mibbles palette — off-white base, deep charcoal text, terracotta accent
        cream: {
          DEFAULT: "#FAFAF7",
          50: "#FDFDFB",
          100: "#FAFAF7",
          200: "#F2F1EC",
          300: "#E8E6DE",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          900: "#0F0F0F",
          800: "#1A1A1A",
          700: "#2A2A2A",
          600: "#3D3D3D",
          500: "#5C5C5C",
          400: "#8A8A8A",
          300: "#B5B5B5",
          200: "#D9D9D9",
          100: "#EDEDED",
        },
        terracotta: {
          DEFAULT: "#E27D5F",
          50: "#FBF1ED",
          100: "#F6DDD3",
          200: "#EFC0AF",
          300: "#E7A289",
          400: "#E08F73",
          500: "#E27D5F",
          600: "#C9613F",
          700: "#A24A2C",
          800: "#7A3720",
          900: "#522415",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        // Editorial scale — generous headlines
        "display-2xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        prose: "68ch",
        content: "1200px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 30px -8px rgba(26,26,26,0.08)",
        card: "0 1px 2px rgba(26,26,26,0.04), 0 8px 24px -12px rgba(26,26,26,0.08)",
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.700"),
            "--tw-prose-headings": theme("colors.ink.900"),
            "--tw-prose-lead": theme("colors.ink.600"),
            "--tw-prose-links": theme("colors.terracotta.600"),
            "--tw-prose-bold": theme("colors.ink.900"),
            "--tw-prose-counters": theme("colors.ink.500"),
            "--tw-prose-bullets": theme("colors.ink.300"),
            "--tw-prose-hr": theme("colors.ink.100"),
            "--tw-prose-quotes": theme("colors.ink.800"),
            "--tw-prose-quote-borders": theme("colors.terracotta.500"),
            "--tw-prose-code": theme("colors.ink.900"),
            "--tw-prose-pre-bg": theme("colors.ink.900"),
            fontFamily: theme("fontFamily.sans").join(","),
            h1: { fontFamily: theme("fontFamily.serif").join(","), letterSpacing: "-0.02em" },
            h2: { fontFamily: theme("fontFamily.serif").join(","), letterSpacing: "-0.015em", marginTop: "2.5em" },
            h3: { fontFamily: theme("fontFamily.serif").join(","), letterSpacing: "-0.01em" },
            a: { textDecoration: "underline", textUnderlineOffset: "3px", textDecorationThickness: "1px" },
            "a:hover": { color: theme("colors.terracotta.700") },
            blockquote: { fontStyle: "normal", fontWeight: "500" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;

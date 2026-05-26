#!/usr/bin/env tsx
/**
 * Mibbles blog generator.
 *
 * Pulls the next keyword from content/keywords/queue.json, calls OpenAI with
 * the editorial system prompt, runs guardrails (readability, banned-words,
 * length), writes an MDX file as DRAFT, opens a PR for human review.
 *
 * Run manually:   pnpm generate:post
 * Run in cron:    .github/workflows/blog-generator.yml
 */

import fs from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";
import { EDITORIAL_SYSTEM_PROMPT } from "./editorial-prompt";

const ROOT = path.resolve(__dirname, "..");
const QUEUE = path.join(ROOT, "content/keywords/queue.json");
const PUBLISHED = path.join(ROOT, "content/keywords/published.json");
const POSTS_DIR = path.join(ROOT, "content/blog");

const BANNED_WORDS = [
  "delve",
  "leverage",
  "robust",
  "seamless",
  "tapestry",
  "in today's fast-paced",
  "unlock the secrets",
  "as an ai",
  "in conclusion",
];

interface KeywordBrief {
  primaryKeyword: string;
  secondaryKeywords?: string[];
  intent?: string;
  category: string;
  targetWordCount?: number;
  internalLinks?: string[];
}

function fleschScore(text: string): number {
  // Simple Flesch Reading Ease approximation
  const sentences = (text.match(/[.!?]+/g) ?? []).length || 1;
  const words = text.split(/\s+/).filter(Boolean).length || 1;
  const syllables =
    text
      .toLowerCase()
      .replace(/[^a-z]/g, " ")
      .split(/\s+/)
      .reduce((acc, w) => acc + Math.max(1, (w.match(/[aeiouy]+/g) ?? []).length), 0) || 1;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function checkBannedWords(text: string) {
  const lower = text.toLowerCase();
  return BANNED_WORDS.filter((w) => lower.includes(w));
}

function checkPrimaryKeyword(text: string, kw: string) {
  const lower = text.toLowerCase();
  const first100 = lower.slice(0, 800);
  return {
    inH1: /^#\s+.*$/m.test(text) && text.split("\n").find((l) => /^#\s/.test(l))?.toLowerCase().includes(kw.toLowerCase()),
    inFirst100Words: first100.includes(kw.toLowerCase()),
  };
}

async function readJSON<T>(p: string): Promise<T> {
  return JSON.parse(await fs.readFile(p, "utf-8")) as T;
}

async function writeJSON(p: string, data: unknown) {
  await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function frontmatterDraftFlag(mdx: string): string {
  // Force draft: true so a human must flip it before it ships
  return mdx.replace(/^---\n/, `---\ndraft: true\n`);
}

async function generateOne(brief: KeywordBrief, openai: OpenAI, model: string): Promise<string> {
  const userPrompt = `Write a blog post.

PRIMARY KEYWORD: ${brief.primaryKeyword}
SECONDARY KEYWORDS: ${(brief.secondaryKeywords ?? []).join(", ") || "(none)"}
SEARCH INTENT: ${brief.intent ?? "informational"}
CATEGORY: ${brief.category}
TARGET WORD COUNT: ${brief.targetWordCount ?? 1500}
INTERNAL LINKS TO INCLUDE (where natural): ${(brief.internalLinks ?? []).join(", ") || "(none — use [INTERNAL:topic] placeholders if relevant)"}
PUBLISH DATE: ${new Date().toISOString().slice(0, 10)}

Follow the system prompt exactly. Output ONLY the MDX file: frontmatter then body. No commentary.`;

  const completion = await openai.chat.completions.create({
    model,
    temperature: 0.6,
    messages: [
      { role: "system", content: EDITORIAL_SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  });
  const content = completion.choices[0]?.message?.content ?? "";
  if (!content.startsWith("---")) {
    throw new Error("LLM did not return frontmatter");
  }
  return content;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("Set OPENAI_API_KEY in env");
    process.exit(1);
  }
  const model = process.env.OPENAI_MODEL ?? "gpt-4o";
  const openai = new OpenAI({ apiKey });

  const queue = await readJSON<KeywordBrief[]>(QUEUE);
  if (queue.length === 0) {
    console.log("Keyword queue empty — nothing to do.");
    return;
  }
  const brief = queue[0];
  const remaining = queue.slice(1);

  console.log(`Generating post for: ${brief.primaryKeyword}`);
  let mdx = await generateOne(brief, openai, model);
  mdx = frontmatterDraftFlag(mdx);

  // Guardrails
  const banned = checkBannedWords(mdx);
  const flesch = fleschScore(mdx);
  const kwCheck = checkPrimaryKeyword(mdx, brief.primaryKeyword);

  const report = {
    primaryKeyword: brief.primaryKeyword,
    bannedWordsFound: banned,
    fleschReadingEase: Math.round(flesch),
    primaryKeywordInH1: !!kwCheck.inH1,
    primaryKeywordInFirst100Words: kwCheck.inFirst100Words,
  };
  console.log("Guardrail report:", report);

  if (banned.length > 0) {
    console.warn(`⚠ Banned words found: ${banned.join(", ")} — keeping as draft for human review.`);
  }
  if (flesch < 55) {
    console.warn(`⚠ Flesch score ${Math.round(flesch)} below target (≥60). Keeping as draft.`);
  }

  // Write MDX
  const slug = slugify(brief.primaryKeyword);
  const out = path.join(POSTS_DIR, `${slug}.mdx`);
  await fs.writeFile(out, mdx);
  console.log(`✓ Wrote ${path.relative(ROOT, out)}`);

  // Move keyword from queue → published
  const published = await readJSON<KeywordBrief[]>(PUBLISHED);
  await writeJSON(PUBLISHED, [...published, { ...brief, publishedAt: new Date().toISOString() }]);
  await writeJSON(QUEUE, remaining);

  // If running in CI, open a PR. We just emit the file; the workflow handles `gh pr create`.
  if (process.env.GITHUB_ACTIONS) {
    console.log(`::set-output name=slug::${slug}`);
    console.log(`::set-output name=keyword::${brief.primaryKeyword}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

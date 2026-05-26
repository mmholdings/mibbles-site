#!/usr/bin/env tsx
/**
 * Generate the first N posts in the queue, one after the other.
 * Use to bootstrap the blog with seed content before you start the cron.
 *
 *   tsx scripts/generate-seed-posts.ts 10
 */
import { execSync } from "node:child_process";

const count = Number(process.argv[2] ?? 10);

for (let i = 0; i < count; i++) {
  console.log(`\n── Seed ${i + 1} / ${count} ─────────────────────────`);
  try {
    execSync("tsx scripts/generate-post.ts", { stdio: "inherit" });
  } catch (e) {
    console.error("Failed; continuing.");
  }
}

#!/usr/bin/env tsx
/**
 * Zip up the press kit folder into a single downloadable archive.
 * Run after updating /public/press-kit/ assets:
 *
 *   tsx scripts/package-press-kit.ts
 */
import fs from "node:fs";
import path from "node:path";
import archiver from "archiver";

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public/press-kit");
const OUT = path.join(SRC, "mibbles-press-kit.zip");

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Press kit source missing: ${SRC}`);
    process.exit(1);
  }

  // Remove old archive
  if (fs.existsSync(OUT)) fs.unlinkSync(OUT);

  const output = fs.createWriteStream(OUT);
  const archive = archiver("zip", { zlib: { level: 9 } });

  await new Promise<void>((resolve, reject) => {
    output.on("close", () => {
      console.log(`✓ Wrote ${path.relative(ROOT, OUT)} (${(archive.pointer() / 1024).toFixed(1)} KB)`);
      resolve();
    });
    archive.on("error", reject);
    archive.pipe(output);

    // Include everything in /public/press-kit except the zip itself
    archive.glob("**/*", {
      cwd: SRC,
      ignore: ["mibbles-press-kit.zip"],
    });
    archive.finalize();
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

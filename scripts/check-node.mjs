#!/usr/bin/env node
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Fail fast with a clear message if Node is too old for Next.js 14. */
const parts = process.versions.node.split(".").map(Number);
const major = parts[0] ?? 0;
const minor = parts[1] ?? 0;
if (major < 18 || (major === 18 && minor < 17)) {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = join(here, "..");
  const hasNvmrc = existsSync(join(root, ".nvmrc"));

  console.error("");
  console.error("  Node.js >= 18.17.0 is required for this project (Next.js 14).");
  console.error(`  Current version: ${process.version}`);
  console.error("");
  if (hasNvmrc) {
    console.error("  This repo has .nvmrc — use Node 22 from nvm:");
    console.error("    cd /path/to/Dentily");
    console.error("    nvm install");
    console.error("    nvm use");
    console.error("    node -v    # should show v22.x");
    console.error("");
    console.error("  Or set default:  nvm alias default 22 && nvm use 22");
    console.error("");
    console.error("  IDE terminals often skip nvm; use:  npm run dev:boot");
    console.error("");
  } else {
    console.error("  Fix (nvm):  nvm install 22 && nvm alias default 22 && nvm use 22");
    console.error("  Then:       node -v   (should show v22.x or v20.x)");
    console.error("");
  }
  process.exit(1);
}

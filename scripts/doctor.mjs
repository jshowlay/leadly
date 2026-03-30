#!/usr/bin/env node
/**
 * Run: npm run doctor
 * Use when the browser shows ERR_CONNECTION_REFUSED on localhost:3000.
 */
import { execSync } from "node:child_process";
import http from "node:http";

const port = process.env.PORT || "3000";

const parts = process.versions.node.split(".").map(Number);
const major = parts[0] ?? 0;
const minor = parts[1] ?? 0;
const nodeOk = major > 18 || (major === 18 && minor >= 17);

console.log("\n=== Dentily doctor ===\n");
console.log("Node:", process.version, nodeOk ? "(OK for Next 14)" : "(TOO OLD — need >= 18.17)");
console.log("");

let listen = "";
try {
  listen = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN 2>/dev/null || true`, {
    encoding: "utf8",
  }).trim();
} catch {
  listen = "";
}
if (listen) {
  console.log(`Port ${port} LISTEN:\n${listen}\n`);
} else {
  console.log(`Port ${port}: nothing listening — the dev server is NOT running.\n`);
}

await new Promise((resolve) => {
  const req = http.get(`http://127.0.0.1:${port}/api/health`, (res) => {
    let b = "";
    res.on("data", (c) => (b += c));
    res.on("end", () => {
      console.log(`GET /api/health → HTTP ${res.statusCode} ${b.slice(0, 80)}`);
      resolve();
    });
  });
  req.on("error", (e) => {
    console.log(`GET /api/health → ${e.code || e.message} (server not up)`);
    resolve();
  });
  req.setTimeout(2000, () => {
    req.destroy();
    console.log("GET /api/health → timeout");
    resolve();
  });
});

console.log(`
What to do:
  1. Terminal:  cd /path/to/Dentily
  2. nvm use && node -v   (must be v22.x or v20.x / 18.17+)
  3. npm run dev:boot     (loads nvm, then starts Next — use if IDE shows old Node)
  4. Wait for:  ✓ Ready
  5. Browser:    http://127.0.0.1:${port}  (try this if "localhost" fails — Chrome -102)
  6. Keep the dev terminal OPEN while you browse.
`);
console.log("=== end ===\n");

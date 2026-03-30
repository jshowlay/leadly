#!/usr/bin/env node
/**
 * Run this in a SECOND terminal while `npm run dev` is running in the first.
 * It prints whether anything is listening on the port and whether Node can connect.
 */
import { execSync } from "node:child_process";
import http from "node:http";

const port = process.env.DIAG_PORT || "3000";

console.log("\n=== Dentily local diagnose (port " + port + ") ===\n");

try {
  const out = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN 2>/dev/null || true`, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024,
  });
  const trimmed = out.trim();
  if (trimmed) {
    console.log("LISTEN (lsof):\n" + trimmed + "\n");
  } else {
    console.log("LISTEN: nothing found — nothing is bound to port " + port + ".\n");
    console.log("This almost always means ONE of these:\n");
    console.log("  A) `npm run dev` is not running in another terminal right now.");
    console.log("  B) It exited or crashed — scroll that terminal for red errors.");
    console.log("  C) The dev terminal was closed or the process was stopped (Ctrl+C).\n");
    console.log("Do this:");
    console.log("  1. Open Terminal.app");
    console.log("  2. cd to your Dentily folder and run:  npm run dev");
    console.log("  3. Leave it open until you see:  ✓ Ready");
    console.log("  4. Without closing that window, open a SECOND terminal and run:  npm run diagnose");
    console.log("Or run:  npm run dev:log  (saves output to dev-server.log if it crashes)\n");
  }
} catch {
  console.log("(could not run lsof)\n");
}

function ping(label, url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      console.log(label + " -> HTTP " + res.statusCode + " OK");
      res.resume();
      resolve();
    });
    req.on("error", (e) => {
      console.log(label + " -> FAILED: " + (e.code || e.message || String(e)));
      resolve();
    });
    req.setTimeout(4000, () => {
      req.destroy();
      console.log(label + " -> FAILED: timeout");
      resolve();
    });
  });
}

await ping("127.0.0.1", `http://127.0.0.1:${port}/`);
await ping("localhost", `http://localhost:${port}/`);

console.log(`
If LISTEN is empty or both pings FAILED:
  • Keep the first terminal open where you ran: npm run dev
  • Wait until you see:  ✓ Ready
  • Run this diagnose again

If pings OK but the browser still refuses:
  • Try Safari instead of Chrome (or vice versa)
  • Disable VPN / proxy extensions
  • Run dev outside Cursor in Terminal.app:  cd to project && npm run dev

Try another port:  DIAG_PORT=3456 npm run diagnose
  then:  npm run dev:3456
`);
console.log("=== end ===\n");

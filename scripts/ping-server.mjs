#!/usr/bin/env node
/**
 * Minimal HTTP server to verify your machine accepts connections on a port.
 * Usage: npm run test:port
 * Then open http://127.0.0.1:3002 — if this fails, the issue is not Next.js.
 */
import http from "node:http";

const port = Number(process.env.TEST_PORT || 3002);
const host = "0.0.0.0";

const server = http.createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(
    "Port test OK — this machine accepts connections here.\nStop this (Ctrl+C), then run: npm run dev\n"
  );
});

server.listen(port, host, () => {
  console.log("");
  console.log("  Ping server running.");
  console.log(`  Open in your browser: http://127.0.0.1:${port}`);
  console.log(`  Listening on ${host}:${port} — press Ctrl+C to stop.`);
  console.log("");
});

server.on("error", (err) => {
  console.error("Failed to listen:", err.message);
  process.exit(1);
});

const p = process.env.DEV_PORT || "3000";
console.log(`
┌──────────────────────────────────────────────────────────────────┐
│ Dentily — local dev (port ${p})                                     │
│                                                                  │
│ 1) Wait until you see:  ✓ Ready                                  │
│ 2) Open: http://127.0.0.1:${p}  (http not https)                    │
│ 3) Keep THIS terminal open while you browse.                     │
│                                                                  │
│ If dev keeps crashing:                                           │
│   • npm run dev:safe   (more Node memory)                        │
│   • npm run preview    (production server — stable, no hot reload)│
│   • Move project out of iCloud Desktop → e.g. ~/dev/Dentily      │
│                                                                  │
│ Prefer macOS Terminal.app (not only the editor).                 │
└──────────────────────────────────────────────────────────────────┘
`);

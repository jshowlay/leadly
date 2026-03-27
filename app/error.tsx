"use client";

import { useEffect } from "react";

/**
 * No Tailwind, no next/link — avoids broken chunks causing “missing required error components”.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const msg =
    process.env.NODE_ENV === "development"
      ? error.message || "An unexpected error occurred."
      : "An unexpected error occurred. Check server logs and environment variables.";

  return (
    <main style={{ minHeight: "100vh", background: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <header
        style={{
          width: "100%",
          background: "#000",
          color: "#fff",
          padding: "1rem 0",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1rem" }}>
          <p style={{ fontSize: "1.125rem", fontWeight: 600, margin: 0 }}>Dentily</p>
          <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.65)", margin: "4px 0 0 0" }}>
            Find Your Next Patients
          </p>
        </div>
      </header>
      <section style={{ maxWidth: "42rem", margin: "0 auto", padding: "2.5rem 1rem" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a" }}>Something went wrong</h1>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "#475569" }}>{msg}</p>
        {process.env.NODE_ENV === "development" && error.digest ? (
          <p style={{ marginTop: "0.25rem", fontFamily: "monospace", fontSize: "0.75rem", color: "#64748b" }}>
            Digest: {error.digest}
          </p>
        ) : null}
        <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#fff",
              background: "#0f172a",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#0f172a",
              border: "1px solid #cbd5e1",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            Go home
          </a>
        </div>
      </section>
    </main>
  );
}

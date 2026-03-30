/**
 * Minimal Pages Router `/404` — dev server checks `hasPage("/404")` when rendering errors.
 * App Router still uses `app/not-found.tsx` for normal 404s.
 */
export default function Pages404() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, background: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>Page not found</h1>
      <p style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>This URL is not valid.</p>
    </div>
  );
}

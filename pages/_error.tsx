import type { NextPageContext } from "next";

type ErrorProps = { statusCode?: number };

/**
 * Pages Router fallback error page (inline styles only).
 * Next’s dev server may request `/_error` even in App Router projects; without this file,
 * you can see “missing required error components, refreshing...”.
 */
export default function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, background: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>Something went wrong</h1>
      {statusCode != null ? (
        <p style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>Status: {statusCode}</p>
      ) : null}
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? (err as { statusCode?: number }).statusCode ?? 500 : 404;
  return { statusCode };
};

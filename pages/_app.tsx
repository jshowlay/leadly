import type { AppProps } from "next/app";

/**
 * Minimal Pages Router shell — satisfies Next dev fallback when it looks up `/_error`
 * (App Router uses `app/`; this avoids “missing required error components” in dev).
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

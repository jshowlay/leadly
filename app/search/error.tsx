"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SearchRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white px-4 py-16">
      <div className="container-page mx-auto max-w-lg text-center">
        <p className="text-sm font-medium text-slate-500">Search</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Couldn&apos;t load this page</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Something went wrong while opening the search flow. Try again, or return home and use the link once more.
        </p>
        {process.env.NODE_ENV === "development" ? (
          <p className="mt-4 rounded-md bg-slate-50 p-3 text-left font-mono text-xs text-slate-700">{error.message}</p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-900 px-6 text-sm font-medium text-white hover:bg-slate-900/90"
          >
            Try again
          </button>
          <Link
            href="/search"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-6 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            Reload search
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-blue-700 underline-offset-4 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

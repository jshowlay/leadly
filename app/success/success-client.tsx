"use client";

import Link from "next/link";
import { HowToUsePack } from "@/components/how-to-use-pack";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export type SuccessOutcome =
  | { kind: "no_session" }
  | { kind: "ok"; searchId: number }
  | { kind: "error"; message: string };

export function SuccessClient({ outcome }: { outcome: SuccessOutcome }) {
  return (
    <Card className="mx-auto max-w-lg border-slate-200 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">
          {outcome.kind === "ok" ? "You’re in — opportunity pack unlocked" : "We could not confirm payment"}
        </CardTitle>
        {outcome.kind === "ok" ? (
          <CardDescription>
            Payment received. Your scored practice list and CSV download are available for this search.
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-6">
        {outcome.kind === "ok" ? (
          <>
            <div className="rounded-lg border border-green-200 bg-green-50/80 p-4 text-sm text-green-950">
              <p className="font-medium">What you unlocked</p>
              <p className="mt-1 text-green-900/90">
                Full export for search #{outcome.searchId} — prioritized practice records with outreach drafts, as shown
                on your results page.
              </p>
            </div>
            <HowToUsePack />
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href={`/results?searchId=${outcome.searchId}`}
                className={cn(buttonVariants({ size: "default" }), "text-center")}
              >
                View results table
              </Link>
              <Link
                href={`/api/search/${outcome.searchId}/export`}
                className={cn(buttonVariants({ variant: "outline", size: "default" }), "text-center")}
                download
              >
                Download CSV
              </Link>
            </div>
            <p className="text-xs text-slate-500">
              Questions about your file? Email your account contact or use the same channel you used to reach Dentily —
              we&apos;ll help with good-faith data issues per our quality note on the pricing page.
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Another market?</p>
              <p className="mt-1">
                Each territory search can be unlocked separately ({SITE.leadPackPriceLabel} when you purchase).
              </p>
              <Link
                href="/search"
                className="mt-3 inline-flex font-medium text-blue-700 underline-offset-4 hover:underline"
              >
                {SITE.primaryCta}
              </Link>
            </div>
          </>
        ) : null}

        {outcome.kind === "no_session" ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-medium">Checkout session not in link</p>
            <p className="mt-1 text-amber-900/90">
              If you already paid, open your results page and use <strong>Download CSV</strong> there — your pack may
              already be unlocked. Otherwise complete checkout from Stripe again so we can attach a session.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/" className={cn(buttonVariants({ size: "default" }), "text-center")}>
                Home
              </Link>
              <Link href="/search" className={cn(buttonVariants({ variant: "outline", size: "default" }), "text-center")}>
                {SITE.primaryCta}
              </Link>
            </div>
          </div>
        ) : null}

        {outcome.kind === "error" ? <p className="text-sm text-red-700">{outcome.message}</p> : null}

        {outcome.kind !== "no_session" ? (
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "inline-flex w-fit")}>
            Back to home
          </Link>
        ) : null}
      </CardContent>
    </Card>
  );
}

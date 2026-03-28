import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { PricingFaq } from "@/components/pricing-faq";
import { buttonVariants } from "@/lib/button-variants";
import { POSITIONING, QUALITY_REPLACEMENT_NOTE, SITE } from "@/lib/site-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

/** Demo-only — practice records your export resembles */
const PRACTICE_PREVIEW_ROWS = [
  {
    practice: "Example Family Dental",
    score: "76",
    reason: "Moderate reviews with room to grow specialty demand.",
    outreach: "Hi — we help practices turn local visibility into more implant and cosmetic consults…",
  },
  {
    practice: "Sample Smiles Studio",
    score: "71",
    reason: "Solid listing; outreach can emphasize partnership and growth.",
    outreach: "Hi — noticed strong local presence; teams often reach out to fill specialty capacity…",
  },
  {
    practice: "Metro Dental Collective",
    score: "65",
    reason: "Visibility opportunity — good candidate for structured outreach.",
    outreach: "Hi — saw your practice in the area; we help teams prioritize who to contact first…",
  },
];

function LandingHeader() {
  return (
    <header className="w-full border-b border-white/10 bg-black py-4 text-white">
      <div className="container-page flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="inline-block text-white no-underline">
          <BrandMark />
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
          <Link href="/#how-it-works" className="underline-offset-4 hover:underline">
            How it works
          </Link>
          <Link href="/#sample-output" className="underline-offset-4 hover:underline">
            Example output
          </Link>
          <Link href="/pricing" className="underline-offset-4 hover:underline">
            Pricing
          </Link>
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "border-white bg-white text-black hover:bg-slate-100"
            )}
          >
            {SITE.primaryCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CtaPrimary({ className }: { className?: string }) {
  return (
    <Link href="/search" className={cn(buttonVariants({ size: "lg" }), "min-h-[48px] w-full sm:w-auto", className)}>
      {SITE.primaryCta}
    </Link>
  );
}

function CtaSecondary({ className }: { className?: string }) {
  return (
    <Link
      href="/#how-it-works"
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "min-h-[48px] w-full border-slate-300 sm:w-auto",
        className
      )}
    >
      {SITE.secondaryCta}
    </Link>
  );
}

export function DentistLanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <LandingHeader />

      <section className="container-page py-14 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Scored practice opportunities · B2B outreach
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight md:text-5xl">
            {POSITIONING.heroHeadline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">{POSITIONING.heroSubheadline}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaPrimary />
            <CtaSecondary />
          </div>
          <p className="mt-5 text-sm text-slate-600">{POSITIONING.heroMicrocopy}</p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-8">
        <div className="container-page grid gap-6 text-center text-sm font-medium text-slate-800 sm:grid-cols-3">
          <p>Built for dental sales &amp; growth teams</p>
          <p>Transparent scoring — review before you pay</p>
          <p>Structured data — not a vague &ldquo;AI list&rdquo;</p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 container-page py-16 md:py-20">
        <h2 className="text-center text-2xl font-bold md:text-3xl">How it works</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          From market search to a prioritized outreach list.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "We identify local practice signals",
              body: "We pull public dental practice listings for your city or region and normalize what we can (location, ratings, reviews, contact fields).",
            },
            {
              step: "2",
              title: "We score and prioritize opportunities",
              body: "Each listing gets a score, priority tier, and short rationale so you can see where outreach is likely to matter most.",
            },
            {
              step: "3",
              title: "You export and start conversations",
              body: `Unlock up to ${SITE.leadPackCount} records with outreach drafts — download as CSV and work your list.`,
            },
          ].map((item) => (
            <Card key={item.step} className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <span className="text-xs font-bold text-slate-400">STEP {item.step}</span>
                <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="sample-output" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="container-page mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Example output (practice records)</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Illustrative demo rows.</span> Your file contains{" "}
            <span className="font-medium text-slate-800">real local practices</span> for the area you searched — scored
            and prioritized for B2B outreach, not consumer patient data.
          </p>
          <Card className="mt-10 overflow-hidden border-slate-200 shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white hover:bg-white">
                    <TableHead>Practice</TableHead>
                    <TableHead className="w-16">Score</TableHead>
                    <TableHead className="min-w-[180px]">Reason</TableHead>
                    <TableHead className="min-w-[200px]">Outreach preview</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PRACTICE_PREVIEW_ROWS.map((row) => (
                    <TableRow key={row.practice}>
                      <TableCell className="font-medium">{row.practice}</TableCell>
                      <TableCell>{row.score}</TableCell>
                      <TableCell className="text-slate-700">{row.reason}</TableCell>
                      <TableCell className="max-w-[280px] truncate text-slate-600">{row.outreach}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="text-center text-2xl font-bold md:text-3xl">Why teams use Dentily</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Outreach-first pipeline</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Built for teams who sell to practices — not for buying consumer patient leads.
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Prioritized for action</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Tiers and scores help you start with the listings that best match your growth goals.
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-base">Message starters included</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Short drafts per practice so reps spend time on conversations, not blank pages.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="container-page mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Built for early dental growth teams</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            Dentily is pilot-friendly: transparent data, simple workflow, and room to test markets before you scale
            spend elsewhere.
          </p>
          <p className="mt-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
            Available for pilot users and early adopters
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Pilot-ready workflow",
                body: "Run a market, review the table, then unlock only if the list looks usable for your team.",
              },
              {
                title: "Transparent scoring",
                body: "Explainable factors from listing data — ratings, reviews, completeness, and growth-style signals.",
              },
              {
                title: "Fast market testing",
                body: "No bloated agency retainer — pay per search area when you want a fresh territory.",
              },
            ].map((card) => (
              <Card key={card.title} className="border-slate-200 bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">{card.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="text-center text-2xl font-bold md:text-3xl">Confidence &amp; clarity</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">No long-term contracts</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Standard offer is a one-time purchase per search — scale up only when you choose to run another market.
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Review before you scale</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              See scores, reasons, and outreach on-screen before you pay for the CSV unlock.
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Quality &amp; support</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Built with data quality review in mind. {QUALITY_REPLACEMENT_NOTE}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="pricing-section" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="container-page mx-auto max-w-lg">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Simple pricing</h2>
          <p className="mt-2 text-center text-sm text-slate-600">One pack. One price. Pay when the list looks right.</p>
          <Card className="mt-10 border-2 border-slate-900 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{SITE.leadPackName}</CardTitle>
              <p className="text-4xl font-bold">{SITE.leadPackPriceLabel}</p>
              <p className="text-sm text-slate-600">One-time · USD</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-center text-sm text-slate-700">
                {SITE.leadPackCount} scored practices with priorities, rationale, and outreach drafts for your market.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> Priority tiers + numeric scores
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> Contact fields when available on listings
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> CSV download after checkout
                </li>
              </ul>
              <p className="text-center text-xs font-medium text-slate-700">
                Limited to one paid pack per area to reduce overlap between customers.
              </p>
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "flex min-h-[48px] w-full items-center justify-center"
                )}
              >
                {SITE.primaryCta}
              </Link>
              <Link
                href="/pricing"
                className="block text-center text-sm font-medium text-blue-700 underline-offset-4 hover:underline"
              >
                Full pricing &amp; FAQ
              </Link>
            </CardContent>
          </Card>
          <PricingFaq />
        </div>
      </section>

      <section className="bg-black py-16 text-white md:py-24">
        <div className="container-page mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Run your next territory</h2>
          <p className="mt-4 text-lg text-white/80">
            Search a market, review scored practices, then unlock the export when you are ready.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/search"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-[52px] bg-white px-8 text-black hover:bg-slate-100"
              )}
            >
              {SITE.primaryCta}
            </Link>
            <Link
              href="/pricing"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-[52px] border-white/40 bg-transparent text-white hover:bg-white/10"
              )}
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-10 text-center text-sm text-slate-600">
        <div className="container-page flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
          <p>© {new Date().getFullYear()} Dentily</p>
          <Link href="/pricing" className="text-blue-600 hover:underline">
            Pricing
          </Link>
          <Link href="/search" className="text-blue-600 hover:underline">
            {SITE.primaryCta}
          </Link>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}

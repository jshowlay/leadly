import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/lib/button-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const SAMPLE_ROWS = [
  {
    name: "Sunrise Family Dental",
    score: "78",
    reason: "Solid rating with room to grow reviews and bookings.",
    outreach: "Hi — I noticed your practice has strong local visibility but only around 35 reviews…",
  },
  {
    name: "Desert Ridge Dentistry",
    score: "71",
    reason: "No public site — new patients may be choosing easier-to-find practices.",
    outreach: "Hi — I came across your practice and thought there may be a way to help you bring in more new patients…",
  },
  {
    name: "Arcadia Smiles",
    score: "65",
    reason: "Moderate reviews — good candidate for clearer patient outreach.",
    outreach: "Hi — saw you’re doing well locally. We help dentists turn that into more booked appointments…",
  },
];

function LandingHeader() {
  return (
    <header className="w-full bg-black py-4 text-white">
      <div className="container-page flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BrandMark />
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/search" className="text-sm text-white/90 underline-offset-4 hover:underline">
            Run a search
          </Link>
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "border-white bg-white text-black hover:bg-slate-100"
            )}
          >
            Get My Lead Pack
          </Link>
        </div>
      </div>
    </header>
  );
}

function CtaPrimary({ className }: { className?: string }) {
  return (
    <Link href="/search" className={cn(buttonVariants({ size: "lg" }), "w-full min-h-[48px] sm:w-auto", className)}>
      Get My Lead Pack
    </Link>
  );
}

function CtaSecondaryOutline({ className }: { className?: string }) {
  return (
    <Link
      href="/search"
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "w-full min-h-[48px] border-slate-300 sm:w-auto",
        className
      )}
    >
      Buy Lead Pack
    </Link>
  );
}

export function DentistLanding() {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      {/* Hero */}
      <section className="container-page py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Get More Dental Patients — Without Guesswork
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">
            Dentily identifies dental practices most likely to grow and shows you exactly how to reach them.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CtaPrimary />
          </div>
          <p className="mt-4 text-base font-medium text-slate-700">
            50 prioritized practices + outreach for more appointments — ready today
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="container-page mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Most Dentists Struggle to Get Consistent New Patients
          </h2>
          <ul className="mt-6 space-y-3 text-lg text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">—</span>
              <span>Relying on word of mouth</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">—</span>
              <span>Inconsistent appointment flow</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">—</span>
              <span>Wasted time on ineffective marketing</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-400">—</span>
              <span>No clear system to generate new patients</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Dentily Finds Your Best Opportunities — Instantly</h2>
          <ul className="mt-6 space-y-4 text-lg text-slate-700">
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>We identify dental practices that are most likely to need more patients.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>We analyze reviews, online presence, and growth signals.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✓</span>
              <span>We generate ready-to-use outreach messages you can send today.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* What you get */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="container-page mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What You Get</h2>
          <ul className="mt-6 space-y-3 text-lg text-slate-800">
            <li className="flex gap-3">
              <span className="font-bold text-slate-900">•</span>
              <span>50 qualified local dental leads</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-900">•</span>
              <span>Contact details (phone, website)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-900">•</span>
              <span>AI lead scoring so you know who to call first</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-900">•</span>
              <span>Personalized outreach messages for each practice</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-slate-900">•</span>
              <span>Downloadable CSV file — yours after checkout</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Sample output */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">Sample results</h2>
          <p className="mt-2 text-center text-slate-600">Here&apos;s what a Dentily result looks like</p>
          <Card className="mt-8 overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-20">Score</TableHead>
                    <TableHead className="min-w-[180px]">Reason</TableHead>
                    <TableHead className="min-w-[200px]">Outreach snippet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SAMPLE_ROWS.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>{row.score}</TableCell>
                      <TableCell className="text-slate-700">{row.reason}</TableCell>
                      <TableCell className="max-w-[280px] truncate text-slate-600" title={row.outreach}>
                        {row.outreach}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">How it works</h2>
          <ol className="mt-10 space-y-8 text-left text-lg text-slate-800 md:mx-auto md:max-w-lg">
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                1
              </span>
              <div>
                <p className="font-semibold text-slate-900">Choose your location</p>
                <p className="mt-1 text-slate-600">Tell us where you want dental practices.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                2
              </span>
              <div>
                <p className="font-semibold text-slate-900">Get your lead pack</p>
                <p className="mt-1 text-slate-600">Review scored leads and outreach copy, then unlock the full CSV.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                3
              </span>
              <div>
                <p className="font-semibold text-slate-900">Start reaching out</p>
                <p className="mt-1 text-slate-600">Book more patient appointments with clear, simple outreach.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="container-page py-12 md:py-16">
        <div className="mx-auto max-w-md">
          <Card className="border-2 border-slate-900 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Dentily Dental Lead Pack</CardTitle>
              <p className="text-4xl font-bold text-slate-900">$49</p>
              <p className="text-sm text-slate-600">One-time · USD</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-2 text-left text-slate-700">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> 50 leads
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> Outreach messages included
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> Instant download after payment
                </li>
              </ul>
              <CtaSecondaryOutline className="w-full" />
              <p className="text-center text-xs text-slate-500">
                Run a search first — then unlock your CSV from the results page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-slate-200 bg-slate-50 py-12 md:py-16">
        <div className="container-page mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Why teams use Dentily</h2>
          <div className="mt-8 grid gap-6 text-left sm:grid-cols-3 sm:text-center">
            <p className="text-slate-700">Built for local service businesses</p>
            <p className="text-slate-700">Focused on real patient growth</p>
            <p className="text-slate-700">No fluff — just actionable leads</p>
          </div>
          <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            <p className="font-medium text-slate-700">What customers say</p>
            <p className="mt-2 italic">&ldquo;Placeholder for testimonials — add real quotes as you collect them.&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="container-page py-8">
        <p className="text-center text-sm font-medium text-amber-900">
          Limited to one lead pack per area to avoid overlap.
        </p>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-black py-14 text-white md:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Start Getting More Patients Today</h2>
          <p className="mt-3 text-lg text-white/80">Pick a city. Get your pack. Start the conversation.</p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/search"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-[52px] bg-white px-8 text-black hover:bg-slate-100"
              )}
            >
              Get My Lead Pack
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-600">
        <div className="container-page">
          <p>© 2026 Dentily · Dental patient growth</p>
          <Link href="/search" className="mt-2 inline-block text-blue-600 hover:underline">
            Run a search
          </Link>
        </div>
      </footer>
    </div>
  );
}

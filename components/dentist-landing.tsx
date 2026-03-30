import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { PricingFaq } from "@/components/pricing-faq";
import { buttonVariants } from "@/lib/button-variants";
import { POSITIONING, SITE } from "@/lib/site-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const WHAT_YOU_GET = [
  "High-opportunity dental practices in your target city",
  "AI-scored opportunity insights",
  "Best available contact method (email, form, or phone)",
  "Estimated revenue opportunity",
  "Personalized outreach messages",
  "A ready-to-use sales asset you can act on immediately",
] as const;

const BUILT_FOR = [
  { title: "Freelancers", body: "Selling marketing, SEO, or creative to local practices." },
  { title: "Local SEO agencies", body: "Prospecting dental clients with a clear angle per practice." },
  { title: "Paid ads specialists", body: "Finding offices that need demand and better funnels." },
  { title: "Consultants", body: "Closing dental practices with insight-led conversations." },
] as const;

function LandingHeader() {
  return (
    <header className="w-full border-b border-white/10 bg-black py-4 text-white">
      <div className="container-page flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="inline-block text-white no-underline">
          <BrandMark />
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
          <Link href="/#what-you-get" className="underline-offset-4 hover:underline">
            What you get
          </Link>
          <Link href="/#example-lead" className="underline-offset-4 hover:underline">
            Example lead
          </Link>
          <Link href="/#how-it-works" className="underline-offset-4 hover:underline">
            How it works
          </Link>
          <Link href="/#built-for" className="underline-offset-4 hover:underline">
            Who it&apos;s for
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
      href="/#what-you-get"
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

      {/* Hero */}
      <section className="container-page py-14 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            For agencies, freelancers &amp; consultants
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-[1.12] tracking-tight text-slate-900 md:text-5xl md:leading-[1.1]">
            {POSITIONING.heroHeadline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">{POSITIONING.heroSubheadline}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <CtaPrimary />
            <CtaSecondary />
          </div>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600">
            {POSITIONING.heroSupportLine}
          </p>
          <p className="mt-4 text-xs text-slate-500">{POSITIONING.heroMicrocopy}</p>
        </div>
      </section>

      {/* What you get */}
      <section id="what-you-get" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold text-slate-900 md:text-3xl">What You Get</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
            Everything in your lead pack is built so you can open the file and start outreach the same day.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_YOU_GET.map((line) => (
              <Card key={line} className="border-slate-200 bg-white shadow-sm">
                <CardContent className="flex gap-3 pt-6">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                    ✓
                  </span>
                  <p className="text-sm font-medium leading-snug text-slate-800">{line}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-10 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
            Pack preview (illustrative columns)
          </p>
          <Card className="mx-auto mt-4 max-w-4xl overflow-hidden border-slate-200 shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-white hover:bg-white">
                      <TableHead>Practice Name</TableHead>
                      <TableHead className="min-w-[140px]">Opportunity</TableHead>
                      <TableHead>Best Contact</TableHead>
                      <TableHead className="min-w-[160px]">Estimated Opportunity</TableHead>
                      <TableHead className="min-w-[220px]">Outreach Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Riverside Family Dental</TableCell>
                      <TableCell className="text-slate-700">Reputation / reviews gap</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell className="text-slate-700">$5k–$15k/mo upside</TableCell>
                      <TableCell className="max-w-[280px] text-sm text-slate-600">
                        Hi — I noticed a few missed growth opportunities at your practice…
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lakeside Ortho</TableCell>
                      <TableCell className="text-slate-700">Visibility / local SEO</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell className="text-slate-700">$3k–$10k/mo upside</TableCell>
                      <TableCell className="max-w-[280px] text-sm text-slate-600">
                        Quick note — your listing shows strong potential but uneven demand signals…
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example lead */}
      <section id="example-lead" className="scroll-mt-20 container-page py-16 md:py-20">
        <h2 className="text-center text-2xl font-bold md:text-3xl">Example Lead</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">
          One row from a pack — structured so you know who to contact, why they matter, and what to say.
        </p>
        <Card className="mx-auto mt-10 max-w-2xl border-2 border-slate-900 shadow-lg">
          <CardHeader className="border-b border-slate-100 bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sample record</p>
            <CardTitle className="text-xl text-slate-900">Riverside Family Dental</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-6 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Opportunity</p>
              <p className="mt-1 text-slate-800">
                Low review rating with clear reputation upside — patients are comparing you online before they book.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estimated Opportunity</p>
              <p className="mt-1 font-medium text-slate-900">
                High upside from reputation improvement ($5k–$15k/mo)
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Best Contact Method</p>
              <p className="mt-1 font-medium text-slate-900">Email</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Outreach Message</p>
              <blockquote className="mt-2 rounded-md border border-slate-200 bg-white p-4 text-slate-700 leading-relaxed">
                Hi [Name], I noticed a few missed growth opportunities at your practice, especially around online
                reputation and local visibility. Practices in your area are losing consults to competitors with stronger
                review profiles — we help teams close that gap fast. Open to a 10-minute call this week?
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-16 md:py-20">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold md:text-3xl">How It Works</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600">
            Three steps from city pick to conversations that can pay.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <span className="text-xs font-bold text-slate-400">STEP 1</span>
                <CardTitle className="text-lg leading-snug">Pick a city</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  We identify dental practices with clear growth gaps.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <span className="text-xs font-bold text-slate-400">STEP 2</span>
                <CardTitle className="text-lg leading-snug">Get your lead pack</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  Receive scored opportunities, contact paths, and outreach messages.
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <span className="text-xs font-bold text-slate-400">STEP 3</span>
                <CardTitle className="text-lg leading-snug">Start closing clients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  Reach out with a clear angle and turn insights into revenue.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Built for */}
      <section id="built-for" className="scroll-mt-20 container-page py-16 md:py-20">
        <h2 className="text-center text-2xl font-bold md:text-3xl">Built For</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600">
          If you help local businesses grow, Dentily helps you find dental clients worth contacting.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BUILT_FOR.map((item) => (
            <Card key={item.title} className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">{item.body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust / clarity */}
      <section id="what-dentily-is" className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-14 md:py-16">
        <div className="container-page mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What Dentily Is</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            Dentily is an AI-powered lead intelligence platform for agencies, freelancers, and consultants who want to
            win more dental clients.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            It is not a dental clinic or patient-facing dental service. It is a client acquisition tool built to help
            you spot revenue opportunities and act on them fast.
          </p>
        </div>
      </section>

      {/* Pricing + FAQ */}
      <section id="pricing-section" className="scroll-mt-20 border-t border-slate-200 py-16 md:py-20">
        <div className="container-page mx-auto max-w-lg">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Simple pricing</h2>
          <p className="mt-2 text-center text-sm text-slate-600">One pack. One price. Pay when the list looks right.</p>
          <p className="mx-auto mt-4 max-w-md text-center text-sm font-medium leading-relaxed text-slate-800">
            Close one client from your lead pack and the ROI can pay for itself many times over.
          </p>
          <p className="mx-auto mt-3 max-w-md text-center text-xs text-slate-500">
            Fresh city packs are limited and designed for fast action — we focus on quality over flooding the same
            market.
          </p>
          <Card className="mt-10 border-2 border-slate-900 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{SITE.leadPackName}</CardTitle>
              <p className="text-4xl font-bold">{SITE.leadPackPriceLabel}</p>
              <p className="text-sm text-slate-600">One-time · USD</p>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-center text-sm text-slate-700">
                {SITE.leadPackCount} scored practices with priorities, rationale, best contact paths, estimated
                opportunity, and outreach drafts for your market.
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> Priority tiers + numeric scores
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> Email, form, or phone when available
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span> CSV download after checkout
                </li>
              </ul>
              <p className="text-center text-xs font-medium text-slate-600">
                Limited city packs available — one pack per search helps keep opportunity data fresh for each market.
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

      {/* Final CTA */}
      <section className="bg-black py-16 text-white md:py-24">
        <div className="container-page mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Start closing dental clients</h2>
          <p className="mt-4 text-lg text-white/85">
            Pick a city, review your scored pack on screen, then unlock when you are ready to reach out.
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
              href="/#what-you-get"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-[52px] border-white/40 bg-transparent text-white hover:bg-white/10"
              )}
            >
              {SITE.secondaryCta}
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

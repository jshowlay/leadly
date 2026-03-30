import Link from "next/link";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

const HERO_BULLETS = [
  "Find high-potential dental practices instantly",
  "See exactly what their marketing is missing",
  "Reach out with confidence using real data",
] as const;

export function LandingHero({
  primaryHref,
  secondaryHref,
  primaryLabel,
  secondaryLabel,
}: {
  primaryHref: string;
  secondaryHref: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <section className="border-b border-slate-200 bg-white py-20 md:py-28">
      <div className="landing-max">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            For dental marketing agencies, freelancers, consultants &amp; BD teams
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Stop Guessing. Start Closing Dental Clients.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Dentily shows you exactly which dental practices are ready to grow — and what to say to win them.
          </p>
          <ul className="mx-auto mt-8 max-w-xl space-y-3 text-left text-sm text-slate-700 md:text-base">
            {HERO_BULLETS.map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href={primaryHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-[52px] w-full bg-slate-900 text-white hover:bg-slate-900/90 sm:w-auto sm:px-10"
              )}
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-h-[52px] w-full border-slate-300 sm:w-auto sm:px-8"
              )}
            >
              {secondaryLabel}
            </Link>
          </div>
          <p className="mt-6 text-xs text-slate-500">
            No contracts • Instant access • Data-backed insights
          </p>
        </div>
      </div>
    </section>
  );
}

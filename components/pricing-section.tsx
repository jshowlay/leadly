"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import "@/app/pricing-page.css";

const PRO_LOGIN_URL = "/login?next=/pricing&plan=pro";

type CheckoutPlan = "starter" | "pro";

const plans = [
  {
    id: "starter" as const,
    name: "Starter",
    tierLabel: "STARTER",
    price: "$49",
    period: null as string | null,
    billing: "One-time · no subscription",
    tagline: "Test one market before committing to a pipeline.",
    popular: false,
    cta: "Get started",
    ctaHref: "/search",
    ctaStyle: "ghost" as const,
    checkoutPlan: "starter" as CheckoutPlan | null,
    features: [
      "50 scored dental practices",
      "Priority tiers + numeric scores",
      "Why-this-lead rationale per row",
      "Best contact path per lead",
      "Ready-to-use outreach drafts",
      "CSV download, instant access",
    ],
    outreach: null,
    missing: null,
    note: null,
  },
  {
    id: "pro" as const,
    name: "Pro",
    tierLabel: "PRO",
    price: "$99",
    period: "/month",
    billing: "Billed monthly · cancel anytime",
    tagline: "Leads and outreach — we do the work, you take the calls.",
    popular: true,
    cta: "Start Pro",
    ctaHref: PRO_LOGIN_URL,
    ctaStyle: "primary" as const,
    checkoutPlan: "pro" as CheckoutPlan,
    features: [
      "Everything in Starter",
      "Fresh leads delivered every month",
      "Never see the same lead twice",
      "Dashboard to track your pipeline",
      "Multiple markets supported",
      "Priority support",
    ],
    outreach: [
      "Cold outreach sent on your behalf",
      "Personalized per practice, per market",
      "Replies land directly in your inbox",
    ],
    missing: null,
    note: "Close one client and Pro pays for itself many times over.",
  },
  {
    id: "growth" as const,
    name: "Growth",
    tierLabel: "GROWTH",
    price: "$149",
    period: "/month",
    billing: "Billed monthly · cancel anytime",
    tagline: "High-volume prospecting across multiple territories.",
    popular: false,
    cta: "See Growth plan",
    ctaHref: "/pricing#growth",
    ctaStyle: "ghost" as const,
    checkoutPlan: null,
    features: [
      "Everything in Starter",
      "Fresh leads every month",
      "Never see the same lead twice",
      "Dashboard to track pipeline",
      "Unlimited markets",
      "Bulk CSV exports",
    ],
    outreach: null,
    missing: "Outreach not included",
    note: null,
  },
];

function FeatureCheck({ text, muted }: { text: string; muted?: boolean }) {
  return (
    <div className={`dp-feature${muted ? " is-muted" : ""}`}>
      <span className={muted ? "dp-icon-cross" : "dp-icon-check"} aria-hidden>
        {muted ? "✕" : "✓"}
      </span>
      <span>{text}</span>
    </div>
  );
}

type PricingSectionProps = {
  /** On /pricing — Starter & Pro run Stripe checkout after sign-in. */
  enableCheckout?: boolean;
  /** Hide section intro (page supplies its own hero). */
  hideIntro?: boolean;
  /** Show bottom “not sure” tip — landing only. */
  showFooterTip?: boolean;
};

export function PricingSection({
  enableCheckout = false,
  hideIntro = false,
  showFooterTip = false,
}: PricingSectionProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<CheckoutPlan | null>(null);

  const startCheckout = useCallback(
    async (selected: CheckoutPlan) => {
      if (!session?.user) {
        window.location.href = `/login?next=/pricing&plan=${selected}`;
        return;
      }
      setLoading(selected);
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: selected }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Checkout failed");
        if (data.url) window.location.href = data.url;
      } catch (e) {
        alert(e instanceof Error ? e.message : "Checkout failed");
      } finally {
        setLoading(null);
      }
    },
    [session]
  );

  const resolveCta = (plan: (typeof plans)[number]) => {
    if (!enableCheckout || !plan.checkoutPlan) {
      return { href: plan.ctaHref, onClick: undefined as (() => void) | undefined };
    }
    return {
      href: undefined,
      onClick: () => startCheckout(plan.checkoutPlan!),
    };
  };

  return (
    <section id="pricing" className={hideIntro ? undefined : "dp-pricing-embed"}>
      {!hideIntro ? (
        <div style={{ marginBottom: 48, maxWidth: 1100, margin: "0 auto 48px", padding: "0 24px" }}>
          <p className="dp-tier" style={{ marginBottom: 10 }}>
            Pricing
          </p>
          <h2 className="dp-serif" style={{ fontSize: "clamp(26px, 4vw, 36px)", margin: "0 0 12px", lineHeight: 1.15 }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: 16, color: "var(--color-muted)", margin: 0, maxWidth: 520, lineHeight: 1.6 }}>
            Start with one market or hand off your outreach entirely. Every plan includes scored, pitch-ready dental
            leads.
          </p>
        </div>
      ) : null}

      <div className="dp-grid">
        {plans.map((plan) => {
          const cta = resolveCta(plan);
          const isLoading = Boolean(
            enableCheckout && plan.checkoutPlan && loading === plan.checkoutPlan
          );
          const CtaTag = cta.href ? "a" : "button";

          return (
            <article
              key={plan.id}
              id={plan.id === "growth" ? "growth" : undefined}
              className={`dp-card${plan.popular ? " is-featured" : ""}`}
            >
              {plan.popular ? <span className="dp-popular-badge">★ Most popular</span> : null}

              <p className="dp-tier">{plan.tierLabel}</p>

              <div className="dp-price-row">
                <span className="dp-price">{plan.price}</span>
                {plan.period ? <span className="dp-period">{plan.period}</span> : null}
              </div>

              <p className="dp-billing">{plan.billing}</p>
              <p className="dp-tagline">{plan.tagline}</p>

              <div className="dp-features">
                {plan.features.map((f) => (
                  <FeatureCheck key={f} text={f} />
                ))}

                {plan.outreach ? (
                  <div className="dp-outreach-box">
                    <div className="dp-outreach-head">
                      <span className="dp-outreach-label">Done-for-you outreach</span>
                      <span className="dp-coming-soon">Coming soon</span>
                    </div>
                    <div className="dp-outreach-features">
                      {plan.outreach.map((f) => (
                        <div key={f} className="dp-feature">
                          <span className="dp-icon-star" aria-hidden>
                            ★
                          </span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {plan.missing ? <FeatureCheck text={plan.missing} muted /> : null}
              </div>

              <CtaTag
                {...(cta.href ? { href: cta.href } : { type: "button" as const })}
                onClick={cta.onClick}
                disabled={isLoading}
                className={`dp-cta ${plan.ctaStyle === "primary" ? "is-primary" : "is-ghost"}`}
              >
                {isLoading ? (
                  <Loader2 size={18} className="mx-auto animate-spin" aria-label="Loading" />
                ) : (
                  `${plan.cta} →`
                )}
              </CtaTag>

              {plan.note ? <p className="dp-card-note">{plan.note}</p> : null}
            </article>
          );
        })}
      </div>

      {showFooterTip ? (
        <div className="dp-tip">
          <div className="dp-tip-inner">
            <strong>Not sure where to start?</strong> Grab Starter for your first market — no subscription needed.
            Upgrade to Pro any time and we&apos;ll take care of the outreach for you.{" "}
            <Link href="/search">Preview a market first</Link>.
          </div>
        </div>
      ) : null}
    </section>
  );
}

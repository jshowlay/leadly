import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/site-header";
import { PricingFaq } from "@/components/pricing-faq";
import { PricingHowToUse } from "@/components/pricing/pricing-how-to-use";
import { PricingSection } from "@/components/pricing-section";
import "@/app/pricing-page.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starter, Pro, and Growth plans for scored dental practice leads — one-time packs or monthly pipelines for agencies and consultants.",
};

export default function PricingPage() {
  return (
    <div className="dentily-pricing">
      <SiteHeader homeStyle />

      <header className="dp-hero">
        <span className="dp-badge">Pricing</span>
        <h1>
          Simple pricing, <em>real results</em>
        </h1>
        <p className="dp-hero-sub">
          One-time or monthly — pick the plan that fits how you prospect. Close one client and any plan pays for
          itself.
        </p>
        <p className="dp-trust-pill">
          <span className="dp-trust-dot" aria-hidden />
          No contracts · instant access · cancel anytime on monthly plans
        </p>
      </header>

      <PricingSection enableCheckout hideIntro />

      <PricingHowToUse />

      <PricingFaq layout="grid" />
    </div>
  );
}

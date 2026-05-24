import { HOW_TO_USE_PACK_STEPS } from "@/lib/site-config";

export function PricingHowToUse() {
  return (
    <section className="dp-howto" aria-labelledby="pricing-howto-heading">
      <h2 id="pricing-howto-heading" className="dp-serif">
        How to use your pack
      </h2>
      <ol className="dp-steps">
        {HOW_TO_USE_PACK_STEPS.map((step, i) => (
          <li key={step} className="dp-step">
            <span className="dp-step-num" aria-hidden>
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

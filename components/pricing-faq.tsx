const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What do I actually receive?",
    a: "A scored list of local dental practices (public business records) for the area you searched: names, location, contact fields when available, ratings/reviews where present, priority tier, a short reason, and suggested outreach text. It is built for B2B outreach to offices — not a consumer patient lead list.",
  },
  {
    q: "How is this different from patient leads?",
    a: "Dentily does not sell individual patient identities or clinical data. You get practice-level opportunities derived from listings such as Google Maps, prioritized for your sales or partnership outreach.",
  },
  {
    q: "Is there a contract?",
    a: "The standard opportunity pack is a one-time purchase for that search. No subscription is required in the product flow.",
  },
  {
    q: "How fast do I get the file?",
    a: "After your search completes, you can review results on screen. After payment, download the CSV from your results page or success page.",
  },
  {
    q: "What should I do after purchase?",
    a: "Review High-priority rows first, adapt the outreach drafts to your voice, and contact practices through your normal business development process. Track what works and refine your next search.",
  },
];

export function PricingFaq() {
  return (
    <div className="mt-12 border-t border-slate-200 pt-10">
      <h2 className="text-lg font-semibold text-slate-900">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.q}
            className="group rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >
            <summary className="cursor-pointer list-none text-sm font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
              {item.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What does a lead pack include?",
    a: "Up to 50 scored dental practice records for the area you searched: practice name, location, maps link, ratings/reviews where available, priority and score, a short opportunity reason, estimated opportunity range, best contact method (email, contact form, or phone when we can determine it), and a personalized outreach message starter. Built for B2B outreach — not consumer patient data.",
  },
  {
    q: "Do all leads include email addresses?",
    a: "Each lead includes the best available contact method, which may be an email address, contact form URL, or phone number depending on what the practice lists publicly. Many rows are immediately actionable by phone or form even when a mailbox is not exposed.",
  },
  {
    q: "Who is Dentily for?",
    a: "Agencies, freelancers, and consultants who sell marketing, SEO, ads, or growth services to dental practices and want a prioritized list with angles and message starters — not a generic scraped directory.",
  },
  {
    q: "How fast can I start outreach?",
    a: "After your search finishes, you can review results on screen right away. After checkout, download the CSV and start the same day. Optional background steps may add more email detail later without blocking your first pass.",
  },
  {
    q: "What do I actually receive?",
    a: "A scored list of local dental practices (public business records) for the area you searched, prioritized for your sales or partnership outreach.",
  },
  {
    q: "How is this different from patient leads?",
    a: "Dentily does not sell individual patient identities or clinical data. You get practice-level opportunities derived from listings such as Google Maps.",
  },
  {
    q: "Is there a contract?",
    a: "The standard opportunity pack is a one-time purchase for that search. No subscription is required in the product flow.",
  },
  {
    q: "How fast do I get the file?",
    a: "After your search completes, you can review results on screen. After payment, download the CSV from your results page or success page.",
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

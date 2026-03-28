/** Marketing CTAs and display constants — single source of truth for funnel copy. */

export const SITE = {
  /** Matches /search: user picks market + runs scored practice lookup */
  primaryCta: "Search Your Market",
  secondaryCta: "See How It Works",
  /** After search, when user still needs to pay */
  unlockCta: "Unlock opportunity pack ($49)",
  leadPackName: "Dentily Practice Opportunity Pack",
  leadPackPriceLabel: "$49",
  leadPackCount: 50,
  searchSubmitLoading: "Finding practices…",
} as const;

/** What the product actually delivers (scored practice records for B2B outreach — not consumer patient leads). */
export const POSITIONING = {
  heroHeadline: "Find High-Value Dental Practice Opportunities in Your Market",
  heroSubheadline:
    "Dentily surfaces scored local dental practices, prioritizes growth signals, and gives you structured outreach so your team can start conversations faster — without a long agency retainer.",
  heroMicrocopy: "No subscription required for the standard pack. Review results before you buy. Built for outbound and pilot programs.",
  searchHeadline: "Search your market",
  searchSubheadline:
    "Enter a city or region to generate a scored list of local dental practices. Preview results, then unlock the full CSV when you are ready.",
} as const;

export const HOW_TO_USE_PACK_STEPS: readonly string[] = [
  "Open your results table and sort by priority and score.",
  "Start with High-priority practices and adapt the included outreach drafts.",
  "Reach out through your normal B2B or partnership process — calls, email, or field visits.",
  "Track responses and run another search when you want a fresh territory.",
];

/** Plain-English quality note — manual review; not an automated guarantee. */
export const QUALITY_REPLACEMENT_NOTE =
  "If a purchased pack is materially unusable due to widespread bad or missing records, contact support — we can review and, at our discretion, offer a replacement or credit. Not a substitute for legal advice or a formal SLA.";

/** Marketing CTAs and display constants — single source of truth for funnel copy. */

export const SITE = {
  /** Primary funnel CTA — landing, nav, pricing card, final CTA */
  primaryCta: "Get My First Lead Pack",
  /** Secondary — scroll to product detail on landing */
  secondaryCta: "See What's Inside",
  /** After search, when user still needs to pay */
  unlockCta: "Unlock opportunity pack ($49)",
  leadPackName: "Dentily Practice Opportunity Pack",
  leadPackPriceLabel: "$49",
  leadPackCount: 50,
  searchSubmitLoading: "Building your pack…",
  /** Shown under the submit button while the search API runs */
  searchSubmitWaitHint:
    "We pull live listings, enrich missing details, and score every practice — usually 30–90 seconds. Keep this tab open.",
} as const;

/** Landing hero + search page headlines */
export const POSITIONING = {
  heroHeadline: "Close Your Next Dental Client in 7 Days",
  heroSubheadline:
    "Dentily finds dental practices losing patients, shows you why, and gives you exactly what to say to win them as clients.",
  heroSupportLine:
    "Each lead includes the best available contact method, opportunity insight, and a ready-to-use outreach message.",
  heroMicrocopy:
    "No subscription required for the standard pack. Review results before you buy. Built for agencies, freelancers, and consultants who sell growth.",
  searchHeadline: "Pick your city",
  searchSubheadline:
    "We surface dental practices with clear growth gaps, score the opportunity, and give you contact paths plus outreach you can use today.",
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

import type { Lead } from "@/lib/types";

/** Rule-based score before AI adjustment (1–100). */
export function computeBaseScore(lead: Lead): number {
  let score = 65;
  const reviewCount = lead.reviewCount;
  const rating = lead.rating;
  const primaryType = lead.primaryType;

  if (reviewCount !== null && reviewCount !== undefined) {
    if (reviewCount < 10) score += 12;
    else if (reviewCount < 25) score += 10;
    else if (reviewCount < 50) score += 6;
    else if (reviewCount > 400) score -= 15;
    else if (reviewCount > 200) score -= 10;
  }

  if (rating !== null && rating !== undefined) {
    if (rating < 4.0) score += 8;
    else if (rating >= 4.0 && rating <= 4.5) score += 6;
    else if (rating > 4.7) score -= 6;
  }

  if (!lead.website) score += 15;

  if (!lead.phone) score -= 8;

  if (primaryType) {
    const type = primaryType.toLowerCase();
    if (type.includes("dentist") || type.includes("dental")) score += 4;
  }

  return Math.max(1, Math.min(100, Math.round(score)));
}

export function classifyOpportunityType(lead: Lead): string {
  if (!lead.website) return "no_website";

  const rc = lead.reviewCount;
  if (rc != null && rc < 20) return "low_reviews";
  if (rc != null && rc < 75) return "moderate_reviews_growth";

  const rating = lead.rating;
  if (rating != null && rating < 4.2) return "reputation_improvement";

  return "general_growth";
}

export function classifyPriorityFromScore(score: number): "high" | "medium" | "low" {
  if (score >= 75) return "high";
  if (score >= 55) return "medium";
  return "low";
}

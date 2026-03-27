import type { Lead } from "@/lib/types";

/** Rule-based score before AI adjustment (1–100). */
export function computeBaseScore(lead: Lead): number {
  let score = 50;
  const reviewCount = lead.reviewCount;
  const rating = lead.rating;

  if (reviewCount !== null && reviewCount !== undefined) {
    if (reviewCount < 20) score += 20;
    else if (reviewCount < 50) score += 10;
    else if (reviewCount > 200) score -= 15;
  }

  if (rating !== null && rating !== undefined) {
    if (rating >= 3.5 && rating <= 4.5) score += 10;
    if (rating > 4.7) score -= 10;
    if (rating < 4.0) score += 10;
  }

  if (!lead.website) score += 20;

  return Math.max(1, Math.min(100, Math.round(score)));
}

export function classifyOpportunityType(lead: Lead): string {
  if (!lead.website) return "no_website";
  const rc = lead.reviewCount;
  if (rc != null && rc < 20) return "low_reviews";
  if (rc != null && rc < 100) return "moderate_reviews_growth";
  const rating = lead.rating;
  if (rating != null && rating < 4.2) return "reputation_improvement";
  return "general_growth";
}

export function classifyPriorityFromScore(score: number): "high" | "medium" | "low" {
  if (score >= 70) return "high";
  if (score >= 40) return "medium";
  return "low";
}

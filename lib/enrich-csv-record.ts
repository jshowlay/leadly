import type { EnrichedFields } from "@/lib/enrichLead";
import type { LeadInput } from "@/lib/enrichLead";

/** Map a CSV header-keyed row to LeadInput for Claude enrichment. */
export function csvRecordToLeadInput(lead: Record<string, unknown>): LeadInput {
  const g = (a: string, b: string) => {
    const v = lead[a] ?? lead[b];
    return v == null ? "" : String(v);
  };
  return {
    name: g("Name", "name"),
    address: g("Address", "address"),
    website: g("Website", "website"),
    phone: g("Phone", "phone") || undefined,
    rating: g("Rating", "rating") || undefined,
    reviewCount: g("Review Count", "reviewCount") || undefined,
    score: g("Score", "score") || undefined,
    priority: g("Priority", "priority") || undefined,
    opportunityType: g("Opportunity Type", "opportunityType") || undefined,
    actionTier: g("Action Tier", "actionTier") || undefined,
    whyThisLead: g("Why This Lead", "whyThisLead") || undefined,
    reason: g("Reason", "reason") || undefined,
    bestContactMethod: g("Best Contact Method", "bestContactMethod") || undefined,
    outreachReadiness: g("Outreach Readiness", "outreachReadiness") || undefined,
    estimatedOpportunity: g("Estimated Opportunity", "estimatedOpportunity") || undefined,
  };
}

/** Merge Claude enrichment onto a CSV header-keyed row. */
export function mergeEnrichmentOntoCsvRecord(
  lead: Record<string, unknown>,
  enriched: EnrichedFields
): Record<string, unknown> {
  const existingWhyNow = String(lead["Why Now"] ?? lead.whyNow ?? "").trim();
  const existingCluster = String(lead["Cluster Notes"] ?? lead.clusterNotes ?? "").trim();

  return {
    ...lead,
    "Primary Email": enriched.primaryEmail,
    "Other Emails": enriched.otherEmails,
    "Contact Form URL": enriched.contactFormUrl,
    "Email Source": enriched.emailSource,
    "Email Rejection Reason": enriched.emailRejectionReason,
    "Why Now": existingWhyNow || enriched.whyNow,
    "Cluster Notes": existingCluster || enriched.clusterNotes,
    "Enrichment Notes": enriched.enrichmentNotes,
    "Apollo Enrichment": enriched.apolloEnrichment,
  };
}

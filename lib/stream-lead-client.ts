import type { Lead } from "@/lib/types";
import type { LeadIntelligenceMetadata } from "@/lib/enrichLead";

/** Client-safe lead payload for SSE streaming (no heavy metadata blobs). */
export type StreamedLead = {
  placeId: string;
  name: string;
  niche: string | null;
  address: string | null;
  website: string | null;
  phone: string | null;
  rating: number | null;
  reviewCount: number | null;
  score?: number;
  reason?: string;
  outreach?: string;
  opportunityType: string | null;
  priority: string | null;
  primaryEmail: string | null;
  otherEmails: string | null;
  contactFormUrl: string | null;
  emailSource: string | null;
  emailRejectionReason: string | null;
  enrichmentNotes: string | null;
  whyNow: string | null;
  clusterNotes: string | null;
  apolloEnrichment: string | null;
  mapsUrl: string | null;
  enrichmentError?: boolean;
};

export function leadToStreamPayload(lead: Lead, enrichmentError = false): StreamedLead {
  const intel = (lead.metadata?.intelligence ?? {}) as LeadIntelligenceMetadata;
  return {
    placeId: String(lead.placeId ?? ""),
    name: String(lead.name ?? ""),
    niche: lead.niche ?? null,
    address: lead.address ?? null,
    website: lead.website ?? null,
    phone: lead.phone ?? null,
    rating: lead.rating == null ? null : Number(lead.rating),
    reviewCount: lead.reviewCount == null ? null : Number(lead.reviewCount),
    score: lead.score == null ? undefined : Number(lead.score),
    reason: lead.reason ?? undefined,
    outreach: lead.outreach ?? undefined,
    opportunityType: lead.opportunityType ?? null,
    priority: lead.priority ?? null,
    primaryEmail: lead.primaryEmail ?? null,
    otherEmails: intel.otherEmails ?? null,
    contactFormUrl: lead.contactFormUrl ?? null,
    emailSource: lead.emailSource ?? null,
    emailRejectionReason: lead.emailRejectionReason ?? null,
    enrichmentNotes: lead.enrichmentNotes ?? null,
    whyNow: intel.whyNow ?? null,
    clusterNotes: intel.clusterNotes ?? null,
    apolloEnrichment: intel.apolloEnrichment ?? null,
    mapsUrl: lead.mapsUrl ?? null,
    enrichmentError,
  };
}

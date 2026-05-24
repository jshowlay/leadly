import { getSearchForExport } from "@/lib/db";
import { isAnthropicConfigured } from "@/lib/enrichLead";
import { buildLeadPackRowsFromExport, packRowsToCsvRecords } from "@/lib/lead-pack-export";
import { getAppBaseUrl } from "@/lib/stripe";

export type TriggerBackgroundEnrichmentParams = {
  searchId: number;
  userEmail: string;
  orderId: string;
};

/**
 * Fire-and-forget POST to /api/enrich-background (raw CSV already available to user).
 */
export function triggerBackgroundEnrichment(params: TriggerBackgroundEnrichmentParams): void {
  const { searchId, userEmail, orderId } = params;
  const email = userEmail?.trim();
  if (!email) {
    console.warn("[trigger-background-enrichment] skipped — no customer email", { searchId, orderId });
    return;
  }
  if (!isAnthropicConfigured()) {
    console.warn("[trigger-background-enrichment] skipped — ANTHROPIC_API_KEY not set");
    return;
  }
  if (!process.env.RESEND_API_KEY?.trim()) {
    console.warn("[trigger-background-enrichment] skipped — RESEND_API_KEY not set");
    return;
  }

  void (async () => {
    try {
      const { search, rows } = await getSearchForExport(searchId);
      if (!search?.isPaid) {
        console.warn("[trigger-background-enrichment] search not paid", { searchId });
        return;
      }

      const packRows = buildLeadPackRowsFromExport(rows);
      const leads = packRowsToCsvRecords(packRows);
      if (leads.length === 0) {
        console.warn("[trigger-background-enrichment] no leads to enrich", { searchId });
        return;
      }

      const base = getAppBaseUrl();
      const secret = process.env.ENRICH_BACKGROUND_SECRET?.trim();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (secret) headers["x-dentily-enrich-secret"] = secret;

      const res = await fetch(`${base}/api/enrich-background`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          leads,
          userEmail: email,
          location: search.location,
          orderId,
          searchId,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("[trigger-background-enrichment] API error", res.status, text.slice(0, 200));
      }
    } catch (err) {
      console.error("[trigger-background-enrichment] failed", err);
    }
  })();
}

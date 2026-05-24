import { buildScoredLeads } from "@/lib/build-scored-leads";
import { getSearchWithLeads, insertLeads, setSearchStatus } from "@/lib/db";
import {
  applyAiEnrichmentToLead,
  enrichLead,
  isAnthropicConfigured,
  leadToEnrichInput,
} from "@/lib/enrichLead";
import type { NicheConfig } from "@/lib/types";
import { EMPTY_LEAD_ENRICHMENT, type Lead } from "@/lib/types";
import {
  decrementSearchCredit,
  markSearchPaidForUser,
} from "@/lib/subscription-db";
import { encodeSearchStreamEvent } from "@/lib/search-sse";
import { leadToStreamPayload } from "@/lib/stream-lead-client";

export type SearchStreamContext = {
  searchId: number;
  niche: string;
  location: string;
  nicheConfig: NicheConfig;
  subscriptionUserId: number | null;
};

export function createSearchLeadStream(ctx: SearchStreamContext): ReadableStream<Uint8Array> {
  return new ReadableStream({
    async start(controller) {
      const enqueue = (event: Parameters<typeof encodeSearchStreamEvent>[0]) => {
        controller.enqueue(encodeSearchStreamEvent(event));
      };

      try {
        enqueue({
          type: "phase",
          phase: "generating",
          message: "Finding practices in your market…",
        });

        const scoredLeads = await buildScoredLeads({
          searchId: ctx.searchId,
          niche: ctx.niche,
          location: ctx.location,
          nicheConfig: ctx.nicheConfig,
          subscriptionUserId: ctx.subscriptionUserId,
        });

        if (scoredLeads.length === 0) {
          await setSearchStatus(ctx.searchId, "completed", { resultCount: 0 });
          enqueue({
            type: "meta",
            searchId: ctx.searchId,
            niche: ctx.niche,
            location: ctx.location,
            total: 0,
          });
          enqueue({
            type: "done",
            searchId: ctx.searchId,
            resultCount: 0,
            isPaid: Boolean(ctx.subscriptionUserId),
          });
          controller.close();
          return;
        }

        enqueue({
          type: "meta",
          searchId: ctx.searchId,
          niche: ctx.niche,
          location: ctx.location,
          total: scoredLeads.length,
        });

        enqueue({
          type: "phase",
          phase: "enriching",
          message: "Enriching leads one by one…",
        });

        const useAi = isAnthropicConfigured();
        let inserted = 0;

        for (let i = 0; i < scoredLeads.length; i++) {
          const base = scoredLeads[i]!;
          let leadForInsert: Lead = {
            ...base,
            ...EMPTY_LEAD_ENRICHMENT,
            emailStatus: "pending",
          };
          let enrichmentError = false;

          if (useAi) {
            try {
              const enriched = await enrichLead(leadToEnrichInput(base));
              leadForInsert = applyAiEnrichmentToLead(leadForInsert, enriched);
            } catch (err) {
              enrichmentError = true;
              console.error(`[search-stream] enrich failed index=${i}`, err);
            }
          }

          await insertLeads(ctx.searchId, [leadForInsert]);
          inserted += 1;

          enqueue({
            type: "lead",
            index: i,
            lead: leadToStreamPayload(leadForInsert, enrichmentError),
          });
        }

        await setSearchStatus(ctx.searchId, "completed", { resultCount: inserted });

        if (ctx.subscriptionUserId) {
          await markSearchPaidForUser(ctx.searchId, ctx.subscriptionUserId);
          const deducted = await decrementSearchCredit(ctx.subscriptionUserId);
          if (!deducted) {
            console.warn("[search-stream] credit deduction failed", {
              searchId: ctx.searchId,
              subscriptionUserId: ctx.subscriptionUserId,
            });
          }
        }

        const saved = await getSearchWithLeads(ctx.searchId);

        enqueue({
          type: "done",
          searchId: ctx.searchId,
          resultCount: inserted,
          isPaid: Boolean(ctx.subscriptionUserId) || saved?.isPaid,
        });
        controller.close();
      } catch (err) {
        console.error("[search-stream] failed", err);
        const message = err instanceof Error ? err.message : "Search failed";
        await setSearchStatus(ctx.searchId, "failed", { errorMessage: message }).catch(() => {});
        enqueue({ type: "error", message });
        controller.close();
      }
    },
  });
}

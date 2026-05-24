import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { enrichLead } from "@/lib/enrichLead";
import { csvRecordToLeadInput, mergeEnrichmentOntoCsvRecord } from "@/lib/enrich-csv-record";
import { setBackgroundEnrichmentStatus } from "@/lib/db";
import { sendEnrichedCsv } from "@/lib/sendEnrichedCsv";

export const maxDuration = 300;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request): boolean {
  const secret = process.env.ENRICH_BACKGROUND_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV === "development";
  return request.headers.get("x-dentily-enrich-secret") === secret;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const leads = body.leads as Record<string, unknown>[] | undefined;
  const userEmail = String(body.userEmail ?? "").trim();
  const location = String(body.location ?? "your market");
  const orderId = String(body.orderId ?? "order");

  if (!leads?.length || !userEmail) {
    return NextResponse.json({ error: "leads and userEmail required" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
  }

  const response = NextResponse.json({ status: "enrichment_started" });

  const enrichmentPromise = (async () => {
    try {
      console.log(`[enrichment] Starting ${leads.length} leads for ${userEmail} — order ${orderId}`);

      const enrichedLeads: Record<string, unknown>[] = [];

      for (let i = 0; i < leads.length; i++) {
        const lead = leads[i]!;

        try {
          const enriched = await enrichLead(csvRecordToLeadInput(lead));
          enrichedLeads.push(mergeEnrichmentOntoCsvRecord(lead, enriched));
        } catch (err) {
          console.error(`[enrichment] lead ${i + 1} failed`, err);
          enrichedLeads.push(lead);
        }

        if (i < leads.length - 1) {
          await new Promise((r) => setTimeout(r, 250));
        }
      }

      await sendEnrichedCsv({
        toEmail: userEmail,
        leads: enrichedLeads,
        location,
        orderId,
      });

      await setBackgroundEnrichmentStatus(orderId, "done");
      console.log(`[enrichment] Done — emailed enriched CSV to ${userEmail}`);
    } catch (err) {
      console.error("[enrichment] Fatal error:", err);
      await setBackgroundEnrichmentStatus(orderId, "failed").catch(() => {});
    }
  })();

  if (process.env.NODE_ENV === "development") {
    await enrichmentPromise;
  } else {
    waitUntil(enrichmentPromise);
  }

  return response;
}

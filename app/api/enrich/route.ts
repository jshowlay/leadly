import { NextRequest, NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth";
import { enrichLead, enrichLeads, type LeadInput } from "@/lib/enrichLead";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.ANTHROPIC_API_KEY?.trim()) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const body = await req.json();

    if (body.lead) {
      const enriched = await enrichLead(body.lead as LeadInput);
      return NextResponse.json({ enriched });
    }

    if (body.leads) {
      const concurrency =
        typeof body.concurrency === "number" && body.concurrency > 0
          ? Math.min(body.concurrency, 5)
          : 3;
      const enriched = await enrichLeads(body.leads as LeadInput[], concurrency);
      return NextResponse.json({ enriched });
    }

    return NextResponse.json({ error: "Provide lead or leads in request body" }, { status: 400 });
  } catch (err: unknown) {
    console.error("Enrichment error:", err);
    return NextResponse.json(
      {
        error: "Enrichment failed",
        detail: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

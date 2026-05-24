"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import type { LeadSearchState } from "@/hooks/useLeadSearch";
import type { StreamedLead } from "@/lib/stream-lead-client";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

function priorityClass(priority: string | null) {
  const p = (priority ?? "").toLowerCase();
  if (p === "high") return "border-emerald-600 bg-emerald-50 text-emerald-900";
  if (p === "medium") return "border-slate-300 bg-slate-100 text-slate-800";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

function StreamLeadCard({ lead }: { lead: StreamedLead }) {
  return (
    <article
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      style={{ animation: "ogLeadIn 0.35s ease-out" }}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{lead.name}</h3>
        {lead.priority ? (
          <span
            className={cn(
              "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              priorityClass(lead.priority)
            )}
          >
            {lead.priority}
          </span>
        ) : null}
      </div>
      {lead.address ? <p className="mt-1 text-sm text-slate-600">{lead.address}</p> : null}
      <p className="mt-2 text-sm text-slate-700">
        {lead.rating != null ? `⭐ ${lead.rating}` : "—"}
        {lead.reviewCount != null ? ` · ${lead.reviewCount} reviews` : ""}
        {lead.score != null ? ` · Score ${lead.score}` : ""}
      </p>
      {lead.primaryEmail ? (
        <p className="mt-2 text-sm text-slate-700">
          <span className="font-medium text-slate-900">Email:</span> {lead.primaryEmail}
        </p>
      ) : null}
      {lead.whyNow ? (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          <span className="font-medium text-slate-800">Why now:</span> {lead.whyNow}
        </p>
      ) : null}
      {lead.enrichmentError ? (
        <p className="mt-2 text-xs font-medium text-amber-700">Enrichment pending — showing base lead data</p>
      ) : null}
    </article>
  );
}

type SearchStreamResultsProps = {
  state: LeadSearchState;
  onViewFullResults?: () => void;
};

export function SearchStreamResults({ state, onViewFullResults }: SearchStreamResultsProps) {
  const { leads, total, isStreaming, isDone, phase, phaseMessage, error, searchId } = state;
  const showProgress = isStreaming || (isDone && total > 0);
  const pct = total > 0 ? Math.round((leads.length / total) * 100) : 0;

  if (phase === "idle" && !error) return null;

  return (
    <div className="w-full max-w-2xl space-y-6">
      <style>{`
        @keyframes ogLeadIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      ) : null}

      {showProgress && total > 0 ? (
        <div>
          <div className="h-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-slate-900 transition-[width] duration-400 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            {isStreaming ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {phaseMessage ??
              (isDone
                ? `${leads.length} of ${total} leads ready — done!`
                : `Enriching leads — ${leads.length} of ${total} ready`)}
          </p>
        </div>
      ) : null}

      {phase === "generating" && total === 0 && isStreaming ? (
        <p className="flex items-center gap-2 text-sm text-slate-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          {phaseMessage ?? "Building your pack…"}
        </p>
      ) : null}

      {leads.length > 0 ? (
        <ul className="grid gap-3">
          {leads.map((lead, i) => (
            <li key={`${lead.placeId}-${i}`}>
              <StreamLeadCard lead={lead} />
            </li>
          ))}
        </ul>
      ) : null}

      {isDone && searchId ? (
        <div className="flex flex-wrap gap-3">
          <Button type="button" size="lg" onClick={onViewFullResults}>
            View full results
          </Button>
          <Link
            href={`/results?searchId=${searchId}`}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Open results page
          </Link>
        </div>
      ) : null}
    </div>
  );
}

import { Building2, Mail, Megaphone, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const WHY_THIS_LEAD = [
  "4.2-star public rating with 469 Google reviews",
  "Rating likely filters them out of high-intent local searches",
  "Contact form path — Tier 1 ready to contact",
] as const;

export function SampleLeadCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md ring-1 ring-slate-900/5",
        className
      )}
    >
      <CardHeader className="space-y-4 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Building2 className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sample Practice Opportunity</p>
              <p className="text-lg font-semibold leading-tight text-slate-900">Dentists at Midtown</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
            Reputation Gap
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Score</p>
          <p className="text-xl font-bold leading-none text-slate-900">76</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-6 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why This Lead</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {WHY_THIS_LEAD.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/90 p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" aria-hidden />
            Best Contact Method
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-900">Contact Form</p>
        </div>
        <div className="space-y-2 rounded-lg border border-slate-100 bg-white p-4 text-sm text-slate-700">
          <p className="flex items-center gap-2">
            <Target className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <span className="text-slate-500">What to Pitch:</span>
          </p>
          <p className="text-sm leading-relaxed text-slate-800">
            {`{{your_name}} here, from {{your_company}}. {{your_credibility_line}} — Google shows 4.2 stars with 469 reviews. In Miami that number is often the first cut when someone compares practices.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
            <Mail className="h-3.5 w-3.5" aria-hidden /> Contact form path
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
            <Megaphone className="h-3.5 w-3.5" aria-hidden /> High-priority signal
          </span>
        </div>
        <p className="text-center text-[11px] leading-relaxed text-slate-500">
          Updated lead insights for faster outreach.
        </p>
      </CardContent>
    </Card>
  );
}

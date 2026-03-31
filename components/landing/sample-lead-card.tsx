import { Building2, Globe, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const GAPS = [
  "Outdated website with weak conversion flow",
  "Low Google review activity",
  "No visible social media strategy",
  "Missing local SEO optimization",
] as const;

export function SampleLeadCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md ring-1 ring-slate-900/5",
        className
      )}
    >
      <CardHeader className="space-y-3 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Building2 className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sample Practice Opportunity</p>
              <p className="text-lg font-semibold leading-tight text-slate-900">Bright Smile Dental</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20">
            High Opportunity
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm text-slate-600">
          <MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
          Phoenix, AZ
        </p>
      </CardHeader>
      <CardContent className="space-y-5 p-6 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Growth gaps</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {GAPS.map((line) => (
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
            Best Outreach Angle
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-800">
            Position website optimization + local SEO + review growth as a fast path to more booked patients.
          </p>
        </div>
        <div className="space-y-2 rounded-lg border border-slate-100 bg-white p-4 text-sm text-slate-700">
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <span className="text-slate-500">Phone:</span>
            <span className="font-medium text-slate-900">(555) 214-9087</span>
          </p>
          <p className="flex items-center gap-2">
            <Globe className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <span className="text-slate-500">Website:</span>
            <span className="font-medium text-slate-900">brightsmiledental.com</span>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            <span className="text-slate-500">Email:</span>
            <span className="text-slate-600">Email available when provided</span>
          </p>
        </div>
        <p className="text-center text-[11px] leading-relaxed text-slate-500">
          Practice insights shown for illustration. Actual results vary by market and available data.
        </p>
      </CardContent>
    </Card>
  );
}

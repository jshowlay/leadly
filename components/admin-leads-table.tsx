"use client";

import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type AdminLead = {
  id: number;
  searchId: number;
  niche: string | null;
  name: string;
  primaryType: string | null;
  phone: string | null;
  website: string | null;
  score: number | null;
  priority: string | null;
  opportunityType: string | null;
  createdAt: Date | string;
};

function formatDate(d: Date | string) {
  try {
    return new Date(d).toLocaleString();
  } catch {
    return String(d);
  }
}

function priorityBadge(priority: string | null | undefined) {
  const p = (priority ?? "").toLowerCase();
  if (p === "high") {
    return (
      <span className="rounded-md border border-emerald-600 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-900">
        High
      </span>
    );
  }
  if (p === "medium") {
    return (
      <span className="rounded-md border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-800">
        Medium
      </span>
    );
  }
  if (p === "low") {
    return (
      <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-normal uppercase text-slate-500">
        Low
      </span>
    );
  }
  return <span className="text-slate-400">—</span>;
}

export function AdminLeadsTable({ leads }: { leads: AdminLead[] }) {
  const [nicheFilter, setNicheFilter] = useState("all");
  const niches = useMemo(
    () =>
      Array.from(new Set(leads.map((l) => (l.niche ?? "").trim()).filter((v) => v.length > 0))).sort(
        (a, b) => a.localeCompare(b)
      ),
    [leads]
  );
  const visibleLeads = useMemo(
    () => (nicheFilter === "all" ? leads : leads.filter((lead) => (lead.niche ?? "") === nicheFilter)),
    [leads, nicheFilter]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <label htmlFor="niche-filter" className="text-sm text-slate-700">
          Filter by niche:
        </label>
        <select
          id="niche-filter"
          value={nicheFilter}
          onChange={(e) => setNicheFilter(e.target.value)}
          className="h-9 rounded-md border border-slate-300 px-2 text-sm"
        >
          <option value="all">All</option>
          {niches.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Created</TableHead>
            <TableHead>Niche</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Primary Type</TableHead>
            <TableHead>Search ID</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Opportunity</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Website</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleLeads.map((l) => (
            <TableRow key={l.id}>
              <TableCell className="text-xs text-slate-600">{formatDate(l.createdAt)}</TableCell>
              <TableCell>{l.niche ?? "-"}</TableCell>
              <TableCell className="max-w-[260px]">{l.name}</TableCell>
              <TableCell>{l.primaryType ?? "-"}</TableCell>
              <TableCell className="font-mono text-xs">{l.searchId}</TableCell>
              <TableCell>{l.score ?? "-"}</TableCell>
              <TableCell>{priorityBadge(l.priority)}</TableCell>
              <TableCell className="max-w-[160px] font-mono text-xs">{l.opportunityType ?? "—"}</TableCell>
              <TableCell>{l.phone ?? "-"}</TableCell>
              <TableCell className="max-w-[280px]">
                {l.website ? (
                  <a className="text-blue-600 hover:underline" href={l.website} target="_blank" rel="noreferrer">
                    {l.website}
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {visibleLeads.length === 0 ? <p className="text-sm text-slate-600">No leads match this niche.</p> : null}
    </div>
  );
}

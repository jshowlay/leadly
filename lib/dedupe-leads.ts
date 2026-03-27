import type { Lead } from "@/lib/types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "").trim().toLowerCase();
}

/** Dedupe by placeId; fallback normalized name + phone when phone exists. Preserves first occurrence order. */
export function dedupeLeads(leads: Lead[]): Lead[] {
  const out: Lead[] = [];
  const seenPlaceIds = new Set<string>();
  const seenNamePhone = new Set<string>();

  for (const lead of leads) {
    const placeId = normalizeText(lead.placeId);
    const name = (lead.name ?? "").trim();
    const phone = normalizeText(lead.phone);

    if (!placeId || !name) continue;
    if (seenPlaceIds.has(placeId)) continue;

    const namePhoneKey = `${normalizeText(name)}::${phone}`;
    if (phone && seenNamePhone.has(namePhoneKey)) continue;

    seenPlaceIds.add(placeId);
    if (phone) seenNamePhone.add(namePhoneKey);
    out.push(lead);
  }

  return out;
}

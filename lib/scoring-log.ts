/** Console-only batch stats for dentist scoring runs. */

export type DentistScoringLogEntry = {
  baseScore: number;
  finalScore: number;
  opportunityType: string;
  priority: string;
};

function bucket10(n: number): string {
  const capped = Math.min(100, Math.max(0, n));
  if (capped === 100) return "100";
  const b = Math.floor(capped / 10) * 10;
  return `${b}-${b + 9}`;
}

export function logDentistScoringBatch(entries: DentistScoringLogEntry[], label = "[api/search]") {
  if (entries.length === 0) {
    console.log(`${label} dentist scoring stats: no entries`);
    return;
  }

  const baseDist: Record<string, number> = {};
  const finalDist: Record<string, number> = {};
  const oppCounts: Record<string, number> = {};
  let high = 0;

  for (const e of entries) {
    const bk = bucket10(e.baseScore);
    baseDist[bk] = (baseDist[bk] ?? 0) + 1;
    const fk = bucket10(e.finalScore);
    finalDist[fk] = (finalDist[fk] ?? 0) + 1;
    oppCounts[e.opportunityType] = (oppCounts[e.opportunityType] ?? 0) + 1;
    if (e.priority === "high") high += 1;
  }

  console.log(`${label} dentist baseScore distribution`, baseDist);
  console.log(`${label} dentist finalScore distribution`, finalDist);
  console.log(`${label} dentist high priority count`, high);
  console.log(`${label} dentist opportunity_type counts`, oppCounts);
}

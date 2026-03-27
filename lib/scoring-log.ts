/** Console-only batch stats for dentist scoring runs. */

export type DentistScoringLogEntry = {
  baseScore: number;
  finalScore: number;
  opportunityType: string;
  priority: string;
};

export function logDentistScoringBatch(entries: DentistScoringLogEntry[], label = "[api/search]") {
  if (entries.length === 0) {
    console.log(`${label} dentist scoring stats: no entries`);
    return;
  }

  const finals = entries.map((e) => e.finalScore);
  const min = Math.min(...finals);
  const max = Math.max(...finals);
  const avg = finals.reduce((a, b) => a + b, 0) / finals.length;

  let high = 0;
  let medium = 0;
  let low = 0;
  const oppCounts: Record<string, number> = {};

  for (const e of entries) {
    if (e.priority === "high") high += 1;
    else if (e.priority === "medium") medium += 1;
    else low += 1;
    oppCounts[e.opportunityType] = (oppCounts[e.opportunityType] ?? 0) + 1;
  }

  console.log(
    `${label} dentist scores: min=${min} max=${max} avg=${avg.toFixed(1)} (n=${entries.length})`
  );
  console.log(`${label} dentist priority: high=${high} medium=${medium} low=${low}`);
  console.log(`${label} dentist opportunity_type counts:`, oppCounts);
}

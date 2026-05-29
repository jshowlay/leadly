// Geo-filter diagnostic. Run with:
//   npx tsx scripts/test-geo.ts
//
// Verifies isInTargetCity drops same-named cities in other states.

import { isInTargetCity } from "../lib/google-places";

type Comp = { longText: string; shortText: string; types: string[] };
function place(city: string, stateLong: string, stateShort: string, zip: string) {
  const components: Comp[] = [
    { longText: city, shortText: city, types: ["locality", "political"] },
    { longText: stateLong, shortText: stateShort, types: ["administrative_area_level_1", "political"] },
    { longText: zip, shortText: zip, types: ["postal_code"] },
  ];
  return {
    formattedAddress: `123 Main St, ${city}, ${stateShort} ${zip}, USA`,
    addressComponents: components,
  } as never;
}

// Same listing but WITHOUT components, to exercise the formatted-address fallback.
function placeNoComponents(city: string, stateShort: string, zip: string) {
  return { formattedAddress: `123 Main St, ${city}, ${stateShort} ${zip}, USA` } as never;
}

const cases: Array<{ name: string; place: never; city: string; state: string; expect: boolean }> = [
  { name: "Dallas TX listing vs Dallas, TX", place: place("Dallas", "Texas", "TX", "75201"), city: "Dallas", state: "TX", expect: true },
  { name: "Dallas GA listing vs Dallas, TX", place: place("Dallas", "Georgia", "GA", "30157"), city: "Dallas", state: "TX", expect: false },
  { name: "Dallas OR listing vs Dallas, TX", place: place("Dallas", "Oregon", "OR", "97338"), city: "Dallas", state: "TX", expect: false },
  { name: "Miami FL vs Miami, FL", place: place("Miami", "Florida", "FL", "33101"), city: "Miami", state: "FL", expect: true },
  { name: "Miami OK vs Miami, FL", place: place("Miami", "Oklahoma", "OK", "74354"), city: "Miami", state: "FL", expect: false },
  { name: "Portland OR vs Portland, OR", place: place("Portland", "Oregon", "OR", "97201"), city: "Portland", state: "OR", expect: true },
  { name: "Portland ME vs Portland, OR", place: place("Portland", "Maine", "ME", "04101"), city: "Portland", state: "OR", expect: false },
  { name: "Springfield IL vs Springfield, IL", place: place("Springfield", "Illinois", "IL", "62701"), city: "Springfield", state: "IL", expect: true },
  { name: "Springfield MO vs Springfield, IL", place: place("Springfield", "Missouri", "MO", "65801"), city: "Springfield", state: "IL", expect: false },
  // Fallback (no components):
  { name: "[no comp] Dallas GA vs Dallas, TX", place: placeNoComponents("Dallas", "GA", "30157"), city: "Dallas", state: "TX", expect: false },
  { name: "[no comp] Dallas TX vs Dallas, TX", place: placeNoComponents("Dallas", "TX", "75201"), city: "Dallas", state: "TX", expect: true },
  // Full state name input:
  { name: "Dallas TX vs Dallas, Texas", place: place("Dallas", "Texas", "TX", "75201"), city: "Dallas", state: "Texas", expect: true },
];

let pass = 0;
let fail = 0;
console.log("=== Geo-filter diagnostic ===");
for (const c of cases) {
  const got = isInTargetCity(c.place, c.city, c.state);
  const ok = got === c.expect;
  if (ok) pass += 1;
  else fail += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${c.name}  (expected ${c.expect}, got ${got})`);
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);

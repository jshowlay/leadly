// Hunter.io diagnostic. Run with:
//   npx tsx --env-file=.env.local scripts/test-hunter.ts
//
// Isolates whether the failure is the API key, rate limit, domain extraction,
// or simply Hunter having no data for a given practice domain.

const HUNTER_API_KEY = process.env.HUNTER_API_KEY;

const TEST_WEBSITES = [
  "https://canyonhillsdentistry.com/",
  "http://www.camelbackfamilydental.com/",
  "https://fairmountdentistry.com/",
  // UTM-laden URL (common Places shape)
  "https://www.westerndental.com/en-us/find-a-location/arizona/phoenix/530-e-mcdowell-rd?utm_source=GMB&utm_medium=organic",
];

function extractDomain(website: string): string | null {
  if (!website) return null;
  let cleaned = website;
  try {
    cleaned = decodeURIComponent(website);
  } catch {
    /* ignore */
  }
  const redirectMatch = cleaned.match(/[?&](?:u|url|redirect|destination|q)=([^&]+)/i);
  if (redirectMatch?.[1]) {
    try {
      cleaned = decodeURIComponent(redirectMatch[1]);
    } catch {
      /* ignore */
    }
  }
  try {
    const url = new URL(cleaned.startsWith("http") ? cleaned : `https://${cleaned}`);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

async function testHunter(website: string) {
  const domain = extractDomain(website);
  console.log(`\nWebsite : ${website}`);
  console.log(`Domain  : ${domain}`);

  if (!domain) {
    console.log("Result  : SKIP — could not extract domain");
    return;
  }
  if (!HUNTER_API_KEY) {
    console.log("Result  : ERROR — HUNTER_API_KEY is undefined. Check .env.local");
    return;
  }

  const params = new URLSearchParams({ domain, limit: "5", api_key: HUNTER_API_KEY });
  const url = `https://api.hunter.io/v2/domain-search?${params.toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.errors) {
      console.log(`Result  : API ERROR (HTTP ${res.status}) —`, JSON.stringify(data.errors));
      return;
    }

    const emails = data.data?.emails || [];
    if (emails.length === 0) {
      console.log("Result  : No emails found for this domain");
    } else {
      console.log(`Result  : ${emails.length} email(s) found`);
      emails.slice(0, 3).forEach((e: { value: string; type: string; confidence: number }) => {
        console.log(`  -> ${e.value} (type: ${e.type}, confidence: ${e.confidence})`);
      });
    }
  } catch (err) {
    console.log("Result  : FETCH ERROR —", err);
  }
}

async function main() {
  console.log("=== Hunter.io Diagnostic ===");
  console.log("API Key present:", Boolean(HUNTER_API_KEY));
  console.log("API Key preview:", HUNTER_API_KEY ? `${HUNTER_API_KEY.slice(0, 8)}...` : "MISSING");

  for (const site of TEST_WEBSITES) {
    await testHunter(site);
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n=== Done ===");
}

void main();

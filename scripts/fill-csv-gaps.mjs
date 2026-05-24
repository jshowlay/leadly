import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { stringify } from "csv-stringify/sync";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  const envPath = path.join(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const INPUT_FILE = path.join(__dirname, "../dentily-los-angeles-dental-leads-109.csv");
const OUTPUT_FILE = path.join(__dirname, "../dentily-los-angeles-dental-leads-109-enriched.csv");

const CLAUDE_MODEL = "claude-sonnet-4-5-20250929";

/** Strip UTF-8 BOM from CSV header keys (e.g. "\uFEFFName" → "Name"). */
function normalizeRow(row) {
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    out[key.replace(/^\uFEFF/, "").trim()] = value;
  }
  return out;
}

// ── Fields Claude will fill ──────────────────────────────────────────────────
// Primary Email        → attempt to infer from website domain (e.g. info@domain.com)
// Other Emails         → suggest 1-2 alternative email patterns for the domain
// Contact Form URL     → construct likely contact page URL from website
// Email Source         → "Inferred from domain" or "Predicted pattern"
// Email Rejection Reason → "Not yet verified" (default for all inferred emails)
// Why Now              → 1-2 sentences on the specific timing signal
// Cluster Notes        → 1-2 sentences on neighbourhood / market context
// Enrichment Notes     → 2-3 sentences of additional practice intelligence
// Apollo Enrichment    → specific Apollo.io search strategy for this lead

async function fillLeadGaps(lead, index, total) {
  const prompt = `You are a dental industry lead intelligence analyst for Dentily, a B2B sales tool for dental marketing and SEO agencies targeting practices in Los Angeles.

You have a lead record with missing fields. Fill them in using all available data.

LEAD DATA:
- Name: ${lead["Name"] || ""}
- Address: ${lead["Address"] || ""}
- Website: ${lead["Website"] || ""}
- Phone: ${lead["Phone"] || ""}
- Rating: ${lead["Rating"] || ""}
- Review Count: ${lead["Review Count"] || ""}
- Score: ${lead["Score"] || ""}
- Priority: ${lead["Priority"] || ""}
- Opportunity Type: ${lead["Opportunity Type"] || ""}
- Action Tier: ${lead["Action Tier"] || ""}
- Why This Lead: ${lead["Why This Lead"] || ""}
- Reason: ${lead["Reason"] || ""}
- Best Contact Method: ${lead["Best Contact Method"] || ""}
- Outreach Readiness: ${lead["Outreach Readiness"] || ""}
- Estimated Opportunity: ${lead["Estimated Opportunity"] || ""}
- Existing Why Now: ${lead["Why Now"] || "MISSING"}
- Existing Cluster Notes: ${lead["Cluster Notes"] || "MISSING"}

TASK: Return ONLY a valid JSON object — no markdown fences, no explanation, no preamble. Fill every field:

{
  "Primary Email": "Predict the most likely direct email using the website domain. Use format: info@domain.com, hello@domain.com, or firstname@domain.com if doctor name is in practice name. If website is unavailable write NEEDS MANUAL LOOKUP.",
  "Other Emails": "1-2 alternative email patterns for the same domain, comma separated. E.g. office@domain.com, contact@domain.com",
  "Contact Form URL": "Construct the most likely contact page URL from the website. Append /contact, /contact-us, /appointment, or /book-appointment based on practice type. If unsure use /contact.",
  "Email Source": "Inferred from domain pattern",
  "Email Rejection Reason": "Not yet verified — inferred address",
  "Why Now": "1-2 specific sentences explaining the timing signal that makes this practice worth contacting NOW. Reference their exact rating, review count, opportunity type, and location. Be specific, not generic.",
  "Cluster Notes": "1-2 sentences about this practice's specific neighbourhood market context in LA — local competition level, area demographics, income level, and what that means for dental acquisition ROI. Be specific to the exact address.",
  "Enrichment Notes": "2-3 sentences of additional intelligence: practice type signals, website branding quality, likely service mix (cosmetic vs general vs specialty), owner-operated vs group indicators, digital presence assessment, and what the sales rep should know before calling.",
  "Apollo Enrichment": "Specific Apollo.io search instructions: exact name to search (use doctor name if visible in practice name), title filters to use, domain to search on, and any notes about who the real decision-maker is likely to be at this practice."
}

Rules:
- Be specific to THIS practice — no generic filler
- For Primary Email: extract the domain from the Website field and construct the most plausible address
- For Why Now: if Existing Why Now is already filled, improve and expand it slightly; if missing write from scratch
- For Cluster Notes: if already filled, improve it; if missing write from scratch
- Reference exact numbers (rating, review count) and exact location details in your answers`;

  const message = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 800,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  // Strip any accidental markdown fences
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    // Try to extract JSON object if wrapped in extra text
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    console.error(`  ⚠ Parse error for row ${index + 1} — skipping enrichment`);
    return null;
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    console.error("❌ ANTHROPIC_API_KEY is not set. Add it to .env.local or export it in your shell.");
    process.exit(1);
  }

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Input file not found: ${INPUT_FILE}`);
    console.error("   Place dentily-los-angeles-dental-leads-109.csv at the project root before running.");
    process.exit(1);
  }

  console.log("📂 Reading CSV...");
  const raw = fs.readFileSync(INPUT_FILE, "utf8");
  const rows = parse(raw, { columns: true, skip_empty_lines: true, bom: true }).map(normalizeRow);

  // Row 0 is the instructions row — keep it as-is, enrich rows 1–50
  const instructionRow = rows[0];
  const leads = rows.slice(1);

  console.log(`✅ Loaded ${leads.length} leads\n`);

  const enriched = [];
  let successCount = 0;

  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const name = lead["Name"]?.substring(0, 45) || "Unknown";
    process.stdout.write(`[${String(i + 1).padStart(2, "0")}/${leads.length}] ${name.padEnd(46)} `);

    try {
      const filled = await fillLeadGaps(lead, i, leads.length);

      if (filled) {
        // Merge filled fields — only overwrite if the original field is empty/null
        const updated = { ...lead };

        const fieldsToFill = [
          "Primary Email",
          "Other Emails",
          "Contact Form URL",
          "Email Source",
          "Email Rejection Reason",
          "Why Now",
          "Cluster Notes",
          "Enrichment Notes",
          "Apollo Enrichment",
        ];

        for (const field of fieldsToFill) {
          if (filled[field] && (!updated[field] || updated[field].toString().trim() === "")) {
            updated[field] = filled[field];
          }
          // Always overwrite these regardless (they're all missing)
          if (["Enrichment Notes", "Apollo Enrichment", "Email Source", "Email Rejection Reason"].includes(field)) {
            updated[field] = filled[field] || updated[field];
          }
        }

        enriched.push(updated);
        successCount++;
        console.log("✓");
      } else {
        enriched.push(lead);
        console.log("✗ (kept original)");
      }
    } catch (err) {
      enriched.push(lead);
      console.log(`✗ ERROR: ${err.message?.substring(0, 50)}`);
    }

    // Small delay to avoid rate limiting
    if (i < leads.length - 1) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  // Reconstruct with instruction row at top
  const allRows = [instructionRow, ...enriched];

  console.log(`\n📝 Writing enriched CSV...`);
  const output = stringify(allRows, { header: true });
  fs.writeFileSync(OUTPUT_FILE, output);

  console.log(`\n✅ Done! ${successCount}/${leads.length} leads enriched.`);
  console.log(`📁 Output: ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

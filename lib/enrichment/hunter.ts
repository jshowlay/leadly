/**
 * Hunter.io email enrichment (Domain Search).
 *
 * Used as a fallback in the email enrichment pipeline: when the website crawl
 * (`lib/email-enrichment.ts`) cannot find a valid mailbox, we ask Hunter for the
 * best contact email tied to the practice's domain.
 *
 * Docs: https://hunter.io/api-documentation/v2#domain-search
 * Free tier = 25 searches/month, so callers must rate-limit and cap usage.
 */

import { validateMarketingEmail } from "@/lib/marketing-email-validate";

const HUNTER_BASE = "https://api.hunter.io/v2";

export type HunterResult = {
  email: string | null;
  emailType: "generic" | "personal" | null;
  confidence: number | null;
  source: "hunter" | null;
  /** Set when no email returned, so callers can log/skip intelligently. */
  reason?: string;
};

const EMPTY: HunterResult = {
  email: null,
  emailType: null,
  confidence: null,
  source: null,
};

export function isHunterConfigured(): boolean {
  return Boolean(process.env.HUNTER_API_KEY?.trim());
}

/** Extract the registrable hostname from a website URL. Null when unparseable. */
export function extractDomain(website: string | null | undefined): string | null {
  const input = (website ?? "").trim();
  if (!input) return null;

  // Decode percent-encoding (some Places URLs arrive encoded).
  let cleaned = input;
  try {
    cleaned = decodeURIComponent(input);
  } catch {
    /* keep original */
  }

  // Unwrap tracking/redirect wrappers, e.g. https://l.instagram.com/?u=https%3A%2F%2Fsite.com
  const redirectMatch = cleaned.match(/[?&](?:u|url|redirect|destination|q)=([^&]+)/i);
  if (redirectMatch?.[1]) {
    try {
      cleaned = decodeURIComponent(redirectMatch[1]);
    } catch {
      /* keep current */
    }
  }

  try {
    const url = new URL(/^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    return host.includes(".") ? host : null;
  } catch {
    return null;
  }
}

type HunterEmailEntry = {
  value?: string | null;
  type?: string | null;
  confidence?: number | null;
};

/**
 * Look up the best contact email for a practice website via Hunter Domain Search.
 * Prefers generic mailboxes (info@, contact@) over personal ones, and validates
 * the result with the same gate used for scraped emails before returning it.
 */
export async function enrichEmailFromDomain(website: string): Promise<HunterResult> {
  const apiKey = process.env.HUNTER_API_KEY?.trim();
  if (!apiKey) return { ...EMPTY, reason: "no_api_key" };

  const domain = extractDomain(website);
  if (!domain) return { ...EMPTY, reason: "no_domain" };

  let data: { data?: { emails?: HunterEmailEntry[] }; errors?: unknown };
  try {
    const params = new URLSearchParams({ domain, limit: "5", api_key: apiKey });
    const res = await fetch(`${HUNTER_BASE}/domain-search?${params.toString()}`);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.warn(`[hunter] domain=${domain} HTTP ${res.status} ${text}`);
      return { ...EMPTY, reason: `http_${res.status}` };
    }
    data = await res.json();
  } catch (err) {
    console.error("[hunter] request failed", err instanceof Error ? err.message : err);
    return { ...EMPTY, reason: "request_failed" };
  }

  const emails = data.data?.emails ?? [];
  if (emails.length === 0) return { ...EMPTY, reason: "no_results" };

  const generic = emails.find((e) => (e.type ?? "").toLowerCase() === "generic");
  const best = generic ?? emails[0];
  const candidate = (best?.value ?? "").trim();
  if (!candidate) return { ...EMPTY, reason: "empty_value" };

  const validation = validateMarketingEmail(candidate);
  if (!validation.ok) {
    console.warn(`[hunter] domain=${domain} rejected ${candidate}: ${validation.reason}`);
    return { ...EMPTY, reason: `validation:${validation.reason}` };
  }

  const type = (best?.type ?? "").toLowerCase();
  return {
    email: validation.normalized,
    emailType: type === "generic" || type === "personal" ? type : null,
    confidence: typeof best?.confidence === "number" ? best.confidence : null,
    source: "hunter",
  };
}

import type Stripe from "stripe";
import { markSearchPaidFromStripe } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

function isTransientNetworkError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return (
    msg.includes("ECONNRESET") ||
    msg.includes("ETIMEDOUT") ||
    msg.includes("socket hang up") ||
    msg.includes("EPIPE")
  );
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session): Promise<{
  ok: boolean;
  reason?: string;
  searchId?: number;
}> {
  if (session.payment_status !== "paid") {
    return { ok: false, reason: "Payment not completed." };
  }

  const raw = session.metadata?.searchId;
  const searchId = raw ? Number(raw) : NaN;
  if (!Number.isFinite(searchId) || searchId <= 0) {
    return { ok: false, reason: "Missing searchId in session metadata." };
  }

  const amountTotal = session.amount_total ?? 0;
  const email = session.customer_details?.email ?? session.customer_email ?? null;

  await markSearchPaidFromStripe({
    searchId,
    stripeSessionId: session.id,
    amount: amountTotal,
    status: "paid",
    email,
  });

  return { ok: true, searchId };
}

/**
 * Used by /success (server) so unlock works without relying on client-side fetch
 * (ad blockers, navigation timing, etc.).
 */
export async function verifyAndFulfillCheckoutSession(
  sessionId: string
): Promise<{ ok: true; searchId: number } | { ok: false; message: string }> {
  const maxAttempts = 2;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const result = await fulfillCheckoutSession(session);
      if (result.ok && result.searchId !== undefined) {
        return { ok: true, searchId: result.searchId };
      }
      return { ok: false, message: result.reason ?? "Could not unlock your lead pack." };
    } catch (e) {
      console.error("[verifyAndFulfillCheckoutSession]", e);
      const msg = e instanceof Error ? e.message : "Verification failed.";
      if (msg.includes("STRIPE_SECRET_KEY")) {
        return { ok: false, message: "Payments are not configured (missing STRIPE_SECRET_KEY)." };
      }
      if (isTransientNetworkError(e) && attempt < maxAttempts) {
        console.warn("[verifyAndFulfillCheckoutSession] retrying after transient error", { attempt, msg });
        await sleep(400 * attempt);
        continue;
      }
      return { ok: false, message: msg };
    }
  }
  return { ok: false, message: "Verification failed after retries." };
}

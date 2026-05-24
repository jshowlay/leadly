export type SearchStreamEvent =
  | { type: "phase"; phase: string; message?: string }
  | {
      type: "meta";
      searchId: number;
      niche: string;
      location: string;
      total: number;
    }
  | { type: "lead"; index: number; lead: Record<string, unknown> }
  | { type: "error"; message: string }
  | {
      type: "done";
      searchId: number;
      resultCount: number;
      isPaid?: boolean;
    };

const encoder = new TextEncoder();

export function encodeSearchStreamEvent(event: SearchStreamEvent): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(event)}\n\n`);
}

export const SEARCH_STREAM_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
} as const;

"use client";

import { useCallback, useState } from "react";
import type { StreamedLead } from "@/lib/stream-lead-client";

export type SearchStreamPhase = "idle" | "generating" | "enriching" | "done" | "error";

export type LeadSearchState = {
  leads: StreamedLead[];
  total: number;
  searchId: number | null;
  niche: string | null;
  location: string | null;
  phase: SearchStreamPhase;
  phaseMessage: string | null;
  isStreaming: boolean;
  isDone: boolean;
  error: string | null;
  isPaid: boolean;
};

const initialState: LeadSearchState = {
  leads: [],
  total: 0,
  searchId: null,
  niche: null,
  location: null,
  phase: "idle",
  phaseMessage: null,
  isStreaming: false,
  isDone: false,
  error: null,
  isPaid: false,
};

export type SearchRequest = {
  niche: string;
  location: string;
  useCredits?: boolean;
};

export function useLeadSearch() {
  const [state, setState] = useState<LeadSearchState>(initialState);

  const search = useCallback(async (payload: SearchRequest) => {
    setState({
      ...initialState,
      isStreaming: true,
      phase: "generating",
      phaseMessage: "Starting search…",
    });

    try {
      const response = await fetch(`${window.location.origin}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, stream: true }),
        credentials: "same-origin",
      });

      const contentType = response.headers.get("Content-Type") ?? "";

      if (!response.ok) {
        if (contentType.includes("application/json")) {
          const errJson = await response.json().catch(() => null);
          throw new Error(
            errJson?.error?.message ? String(errJson.error.message) : "Search failed"
          );
        }
        throw new Error("Search failed");
      }

      if (!response.body || !contentType.includes("text/event-stream")) {
        const data = await response.json();
        if (!data?.searchId) throw new Error("No searchId returned from server.");
        window.location.assign(`/results?searchId=${encodeURIComponent(String(data.searchId))}`);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const line = chunk.trim();
          if (!line.startsWith("data: ")) continue;
          let event: {
            type: string;
            phase?: string;
            message?: string;
            total?: number;
            searchId?: number;
            niche?: string;
            location?: string;
            lead?: StreamedLead;
            isPaid?: boolean;
          };
          try {
            event = JSON.parse(line.slice(6));
          } catch {
            continue;
          }

          if (event.type === "phase") {
            setState((prev) => ({
              ...prev,
              phase: event.phase === "enriching" ? "enriching" : "generating",
              phaseMessage: event.message ?? prev.phaseMessage,
            }));
          }

          if (event.type === "meta") {
            setState((prev) => ({
              ...prev,
              searchId: event.searchId ?? prev.searchId,
              niche: event.niche ?? prev.niche,
              location: event.location ?? prev.location,
              total: event.total ?? 0,
              phase: event.total === 0 ? "done" : "enriching",
            }));
          }

          if (event.type === "lead" && event.lead) {
            setState((prev) => ({
              ...prev,
              leads: [...prev.leads, event.lead!],
              phase: "enriching",
            }));
          }

          if (event.type === "error") {
            throw new Error(event.message ?? "Search failed");
          }

          if (event.type === "done") {
            setState((prev) => ({
              ...prev,
              isStreaming: false,
              isDone: true,
              phase: "done",
              searchId: event.searchId ?? prev.searchId,
              isPaid: Boolean(event.isPaid),
            }));
          }
        }
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isStreaming: false,
        phase: "error",
        error: err instanceof Error ? err.message : "Search failed",
      }));
    }
  }, []);

  const reset = useCallback(() => setState(initialState), []);

  return { ...state, search, reset };
}

"use client";

import { useState } from "react";
import { SearchForm } from "@/components/search-form";
import { SearchResultsPreview } from "@/components/search/search-results-preview";
import { POSITIONING } from "@/lib/site-config";
import { WHATS_INCLUDED } from "@/lib/search-sample-preview";

const EXAMPLE_MARKETS = [
  { label: "Los Angeles", location: "Los Angeles, CA" },
  { label: "Dallas", location: "Dallas, TX" },
  { label: "Miami", location: "Miami, FL" },
  { label: "Phoenix", location: "Phoenix, AZ" },
] as const;

const SEARCH_FORM_ID = "dentily-search-form";

export function SearchPageShell() {
  const [location, setLocation] = useState("");

  return (
    <div className="ds-layout">
      <aside className="ds-panel-left">
        <div className="ds-heading">
          <h1>
            Pick your <em>territory</em>
          </h1>
          <p>{POSITIONING.searchSubheadline}</p>
          <p>
            Output: scored <strong>dental practice records</strong> for B2B outreach — not consumer patient
            lists.
          </p>
        </div>

        <SearchForm
          variant="territory"
          formId={SEARCH_FORM_ID}
          defaultNiche="dentists"
          hideNicheField
          submitLabel="Get Leads Now →"
          exampleMarkets={[...EXAMPLE_MARKETS]}
          onLocationChange={setLocation}
        />

        <div>
          <p className="ds-included-label">What&apos;s included</p>
          <ul className="ds-included-list">
            {WHATS_INCLUDED.map((item) => (
              <li key={item} className="ds-included-item">
                <span className="ds-check" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="ds-disclaimer">
          One-time pack unlock after checkout. No long-term contract for the standard offer.
        </p>
      </aside>

      <section className="ds-panel-right" aria-label="Sample results preview">
        <SearchResultsPreview location={location} unlockFormId={SEARCH_FORM_ID} />
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/site-header";
import { SearchPageShell } from "@/components/search/search-page-shell";
import "@/app/search-page.css";

export const metadata: Metadata = {
  title: "Search your market",
  description:
    "Pick a city or area to surface scored dental practices, contact paths, and outreach drafts for B2B prospecting.",
};

export default function SearchPage() {
  return (
    <div className="dentily-search">
      <SiteHeader homeStyle />
      <SearchPageShell />
    </div>
  );
}

import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { SearchForm } from "@/components/search-form";

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="w-full bg-black py-4 text-white">
        <div className="container-page flex items-center justify-between">
          <Link href="/" className="inline-flex flex-col gap-0.5 text-white no-underline hover:opacity-95">
            <BrandMark />
          </Link>
          <Link href="/" className="text-sm text-white/90 underline-offset-4 hover:underline">
            Marketing page
          </Link>
        </div>
      </header>
      <section className="container-page flex min-h-[calc(100vh-64px)] items-center justify-center py-10">
        <div className="w-full">
          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Get your dentist lead pack
          </h1>
          <p className="mb-8 text-center text-lg text-slate-600">
            Choose your area — we find practices and surface patient growth opportunities with prioritized outreach.
          </p>
          <div className="flex justify-center">
            <SearchForm
              defaultNiche="dentists"
              cardTitle="Find dental practices"
              cardDescription="We search by niche and city, then score leads and write outreach you can use today."
              submitLabel="Find dental leads"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

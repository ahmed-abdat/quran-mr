"use client";

import { SearchResults, searchAyahs } from "@/features/quran";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function SearchPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/quran"
          className="inline-flex items-center text-sm hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to All Surahs
        </Link>
        <h1 className="text-3xl font-bold mt-4">Search the Quran</h1>
        <p className="text-muted-foreground">Search for verses in the Quran</p>
      </div>

      <SearchResults searchFunction={searchAyahs} />
    </main>
  );
}

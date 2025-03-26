"use client";

import { useState } from "react";
import Link from "next/link";
import { Ayah } from "../types/quran-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

interface SearchResultsProps {
  searchFunction: (text: string) => Ayah[];
}

export function SearchResults({ searchFunction }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Ayah[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true);
      try {
        const searchResults = searchFunction(searchQuery);
        setResults(searchResults);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search in Quran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {results.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Search Results ({results.length})
          </h2>
          <div className="space-y-6">
            {results.map((ayah) => (
              <div key={ayah.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Link
                      href={`/quran/${ayah.sura_no}`}
                      className="font-medium hover:underline"
                    >
                      {ayah.sura_name_en}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Verse {ayah.aya_no}
                    </p>
                  </div>
                  <Link
                    href={`/quran/${ayah.sura_no}?highlight=${ayah.aya_no}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Go to verse
                  </Link>
                </div>
                <p
                  className="text-right font-arabic text-xl leading-loose"
                  dir="rtl"
                >
                  {ayah.aya_text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : searchQuery && !isSearching ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No results found for &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : null}
    </div>
  );
}

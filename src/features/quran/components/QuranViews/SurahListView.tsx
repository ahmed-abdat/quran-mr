"use client";

import { useState } from "react";
import { Surah } from "../../types/quran-types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SurahListViewProps {
  surahs: Surah[];
  onSurahSelect: (surahId: number) => void;
}

/**
 * SurahListView component
 * Displays a list of all surahs with search functionality
 */
export function SurahListView({ surahs, onSurahSelect }: SurahListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter surahs based on search query
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name_arabic.includes(searchQuery) ||
      surah.id.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <h1 className="text-2xl font-medium">الفهرست</h1>
      </div>

      {/* Search box */}
      <div className="rounded-lg border overflow-hidden">
        <div className="relative">
          <Input
            placeholder="البحث عن سورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 pr-10 h-12 focus-visible:ring-0 text-right"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Surah list - simplified clean design */}
      <div className="border rounded-lg overflow-hidden">
        <div className="divide-y">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.id}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-center py-4 px-4 cursor-pointer hover:bg-muted/5 transition-colors",
                surah.id === 7 && "border-l-4 border-red-500"
              )}
              onClick={() => onSurahSelect(surah.id)}
            >
              {/* Left number */}
              <div className="w-8 text-center font-medium">{surah.id}</div>

              {/* Center content with surah name and verse count */}
              <div className="flex justify-start relative">
                <h3 className="font-surah-names text-2xl leading-tight text-center">
                  {surah.name_arabic}
                </h3>

                {/* Verse count positioned to the right of surah name */}
                <div className="absolute left-0 -top-2 flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">آياتها</span>
                  <span className="text-sm font-medium">
                    {surah.ayahs.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No results message */}
      {filteredSurahs.length === 0 && (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

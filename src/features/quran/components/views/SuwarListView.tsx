"use client";

import { useState, useMemo } from "react";
import { Surah } from "@/features/quran/types";
import { cn } from "@/lib/utils";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { SearchBar } from "../ui";

interface SuwarListViewProps {
  surahs: Surah[];
}

/**
 * SuwarListView component
 * Displays a list of all surahs (chapters) with search functionality
 *
 * Features:
 * - Search by surah name or number
 * - Clean and organized layout
 * - RTL support
 * - Responsive design
 */
export function SuwarListView({ surahs }: SuwarListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const quranStore = useMushafNavigationStore();

  // Filter surahs based on search query
  const filteredSurahs = useMemo(() => {
    return surahs.filter(
      (surah) =>
        surah.name_arabic.includes(searchQuery) ||
        surah.id.toString().includes(searchQuery)
    );
  }, [surahs, searchQuery]);

  const handleSurahSelect = (surahId: number) => {
    quranStore.setActiveSurah(surahId);
    quranStore.setActiveView("surah-view");
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <h1 className="text-2xl font-medium">الفهرست</h1>
      </div>

      {/* Search box */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="البحث عن سورة..."
      />

      {/* Surah list - simplified clean design */}
      <div className="border rounded-lg overflow-hidden">
        <div className="divide-y">
          {filteredSurahs.map((surah) => (
            <div
              key={surah.id}
              className={cn(
                "grid grid-cols-[auto_1fr_auto] items-center py-4 px-4 cursor-pointer hover:bg-muted/5 transition-colors"
              )}
              onClick={() => handleSurahSelect(surah.id)}
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
                    {surah.verses_count}
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

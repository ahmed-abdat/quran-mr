"use client";

import { Surah, Ayah } from "../../types/quran-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QuranViewMode, QuranFont } from "../../hooks/useQuranSettings";
import { useEffect, useRef } from "react";

interface SurahViewProps {
  surah: Surah;
  activeAyahId?: number;
  viewMode: QuranViewMode;
  fontSize: number;
  currentPage: number;
  totalPages: number;
  pageAyahs: Ayah[];
  highlightSearchText?: (text: string, query: string) => string;
  searchQuery?: string;
  toggleUIVisibility: () => void;
  isUIVisible: boolean;
  darkMode: boolean;
}

/**
 * SurahView component
 * Displays a surah in continuous view
 */
export function SurahView({
  surah,
  activeAyahId,
  viewMode,
  fontSize,
  currentPage,
  totalPages,
  pageAyahs,
  highlightSearchText,
  searchQuery = "",
  toggleUIVisibility,
  isUIVisible,
  darkMode,
}: SurahViewProps) {
  // Always use all ayahs in continuous mode
  const displayAyahs = surah.ayahs;
  const scrolledRef = useRef(false);

  // Scroll to active ayah when it changes
  useEffect(() => {
    if (activeAyahId && !scrolledRef.current) {
      const ayahElement = document.getElementById(`ayah-${activeAyahId}`);
      if (ayahElement) {
        // Slight delay to ensure rendering is complete
        setTimeout(() => {
          ayahElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          scrolledRef.current = true;
        }, 300);
      }
    }

    // Reset scroll flag when ayah changes
    return () => {
      scrolledRef.current = false;
    };
  }, [activeAyahId]);

  // Check if Bismillah should be shown (shown for all surahs except Surah 9)
  const showBismillah = surah.id !== 9;

  return (
    <div className="space-y-4">
      {/* Surah header as an overlay that doesn't affect layout */}
      <Card
        className={cn(
          "border-0 bg-transparent fixed top-0 left-0 right-0 z-10 py-2 transition-transform duration-300 backdrop-blur-sm",
          darkMode ? "bg-black/90 text-white" : "bg-white/90 text-black",
          !isUIVisible && "translate-y-[-100%]" // Hide by translating up when not visible
        )}
      >
        <div className="p-2 text-center">
          <h1 className="text-2xl font-surah-names mb-0">
            {surah.name_arabic}
          </h1>
        </div>
      </Card>

      {/* Continuous view */}
      <div className="quran-mushaf" onClick={toggleUIVisibility}>
        <div
          className="mushaf-text font-arabic p-2 min-h-screen"
          dir="rtl"
          style={{ fontSize: `${fontSize}px` }}
        >
          {/* Bismillah */}
          {showBismillah && (
            <div className="bismillah text-center mb-4">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
          )}

          {/* Verses */}
          {displayAyahs.map((ayah, index) => (
            <span
              key={ayah.id}
              id={`ayah-${ayah.aya_no}`}
              className={cn(
                "inline",
                activeAyahId === ayah.aya_no ? "active-ayah" : ""
              )}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightSearchText
                    ? highlightSearchText(ayah.aya_text, searchQuery)
                    : ayah.aya_text,
                }}
              />{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

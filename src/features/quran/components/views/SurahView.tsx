"use client";

import { Surah } from "@/features/quran/types";
import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { useQuranSettingsStore } from "@/features/quran/store/useQuranSettingsStore";
import { useQuranSearch } from "@/features/quran/hooks/useQuranSearch";
import { AyahRenderer } from "../ui/AyahRenderer";
import { SurahHeader } from "../ui/SurahHeader";
import { Basmala } from "../ui/Basmala";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export interface SurahViewProps {
  surah: Surah;
}

/**
 * SurahView component
 * Displays a complete surah with header, basmala, and ayahs
 */
export function SurahView({ surah }: SurahViewProps) {
  const { fontSize, displayMode } = useQuranSettingsStore();
  const { activeView, activeAyahId } = useQuranNavigationStore();
  const { highlightSearchText } = useQuranSearch();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const ayahRefs = useRef<Map<number, HTMLElement>>(new Map());

  const isReadingMode = activeView === "surah-view";

  // Scroll to active ayah when component mounts or when activeAyahId changes
  useEffect(() => {
    if (activeAyahId) {
      const ayahElement = ayahRefs.current.get(activeAyahId);
      if (ayahElement) {
        // Add a small delay to ensure the layout is stable
        setTimeout(() => {
          ayahElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [activeAyahId, displayMode]);

  return (
    <div className="pt-4">
      {/* Surah header */}
      <SurahHeader surah={surah} />

      {/* Basmala */}
      <Basmala surahId={surah.id} />

      {/* Ayahs */}
      {displayMode === "separate" ? (
        <div className="space-y-4">
          {surah.ayahs.map((ayah) => (
            <div
              key={ayah.id}
              ref={(el) => {
                if (el) {
                  ayahRefs.current.set(ayah.id, el);
                } else {
                  ayahRefs.current.delete(ayah.id);
                }
              }}
              className={cn(
                activeAyahId === ayah.id &&
                  searchQuery &&
                  "bg-primary/5 rounded-lg"
              )}
            >
              <AyahRenderer
                ayah={ayah}
                highlightedText={
                  searchQuery
                    ? highlightSearchText(ayah.aya_text, searchQuery)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "pt-4 px-4 rounded-lg transition-colors",
            isReadingMode
              ? "bg-background/50 shadow-sm backdrop-blur-sm border border-muted/10"
              : "bg-muted/5"
          )}
        >
          <div
            className="font-arabic text-right leading-relaxed min-h-[55dvh]"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: "2.2",
              textAlign: "justify",
              textAlignLast: "right",
            }}
          >
            {surah.ayahs.map((ayah) => (
              <span
                key={ayah.id}
                ref={(el) => {
                  if (el) {
                    ayahRefs.current.set(ayah.id, el);
                  } else {
                    ayahRefs.current.delete(ayah.id);
                  }
                }}
                className={cn(
                  "transition-colors",
                  activeAyahId === ayah.id &&
                    searchQuery &&
                    "bg-primary/5 px-2 py-1 rounded"
                )}
              >
                {searchQuery ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchText(ayah.aya_text, searchQuery),
                    }}
                  />
                ) : (
                  ayah.aya_text
                )}{" "}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

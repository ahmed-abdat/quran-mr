"use client";

import { Surah } from "@/features/quran/types";
import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { useQuranSettingsStore } from "@/features/quran/store/useQuranSettingsStore";
import { useQuranSearchStore } from "@/features/quran/store/useQuranSearchStore";
import { AyahRenderer } from "../ui/AyahRenderer";
import { SurahHeader } from "../ui/SurahHeader";
import { Basmala } from "../ui/Basmala";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export interface SurahViewProps {
  /** The surah data to display */
  surah: Surah;
}

/**
 * SurahView Component
 *
 * Displays a complete surah with header, basmala, and ayahs.
 * Features:
 * - Adaptive layout (separate/continuous modes)
 * - Text highlighting for search results
 * - Smooth scrolling to ayahs
 * - Reading mode optimizations
 * - Enhanced visual feedback for highlighted ayahs
 *
 * @example
 * ```tsx
 * <SurahView surah={surahData} />
 * ```
 */
export function SurahView({ surah }: SurahViewProps) {
  const { fontSize, displayMode } = useQuranSettingsStore();
  const { activeView, activeAyahId } = useQuranNavigationStore();
  const { query: searchQuery, highlightText } = useQuranSearchStore();
  const ayahRefs = useRef<Map<number, HTMLElement>>(new Map());

  const isReadingMode = activeView === "surah-view";

  // Scroll to active ayah when component mounts or when activeAyahId changes
  useEffect(() => {
    if (activeAyahId) {
      const ayahElement = ayahRefs.current.get(activeAyahId);
      if (ayahElement) {
        // Initial scroll with a small delay to ensure layout is stable
        setTimeout(() => {
          ayahElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Add highlight animation class
          ayahElement.classList.add("highlight-pulse");

          // Remove the animation class after it completes
          setTimeout(() => {
            ayahElement.classList.remove("highlight-pulse");
          }, 2000);
        }, 150);
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
                "transition-all duration-500 ease-in-out transform p-4 rounded-lg",
                activeAyahId === ayah.id &&
                  searchQuery && [
                    "bg-primary/5",
                    "scale-[1.02]",
                    "shadow-lg shadow-primary/5",
                    "ring-2 ring-primary/10 ring-offset-2",
                  ],
                "hover:bg-muted/5"
              )}
            >
              <AyahRenderer
                ayah={ayah}
                highlightedText={
                  searchQuery
                    ? highlightText(
                        ayah.aya_text.replace(/[\u06DD].*?[\u06DE]/g, ""),
                        searchQuery
                      )
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
                  "transition-all duration-500 ease-in-out inline",
                  activeAyahId === ayah.id &&
                    searchQuery && [
                      "bg-primary/5",
                      "relative",
                      "after:absolute after:inset-0 after:rounded-[2px]",
                      "after:bg-primary/[0.03] after:-z-10",
                    ]
                )}
                style={{
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {searchQuery ? (
                  <span
                    className="inline"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        ayah.aya_text.replace(/[\u06DD].*?[\u06DE]/g, ""),
                        searchQuery
                      ),
                    }}
                  />
                ) : (
                  ayah.aya_text.replace(/[\u06DD].*?[\u06DE]/g, "")
                )}{" "}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

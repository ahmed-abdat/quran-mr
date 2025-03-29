"use client";

import { Surah, Ayah } from "@/features/quran/types";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { useQuranSearchStore } from "@/features/quran/store/useQuranSearchStore";
import { AyahRenderer } from "../ui/AyahRenderer";
import { SurahHeader } from "../ui/SurahHeader";
import { Basmala } from "../ui/Basmala";
import { cn } from "@/lib/utils";
import { getFontClass } from "@/features/quran/utils/font-utils";
import { useEffect, useRef } from "react";
import { highlightTextSafely } from "@/features/quran/utils/text-highlight";

export interface SurahMushafViewProps {
  /** The surah data to display */
  surah: Surah;
}

/**
 * SurahMushafView Component
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
 * <SurahMushafView surah={surahData} />
 * ```
 */
export function SurahMushafView({ surah }: SurahMushafViewProps) {
  const { fontSize, displayMode, fontType } = useMushafSettingsStore();
  const { activeView, activeAyahId } = useMushafNavigationStore();
  const { query: searchQuery } = useQuranSearchStore();
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

  // Render text with highlights for continuous mode
  const renderContinuousText = (ayah: Ayah) => {
    if (!searchQuery) {
      return ayah.aya_text.replace(/[\u06DD].*?[\u06DE]/g, "");
    }

    const segments = highlightTextSafely(ayah.aya_text, searchQuery);
    return segments.map((segment, index) => (
      <span
        key={`${ayah.id}-${index}`}
        className={cn(
          "transition-colors duration-300",
          segment.isHighlighted && "bg-primary/10 text-primary rounded-[1px]"
        )}
      >
        {segment.text}
      </span>
    ));
  };

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
              <AyahRenderer ayah={ayah} searchQuery={searchQuery} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "max-w-4xl mx-auto",
            "pt-4 px-4 rounded-lg transition-colors",
            "bg-gradient-to-b from-background/70 to-background/30",
            isReadingMode && [
              "bg-background/50 shadow-sm backdrop-blur-sm",
              "border border-muted/10",
            ]
          )}
        >
          <div
            className={cn(
              getFontClass(fontType),
              "text-right leading-[2.2]",
              "min-h-[55dvh]",
              "text-justify text-right-last",
              "tracking-wide",
              "text-rendering-optimizeLegibility antialiased"
            )}
            style={{
              fontSize: `${fontSize}px`,
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
                  "transition-all duration-500 ease-in-out inline relative z-[1]",
                  activeAyahId === ayah.id &&
                    searchQuery && [
                      "bg-primary/5",
                      "after:absolute after:inset-0 after:rounded-[2px]",
                      "after:bg-primary/[0.03] after:-z-10",
                    ]
                )}
              >
                {renderContinuousText(ayah)}{" "}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

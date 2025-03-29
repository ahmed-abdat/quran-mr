"use client";

import { cn } from "@/lib/utils";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { getFontClass } from "@/features/quran/utils/font-utils";

interface BasmalaProps {
  surahId: number;
}

/**
 * Basmala component
 * Displays the Bismillah (بسم الله الرحمن الرحيم) before surah content
 * Conditionally shows based on surah ID (not shown for Surah At-Tawbah)
 */
export function Basmala({ surahId }: BasmalaProps) {
  const { fontType } = useMushafSettingsStore();

  // Don't show Basmala for Surah At-Tawbah (9)
  if (surahId === 9) {
    return null;
  }

  return (
    <div className="text-center pt-4">
      <p
        className={cn(
          getFontClass(fontType),
          "text-2xl sm:text-3xl opacity-85",
          "leading-8 tracking-wider",
          "p-2 rounded-md",
          "bg-foreground/[0.01] dark:bg-foreground/[0.02]",
          "mb-0"
        )}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </p>
    </div>
  );
}

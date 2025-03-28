"use client";

import { cn } from "@/lib/utils";

interface BasmalaProps {
  surahId: number;
}

/**
 * Basmala component
 * Renders the Bismillah at the start of surahs (except for Surah At-Tawbah)
 * with minimal styling
 */
export function Basmala({ surahId }: BasmalaProps) {
  // Don't render for Surah At-Tawbah (9)
  if (surahId === 9) {
    return null;
  }

  return (
    <div className="text-center mt-4">
      <div
        className={cn(
          "inline-block mx-auto w-full",
          "py-2 px-4 sm:py-3 sm:px-5",
          "rounded-lg backdrop-blur-sm",
          "bg-primary/5",
          "shadow-sm border-b border-primary/10"
        )}
      >
        <p
          className={cn(
            "font-arabic",
            "text-xl sm:text-2xl md:text-3xl",
            "text-primary/90",
            "tracking-wide leading-relaxed"
          )}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  );
}

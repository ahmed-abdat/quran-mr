"use client";

import { Surah, FontType } from "@/features/quran/types";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { getFontClass } from "@/features/quran/utils/font-utils";

interface SurahHeaderProps {
  surah: Surah;
  showExtraInfo?: boolean;
}

const containerVariants = cva(
  "w-full transition-all duration-300 ease-in-out max-w-full overflow-hidden",
  {
    variants: {
      size: {
        default: "py-3 px-4 sm:py-4",
        compact: "py-2 px-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * SurahHeader component
 * Displays a consistent header for a Surah with optional detailed information
 */
export function SurahHeader({ surah, showExtraInfo = true }: SurahHeaderProps) {
  const { fontType } = useMushafSettingsStore();

  return (
    <div className="text-center">
      <div
        className={cn(
          "relative inline-block mx-auto rounded-lg",
          "bg-gradient-to-b from-background/70 to-background/30",
          "backdrop-blur-sm shadow-sm border border-primary/5 w-full"
        )}
      >
        <div className={containerVariants()}>
          {/* Decorative elements */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
          <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>

          {/* Surah name */}
          <h1
            className={cn(
              "font-surah-names text-2xl sm:text-3xl md:text-4xl",
              "bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-primary/70"
            )}
          >
            {surah.name_arabic}
          </h1>

          {/* Info badge */}
          {showExtraInfo && (
            <div
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full",
                "bg-muted/20 text-xs text-muted-foreground"
              )}
            >
              <span>{surah.name_english}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
              <span
                className={cn(getFontClass(fontType), "font-medium")}
                dir="rtl"
              >
                {surah.verses_count} آية
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

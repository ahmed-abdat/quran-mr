"use client";

import { Ayah } from "@/features/quran/types";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { cn } from "@/lib/utils";
import { getFontClass } from "@/features/quran/utils/font-utils";
import { useQuranSearchStore } from "@/features/quran/store/useQuranSearchStore";
import { highlightTextSafely } from "@/features/quran/utils/text-highlight";

interface AyahRendererProps {
  ayah: Ayah;
  searchQuery?: string;
}

/**
 * AyahRenderer component
 * Renders a single Ayah with optimized styling for focused reading
 * and enhanced highlighting effects using safe text highlighting
 */
export function AyahRenderer({ ayah, searchQuery }: AyahRendererProps) {
  const { activeView } = useMushafNavigationStore();
  const { fontSize, fontType } = useMushafSettingsStore();
  const isReadingMode = activeView === "surah-view";

  // Handle rendering text with highlights
  const renderTextWithHighlight = () => {
    if (!searchQuery) return ayah.aya_text;

    const segments = highlightTextSafely(ayah.aya_text, searchQuery);

    return segments.map((segment, index) => (
      <span
        key={index}
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
    <div
      className={cn(
        "p-4 rounded-lg transition-all duration-300 relative",
        isReadingMode && [
          "mb-4",
          "bg-background/50 backdrop-blur-sm",
          "shadow-sm border border-muted/10",
          "hover:shadow-md",
        ],
        !isReadingMode && "hover:bg-muted/5"
      )}
    >
      <p
        className={cn(
          getFontClass(fontType),
          "text-right",
          "leading-[1.8]",
          "tracking-wide",
          "text-rendering-optimizeLegibility antialiased"
        )}
        style={{
          fontSize: `${fontSize}px`,
        }}
      >
        {renderTextWithHighlight()}
      </p>
    </div>
  );
}

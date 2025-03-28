"use client";

import { Ayah } from "@/features/quran/types";
import { useQuranStore } from "@/features/quran/store/useQuranStore";
import { cn } from "@/lib/utils";

interface AyahRendererProps {
  ayah: Ayah;
  highlightedText?: string;
}

/**
 * AyahRenderer component
 * Renders a single Ayah with optimized styling for focused reading
 */
export function AyahRenderer({ ayah, highlightedText }: AyahRendererProps) {
  const { fontSize, activeView } = useQuranStore();
  const isReadingMode = activeView === "surah-view";

  // Handle rendering HTML content (for highlighted text in search)
  const renderTextWithHighlight = () => {
    if (highlightedText) {
      return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    }
    return <>{ayah.aya_text}</>;
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg transition-colors relative",
        isReadingMode
          ? "mb-4 bg-background/50 backdrop-blur-sm shadow-sm border border-muted/10"
          : "hover:bg-muted/5"
      )}
    >
      <p
        className={cn(
          "font-arabic text-right leading-relaxed transition-colors",
          isReadingMode && "tracking-wide"
        )}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: isReadingMode ? "1.8" : "inherit",
        }}
      >
        {renderTextWithHighlight()}
      </p>
    </div>
  );
}

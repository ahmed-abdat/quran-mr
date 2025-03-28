"use client";

import { Ayah } from "@/features/quran/types";
import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { useQuranSettingsStore } from "@/features/quran/store/useQuranSettingsStore";
import { cn } from "@/lib/utils";

interface AyahRendererProps {
  ayah: Ayah;
  highlightedText?: string;
}

/**
 * AyahRenderer component
 * Renders a single Ayah with optimized styling for focused reading
 * and enhanced highlighting effects
 */
export function AyahRenderer({ ayah, highlightedText }: AyahRendererProps) {
  const { activeView } = useQuranNavigationStore();
  const { fontSize } = useQuranSettingsStore();
  const isReadingMode = activeView === "surah-view";

  // Handle rendering HTML content (for highlighted text in search)
  const renderTextWithHighlight = () => {
    if (highlightedText) {
      return (
        <span
          dangerouslySetInnerHTML={{ __html: highlightedText }}
          className="transition-colors duration-300"
        />
      );
    }
    return <>{ayah.aya_text}</>;
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg transition-all duration-300 relative",
        isReadingMode
          ? "mb-4 bg-background/50 backdrop-blur-sm shadow-sm border border-muted/10 hover:shadow-md"
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

"use client";

import { Surah, Ayah } from "../../types/quran-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface MushafViewProps {
  surah: Surah;
  ayahs: Ayah[];
  activeAyahId?: number;
  fontSize: number;
  onAyahClick?: (ayahId: number) => void;
  highlightSearchText?: (text: string, query: string) => string;
  searchQuery?: string;
}

/**
 * MushafView component
 * Displays Quran text in a traditional mushaf layout similar to printed Quran pages
 */
export function MushafView({
  surah,
  ayahs,
  activeAyahId,
  fontSize,
  onAyahClick,
  highlightSearchText,
  searchQuery = "",
}: MushafViewProps) {
  // Helper function to determine if we should show the surah name
  const shouldShowSurahName = (ayah: Ayah) => ayah.aya_no === 1;

  return (
    <Card className="relative shadow-md overflow-hidden">
      {/* Decorative border */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

      {/* Ayahs in mushaf style */}
      <div
        className="p-6 bg-background/80 font-arabic leading-[2.2] text-right"
        style={{ fontSize: `${fontSize}px` }}
        dir="rtl"
      >
        {/* Surah header for first ayah */}
        {ayahs.length > 0 && shouldShowSurahName(ayahs[0]) && (
          <div className="text-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold mb-1">{surah.name_arabic}</h2>
            <div className="text-sm text-muted-foreground">
              سورة {surah.id} - {surah.ayahs.length} آية
            </div>
          </div>
        )}

        {/* Main Quran text with traditional formatting */}
        <div className="mushaf-text relative" style={{ lineHeight: 2.5 }}>
          {ayahs.map((ayah, index) => (
            <span
              key={ayah.id}
              id={`ayah-${ayah.aya_no}`}
              className={cn(
                "mx-1 cursor-pointer hover:text-primary relative",
                activeAyahId === ayah.aya_no && "text-primary font-bold"
              )}
              onClick={() => onAyahClick?.(ayah.aya_no)}
            >
              {/* Ayah text with optional highlighting */}
              <span
                dangerouslySetInnerHTML={{
                  __html: highlightSearchText
                    ? highlightSearchText(ayah.aya_text, searchQuery)
                    : ayah.aya_text,
                }}
              />

              {/* Ayah number in decorated circle */}
              <sup className="inline-flex items-center justify-center w-6 h-6 text-xs bg-primary/10 rounded-full mr-1 font-normal">
                {ayah.aya_no}
              </sup>

              {/* Space between ayahs for readability */}
              {index < ayahs.length - 1 && " "}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

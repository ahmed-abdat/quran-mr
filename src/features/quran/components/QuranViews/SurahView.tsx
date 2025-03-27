"use client";

import { Surah, Ayah } from "../../types/quran-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { MushafView } from "./MushafView";
import { QuranViewMode } from "../../hooks/useQuranSettings";
import { useEffect, useRef } from "react";

interface SurahViewProps {
  surah: Surah;
  activeAyahId?: number;
  viewMode: QuranViewMode;
  fontSize: number;
  currentPage: number;
  totalPages: number;
  pageAyahs: Ayah[];
  onAyahClick: (ayahId: number) => void;
  highlightSearchText?: (text: string, query: string) => string;
  searchQuery?: string;
}

/**
 * SurahView component
 * Displays a surah in different view modes (continuous, page, grid, mushaf)
 */
export function SurahView({
  surah,
  activeAyahId,
  viewMode,
  fontSize,
  currentPage,
  totalPages,
  pageAyahs,
  onAyahClick,
  highlightSearchText,
  searchQuery = "",
}: SurahViewProps) {
  // Determine which ayahs to display based on view mode
  const displayAyahs = viewMode === "page" ? pageAyahs : surah.ayahs;
  const scrolledRef = useRef(false);

  // Scroll to active ayah when it changes or view mode changes
  useEffect(() => {
    if (activeAyahId && !scrolledRef.current) {
      const ayahElement = document.getElementById(`ayah-${activeAyahId}`);
      if (ayahElement) {
        // Slight delay to ensure rendering is complete
        setTimeout(() => {
          ayahElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          scrolledRef.current = true;
        }, 300);
      }
    }

    // Reset scroll flag when ayah or view mode changes
    return () => {
      scrolledRef.current = false;
    };
  }, [activeAyahId, viewMode, currentPage]);

  return (
    <div className="space-y-6">
      {/* Surah header */}
      <Card className="overflow-hidden shadow-sm">
        <div className="bg-primary/10 p-4 text-center border-b">
          <h1 className="text-2xl font-arabic font-bold mb-1">
            {surah.name_arabic}
          </h1>
          <div className="flex justify-center gap-2 text-sm text-muted-foreground">
            <span>عدد الآيات: {surah.ayahs.length}</span>
            {viewMode === "page" && (
              <span>
                الصفحة {currentPage} من {totalPages}
              </span>
            )}
          </div>
        </div>
      </Card>



      {/* Continuous view mode */}
      {viewMode === "continuous" && (
        <div className="p-0 bg-background w-full">
          <p
            className="font-arabic leading-relaxed text-justify"
            dir="rtl"
            style={{ fontSize: `${fontSize}px` }}
          >
            {displayAyahs.map((ayah, index) => (
              <span
                key={ayah.id}
                id={`ayah-${ayah.aya_no}`}
                className={cn(
                  "inline mx-1",
                  activeAyahId === ayah.aya_no
                    ? "bg-primary/10 rounded-md px-1"
                    : ""
                )}
                onClick={() => onAyahClick(ayah.aya_no)}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchText
                      ? highlightSearchText(ayah.aya_text, searchQuery)
                      : ayah.aya_text,
                  }}
                />
                <span className="inline-block mx-1 text-primary/70 select-none">
                  {/* ﴿{ayah.aya_no}﴾ */}
                </span>
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Page view mode */}
      {viewMode === "page" && (
        <div className="space-y-4">
          <div className="text-center text-sm text-muted-foreground mb-4">
            الصفحة {currentPage} من {totalPages}
          </div>

          {displayAyahs.map((ayah) => (
            <div
              key={ayah.id}
              id={`ayah-${ayah.aya_no}`}
              className={cn(
                "p-4 rounded-lg transition-colors",
                activeAyahId === ayah.aya_no
                  ? "bg-primary/10"
                  : "hover:bg-muted/50"
              )}
              onClick={() => onAyahClick(ayah.aya_no)}
            >
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline">{ayah.aya_no}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
              <p
                className="text-right font-arabic leading-relaxed"
                dir="rtl"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{
                  __html: highlightSearchText
                    ? highlightSearchText(ayah.aya_text, searchQuery)
                    : ayah.aya_text,
                }}
              />
            </div>
          ))}
        </div>
      )}


    </div>
  );
}

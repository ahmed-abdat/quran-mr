"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Surah } from "../types/quran-types";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  MenuIcon,
  Type,
  LayoutGrid,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

interface SurahViewProps {
  surah: Surah;
  nextSurah?: number;
  prevSurah?: number;
}

// Verses per page for pagination
const VERSES_PER_PAGE = 10;

export function SurahView({ surah, nextSurah, prevSurah }: SurahViewProps) {
  const [fontSize, setFontSize] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"page" | "continuous">("page");
  const { theme, setTheme } = useTheme();

  // Calculate total pages
  const totalPages = Math.ceil(surah.ayahs.length / VERSES_PER_PAGE);

  // Get current page verses
  const currentVerses = useMemo(() => {
    if (viewMode === "continuous") {
      return surah.ayahs;
    }
    const startIndex = (currentPage - 1) * VERSES_PER_PAGE;
    return surah.ayahs.slice(startIndex, startIndex + VERSES_PER_PAGE);
  }, [surah.ayahs, currentPage, viewMode]);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 48));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 22));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (nextSurah) {
      window.location.href = `/quran/${nextSurah}`;
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (prevSurah) {
      window.location.href = `/quran/${prevSurah}`;
    }
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "page" ? "continuous" : "page"));
    setCurrentPage(1);
  };

  // Reset to page 1 when surah changes
  useEffect(() => {
    setCurrentPage(1);
  }, [surah.id]);

  return (
    <div className="w-full max-w-4xl mx-auto pb-20">
      {/* Top header with navigation, title and page info */}
      <div className="border-b mb-6">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-arabic font-semibold">
              {surah.name_arabic}
            </h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-primary/10">
              {surah.ayahs.length} آية
            </span>
          </div>

          <div className="flex items-center gap-2">
            {viewMode === "page" && (
              <div className="text-sm">
                <span className="whitespace-nowrap">
                  {currentPage}/{totalPages}
                </span>
              </div>
            )}

            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleViewMode}
                className="h-8 w-8"
              >
                {viewMode === "page" ? (
                  <MenuIcon className="h-4 w-4" />
                ) : (
                  <LayoutGrid className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseFontSize}
                className="h-8 w-8"
              >
                <Type className="h-4 w-4" />-
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={increaseFontSize}
                className="h-8 w-8"
              >
                <Type className="h-4 w-4" />+
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quran content */}
      <div className="bg-background border rounded-lg mb-4 p-5 md:p-8">
        <p
          className="font-arabic leading-[2] tracking-[0.01em] text-justify"
          style={{ fontSize: `${fontSize}px` }}
        >
          {currentVerses.map((ayah) => (
            <span key={ayah.id} className="inline">
              {ayah.aya_text}{" "}
            </span>
          ))}
        </p>
      </div>

      {/* Fixed navigation at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-10">
        <div className="max-w-4xl mx-auto p-3 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 1 && !prevSurah}
            className="flex items-center gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            <span>السابق</span>
          </Button>

          {viewMode === "page" && (
            <span className="text-sm text-muted-foreground px-3">
              صفحة {currentPage} من {totalPages}
            </span>
          )}

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages && !nextSurah}
            className="flex items-center gap-2"
          >
            <span>التالي</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

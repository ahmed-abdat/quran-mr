"use client";

import { Button } from "@/components/ui/button";
import {
  TextSelect,
  MinusCircle,
  PlusCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { QuranViewMode, QuranFont } from "../../hooks/useQuranSettings";

interface BottomBarProps {
  viewMode: QuranViewMode;
  fontSize: number;
  currentPage: number;
  totalPages: number;
  hasPrevSurah: boolean;
  hasNextSurah: boolean;
  navigateToPrevSurah: () => void;
  navigateToNextSurah: () => void;
  onFontSizeIncrease: () => void;
  onFontSizeDecrease: () => void;
  onPageChange: (page: number) => void;
}

/**
 * BottomBar component
 * Displays controls for font size and surah navigation
 */
export function BottomBar({
  viewMode,
  fontSize,
  currentPage,
  totalPages,
  hasPrevSurah,
  hasNextSurah,
  navigateToPrevSurah,
  navigateToNextSurah,
  onFontSizeIncrease,
  onFontSizeDecrease,
  onPageChange,
}: BottomBarProps) {
  return (
    <div className="bg-background border-t border-border/50 py-2 px-4 sticky bottom-0 z-10">
      <div className="flex items-center justify-between">
        {/* Font size controls */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onFontSizeDecrease}
            disabled={fontSize <= 16}
            aria-label="تصغير الخط"
            className="transition-all hover:bg-secondary/20"
          >
            <MinusCircle className="h-4 w-4" />
          </Button>

          <div className="flex items-center mx-2">
            <TextSelect className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm">{fontSize}px</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onFontSizeIncrease}
            disabled={fontSize >= 32}
            aria-label="تكبير الخط"
            className="transition-all hover:bg-secondary/20"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>

        {/* Surah navigation */}
        <div className="flex items-center">
          {/* Previous Surah button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateToPrevSurah}
            disabled={!hasPrevSurah}
            aria-label="السورة السابقة"
            className="transition-all hover:bg-secondary/20 mx-1"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* Next Surah button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateToNextSurah}
            disabled={!hasNextSurah}
            aria-label="السورة التالية"
            className="transition-all hover:bg-secondary/20 mx-1"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

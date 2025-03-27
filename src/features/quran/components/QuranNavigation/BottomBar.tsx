"use client";

import { Button } from "@/components/ui/button";
import {
  Search,
  Bookmark,
  BookmarkPlus,
  BookOpen,
  List,
  FileText,
  Sun,
  Moon,
  Home,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { QuranViewMode } from "../../hooks/useQuranSettings";
import { Surah } from "../../types/quran-types";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  onToggleViewMode: () => void;
  navigateToHome: () => void;
  navigateToSearch: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  allSurahs: Surah[];
  currentSurahId?: number;
  navigateToSurah: (surahId: number) => void;
  isUIVisible?: boolean;
}

/**
 * BottomBar component
 * Displays controls for Quran navigation with a modern, clean design
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
  navigateToHome,
  navigateToSearch,
  darkMode,
  onToggleTheme,
  allSurahs,
  currentSurahId,
  navigateToSurah,
  isUIVisible = true,
}: BottomBarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    // Here you would implement actual bookmark saving logic
  };

  const getCurrentSurahName = () => {
    if (!currentSurahId || !allSurahs.length) return "";
    const surah = allSurahs.find((s) => s.id === currentSurahId);
    return surah ? surah.name_arabic : "";
  };

  return (
    <div
      className={cn(
        "border-t backdrop-blur-sm fixed bottom-0 left-0 right-0 z-10 py-2 px-3 transition-transform duration-300",
        darkMode
          ? "bg-black/90 text-white border-gray-800"
          : "bg-white/90 text-black border-gray-200",
        !isUIVisible && "translate-y-full"
      )}
    >
      {/* Main controls row */}
      <div className="grid grid-cols-4 items-center">
        {/* Right section - Bookmark & Search */}
        <div className="flex items-center justify-end space-x-1 flex-row-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "إزالة العلامة" : "حفظ علامة"}
            className={cn(
              "w-10 h-10",
              darkMode
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            )}
          >
            {isBookmarked ? (
              <Bookmark className="h-5 w-5 fill-current" />
            ) : (
              <BookmarkPlus className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={navigateToSearch}
            aria-label="بحث"
            className={cn(
              "w-10 h-10",
              darkMode
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            )}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Center - Chapter info only (no page numbers in continuous mode) */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-center">
            {getCurrentSurahName()}
          </div>
        </div>

        <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={navigateToHome}
          className={cn(
            "w-full h-9 text-xs flex items-center justify-center",
            darkMode
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10"
          )}
          >
            <List className="h-4 w-4 mr-1.5" />
            <span>الفهرست</span>
          </Button>
        </div>

        {/* Left section - Index & Theme */}
        <div className="flex items-center justify-center">
   

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-label={darkMode ? "الوضع المضيء" : "الوضع المظلم"}
            className={cn(
              "w-10 h-10",
              darkMode
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            )}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Sub controls (pages and parts only) */}
      <div
        className={cn(
          "border-t mt-2 pt-2 grid grid-cols-3 items-center",
          darkMode ? "border-white/10" : "border-black/10"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full h-9 text-xs flex items-center justify-center",
            darkMode
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10"
          )}
        >
          <FileText className="h-4 w-4 mr-1.5" />
          <span>الصفحات</span>
        </Button>

        {/* Font size controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onFontSizeDecrease}
            className={cn(
              "w-9 h-9 rounded-full",
              darkMode
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            )}
            aria-label="تصغير الخط"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div
            className={cn(
              "text-xs font-medium",
              darkMode ? "text-white" : "text-black"
            )}
          >
            {fontSize}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onFontSizeIncrease}
            className={cn(
              "w-9 h-9 rounded-full",
              darkMode
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/10"
            )}
            aria-label="تكبير الخط"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
         
          className={cn(
            "w-full h-9 text-xs flex items-center justify-center",
            darkMode
              ? "text-white hover:bg-white/10"
              : "text-black hover:bg-black/10"
          )}
        >
          <BookOpen className="h-4 w-4 mr-1.5" />
          <span>الأجزاء</span>
        </Button>
      </div>
    </div>
  );
}

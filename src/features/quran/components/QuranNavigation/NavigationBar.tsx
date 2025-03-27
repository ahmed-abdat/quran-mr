"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Home, Moon, Search, Sun } from "lucide-react";
import { Surah } from "../../types/quran-types";
import { QuranViewMode } from "../../hooks/useQuranSettings";

interface NavigationBarProps {
  title: string;
  allSurahs: Surah[];
  currentSurahId?: number;
  hasPrevSurah: boolean;
  hasNextSurah: boolean;
  navigateToSurahList: () => void;
  navigateToSearch: () => void;
  navigateToSurah: (surahId: number) => void;
  navigateToPrevSurah: () => void;
  navigateToNextSurah: () => void;
  viewMode: QuranViewMode;
  darkMode: boolean;
  onToggleTheme: () => void;
  onToggleViewMode: () => void;
}

/**
 * NavigationBar component
 * Displays the top navigation bar with controls for navigating between surahs,
 * changing view modes, and accessing other features
 */
export function NavigationBar({
  title,
  allSurahs,
  currentSurahId,
  navigateToSurahList,
  navigateToSearch,
  navigateToSurah,
  viewMode,
  darkMode,
  onToggleTheme,
  onToggleViewMode,
}: NavigationBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSurahChange = (value: string) => {
    const surahId = parseInt(value);
    if (!isNaN(surahId)) {
      navigateToSurah(surahId);
    }
  };

  return (
    <nav className="bg-background border-b border-border/50 sticky top-0 z-10 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateToSurahList}
            aria-label="القائمة الرئيسية"
          >
            <Home className="h-4 w-4" />
          </Button>

          <div className="flex-1 min-w-[140px] max-w-[200px]">
            {allSurahs.length > 0 && currentSurahId ? (
              <Select
                value={currentSurahId.toString()}
                onValueChange={handleSurahChange}
              >
                <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 h-9">
                  <SelectValue placeholder="اختر سورة" />
                </SelectTrigger>
                <SelectContent>
                  {allSurahs.map((surah) => (
                    <SelectItem key={surah.id} value={surah.id.toString()}>
                      {surah.name_arabic} ({surah.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <h1 className="text-lg font-medium">{title}</h1>
            )}
          </div>
        </div>

        <div className="flex items-center">
          {/* Toggle view mode button (if viewing a surah) */}
          {currentSurahId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleViewMode}
              aria-label={
                viewMode === "continuous" ? "وضع الصفحات" : "العرض المتواصل"
              }
              className="transition-all hover:bg-secondary/20 px-2 mr-1 text-xs"
            >
              {viewMode === "continuous" ? "وضع الصفحات" : "العرض المتواصل"}
            </Button>
          )}

          {/* Other actions */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateToSearch}
              aria-label="بحث"
              className="transition-all hover:bg-secondary/20"
            >
              <Search className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleTheme}
              aria-label={darkMode ? "الوضع الفاتح" : "الوضع الداكن"}
              className="transition-all hover:bg-secondary/20"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

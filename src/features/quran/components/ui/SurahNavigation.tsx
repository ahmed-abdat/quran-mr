"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useMushafData } from "@/features/quran/hooks/useMushafData";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { Surah } from "@/features/quran/types";
import { useEffect, useState, useCallback } from "react";

interface SurahNavigationProps {
  /** Current surah being displayed */
  surah: Surah;
}

/**
 * SurahNavigation component
 *
 * Provides minimal navigation controls for moving between surahs with focus mode support.
 * Features:
 * - Previous/next surah navigation
 * - Auto-hiding UI based on mouse movement
 * - Keyboard navigation (ArrowLeft/ArrowRight)
 * - Focus mode compatibility
 *
 * @example
 * ```tsx
 * <SurahNavigation surah={currentSurah} />
 * ```
 */
export function SurahNavigation({ surah }: SurahNavigationProps) {
  const { getPrevSurah, getNextSurah, allSurahs } = useMushafData();
  const { setActiveSurah, setActiveView } = useMushafNavigationStore();
  const { isUIVisible } = useMushafSettingsStore();
  const [isVisible, setIsVisible] = useState(true);
  const [mouseMoving, setMouseMoving] = useState(false);

  // Get adjacent surahs
  const prevSurahId = getPrevSurah(surah.id);
  const nextSurahId = getNextSurah(surah.id);
  const prevSurah = prevSurahId
    ? allSurahs.find((s) => s.id === prevSurahId)
    : null;
  const nextSurah = nextSurahId
    ? allSurahs.find((s) => s.id === nextSurahId)
    : null;

  // Navigation handlers
  const handlePrevSurah = useCallback(() => {
    if (prevSurahId) {
      setActiveSurah(prevSurahId);
      setActiveView("surah-view");
    }
  }, [prevSurahId, setActiveSurah, setActiveView]);

  const handleNextSurah = useCallback(() => {
    if (nextSurahId) {
      setActiveSurah(nextSurahId);
      setActiveView("surah-view");
    }
  }, [nextSurahId, setActiveSurah, setActiveView]);

  // Auto-hide navigation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setMouseMoving(true);
      setIsVisible(true);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setMouseMoving(false);
        if (!mouseMoving) setIsVisible(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeout) clearTimeout(timeout);
    };
  }, [mouseMoving]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focus is on input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.key) {
        case "ArrowLeft":
          handleNextSurah(); // In RTL mode, left arrow moves to next surah
          setIsVisible(true);
          break;
        case "ArrowRight":
          handlePrevSurah(); // In RTL mode, right arrow moves to prev surah
          setIsVisible(true);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevSurah, handleNextSurah]);

  if (!isUIVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
        !isVisible && "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-muted/10 shadow-sm transition-all duration-300 hover:bg-background/80 hover:shadow-md hover:border-muted/20 group">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full transition-all duration-300 hover:bg-primary/5 hover:text-primary focus:ring-1 focus:ring-primary/20",
            !prevSurah && "opacity-50 cursor-not-allowed"
          )}
          onClick={handlePrevSurah}
          disabled={!prevSurah}
          title={
            prevSurah ? `السورة السابقة: ${prevSurah.name_arabic}` : undefined
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <span className="px-2 py-1 text-xs font-medium text-muted-foreground/80 transition-all duration-300 group-hover:text-foreground">
          {surah.id} / 114
        </span>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full transition-all duration-300 hover:bg-primary/5 hover:text-primary focus:ring-1 focus:ring-primary/20",
            !nextSurah && "opacity-50 cursor-not-allowed"
          )}
          onClick={handleNextSurah}
          disabled={!nextSurah}
          title={
            nextSurah ? `السورة التالية: ${nextSurah.name_arabic}` : undefined
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

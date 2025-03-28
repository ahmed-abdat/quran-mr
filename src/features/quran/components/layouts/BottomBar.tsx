"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, ListTree, Settings } from "lucide-react";
import { useQuranStore } from "@/features/quran/store/useQuranStore";
import { QuranView } from "@/features/quran/types";
import { cn } from "@/lib/utils";

/**
 * BottomBar component
 * Provides the main navigation interface for the Quran app
 * Designed to be minimal during reading
 */
export function BottomBar() {
  const quranStore = useQuranStore();
  const { activeView, activeSurahId } = quranStore;

  // Check if we're in reading mode for visual adjustments
  const isReadingMode = activeView === "surah-view";

  const handleNavigation = (view: QuranView) => {
    quranStore.setActiveView(view);
  };

  // Navigation items for consistent usage - without search (moved to NavigationBar)
  const navItems = [
    {
      view: "surah-list" as const,
      label: "السور",
      icon: ListTree,
      description: "فهرس السور",
    },
    {
      view: "surah-view" as const,
      label: "القراءة",
      icon: BookOpen,
      description: "قراءة القرآن",
      disabled: !activeSurahId,
    },
    {
      view: "settings" as const,
      label: "الإعدادات",
      icon: Settings,
      description: "إعدادات التطبيق",
    },
  ];

  return (
    <div
      className={cn(
        "border-t transition-all duration-300",
        isReadingMode
          ? "bg-background/75 backdrop-blur-xl border-muted/20 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"
          : "bg-background/80 backdrop-blur-xl shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"
      )}
    >
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center py-1">
          {navItems.map((item) => (
            <Button
              key={item.view}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-lg transition-colors",
                activeView === item.view
                  ? isReadingMode && activeView === "surah-view"
                    ? "text-muted-foreground bg-transparent font-medium"
                    : "text-primary bg-primary/5 font-medium"
                  : "text-muted-foreground hover:bg-muted/10",
                item.disabled && "opacity-50 pointer-events-none",
                isReadingMode && "opacity-70 hover:opacity-100"
              )}
              onClick={() => handleNavigation(item.view)}
              title={item.description}
              disabled={item.disabled}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  activeView === item.view && !isReadingMode && "text-primary"
                )}
              />
              <span className={cn("text-xs", isReadingMode && "text-xs")}>
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

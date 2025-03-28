/**
 * BottomBar Component
 *
 * Primary navigation component that provides:
 * 1. Quick access to main app sections
 * 2. Visual feedback for active section
 * 3. Adaptive styling for reading mode
 *
 * Features:
 * - Responsive layout
 * - Backdrop blur effects
 * - RTL support
 * - Accessible navigation
 * - Visual indicators for active state
 * - Disabled states for unavailable options
 *
 * Navigation Items:
 * - Surah List (السور): Browse all surahs
 * - Reading (القراءة): Active surah view (disabled if no surah selected)
 * - Settings (الإعدادات): App configuration
 *
 * @example
 * ```tsx
 * <BottomBar />
 * ```
 */

"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, ListTree, Settings } from "lucide-react";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { cn } from "@/lib/utils";

// Navigation items configuration
const NAV_ITEMS = [
  {
    view: "surah-list" as const,
    label: "السور",
    icon: ListTree,
    description: "فهرس السور",
    ariaLabel: "View Surah list",
  },
  {
    view: "surah-view" as const,
    label: "القراءة",
    icon: BookOpen,
    description: "قراءة القرآن",
    ariaLabel: "Read Quran",
  },
  {
    view: "settings" as const,
    label: "الإعدادات",
    icon: Settings,
    description: "إعدادات التطبيق",
    ariaLabel: "Open settings",
  },
] as const;

// Button style variants based on state
const getButtonStyles = (
  isActive: boolean,
  isReadingMode: boolean,
  isDisabled: boolean
) =>
  cn(
    "flex flex-col items-center gap-1 h-auto py-2 px-4 rounded-lg transition-colors",
    isActive
      ? isReadingMode
        ? "text-muted-foreground bg-transparent font-medium"
        : "text-primary bg-primary/5 font-medium"
      : "text-muted-foreground hover:bg-muted/10",
    isDisabled && "opacity-50 pointer-events-none",
    isReadingMode && "opacity-70 hover:opacity-100"
  );

export function BottomBar() {
  const { activeView, activeSurahId, setActiveView } =
    useMushafNavigationStore();
  const isReadingMode = activeView === "surah-view";

  return (
    <nav
      className={cn(
        "border-t transition-all duration-300",
        isReadingMode
          ? "bg-background/75 backdrop-blur-xl border-muted/20 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"
          : "bg-background/80 backdrop-blur-xl shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeView === item.view;
            const isDisabled = item.view === "surah-view" && !activeSurahId;

            return (
              <Button
                key={item.view}
                variant="ghost"
                size="sm"
                className={getButtonStyles(isActive, isReadingMode, isDisabled)}
                onClick={() => setActiveView(item.view)}
                title={item.description}
                disabled={isDisabled}
                aria-label={item.ariaLabel}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    isActive && !isReadingMode && "text-primary"
                  )}
                  aria-hidden="true"
                />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

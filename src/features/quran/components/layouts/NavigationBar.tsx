"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Settings, Eye, EyeOff } from "lucide-react";
import { useQuranStore } from "@/features/quran/store/useQuranStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavigationBarProps {
  showBackButton?: boolean;
  title?: string;
}

/**
 * NavigationBar component
 * Provides top navigation and search functionality
 * Designed to be minimal and non-distracting
 */
export function NavigationBar({
  showBackButton = false,
  title = "القرآن الكريم",
}: NavigationBarProps) {
  const quranStore = useQuranStore();
  const { isUIVisible, toggleUIVisibility, activeView, setActiveView } =
    quranStore;

  // Determine if we're in reading mode to adjust UI
  const isReadingMode = activeView === "surah-view";

  const handleBack = () => {
    // Navigate back to the surah list
    setActiveView("surah-list");
  };

  const handleSettingsClick = () => {
    setActiveView("settings");
  };

  const handleSearchClick = () => {
    setActiveView("search");
  };

  // Use more subtle styling in reading mode
  const navbarClasses = cn(
    "transition-all duration-300",
    isReadingMode
      ? "bg-background/75 backdrop-blur-xl border-b border-muted/20 shadow-sm"
      : "bg-background/80 backdrop-blur-xl border-b border-muted/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]"
  );

  return (
    <div className={navbarClasses}>
      <div className="container mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className={cn(
                  isReadingMode && "text-muted-foreground hover:text-foreground"
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}

            <h1
              className={cn(
                "font-medium",
                isReadingMode ? "text-base" : "text-lg",
                !showBackButton && "font-bold text-primary"
              )}
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {isReadingMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleUIVisibility}
                className="text-muted-foreground hover:text-foreground"
                title={isUIVisible ? "إخفاء الواجهة" : "إظهار الواجهة"}
              >
                {isUIVisible ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchClick}
              className={cn(
                isReadingMode
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSettingsClick}
              className={cn(
                isReadingMode && "text-muted-foreground hover:text-foreground"
              )}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

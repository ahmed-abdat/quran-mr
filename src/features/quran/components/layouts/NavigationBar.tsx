/**
 * NavigationBar Component
 *
 * Top navigation bar that provides:
 * 1. Back navigation (when enabled)
 * 2. Dynamic title display
 * 3. UI controls for reading mode
 * 4. Quick access to search, theme toggle, and settings
 *
 * Features:
 * - Adaptive styling for reading mode
 * - Backdrop blur effects
 * - Responsive layout
 * - RTL support
 * - Accessible button labels
 *
 * @example
 * ```tsx
 * // Basic usage
 * <NavigationBar title="القرآن الكريم" />
 *
 * // With back button
 * <NavigationBar
 *   showBackButton={true}
 *   title="قائمة السور"
 * />
 * ```
 */

"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Search, Settings, Eye, EyeOff } from "lucide-react";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface NavigationBarProps {
  /** Whether to show the back button */
  showBackButton?: boolean;
  /** The title to display in the navigation bar */
  title?: string;
}

// Button variants based on reading mode
const getButtonVariant = (isReadingMode: boolean) => ({
  variant: "ghost" as const,
  size: "icon" as const,
  className: cn(isReadingMode && "text-muted-foreground hover:text-foreground"),
});

export function NavigationBar({
  showBackButton = false,
  title = "القرآن الكريم",
}: NavigationBarProps) {
  const { activeView, setActiveView } = useMushafNavigationStore();
  const { isUIVisible, toggleUIVisibility } = useMushafSettingsStore();

  const isReadingMode = activeView === "surah-view";
  const buttonProps = getButtonVariant(isReadingMode);

  // Navigation handlers
  const handleBack = () => setActiveView("surah-list");
  const handleSettingsClick = () => setActiveView("settings");
  const handleSearchClick = () => setActiveView("search");

  return (
    <nav
      className={cn(
        "transition-all duration-300",
        isReadingMode
          ? "bg-background/75 backdrop-blur-xl border-b border-muted/20 shadow-sm"
          : "bg-background/80 backdrop-blur-xl border-b border-muted/30 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          {/* Left side: Back button and title */}
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button
                {...buttonProps}
                onClick={handleBack}
                aria-label="Go back"
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

          {/* Right side: Action buttons */}
          <div className="flex items-center gap-1">
            {isReadingMode && (
              <Button
                {...buttonProps}
                onClick={toggleUIVisibility}
                aria-label={isUIVisible ? "Hide interface" : "Show interface"}
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
              {...buttonProps}
              onClick={handleSearchClick}
              className={cn(
                buttonProps.className,
                !isReadingMode && "text-primary"
              )}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <Button
              {...buttonProps}
              onClick={handleSettingsClick}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

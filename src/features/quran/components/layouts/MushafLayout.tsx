/**
 * MushafLayout Component
 *
 * Main layout component that provides the structure for the Mushaf (Quran) application.
 * It manages:
 * 1. Navigation bar (top)
 * 2. Content area (middle)
 * 3. Bottom bar (bottom)
 * 4. UI visibility in reading mode
 *
 * Features:
 * - Auto-hide UI on scroll in reading mode
 * - Click-to-toggle UI in reading mode
 * - Animated transitions for UI elements
 * - Responsive safe areas
 * - Dynamic titles based on current view
 *
 * @example
 * ```tsx
 * <MushafLayout>
 *   <YourContent />
 * </MushafLayout>
 * ```
 */

"use client";

import { ReactNode, useEffect, useRef } from "react";
import { NavigationBar } from "./NavigationBar";
import { BottomBar } from "./BottomBar";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { cn } from "@/lib/utils";

interface MushafLayoutProps {
  /** The content to be rendered inside the layout */
  children: ReactNode;
}

// View titles mapping for better maintainability
const VIEW_TITLES: Record<string, string> = {
  "surah-list": "قائمة السور",
  search: "البحث في القرآن",
  "surah-view": "قراءة القرآن",
  settings: "الإعدادات",
};

export function MushafLayout({ children }: MushafLayoutProps) {
  const { activeView } = useMushafNavigationStore();
  const { isUIVisible, toggleUIVisibility } = useMushafSettingsStore();
  const mainRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // View states
  const isReadingMode = activeView === "surah-view";
  const isSettingsView = activeView === "settings";
  const showBackButton = ["surah-view", "search", "settings"].includes(
    activeView
  );

  // Handle UI visibility on scroll in reading mode
  useEffect(() => {
    if (!isReadingMode || !isUIVisible) return;

    const handleScroll = () => {
      if (!mainRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrollDistance = Math.abs(currentScrollY - lastScrollY.current);

      // Hide UI when scrolling down past threshold (50px)
      if (scrollingDown && scrollDistance > 50) {
        toggleUIVisibility();
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReadingMode, isUIVisible, toggleUIVisibility]);

  // Handle content click in reading mode
  const handleContentClick = (e: React.MouseEvent) => {
    if (!isReadingMode) return;

    // Prevent toggling when clicking interactive elements
    const target = e.target as HTMLElement;
    const isInteractive =
      target.tagName === "BUTTON" ||
      target.closest("button") ||
      target.getAttribute("role") === "button" ||
      target.closest('[role="button"]');

    if (!isInteractive) {
      toggleUIVisibility();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen bg-background relative overflow-hidden",
        isReadingMode && "bg-background/95"
      )}
    >
      {/* Main content area */}
      <main
        ref={mainRef}
        className={cn(
          "flex-1 container px-2 max-w-3xl mx-auto transition-all duration-300",
          isSettingsView ? "pt-6" : "pt-4"
        )}
        onClick={handleContentClick}
      >
        {children}
      </main>

      {/* Navigation bar with animation */}
      {!isSettingsView && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out transform",
            isUIVisible ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <NavigationBar
            showBackButton={showBackButton}
            title={VIEW_TITLES[activeView] || "القرآن الكريم"}
          />
        </div>
      )}

      {/* Bottom bar with animation */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out transform",
          isUIVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <BottomBar />
      </div>

      {/* Safe area for bottom navigation */}
      {isUIVisible && <div className="h-20 w-full" aria-hidden="true" />}
    </div>
  );
}

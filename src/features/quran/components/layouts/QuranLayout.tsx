"use client";

import { ReactNode, useEffect, useRef } from "react";
import { NavigationBar } from "./NavigationBar";
import { BottomBar } from "./BottomBar";
import { useQuranStore } from "@/features/quran/store/useQuranStore";
import { cn } from "@/lib/utils";

interface QuranLayoutProps {
  children: ReactNode;
}

/**
 * Main layout component for the Quran application
 * Optimized for focused reading experience
 */
export function QuranLayout({ children }: QuranLayoutProps) {
  const { activeView, isUIVisible, toggleUIVisibility } = useQuranStore();
  const mainRef = useRef<HTMLDivElement>(null);

  // Check if we're in reading mode
  const isReadingMode = activeView === "surah-view";
  const isSettingsView = activeView === "settings";

  // Handle dismissing UI on scroll in reading mode
  useEffect(() => {
    if (!isReadingMode || !isUIVisible) return;

    let lastScrollY = 0;
    const threshold = 50; // Minimum scroll distance before hiding UI

    const handleScroll = () => {
      if (!mainRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollDistance = Math.abs(currentScrollY - lastScrollY);

      // Only hide UI when scrolling down past threshold
      if (scrollingDown && scrollDistance > threshold) {
        toggleUIVisibility();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReadingMode, isUIVisible, toggleUIVisibility]);

  // Determine title based on active view
  const getTitleFromView = () => {
    switch (activeView) {
      case "surah-list":
        return "قائمة السور";
      case "juz-list":
        return "قائمة الأجزاء";
      case "search":
        return "البحث في القرآن";
      case "surah-view":
        return "قراءة القرآن";
      case "settings":
        return "الإعدادات";
      default:
        return "القرآن الكريم";
    }
  };

  // Show back button only on surah view, search and settings
  const showBackButton =
    activeView === "surah-view" ||
    activeView === "search" ||
    activeView === "settings";

  // Handle content click in reading mode to toggle UI
  const handleContentClick = (e: React.MouseEvent) => {
    if (isReadingMode) {
      // Prevent toggling when clicking on interactive elements
      const target = e.target as HTMLElement;
      const isButtonClick =
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.closest('[role="button"]');

      if (!isButtonClick) {
        toggleUIVisibility();
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen bg-background relative overflow-hidden",
        isReadingMode && "bg-background/95"
      )}
    >
      <main
        ref={mainRef}
        className={cn(
          "flex-1 container px-4 max-w-3xl mx-auto transition-all duration-300",
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
            title={getTitleFromView()}
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
      {isUIVisible && <div className="h-20 w-full" />}
    </div>
  );
}

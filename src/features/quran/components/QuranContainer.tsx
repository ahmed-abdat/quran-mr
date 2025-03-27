"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { SurahListView } from "./QuranViews/SurahListView";
import { SurahView } from "./QuranViews/SurahView";
import { SearchView } from "./QuranViews/SearchView";
import { BottomBar } from "./QuranNavigation/BottomBar";
import { useQuranData } from "../hooks/useQuranData";
import { useQuranNavigation } from "../hooks/useQuranNavigation";
import { useQuranSettings } from "../hooks/useQuranSettings";
import { useQuranSearch } from "../hooks/useQuranSearch";
import { cn } from "@/lib/utils";
import { NavigationBar } from "./QuranNavigation/NavigationBar";

interface QuranContainerProps {
  initialView?: "surah-list" | "surah" | "search";
  initialSurahId?: number;
  initialAyahId?: number;
}

/**
 * QuranContainer component
 * Main container for the Quran application, handling all views and navigation
 */
export function QuranContainer({
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: QuranContainerProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isUIVisible, setIsUIVisible] = useState(true);

  // Toggle UI visibility
  const toggleUIVisibility = () => {
    setIsUIVisible((prev) => !prev);
  };

  // Custom hooks for Quran functionality
  const {
    allSurahs,
    getSurah,
    getSurahIndex,
    getPrevSurah,
    getNextSurah,
    filterSurahs,
    getAyah,
    getPaginatedAyahs,
  } = useQuranData();

  const {
    activeView,
    activeSurahId,
    activeAyahId,
    navigateToSurah,
    navigateToAyah,
    navigateToSearch,
    navigateToSurahList,
    navigateToNextSurah,
    navigateToPrevSurah,
  } = useQuranNavigation(initialView as any, initialSurahId, initialAyahId);

  const {
    fontSize,
    viewMode,
    currentPage,
    getItemsPerPage,
    increaseFontSize,
    decreaseFontSize,
    toggleTheme,
    setCurrentPage,
    toggleViewMode,
  } = useQuranSettings();

  const {
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    searchInitiated,
    setSearchQuery,
    performSearch,
    clearSearch,
    clearRecentSearches,
    removeSearchTerm,
    highlightSearchText,
  } = useQuranSearch();

  // Current surah data
  const currentSurah = activeSurahId ? getSurah(activeSurahId) : null;

  // Pagination values
  const itemsPerPage = getItemsPerPage();
  const totalAyahs = currentSurah?.ayahs.length || 0;
  const totalPages = Math.ceil(totalAyahs / itemsPerPage);

  // Get ayahs for the current page (only used in carousel mode)
  const pageAyahs = currentSurah
    ? getPaginatedAyahs(currentSurah, currentPage, itemsPerPage)
    : [];

  // Navigation availability
  const hasPrevSurah = activeSurahId ? activeSurahId > 1 : false;
  const hasNextSurah = activeSurahId ? activeSurahId < 114 : false;

  // Handle search result navigation
  const handleSearchResultClick = (surahId: number, ayahId: number) => {
    navigateToAyah(surahId, ayahId);
  };

  // Page title based on the current view
  const getPageTitle = () => {
    if (activeView === "surah-view" && currentSurah) {
      return `سورة ${currentSurah.name_arabic}`;
    } else if (activeView === "search") {
      return "البحث في القرآن الكريم";
    }
    return "القرآن الكريم";
  };

  // Always show UI when not in surah view or when changing views
  useEffect(() => {
    if (activeView !== "surah-view") {
      setIsUIVisible(true);
    }
  }, [activeView]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show NavigationBar only for surah-list and search views */}
      {(activeView === "surah-list" || activeView === "search") && (
        <NavigationBar
          title={getPageTitle()}
          allSurahs={allSurahs}
          currentSurahId={activeSurahId}
          hasPrevSurah={hasPrevSurah}
          hasNextSurah={hasNextSurah}
          navigateToSurahList={navigateToSurahList}
          navigateToSearch={navigateToSearch}
          navigateToSurah={navigateToSurah}
          navigateToPrevSurah={navigateToPrevSurah}
          navigateToNextSurah={navigateToNextSurah}
          viewMode={viewMode}
          darkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onToggleViewMode={toggleViewMode}
        />
      )}

      <main
        className={cn(
          "flex-1 container mx-auto",
          activeView === "surah-view" ? (isUIVisible ? "p-0" : "p-0") : "p-4"
        )}
      >
        {activeView === "surah-list" && (
          <SurahListView surahs={allSurahs} onSurahSelect={navigateToSurah} />
        )}

        {activeView === "search" && (
          <SearchView
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResults={searchResults}
            isSearching={isSearching}
            recentSearches={recentSearches}
            searchInitiated={searchInitiated}
            performSearch={performSearch}
            clearSearch={clearSearch}
            clearRecentSearches={clearRecentSearches}
            removeSearchTerm={removeSearchTerm}
            highlightSearchText={highlightSearchText}
          />
        )}

        {activeView === "surah-view" && currentSurah && (
          <SurahView
            surah={currentSurah}
            activeAyahId={activeAyahId}
            viewMode="continuous"
            fontSize={fontSize}
            currentPage={currentPage}
            totalPages={totalPages}
            pageAyahs={pageAyahs}
            highlightSearchText={highlightSearchText}
            searchQuery={searchQuery}
            toggleUIVisibility={toggleUIVisibility}
            isUIVisible={isUIVisible}
            darkMode={isDarkMode}
          />
        )}

        {/* Carousel view is temporarily disabled 
        {activeView === "surah-view" && currentSurah && viewMode === "carousel" && (
          <CarouselView
            surah={currentSurah}
            activeAyahId={activeAyahId}
            fontSize={fontSize}
            currentPage={currentPage}
            totalPages={totalPages}
            pageAyahs={pageAyahs}
            itemsPerPage={itemsPerPage}
            highlightSearchText={highlightSearchText}
            searchQuery={searchQuery}
            onPageChange={setCurrentPage}
            toggleUIVisibility={toggleUIVisibility}
            isUIVisible={isUIVisible}
          />
        )}
        */}
      </main>

      {/* Only show BottomBar when UI is visible or not in surah-view */}
      {activeView === "surah-view" && currentSurah && (
        <BottomBar
          viewMode="continuous"
          fontSize={fontSize}
          currentPage={1}
          totalPages={1}
          hasPrevSurah={hasPrevSurah}
          hasNextSurah={hasNextSurah}
          navigateToPrevSurah={navigateToPrevSurah}
          navigateToNextSurah={navigateToNextSurah}
          onFontSizeIncrease={increaseFontSize}
          onFontSizeDecrease={decreaseFontSize}
          onPageChange={setCurrentPage}
          onToggleViewMode={toggleViewMode}
          navigateToHome={navigateToSurahList}
          navigateToSearch={navigateToSearch}
          darkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          allSurahs={allSurahs}
          currentSurahId={activeSurahId}
          navigateToSurah={navigateToSurah}
          isUIVisible={isUIVisible}
        />
      )}
    </div>
  );
}

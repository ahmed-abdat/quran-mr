"use client";

import { useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { SurahListView } from "./QuranViews/SurahListView";
import { SurahView } from "./QuranViews/SurahView";
import { SearchView } from "./QuranViews/SearchView";
import { NavigationBar } from "./QuranNavigation/NavigationBar";
import { BottomBar } from "./QuranNavigation/BottomBar";
import { useQuranData } from "../hooks/useQuranData";
import { useQuranNavigation } from "../hooks/useQuranNavigation";
import { useQuranSettings } from "../hooks/useQuranSettings";
import { useQuranSearch } from "../hooks/useQuranSearch";

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
    showTranslation,
    getItemsPerPage,
    increaseFontSize,
    decreaseFontSize,
    toggleTheme,
    setViewMode,
    setCurrentPage,
    toggleTranslation,
  } = useQuranSettings();

  const {
    searchQuery,
    searchResults,
    isSearching,
    recentSearches,
    setSearchQuery,
    performSearch,
    clearSearch,
    clearRecentSearches,
    highlightSearchText,
  } = useQuranSearch();

  // Current surah data
  const currentSurah = activeSurahId ? getSurah(activeSurahId) : null;

  // Prepare data for the current view mode
  const itemsPerPage = getItemsPerPage();
  const totalAyahs = currentSurah?.ayahs.length || 0;
  const totalPages = Math.ceil(totalAyahs / itemsPerPage);

  // Calculate the ayahs to display on the current page
  const pageAyahs = currentSurah
    ? getPaginatedAyahs(currentSurah, currentPage, itemsPerPage)
    : [];

  // Navigation availability
  const hasPrevSurah = activeSurahId ? activeSurahId > 1 : false;
  const hasNextSurah = activeSurahId ? activeSurahId < 114 : false;

  // If changing surahs, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSurahId, setCurrentPage]);

  // Handle ayah click
  const handleAyahClick = (ayahId: number) => {
    if (activeSurahId) {
      navigateToAyah(activeSurahId, ayahId);
    }
  };

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

  return (
    <div className="flex flex-col min-h-screen">
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
        onViewModeChange={setViewMode}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 container mx-auto py-6 px-4">
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
            performSearch={performSearch}
            clearSearch={clearSearch}
            clearRecentSearches={clearRecentSearches}
            highlightSearchText={highlightSearchText}
            navigateToSurah={navigateToSurah}
            navigateToAyah={handleSearchResultClick}
          />
        )}

        {activeView === "surah-view" && currentSurah && (
          <SurahView
            surah={currentSurah}
            activeAyahId={activeAyahId}
            viewMode={viewMode}
            fontSize={fontSize}
            currentPage={currentPage}
            totalPages={totalPages}
            pageAyahs={pageAyahs}
            onAyahClick={handleAyahClick}
            highlightSearchText={highlightSearchText}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Only show BottomBar when viewing a surah */}
      {activeView === "surah-view" && currentSurah && (
        <BottomBar
          viewMode={viewMode}
          fontSize={fontSize}
          currentPage={currentPage}
          totalPages={totalPages}
          hasPrevSurah={hasPrevSurah}
          hasNextSurah={hasNextSurah}
          navigateToPrevSurah={navigateToPrevSurah}
          navigateToNextSurah={navigateToNextSurah}
          onFontSizeIncrease={increaseFontSize}
          onFontSizeDecrease={decreaseFontSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

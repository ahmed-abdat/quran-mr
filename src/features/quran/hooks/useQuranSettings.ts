import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Available view modes for the Quran
export type QuranViewMode = "continuous" | "carousel";

// Available font options for the Quran
export enum QuranFont {
  UTHMANIC_WARSH = "uthmanic_warsh",
  UTHMANIC_HAFS = "uthmanic_hafs",
  SURAH_NAMES = "surah_names",
}

/**
 * Custom hook for managing Quran display settings
 * Manages font size, view mode, and theme settings
 */
export function useQuranSettings() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(24);
  const [viewMode, setViewMode] = useState<QuranViewMode>("continuous");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);

  // Number of ayahs to show per page
  const getItemsPerPage = () => {
    return viewMode === "carousel" ? 10 : 999; // Show 10 ayahs per page in carousel mode, all in continuous
  };

  // Load settings from localStorage
  useEffect(() => {
    try {
      // Load settings from localStorage
      const savedFontSize = localStorage.getItem("quranFontSize");
      const savedShowTranslation = localStorage.getItem("quranShowTranslation");
      const savedViewMode = localStorage.getItem("quranViewMode");

      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize));
      }

      if (savedShowTranslation) {
        setShowTranslation(savedShowTranslation === "true");
      }

      if (savedViewMode) {
        setViewMode(savedViewMode as QuranViewMode);
      }
    } catch (e) {
      console.error("Failed to load Quran settings", e);
    }
  }, []);

  // Save settings to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem("quranFontSize", fontSize.toString());
    } catch (e) {
      console.error("Failed to save font size", e);
    }
  }, [fontSize]);

  useEffect(() => {
    try {
      localStorage.setItem("quranViewMode", viewMode);
    } catch (e) {
      console.error("Failed to save view mode", e);
    }
  }, [viewMode]);

  // Save translation preference to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem("quranShowTranslation", showTranslation.toString());
    } catch (e) {
      console.error("Failed to save translation preference", e);
    }
  }, [showTranslation]);

  // Handle font size changes
  const increaseFontSize = () => {
    if (fontSize < 40) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 18) {
      setFontSize(fontSize - 2);
    }
  };

  // Toggle view mode
  const toggleViewMode = () => {
    setViewMode(viewMode === "continuous" ? "carousel" : "continuous");
    setCurrentPage(1); // Reset to first page when toggling view mode
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Toggle translation
  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return {
    fontSize,
    viewMode,
    currentPage,
    showTranslation,
    getItemsPerPage,
    increaseFontSize,
    decreaseFontSize,
    setCurrentPage,
    toggleTheme,
    toggleTranslation,
    toggleViewMode,
    theme,
  };
}

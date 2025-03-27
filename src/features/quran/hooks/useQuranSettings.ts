import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

// Available view modes for the Quran
export type QuranViewMode = "continuous";

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
  const [viewMode] = useState<QuranViewMode>("continuous");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);
  // Always use Warsh font by default
  const fontType = QuranFont.UTHMANIC_WARSH;

  // Number of ayahs to show per page (now always shows all)
  const getItemsPerPage = () => {
    return 999; // Show all ayahs
  };

  // Load font size from localStorage
  useEffect(() => {
    try {
      // Load settings from localStorage
      const savedFontSize = localStorage.getItem("quranFontSize");
      const savedShowTranslation = localStorage.getItem("quranShowTranslation");

      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize));
      }

      if (savedShowTranslation) {
        setShowTranslation(savedShowTranslation === "true");
      }
    } catch (e) {
      console.error("Failed to load Quran settings", e);
    }
  }, []);

  // Save font size to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem("quranFontSize", fontSize.toString());
    } catch (e) {
      console.error("Failed to save font size", e);
    }
  }, [fontSize]);

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
    theme,
  };
}

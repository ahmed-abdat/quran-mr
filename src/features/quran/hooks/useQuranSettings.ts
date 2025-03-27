import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

// Available view modes for the Quran
export type QuranViewMode = "continuous" | "page" | "grid" | "mushaf";

/**
 * Custom hook for managing Quran display settings
 * Manages font size, view mode, and theme settings
 */
export function useQuranSettings() {
  const { theme, setTheme } = useTheme();
  const [fontSize, setFontSize] = useState(28);
  const [viewMode, setViewMode] = useState<QuranViewMode>("continuous");
  const [currentPage, setCurrentPage] = useState(1);
  const [showTranslation, setShowTranslation] = useState(false);

  // Number of ayahs to show per page (varies by view mode)
  const getItemsPerPage = () => {
    switch (viewMode) {
      case "mushaf":
        return 15; // Show more ayahs in mushaf mode
      case "page":
        return 10;
      default:
        return 999; // Show all in continuous or grid mode
    }
  };

  // Load font size from localStorage
  useEffect(() => {
    try {
      // Load settings from localStorage
      const savedFontSize = localStorage.getItem("quranFontSize");
      const savedViewMode = localStorage.getItem("quranViewMode");
      const savedShowTranslation = localStorage.getItem("quranShowTranslation");

      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize));
      }

      if (
        savedViewMode &&
        ["continuous", "page", "grid", "mushaf"].includes(savedViewMode)
      ) {
        setViewMode(savedViewMode as QuranViewMode);
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

  // Save view mode to localStorage when changed
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

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle view mode change
  const changeViewMode = (mode: QuranViewMode) => {
    setViewMode(mode);
    if (mode === "page" || mode === "mushaf") {
      setCurrentPage(1);
    }
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
    changeViewMode,
    setViewMode,
    setCurrentPage,
    toggleTheme,
    toggleTranslation,
    theme,
  };
}

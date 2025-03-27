import { useState, useCallback, useEffect } from "react";
import { Ayah } from "../types/quran-types";
import { searchAyahs } from "../utils/quran-search";

/**
 * Custom hook for Quran search functionality
 * Handles search input, results, and recent searches history
 */
export function useQuranSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Ayah[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("quranRecentSearches");
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load recent searches", e);
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;

    // Update recent searches list (add to front, remove duplicates, limit to 5)
    const updatedRecent = [
      query,
      ...recentSearches.filter((s) => s !== query),
    ].slice(0, 5);

    setRecentSearches(updatedRecent);

    try {
      localStorage.setItem(
        "quranRecentSearches",
        JSON.stringify(updatedRecent)
      );
    } catch (e) {
      console.error("Failed to save recent searches", e);
    }
  };

  // Perform search
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      setIsSearching(true);

      try {
        // Using setTimeout to show loading state and avoid blocking UI
        setTimeout(() => {
          const results = searchAyahs(query);
          setSearchResults(results);
          saveRecentSearch(query);
          setIsSearching(false);
        }, 300);
      } catch (e) {
        console.error("Search error:", e);
        setIsSearching(false);
      }
    },
    [recentSearches]
  );

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Clear all recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem("quranRecentSearches");
    } catch (e) {
      console.error("Failed to clear recent searches", e);
    }
  }, []);

  // Highlight text that matches the search query
  const highlightSearchText = (text: string, query: string) => {
    if (!query.trim()) return text;

    try {
      // Create a regex that matches the query with word boundaries when possible
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escapedQuery})`, "gi");

      return text.replace(
        regex,
        '<mark class="bg-primary/20 text-primary-foreground dark:text-primary px-0.5 rounded transition-colors duration-200 font-semibold">$1</mark>'
      );
    } catch (e) {
      return text;
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    recentSearches,
    performSearch,
    clearSearch,
    clearRecentSearches,
    highlightSearchText,
  };
}

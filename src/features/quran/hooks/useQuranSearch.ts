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
  const [searchInitiated, setSearchInitiated] = useState(false);

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

  // Reset searchInitiated when query changes
  useEffect(() => {
    if (searchQuery === "") {
      setSearchInitiated(false);
    }
  }, [searchQuery]);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback(
    (query: string) => {
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
    },
    [recentSearches]
  );

  // Perform search
  const performSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      setIsSearching(true);
      setSearchInitiated(true);

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
    [saveRecentSearch]
  );

  // Clear search results
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchInitiated(false);
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

  // Remove a specific search term
  const removeSearchTerm = useCallback(
    (termToRemove: string) => {
      const updatedSearches = recentSearches.filter(
        (term) => term !== termToRemove
      );
      setRecentSearches(updatedSearches);
      try {
        if (updatedSearches.length === 0) {
          localStorage.removeItem("quranRecentSearches");
        } else {
          localStorage.setItem(
            "quranRecentSearches",
            JSON.stringify(updatedSearches)
          );
        }
      } catch (e) {
        console.error("Failed to update recent searches", e);
      }
    },
    [recentSearches]
  );

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
    searchInitiated,
    performSearch,
    clearSearch,
    clearRecentSearches,
    removeSearchTerm,
    highlightSearchText,
  };
}

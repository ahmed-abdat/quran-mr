/**
 * Quran Search Store
 *
 * Manages the state for Quran search functionality including:
 * - Search query and results
 * - Recent searches history
 * - Search status
 *
 * Features:
 * - Persistent recent searches
 * - Search history management
 * - Search state management
 * - Text highlighting
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Ayah } from "@/features/quran/types";

interface QuranSearchState {
  // Search state
  query: string;
  results: Ayah[];
  isSearching: boolean;
  searchInitiated: boolean;

  // Recent searches
  recentSearches: string[];

  // Actions
  setQuery: (query: string) => void;
  setResults: (results: Ayah[]) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSearchInitiated: (initiated: boolean) => void;

  // Recent searches management
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Search actions
  clearSearch: () => void;

  // Utilities
  highlightText: (text: string, searchQuery: string) => string;
}

export const useQuranSearchStore = create<QuranSearchState>()(
  persist(
    (set, get) => ({
      // Initial state
      query: "",
      results: [],
      isSearching: false,
      searchInitiated: false,
      recentSearches: [],

      // State setters
      setQuery: (query) => set({ query }),
      setResults: (results) => set({ results }),
      setIsSearching: (isSearching) => set({ isSearching }),
      setSearchInitiated: (searchInitiated) => set({ searchInitiated }),

      // Recent searches management
      addRecentSearch: (query) => {
        if (!query.trim()) return;
        const current = get().recentSearches;
        const updated = [query, ...current.filter((s) => s !== query)].slice(
          0,
          5
        );
        set({ recentSearches: updated });
      },

      removeRecentSearch: (query) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((s) => s !== query),
        })),

      clearRecentSearches: () => set({ recentSearches: [] }),

      // Search actions
      clearSearch: () =>
        set({
          query: "",
          results: [],
          searchInitiated: false,
        }),

      // Utilities
      highlightText: (text: string, searchQuery: string) => {
        if (!searchQuery.trim()) return text;

        try {
          // Remove ayah numbers before processing
          text = text.replace(/[\u06DD].*?[\u06DE]/g, "");

          // Simple exact match highlighting
          const escapedQuery = searchQuery.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
          );
          const regex = new RegExp(`(${escapedQuery})`, "g");

          return text.replace(
            regex,
            '<mark class="bg-primary/10 text-primary-foreground/90 rounded-[1px] transition-colors">$1</mark>'
          );
        } catch (e) {
          console.error("Highlight error:", e);
          return text;
        }
      },
    }),
    {
      name: "quran-search-storage",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        query: state.query, // Also persist the current query
      }),
    }
  )
);

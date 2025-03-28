"use client";

import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { useQuranSearchStore } from "@/features/quran/store/useQuranSearchStore";
import { searchAyahs } from "@/features/quran/utils/quran-search";
import { ChevronLeft, Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useQuranNavigation } from "@/features/quran/hooks/useQuranNavigation";

/**
 * SearchView Component
 *
 * Displays a search interface for finding ayahs in the Quran.
 * Provides direct integration with the Quran search store for efficient
 * state management and search functionality.
 *
 * Features:
 * - Auto-focus search input
 * - Recent searches management
 * - Search result display with ayah context
 * - Navigation to specific ayahs
 * - RTL support
 * - Responsive design
 *
 * @example
 * ```tsx
 * <SearchView />
 * ```
 */

export function SearchView() {
  const {
    query,
    results,
    recentSearches,
    setQuery,
    setResults,
    addRecentSearch,
    removeRecentSearch,
    clearSearch,
  } = useQuranSearchStore();

  const { navigateToAyah } = useQuranNavigation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus search input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const searchResults = searchAyahs(query);
      setResults(searchResults);
      addRecentSearch(query);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  };

  const handleResultClick = (ayahId: number, surahId: number) => {
    // Keep the search query in store when navigating
    addRecentSearch(query); // Save to recent searches if not already there
    navigateToAyah(surahId, ayahId);
  };

  return (
    <div className="space-y-6">
      {/* Header with result count */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">نتائج البحث</h1>
        {results.length > 0 && (
          <span className="text-muted-foreground">{results.length}</span>
        )}
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="البحث في القرآن الكريم..."
            className="w-full h-12 pr-12 pl-4 rounded-lg bg-muted/30 border border-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-right"
            dir="rtl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Recent searches */}
      {recentSearches.length > 0 && !results.length && (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">عمليات البحث الأخيرة</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <div
                key={term}
                className="group flex items-center gap-1 text-sm bg-muted/30 hover:bg-muted/50 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                onClick={() => {
                  setQuery(term);
                  const event = new Event("submit") as any;
                  handleSearch(event);
                }}
              >
                <span>{term}</span>
                <button
                  type="button"
                  className="h-4 w-4 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecentSearch(term);
                  }}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((ayah) => (
            <div
              key={ayah.id}
              className="border rounded-lg overflow-hidden bg-card hover:bg-muted/5 transition-colors"
            >
              {/* Surah header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">{ayah.sura_name_ar}</h3>
                  <span className="text-muted-foreground text-sm">
                    الآية {ayah.aya_no}
                  </span>
                </div>
              </div>

              {/* Ayah text */}
              <div className="p-4">
                <p className="font-arabic text-lg leading-loose text-right">
                  {ayah.aya_text}
                </p>
              </div>

              {/* Go to ayah button */}
              <div className="border-t p-2">
                <button
                  onClick={() => handleResultClick(ayah.id, ayah.sura_no)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md hover:bg-muted/50 transition-colors text-primary"
                >
                  <span>الانتقال إلى الآية</span>
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : query && !results.length ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            لم يتم العثور على نتائج لـ &quot;{query}&quot;
          </p>
        </div>
      ) : null}

      {/* Initial state */}
      {!query && !results.length && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            أدخل كلمة أو جملة للبحث في القرآن الكريم
          </p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useQuranSearch } from "@/features/quran/hooks/useQuranSearch";
import { useQuranNavigation } from "@/features/quran/hooks/useQuranNavigation";
import { X, Search, Copy, Check, ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SearchView component
 * Displays a search interface for finding ayahs in the Quran
 * with enhanced UX and immediate focus
 */
export function SearchView() {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    recentSearches,
    searchInitiated,
    performSearch,
    clearSearch,
    removeSearchTerm,
    highlightSearchText,
  } = useQuranSearch();

  const { navigateToAyah } = useQuranNavigation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [copiedAyahId, setCopiedAyahId] = useState<number | null>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-focus the search input when the view mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleResultClick = (ayahId: number, surahId: number) => {
    // Navigate to the ayah with search query parameter
    navigateToAyah(surahId, ayahId, searchQuery);
  };

  const handleCopyAyah = async (
    ayah: {
      id: number;
      aya_text: string;
      sura_name_ar: string;
      aya_no: number;
    },
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      // Format the ayah text with surah name and number
      const textToCopy = `${ayah.aya_text}\n\n— سورة ${ayah.sura_name_ar}، الآية ${ayah.aya_no}`;
      await navigator.clipboard.writeText(textToCopy);

      // Show success feedback
      setCopiedAyahId(ayah.id);

      // Clear previous timeout if exists
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      // Reset copied state after 2 seconds
      copyTimeoutRef.current = setTimeout(() => {
        setCopiedAyahId(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    const timeout = copyTimeoutRef.current;
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with result count */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">نتائج البحث</h1>
        {searchResults.length > 0 && (
          <span className="text-muted-foreground">{searchResults.length}</span>
        )}
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في القرآن الكريم..."
            className="w-full h-12 pr-12 pl-4 rounded-lg bg-muted/30 border border-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-right"
            dir="rtl"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {searchQuery && (
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
      {recentSearches.length > 0 && !searchInitiated && (
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
                  setSearchQuery(term);
                  performSearch(term);
                }}
              >
                <span>{term}</span>
                <button
                  type="button"
                  className="h-4 w-4 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearchTerm(term);
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
      {searchResults.length > 0 ? (
        <div className="space-y-4">
          {searchResults.map((ayah) => (
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
                <button
                  onClick={(e) => handleCopyAyah(ayah, e)}
                  className={cn(
                    "h-8 w-8 flex items-center justify-center rounded-md transition-colors",
                    copiedAyahId === ayah.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/50"
                  )}
                  title="نسخ الآية"
                >
                  {copiedAyahId === ayah.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Ayah text */}
              <div className="p-4">
                <p
                  className="font-arabic text-lg leading-loose text-right"
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchText(ayah.aya_text, searchQuery),
                  }}
                />
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
      ) : searchInitiated && !isSearching ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;
          </p>
        </div>
      ) : null}

      {/* Initial state */}
      {!searchQuery && !searchResults.length && !searchInitiated && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            أدخل كلمة أو جملة للبحث في القرآن الكريم
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { Ayah } from "../../types/quran-types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Book, X, Trash2, XCircle, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Ayah[];
  isSearching: boolean;
  recentSearches: string[];
  searchInitiated: boolean;
  performSearch: (query: string) => void;
  clearSearch: () => void;
  clearRecentSearches: () => void;
  removeSearchTerm: (term: string) => void;
  highlightSearchText: (text: string, query: string) => string;
}

/**
 * SearchView component
 * Displays search input and results for Quran search
 */
export function SearchView({
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
}: SearchViewProps) {
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch(searchQuery);
    }
  };

  const navigateToAyah = (surahId: number, ayahId: number) => {
    router.push(`/quran/${surahId}?ayah=${ayahId}`);
  };

  const navigateToSurah = (surahId: number) => {
    router.push(`/quran/${surahId}`);
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Simple search bar */}
      <div className="px-4 sm:px-0 mb-4">
        <div className="flex flex-row-reverse border rounded-lg overflow-hidden shadow-sm">
          <Button
            onClick={() => performSearch(searchQuery)}
            disabled={isSearching || !searchQuery.trim()}
            className="rounded-none h-12 px-5 bg-primary/90 text-primary-foreground"
            aria-label="بحث"
          >
            {isSearching ? (
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          <div className="relative flex-grow">
            <Input
              placeholder="ابحث في القرآن الكريم..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 h-12 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10 bg-card"
              disabled={isSearching}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground rounded-full h-6 w-6 flex items-center justify-center"
                aria-label="مسح البحث"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recent searches as simple links */}
      {recentSearches.length > 0 && (
        <div className="px-4 sm:px-0 mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              عمليات البحث السابقة:
            </span>
            {recentSearches.map((query, index) => (
              <Badge
                key={index}
                variant="outline"
                className="py-1 px-2 cursor-pointer bg-background hover:bg-muted/10 transition-colors"
              >
                <span
                  onClick={() => {
                    setSearchQuery(query);
                    performSearch(query);
                  }}
                >
                  {query}
                </span>
                <button
                  className="ml-1 h-3 w-3 inline-flex items-center justify-center text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearchTerm(query);
                  }}
                  aria-label="إزالة"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      {searchResults.length > 0 && searchInitiated && (
        <div className="px-4 sm:px-0">
          <p className="text-sm text-muted-foreground">
            نتائج البحث: {searchResults.length}
          </p>
        </div>
      )}

      {/* Results section */}
      <div className="px-4 sm:px-0">
        {isSearching ? (
          <div className="text-center py-10 border rounded-lg flex flex-col items-center justify-center">
            <div className="h-10 w-10 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3 opacity-70" />
            <p className="text-muted-foreground">
              جاري البحث في القرآن الكريم...
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-5">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                نتائج البحث
                <Badge variant="secondary" className="mr-2">
                  {searchResults.length}
                </Badge>
              </h2>
            </div>
            <div className="grid gap-4 grid-cols-1">
              {searchResults.map((ayah) => (
                <div
                  key={ayah.id}
                  className="bg-background border rounded-xl overflow-hidden transition-all hover:shadow-sm"
                >
                  <div className="p-4 pb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-muted/20 rounded-full flex items-center justify-center">
                          <Book className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="text-end">
                        <h3
                          className="font-medium text-lg cursor-pointer hover:text-primary transition-colors"
                          onClick={() => navigateToSurah(ayah.sura_no)}
                        >
                          {ayah.sura_name_ar}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          الآية {ayah.aya_no}
                        </p>
                      </div>
                    </div>

                    <div className="py-4">
                      <p
                        className="text-right font-arabic text-xl leading-loose"
                        dir="rtl"
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchText(
                            ayah.aya_text,
                            searchQuery
                          ),
                        }}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-lg border-muted/20 hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={() => navigateToAyah(ayah.sura_no, ayah.aya_no)}
                    >
                      الانتقال إلى الآية
                      <ChevronLeft className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searchInitiated && searchQuery && !isSearching ? (
          <div className="text-center py-12 border rounded-lg flex flex-col items-center">
            <Search className="h-16 w-16 mb-4 text-muted-foreground opacity-20" />
            <p className="text-lg font-medium text-foreground mb-2">
              لم يتم العثور على نتائج
            </p>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={clearSearch}
              className="mt-2"
            >
              مسح البحث
            </Button>
          </div>
        ) : (
          <div className="text-center py-14 border rounded-lg flex flex-col items-center">
            <Search className="h-16 w-16 mb-4 text-muted-foreground opacity-20" />
            <p className="text-lg font-medium text-foreground mb-2">
              ابحث في القرآن الكريم
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              اكتب كلمة أو عبارة للبحث عنها في القرآن الكريم
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

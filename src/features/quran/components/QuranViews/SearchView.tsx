"use client";

import { Ayah } from "../../types/quran-types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Book, X, Trash2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Ayah[];
  isSearching: boolean;
  recentSearches: string[];
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
    <div className="space-y-6 w-full">
      {/* Search section */}
      <div className="bg-card border rounded-lg p-4 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row-reverse gap-2">
            <Button
              onClick={() => performSearch(searchQuery)}
              disabled={isSearching || !searchQuery.trim()}
              className="rounded-r-none bg-primary/90 hover:bg-primary"
            >
              {isSearching ? (
                <>
                  جاري البحث...
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-0 ml-2" />
                </>
              ) : (
                <>
                  بحث
                  <Search className="h-4 w-4 mr-0 ml-2" />
                </>
              )}
            </Button>
            <div className="relative flex-grow">
              <Input
                placeholder="ابحث في القرآن الكريم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pr-10 rounded-l-none h-full"
                disabled={isSearching}
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="مسح البحث"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="flex flex-col gap-2 pt-2 border-t border-border/30">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  عمليات البحث الأخيرة:
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearRecentSearches}
                  className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  مسح الكل
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="pr-1 pl-2 py-1 cursor-pointer hover:bg-primary/10 transition-colors flex items-center gap-1"
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
                      className="h-4 w-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10"
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
        </div>
      </div>

      {/* Results section */}
      {isSearching ? (
        <div className="text-center py-12 bg-card/50 rounded-lg border shadow-sm">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 opacity-70" />
          <p className="text-muted-foreground">
            جاري البحث في القرآن الكريم...
          </p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
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
                className="bg-card border rounded-lg overflow-hidden transition-all hover:shadow-md group"
              >
                <div className="bg-muted/30 p-3 flex justify-between items-center border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span
                        className="font-medium hover:text-primary transition-colors cursor-pointer"
                        onClick={() => navigateToSurah(ayah.sura_no)}
                      >
                        {ayah.sura_name_ar}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        الآية {ayah.aya_no}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary hover:bg-primary/5 border-primary/20"
                    onClick={() => navigateToAyah(ayah.sura_no, ayah.aya_no)}
                  >
                    الانتقال إلى الآية
                  </Button>
                </div>
                <div className="p-5 bg-gradient-to-b from-muted/10 to-transparent">
                  <p
                    className="text-right font-arabic text-xl leading-loose"
                    dir="rtl"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchText(ayah.aya_text, searchQuery),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : searchQuery && !isSearching ? (
        <div className="text-center py-12 bg-card/50 rounded-lg border border-dashed">
          <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-xl text-muted-foreground mb-2">
            لم يتم العثور على نتائج
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;، يرجى تجربة
            كلمات بحث مختلفة
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={clearSearch}
            className="mt-4 border-primary/20"
          >
            مسح البحث
          </Button>
        </div>
      ) : (
        <div className="text-center py-16 bg-card/50 rounded-lg border border-dashed">
          <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-xl text-muted-foreground mb-2">
            ابحث في القرآن الكريم
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            اكتب كلمة أو عبارة للبحث عنها في القرآن الكريم
          </p>
        </div>
      )}
    </div>
  );
}

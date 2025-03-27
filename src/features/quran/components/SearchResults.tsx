"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Ayah } from "../types/quran-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchResultsProps {
  searchFunction: (text: string) => Ayah[];
}

export function SearchResults({ searchFunction }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Ayah[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  // Cache recent searches in localStorage
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

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(
      0,
      5
    );
    setRecentSearches(updated);

    try {
      localStorage.setItem("quranRecentSearches", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save recent searches", e);
    }
  };

  const performSearch = useCallback(
    (query: string) => {
      if (query.trim().length === 0) return;

      setIsSearching(true);
      try {
        // Simulate some delay to show loading state (can be removed in production)
        setTimeout(() => {
          const searchResults = searchFunction(query);
          setResults(searchResults);
          setIsSearching(false);
          saveRecentSearch(query);
        }, 500);
      } catch (error) {
        console.error("Search error:", error);
        setIsSearching(false);
      }
    },
    [searchFunction]
  );

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      performSearch(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const highlightSearchText = (text: string, query: string) => {
    if (!query.trim()) return text;

    try {
      const regex = new RegExp(`(${query})`, "gi");
      return text.replace(
        regex,
        '<mark class="bg-primary/20 px-0.5 rounded">$1</mark>'
      );
    } catch (e) {
      return text;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Enhanced search bar */}
      <Card className="p-3 border-primary/20 shadow-md">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row-reverse gap-2">
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="rounded-r-none"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <SearchIcon className="h-4 w-4 mr-2" />
              )}
              {isSearching ? "جاري البحث..." : "بحث"}
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
              <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
              <span className="text-sm text-muted-foreground ml-2">
                عمليات البحث الأخيرة:
              </span>
              {recentSearches.map((query, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleRecentSearchClick(query)}
                >
                  {query}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Results section with better loading state */}
      {isSearching ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            جاري البحث في القرآن الكريم...
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            نتائج البحث
            <Badge variant="secondary" className="mr-2">
              {results.length}
            </Badge>
          </h2>
          <div className="space-y-6">
            {results.map((ayah) => (
              <Card
                key={ayah.id}
                className="overflow-hidden transition-all hover:shadow-md group"
              >
                <div className="bg-muted/30 p-3 flex justify-between items-center border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <Link
                        href={`/quran/${ayah.sura_no}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {ayah.sura_name_ar}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        الآية {ayah.aya_no}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/quran/${ayah.sura_no}?highlight=${ayah.aya_no}`}
                    className="text-sm text-primary hover:underline bg-primary/5 px-3 py-1 rounded-full transition-colors hover:bg-primary/10"
                  >
                    الانتقال إلى الآية
                  </Link>
                </div>
                <div className="p-4">
                  <p
                    className="text-right font-arabic text-xl leading-loose"
                    dir="rtl"
                    dangerouslySetInnerHTML={{
                      __html: highlightSearchText(ayah.aya_text, searchQuery),
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : searchQuery && !isSearching ? (
        <Card className="text-center py-12 border-dashed">
          <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-xl text-muted-foreground mb-2">
            لم يتم العثور على نتائج
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;، يرجى تجربة
            كلمات بحث مختلفة
          </p>
        </Card>
      ) : (
        <Card className="text-center py-12 border-dashed bg-muted/5">
          <SearchIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-xl text-muted-foreground mb-2">
            ابحث في القرآن الكريم
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            اكتب كلمة أو عبارة للبحث عنها في القرآن الكريم
          </p>
        </Card>
      )}
    </div>
  );
}

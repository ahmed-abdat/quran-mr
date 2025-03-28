"use client";

import { useState, useMemo } from "react";
import { Juz } from "@/features/quran/types";
import { useQuranNavigation } from "@/features/quran/hooks/useQuranNavigation";
import { SearchBar } from "../ui";

interface JuzListViewProps {
  juzs: Juz[];
}

/**
 * JuzListView component
 * Displays a list of all juzs with search functionality
 */
export function JuzListView({ juzs }: JuzListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { navigateToJuz } = useQuranNavigation();

  // Filter juzs based on search query
  const filteredJuzs = useMemo(() => {
    return juzs.filter(
      (juz) =>
        juz.name_arabic.includes(searchQuery) ||
        juz.id.toString().includes(searchQuery)
    );
  }, [juzs, searchQuery]);

  const handleJuzSelect = (juzId: number) => {
    navigateToJuz(juzId);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <h1 className="text-2xl font-medium">الأجزاء</h1>
      </div>

      {/* Search box */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="البحث عن جزء..."
      />

      {/* Juz list */}
      <div className="border rounded-lg overflow-hidden">
        <div className="divide-y">
          {filteredJuzs.map((juz) => (
            <div
              key={juz.id}
              className="py-4 px-4 cursor-pointer hover:bg-muted/5 transition-colors"
              onClick={() => handleJuzSelect(juz.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {juz.id}
                  </div>

                  <div>
                    <h3 className="font-medium">Juz {juz.id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Starts from Surah {juz.startSurah}, Ayah {juz.startAyah}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="font-arabic text-lg">{juz.name_arabic}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No results message */}
      {filteredJuzs.length === 0 && (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

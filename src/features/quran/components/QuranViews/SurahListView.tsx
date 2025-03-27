"use client";

import { useState } from "react";
import { Surah } from "../../types/quran-types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface SurahListViewProps {
  surahs: Surah[];
  onSurahSelect: (surahId: number) => void;
}

/**
 * SurahListView component
 * Displays a list of all surahs with search functionality
 */
export function SurahListView({ surahs, onSurahSelect }: SurahListViewProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter surahs based on search query
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name_arabic.includes(searchQuery) ||
      surah.id.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Search box */}
      <Card className="p-3 border">
        <div className="relative">
          <Input
            placeholder="البحث عن سورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </Card>

      {/* Surah grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredSurahs.map((surah) => (
          <Card
            key={surah.id}
            className="overflow-hidden cursor-pointer hover:bg-muted/20 transition-colors border"
            onClick={() => onSurahSelect(surah.id)}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex-1 text-right">
                <h3 className="font-surah-names text-2xl leading-tight">
                  {surah.name_arabic}
                </h3>
              </div>
              <Badge
                variant="outline"
                className="h-8 w-8 rounded-full flex items-center justify-center text-primary font-medium"
              >
                {surah.id}
              </Badge>
            </div>
            <CardContent className="py-3 px-4 text-sm text-muted-foreground bg-accent/5">
              <div className="flex justify-end">
                <span className="text-xs">{surah.ayahs.length} آية</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredSurahs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            لم يتم العثور على نتائج لـ &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

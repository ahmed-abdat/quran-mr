"use client";

import { useState } from "react";
import Link from "next/link";
import { Surah } from "../types/quran-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface SurahListProps {
  surahs: Surah[];
}

export function SurahList({ surahs }: SurahListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();

  // Filter surahs based on search query
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name_arabic.includes(searchQuery) ||
      surah.id.toString().includes(searchQuery)
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full space-y-6">
      <div className="bg-accent rounded-lg p-4 shadow-sm flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            placeholder="البحث عن سورة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="w-10 h-10 flex-shrink-0"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <Link key={surah.id} href={`/quran/${surah.id}`} className="block">
            <div className="bg-card border rounded-lg p-4 transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] shadow-sm hover:shadow-md">
              <div className="flex justify-between items-center">
                <div className="text-right">
                  <p className="text-2xl font-arabic">{surah.name_arabic}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {surah.ayahs.length} آية
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary text-primary-foreground shadow-sm">
                    {surah.id}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

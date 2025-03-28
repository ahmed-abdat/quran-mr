"use client";

import { useState, useEffect } from "react";
import quranRawData from "@/data/quran.json";
import { Surah, Ayah } from "@/features/quran/types";

// This hook loads and processes Quran data from the JSON file
export function useQuranData() {
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Process the raw data on component mount
  useEffect(() => {
    try {
      // Transform the flat array into structured surahs
      const processedData = processQuranData(quranRawData);
      setAllSurahs(processedData.surahs);
      setIsLoading(false);
    } catch (err) {
      console.error("Error processing Quran data:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to process Quran data")
      );
      setIsLoading(false);
    }
  }, []);

  // Navigation helper functions
  const getSurahIndex = (surahId: number | undefined): number => {
    if (!surahId) return -1;
    return allSurahs.findIndex((s) => s.id === surahId);
  };

  const getPrevSurah = (surahId: number | undefined): number | undefined => {
    const surahIndex = getSurahIndex(surahId);
    if (surahIndex <= 0) return undefined;
    return allSurahs[surahIndex - 1].id;
  };

  const getNextSurah = (surahId: number | undefined): number | undefined => {
    const surahIndex = getSurahIndex(surahId);
    if (surahIndex < 0 || surahIndex >= allSurahs.length - 1) return undefined;
    return allSurahs[surahIndex + 1].id;
  };

  return {
    allSurahs,
    isLoading,
    error,
    getPrevSurah,
    getNextSurah,
  };
}

// Helper function to transform the raw data into structured format
function processQuranData(rawData: any[]): { surahs: Surah[] } {
  // Group by surah number
  const surahsMap = new Map<number, any[]>();

  // First pass: group ayahs by surah
  for (const ayah of rawData) {
    // Group ayahs by surah
    if (!surahsMap.has(ayah.sura_no)) {
      surahsMap.set(ayah.sura_no, []);
    }
    surahsMap.get(ayah.sura_no)?.push(ayah);
  }

  // Create surah objects
  const surahs: Surah[] = [];
  for (const [surahId, ayahs] of surahsMap.entries()) {
    if (ayahs.length > 0) {
      const firstAyah = ayahs[0];

      // Process ayahs
      const processedAyahs: Ayah[] = ayahs.map((ayah) => ({
        id: ayah.id,
        sura_no: ayah.sura_no,
        sura_name_ar: ayah.sura_name_ar,
        sura_name_en: ayah.sura_name_en,
        page: parseInt(ayah.page),
        aya_no: ayah.aya_no,
        aya_text: ayah.aya_text,
      }));

      // Create surah object
      surahs.push({
        id: surahId,
        name_arabic: firstAyah.sura_name_ar,
        name_english: firstAyah.sura_name_en,
        name_english_translation: firstAyah.sura_name_en, // Using the same as English name for now
        revelation_type: surahId === 9 ? "Medinan" : "Meccan", // This is simplified, should come from actual data
        verses_count: ayahs.length,
        page: parseInt(firstAyah.page),
        ayahs: processedAyahs,
      });
    }
  }

  // Sort surahs by ID
  surahs.sort((a, b) => a.id - b.id);

  return { surahs };
}

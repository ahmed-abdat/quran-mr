/**
 * useQuranData Hook
 *
 * Manages Quran data loading and navigation, providing:
 * 1. Structured Quran data access
 * 2. Loading and error states
 * 3. Navigation helpers for surahs
 *
 * Features:
 * - Efficient data processing
 * - Type-safe data structures
 * - Error handling
 * - Navigation utilities
 *
 * @example
 * ```tsx
 * const {
 *   allSurahs,
 *   isLoading,
 *   error,
 *   getPrevSurah,
 *   getNextSurah,
 * } = useQuranData();
 * ```
 */

"use client";

import { useState, useEffect } from "react";
import quranRawData from "@/data/quran.json";
import { Surah, Ayah } from "@/features/quran/types";

/**
 * Transform raw Quran data into structured format
 * @param rawData - Raw Quran data from JSON
 */
function processQuranData(rawData: any[]): { surahs: Surah[] } {
  // Group ayahs by surah number
  const surahsMap = new Map<number, any[]>();
  rawData.forEach((ayah) => {
    if (!surahsMap.has(ayah.sura_no)) {
      surahsMap.set(ayah.sura_no, []);
    }
    surahsMap.get(ayah.sura_no)?.push(ayah);
  });

  // Create structured surah objects
  const surahs: Surah[] = Array.from(surahsMap.entries()).map(
    ([surahId, ayahs]) => {
      const firstAyah = ayahs[0];

      // Process ayahs with proper typing
      const processedAyahs: Ayah[] = ayahs.map((ayah) => ({
        id: ayah.id,
        sura_no: ayah.sura_no,
        sura_name_ar: ayah.sura_name_ar,
        sura_name_en: ayah.sura_name_en,
        page: parseInt(ayah.page),
        aya_no: ayah.aya_no,
        aya_text: ayah.aya_text,
      }));

      return {
        id: surahId,
        name_arabic: firstAyah.sura_name_ar,
        name_english: firstAyah.sura_name_en,
        name_english_translation: firstAyah.sura_name_en,
        revelation_type: surahId === 9 ? "Medinan" : "Meccan", // TODO: Add proper revelation type data
        verses_count: ayahs.length,
        page: parseInt(firstAyah.page),
        ayahs: processedAyahs,
      };
    }
  );

  // Sort surahs by ID for consistent order
  return { surahs: surahs.sort((a, b) => a.id - b.id) };
}

export function useQuranData() {
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Process Quran data on mount
  useEffect(() => {
    try {
      const { surahs } = processQuranData(quranRawData);
      setAllSurahs(surahs);
    } catch (err) {
      console.error("Error processing Quran data:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to process Quran data")
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get the index of a surah by its ID
   * @param surahId - The ID of the surah
   */
  const getSurahIndex = (surahId: number | undefined): number => {
    if (!surahId) return -1;
    return allSurahs.findIndex((s) => s.id === surahId);
  };

  /**
   * Get the previous surah's ID
   * @param surahId - Current surah ID
   */
  const getPrevSurah = (surahId: number | undefined): number | undefined => {
    const surahIndex = getSurahIndex(surahId);
    return surahIndex > 0 ? allSurahs[surahIndex - 1].id : undefined;
  };

  /**
   * Get the next surah's ID
   * @param surahId - Current surah ID
   */
  const getNextSurah = (surahId: number | undefined): number | undefined => {
    const surahIndex = getSurahIndex(surahId);
    return surahIndex >= 0 && surahIndex < allSurahs.length - 1
      ? allSurahs[surahIndex + 1].id
      : undefined;
  };

  return {
    // Data
    allSurahs,
    isLoading,
    error,

    // Navigation helpers
    getPrevSurah,
    getNextSurah,
  };
}

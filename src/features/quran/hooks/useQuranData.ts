"use client";

import { useState, useEffect } from "react";
import quranRawData from "@/data/quran.json";
import { Surah, Juz, Ayah } from "@/features/quran/types";

// This hook loads and processes Quran data from the JSON file
export function useQuranData() {
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [allJuzs, setAllJuzs] = useState<Juz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Process the raw data on component mount
  useEffect(() => {
    try {
      // Transform the flat array into structured surahs and juzs
      const processedData = processQuranData(quranRawData);
      setAllSurahs(processedData.surahs);
      setAllJuzs(processedData.juzs);
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

  // Get Juz data
  const getJuzByNumber = (juzNumber: number): Juz | undefined => {
    return allJuzs.find((j) => j.id === juzNumber);
  };

  // Find which Juz contains a specific surah and ayah
  const getJuzByPosition = (
    surahId: number,
    ayahId: number
  ): Juz | undefined => {
    for (const juz of allJuzs) {
      // If surah is between start and end surah
      if (surahId > juz.startSurah && surahId < juz.endSurah) {
        return juz;
      }

      // If this is the start surah and the ayah is after or at the start
      if (surahId === juz.startSurah && ayahId >= juz.startAyah) {
        if (surahId === juz.endSurah) {
          return ayahId <= juz.endAyah ? juz : undefined;
        }
        return juz;
      }

      // If this is the end surah and the ayah is before or at the end
      if (surahId === juz.endSurah && ayahId <= juz.endAyah) {
        if (surahId === juz.startSurah) {
          return ayahId >= juz.startAyah ? juz : undefined;
        }
        return juz;
      }
    }

    return undefined;
  };

  return {
    allSurahs,
    allJuzs,
    isLoading,
    error,
    getPrevSurah,
    getNextSurah,
    getJuzByNumber,
    getJuzByPosition,
  };
}

// Helper function to transform the raw data into structured format
function processQuranData(rawData: any[]): { surahs: Surah[]; juzs: Juz[] } {
  // Group by surah number
  const surahsMap = new Map<number, any[]>();
  const juzMap = new Map<
    number,
    {
      startSurah: number;
      startAyah: number;
      endSurah: number;
      endAyah: number;
      page: number;
    }
  >();

  // First pass: group ayahs by surah and collect juz information
  for (const ayah of rawData) {
    // Group ayahs by surah
    if (!surahsMap.has(ayah.sura_no)) {
      surahsMap.set(ayah.sura_no, []);
    }
    surahsMap.get(ayah.sura_no)?.push(ayah);

    // Collect juz information
    if (!juzMap.has(ayah.jozz)) {
      juzMap.set(ayah.jozz, {
        startSurah: ayah.sura_no,
        startAyah: ayah.aya_no,
        endSurah: ayah.sura_no,
        endAyah: ayah.aya_no,
        page: parseInt(ayah.page),
      });
    } else {
      const juzInfo = juzMap.get(ayah.jozz)!;
      // Update end surah/ayah
      juzInfo.endSurah = ayah.sura_no;
      juzInfo.endAyah = ayah.aya_no;
    }
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
        juz: ayah.jozz,
        // Additional fields required by Ayah type
        translation: "", // Empty for now
        footnotes: [],
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

  // Create juz objects with proper Arabic naming
  const juzs: Juz[] = [];

  // Arabic numeral names
  const arabicNumerals = [
    "الأول",
    "الثاني",
    "الثالث",
    "الرابع",
    "الخامس",
    "السادس",
    "السابع",
    "الثامن",
    "التاسع",
    "العاشر",
    "الحادي عشر",
    "الثاني عشر",
    "الثالث عشر",
    "الرابع عشر",
    "الخامس عشر",
    "السادس عشر",
    "السابع عشر",
    "الثامن عشر",
    "التاسع عشر",
    "العشرون",
    "الحادي والعشرون",
    "الثاني والعشرون",
    "الثالث والعشرون",
    "الرابع والعشرون",
    "الخامس والعشرون",
    "السادس والعشرون",
    "السابع والعشرون",
    "الثامن والعشرون",
    "التاسع والعشرون",
    "الثلاثون",
  ];

  for (const [juzId, info] of juzMap.entries()) {
    // Get the Arabic name for this juz
    const arabicName = arabicNumerals[juzId - 1] || `${juzId}`;

    juzs.push({
      id: juzId,
      name_arabic: `الجزء ${arabicName}`,
      startSurah: info.startSurah,
      startAyah: info.startAyah,
      endSurah: info.endSurah,
      endAyah: info.endAyah,
      page: info.page,
    });
  }

  // Sort juzs by ID
  juzs.sort((a, b) => a.id - b.id);

  return { surahs, juzs };
}

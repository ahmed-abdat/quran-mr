import quranData from "@/data/quran.json";
import { Ayah, Surah, QuranData } from "../types/quran-types";

/**
 * Converts the raw Quran data into a more structured format organized by surahs
 */
export function getStructuredQuranData(): QuranData {
  // Type assertion as any first since we know the structure
  const rawData = quranData as any[];

  // Group the ayahs by surah number
  const surahMap = new Map<number, Ayah[]>();
  const allAyahs: Ayah[] = [];

  rawData.forEach((ayah) => {
    const suraNo = ayah.sura_no;
    if (!surahMap.has(suraNo)) {
      surahMap.set(suraNo, []);
    }

    // Add to both the surah map and all ayahs array
    const typedAyah = ayah as Ayah;
    surahMap.get(suraNo)?.push(typedAyah);
    allAyahs.push(typedAyah);
  });

  // Create the surahs array
  const surahs: Surah[] = [];

  surahMap.forEach((ayahs, suraNo) => {
    // All ayahs in a surah have the same surah name
    const firstAyah = ayahs[0];

    surahs.push({
      id: suraNo,
      name_arabic: firstAyah.sura_name_ar,
      name_english: firstAyah.sura_name_en,
      name_english_translation: firstAyah.sura_name_en, // Using same value for now
      revelation_type: "Meccan", // Default, could be enhanced with actual data
      verses_count: ayahs.length,
      page: parseInt(firstAyah.page.toString()),
      ayahs: ayahs.sort((a, b) => a.aya_no - b.aya_no), // Sort by ayah number
    });
  });

  // Sort surahs by their number
  return {
    surahs: surahs.sort((a, b) => a.id - b.id),
    ayahs: allAyahs,
  };
}

/**
 * Get all surahs in the Quran
 */
export function getAllSurahs(): Surah[] {
  return getStructuredQuranData().surahs;
}

/**
 * Get a specific surah by its id
 */
export function getSurahById(id: number): Surah | undefined {
  return getStructuredQuranData().surahs.find((surah) => surah.id === id);
}

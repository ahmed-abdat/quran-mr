import { Ayah, Surah } from "../types/quran-types";
import { getStructuredQuranData } from "./quran-data";

/**
 * Get all surahs in the Quran
 */
export function getAllSurahs(): Surah[] {
  return getStructuredQuranData().surahs;
}

/**
 * Get a specific surah by its number
 */
export function getSurahByNumber(number: number): Surah | undefined {
  return getStructuredQuranData().surahs.find(
    (surah) => surah.number === number
  );
}

/**
 * Search for ayahs containing the given text
 */
export function searchAyahs(searchText: string): Ayah[] {
  const results: Ayah[] = [];
  const data = getStructuredQuranData();

  // Simple search implementation
  data.surahs.forEach((surah) => {
    surah.ayahs.forEach((ayah) => {
      if (ayah.aya_text.includes(searchText)) {
        results.push(ayah);
      }
    });
  });

  return results;
}

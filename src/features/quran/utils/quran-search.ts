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
  return getStructuredQuranData().surahs.find((surah) => surah.id === number);
}

/**
 * Normalize Arabic text by removing diacritics/tashkeel for more flexible searching
 * This allows matching regardless of harakat (fatha, damma, kasra, etc.)
 */
function normalizeArabicText(text: string): string {
  // Remove Arabic diacritics/tashkeel
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "") // Remove tashkeel (fatha, damma, kasra, etc.)
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();
}

/**
 * Search for ayahs containing the given text
 * Implements better text matching with support for Arabic text nuances
 */
export function searchAyahs(searchText: string): Ayah[] {
  if (!searchText || searchText.trim().length === 0) {
    return [];
  }

  const results: Ayah[] = [];
  const data = getStructuredQuranData();

  // Normalize the search text for better matching
  const normalizedSearchText = normalizeArabicText(searchText.trim());

  // Cache for already processed ayah texts to improve performance
  const normalizedTextCache = new Map<number, string>();

  // Enhanced search implementation with better matching
  data.surahs.forEach((surah) => {
    surah.ayahs.forEach((ayah) => {
      // Use cached normalized text if available
      let normalizedAyahText = normalizedTextCache.get(ayah.id);
      if (!normalizedAyahText) {
        normalizedAyahText = normalizeArabicText(ayah.aya_text);
        normalizedTextCache.set(ayah.id, normalizedAyahText);
      }

      // Check if the normalized ayah text includes the normalized search text
      if (normalizedAyahText.includes(normalizedSearchText)) {
        results.push(ayah);
      }
    });
  });

  return results;
}

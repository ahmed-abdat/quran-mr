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

  rawData.forEach((ayah) => {
    const suraNo = ayah.sura_no;
    if (!surahMap.has(suraNo)) {
      surahMap.set(suraNo, []);
    }
    surahMap.get(suraNo)?.push(ayah as Ayah);
  });

  // Create the surahs array
  const surahs: Surah[] = [];

  surahMap.forEach((ayahs, suraNo) => {
    // All ayahs in a surah have the same surah name
    const firstAyah = ayahs[0];

    surahs.push({
      number: suraNo,
      name_en: firstAyah.sura_name_en,
      name_ar: firstAyah.sura_name_ar,
      ayahs: ayahs.sort((a, b) => a.aya_no - b.aya_no), // Sort by ayah number
    });
  });

  // Sort surahs by their number
  return {
    surahs: surahs.sort((a, b) => a.number - b.number),
  };
}

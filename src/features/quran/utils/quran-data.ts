import quranData from "@/data/quran.json";
import { Ayah, Surah, QuranData, RawAyahData } from "@/features/quran/types";

/**
 * Converts the raw Quran data into a more structured format organized by surahs
 */
export function getStructuredQuranData(): QuranData {
  // Type assertion with the proper type
  const rawData = quranData as RawAyahData[];

  // Group the ayahs by surah number
  const surahMap = new Map<number, Ayah[]>();
  const allAyahs: Ayah[] = [];

  rawData.forEach((ayah) => {
    const suraNo = ayah.sura_no;
    if (!surahMap.has(suraNo)) {
      surahMap.set(suraNo, []);
    }

    // Convert raw ayah to typed Ayah
    const typedAyah: Ayah = {
      id: ayah.id,
      sura_no: ayah.sura_no,
      sura_name_ar: ayah.sura_name_ar,
      sura_name_en: ayah.sura_name_en,
      page: typeof ayah.page === "string" ? parseInt(ayah.page) : ayah.page,
      aya_no: ayah.aya_no,
      aya_text: ayah.aya_text,
    };

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
      verses_count: ayahs.length,
      page: firstAyah.page,
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

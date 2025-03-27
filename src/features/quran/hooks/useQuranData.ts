import { useMemo } from "react";
import { Surah, Ayah } from "../types/quran-types";
import { getStructuredQuranData } from "../utils/quran-data";

/**
 * Custom hook for managing Quran data
 * Centralizes data access and basic operations on the Quran dataset
 */
export function useQuranData() {
  // Get Quran data once and memoize it
  const quranData = useMemo(() => getStructuredQuranData(), []);

  /**
   * Get a specific surah by its number
   */
  const getSurah = (surahId: number | undefined): Surah | undefined => {
    if (!surahId) return undefined;
    return quranData.surahs.find((surah) => surah.id === surahId);
  };

  /**
   * Get the index of a surah in the list
   */
  const getSurahIndex = (surahId: number | undefined): number => {
    if (!surahId) return -1;
    return quranData.surahs.findIndex((s) => s.id === surahId);
  };

  /**
   * Get the previous surah number if available
   */
  const getPrevSurah = (surahId: number | undefined): number | undefined => {
    const surahIndex = getSurahIndex(surahId);
    if (surahIndex <= 0) return undefined;
    return quranData.surahs[surahIndex - 1].id;
  };

  /**
   * Get the next surah number if available
   */
  const getNextSurah = (surahId: number | undefined): number | undefined => {
    const surahIndex = getSurahIndex(surahId);
    if (surahIndex < 0 || surahIndex >= quranData.surahs.length - 1)
      return undefined;
    return quranData.surahs[surahIndex + 1].id;
  };

  /**
   * Filter surahs by name or number
   */
  const filterSurahs = (query: string): Surah[] => {
    return quranData.surahs.filter(
      (surah) =>
        surah.name_arabic.includes(query) || surah.id.toString().includes(query)
    );
  };

  /**
   * Get a specific ayah by surah number and ayah number
   */
  const getAyah = (surahId: number, ayahId: number): Ayah | undefined => {
    const surah = getSurah(surahId);
    if (!surah) return undefined;
    return surah.ayahs.find((ayah) => ayah.aya_no === ayahId);
  };

  /**
   * Get paginated ayahs for a surah
   */
  const getPaginatedAyahs = (
    surah: Surah | undefined,
    page: number,
    itemsPerPage: number
  ): Ayah[] => {
    if (!surah) return [];

    const totalPages = Math.ceil(surah.ayahs.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = Math.min(startIdx + itemsPerPage, surah.ayahs.length);

    return surah.ayahs.slice(startIdx, endIdx);
  };

  return {
    quranData,
    getSurah,
    getSurahIndex,
    getPrevSurah,
    getNextSurah,
    filterSurahs,
    getAyah,
    getPaginatedAyahs,
    allSurahs: quranData.surahs,
  };
}

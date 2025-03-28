/**
 * Core data structure types for the Quran application
 */

/**
 * Represents a single ayah (verse) in the Quran
 */
export interface Ayah {
  id: number;
  sura_no: number;
  sura_name_ar: string;
  sura_name_en: string;
  page: number;
  aya_no: number;
  aya_text: string;
  aya_text_emlaey?: string;
  juz?: number;
}

/**
 * Represents a surah (chapter) in the Quran
 */
export interface Surah {
  id: number;
  name_arabic: string;
  name_english: string;
  name_english_translation: string;
  revelation_type: "Meccan" | "Medinan";
  verses_count: number;
  page: number;
  ayahs: Ayah[];
}

/**
 * Represents a juz (part) of the Quran
 */
export interface Juz {
  id: number;
  name_arabic: string;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  page: number;
}

/**
 * Complete Quran data structure
 */
export interface QuranData {
  surahs: Surah[];
  ayahs: Ayah[];
  juzs?: Juz[];
}

/**
 * UI and Navigation types
 */

/**
 * Available view modes in the Quran application
 */
export type QuranView =
  | "surah-list"
  | "surah-view"
  | "search"
  | "juz-list"
  | "settings";

/**
 * Available reading view modes
 */
export type ReadingMode = "page" | "surah" | "juz" | "continuous";

/**
 * Settings for Quran display
 */
export interface QuranSettings {
  fontSize: number;
  readingMode: ReadingMode;
}

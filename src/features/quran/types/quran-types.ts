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
 * Complete Quran data structure
 */
export interface QuranData {
  surahs: Surah[];
  ayahs: Ayah[];
}

/**
 * UI and Navigation types
 */

/**
 * Available view modes in the Quran application
 */
export type QuranView = "surah-list" | "surah-view" | "search" | "settings";

/**
 * Available display modes for reading
 */
export type DisplayMode = "continuous" | "separate";

/**
 * Settings for Quran display
 */
export interface QuranSettings {
  fontSize: number;
  displayMode: DisplayMode;
}

/**
 * Specific error types for Quran application
 * Used for consistent error handling across the application
 */
export type QuranError =
  | { type: "SURAH_NOT_FOUND"; id: number }
  | { type: "AYAH_NOT_FOUND"; surahId: number; ayahId: number }
  | { type: "INVALID_NAVIGATION"; from: QuranView; to: QuranView }
  | { type: "DATA_PROCESSING_ERROR"; message: string };

/**
 * Type guard for validating surah IDs
 */
export const isSurahId = (id: number): boolean => {
  return id > 0 && id <= 114;
};

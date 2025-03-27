/**
 * Type definitions for the Quran data structures
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
  translation?: string;
  footnotes?: string[];
}

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

export interface QuranData {
  surahs: Surah[];
  ayahs: Ayah[];
}

export type QuranAction =
  | { type: "NAVIGATE_TO_SURAH"; payload: { surahId: number } }
  | { type: "NAVIGATE_TO_AYAH"; payload: { surahId: number; ayahId: number } }
  | { type: "NAVIGATE_TO_SEARCH" }
  | { type: "NAVIGATE_TO_SURAH_LIST" }
  | { type: "SET_FONT_SIZE"; payload: number }
  | { type: "SET_VIEW_MODE"; payload: string }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "TOGGLE_TRANSLATION" }
  | { type: "SEARCH"; payload: string }
  | { type: "SET_SEARCH_RESULTS"; payload: Ayah[] };

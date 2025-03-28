/**
 * Core Types for the Mushaf Application
 */

// Raw Data Types
export interface RawAyahData {
  id: number;
  sura_no: number;
  sura_name_ar: string;
  sura_name_en: string;
  page: string | number;
  aya_no: number;
  aya_text: string;
}

// View Types
export type QuranView = "surah-list" | "surah-view" | "search" | "settings";

// Data Types
export interface Ayah {
  id: number;
  sura_no: number;
  sura_name_ar: string;
  sura_name_en: string;
  page: number;
  aya_no: number;
  aya_text: string;
}

export interface Surah {
  id: number;
  name_arabic: string;
  name_english: string;
  name_english_translation: string;
  verses_count: number;
  page: number;
  ayahs: Ayah[];
}

export interface QuranData {
  surahs: Surah[];
  ayahs: Ayah[];
}

// Error Types
export type QuranError =
  | {
      type: "SURAH_NOT_FOUND";
      id: number;
    }
  | {
      type: "AYAH_NOT_FOUND";
      surahId: number;
      ayahId: number;
    }
  | {
      type: "INVALID_NAVIGATION";
      from: QuranView;
      to: QuranView;
    }
  | {
      type: "DATA_PROCESSING_ERROR";
      message: string;
    };

// Type Guards
export function isSurahId(id: number): boolean {
  return id >= 1 && id <= 114;
}

export function isAyahId(surahId: number, ayahId: number): boolean {
  // Basic validation - would need actual surah length data for proper validation
  return ayahId >= 1 && ayahId <= 286; // 286 is the longest surah
}

// Settings Types
export interface MushafSettings {
  fontSize: number;
  displayMode: "separate" | "continuous";
  isUIVisible: boolean;
}

// Navigation Types
export interface MushafNavigation {
  activeView: QuranView;
  activeSurahId?: number;
  activeAyahId?: number;
}

// Search Types
export interface SearchResult {
  ayah: Ayah;
  matchStart: number;
  matchEnd: number;
  highlightedText: string;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  recentSearches: string[];
}

// Export components
export { SurahView } from "./components/SurahView";
export { SurahList } from "./components/SurahList";
export { SearchResults } from "./components/SearchResults";

// Export types
export type { Ayah, Surah, QuranData } from "./types/quran-types";

// Export utilities
export { getStructuredQuranData } from "./utils/quran-data";

export {
  getAllSurahs,
  getSurahByNumber,
  searchAyahs,
} from "./utils/quran-search";

/**
 * Quran feature module - Public API
 * This file exports all public components, hooks, and types for the Quran feature
 */

// Main containers
export { QuranContainer } from "./components/containers/QuranContainer";
export { QuranViewRouter } from "./components/containers/QuranViewRouter";

// View components
export { SurahListView } from "./components/views/SurahListView";
export { SurahView } from "./components/views/SurahView";
export { SearchView } from "./components/views/SearchView";
export { JuzListView } from "./components/views/JuzListView";

// Layout components
export { BottomBar } from "./components/layouts/BottomBar";
export { QuranLayout } from "./components/layouts/QuranLayout";
export { NavigationBar } from "./components/layouts/NavigationBar";

// UI components
export { AyahRenderer } from "./components/ui/AyahRenderer";
export { Basmala } from "./components/ui/Basmala";
export { SearchBar } from "./components/ui/SearchBar";
export { SurahHeader } from "./components/ui/SurahHeader";

// Hooks
export { useQuranData } from "./hooks/useQuranData";
export { useQuranNavigation } from "./hooks/useQuranNavigation";
export { useQuranSearch } from "./hooks/useQuranSearch";
export { useQuranSettings } from "./hooks/useQuranSettings";

// Store
export { useQuranStore } from "./store/useQuranStore";

// Utils
export { getStructuredQuranData } from "./utils/quran-data";
export { searchAyahs } from "./utils/quran-search";

// Types - re-export from types module
export * from "./types";

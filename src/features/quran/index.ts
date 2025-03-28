/**
 * Quran Feature Module
 *
 * This module exports all components, hooks, and utilities for the Quran feature.
 * The exports are organized by their role in the application:
 *
 * 1. Containers - High-level components that manage state and data flow
 * 2. Routing - Components that handle view management and navigation
 * 3. Layout - Components that provide the UI structure
 * 4. Views - Individual feature views/pages
 * 5. UI - Reusable UI components
 * 6. Hooks - Custom hooks for data and functionality
 * 7. Store - State management
 * 8. Utils - Helper functions and utilities
 * 9. Types - TypeScript types and interfaces
 */

// Containers
export { QuranContainer } from "./components/containers/QuranContainer";
export { QuranInitializer } from "./components/containers/QuranInitializer";

// Routing
export { QuranRouter } from "./components/routing/QuranRouter";

// Layout components
export { QuranLayout } from "./components/layouts/QuranLayout";
export { NavigationBar } from "./components/layouts/NavigationBar";
export { BottomBar } from "./components/layouts/BottomBar";

// View components
export { SurahListView } from "./components/views/SurahListView";
export { SurahView } from "./components/views/SurahView";
export { SearchView } from "./components/views/SearchView";
export { SettingsView } from "./components/views/SettingsView";

// UI components
export { AyahRenderer } from "./components/ui/AyahRenderer";
export { Basmala } from "./components/ui/Basmala";
export { SearchBar } from "./components/ui/SearchBar";
export { SurahHeader } from "./components/ui/SurahHeader";

// Hooks
export { useQuranData } from "./hooks/useQuranData";
export { useQuranNavigation } from "./hooks/useQuranNavigation";

// Store
export { useQuranNavigationStore } from "./store/useQuranNavigationStore";
export { useQuranSettingsStore } from "./store/useQuranSettingsStore";
export { useQuranSearchStore } from "./store/useQuranSearchStore";

// Utils
export { getStructuredQuranData } from "./utils/quran-data";
export { searchAyahs } from "./utils/quran-search";
export { handleQuranError } from "./utils/error-handling";

// Types
export * from "./types";

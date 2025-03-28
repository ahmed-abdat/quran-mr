import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuranView, ReadingMode } from "@/features/quran/types";

/**
 * Quran application state managed through Zustand
 * Handles UI state, navigation, and user preferences
 */
interface QuranState {
  // Navigation
  activeSurahId: number | undefined;
  activeAyahId: number | undefined;
  activeView: QuranView;

  // UI settings
  fontSize: number;
  isUIVisible: boolean;
  readingMode: ReadingMode;
  displayMode: "continuous" | "separate";

  // Actions - Navigation
  setActiveSurah: (id: number | undefined) => void;
  setActiveAyah: (id: number | undefined) => void;
  setActiveView: (view: QuranView) => void;

  // Actions - UI
  toggleUIVisibility: () => void;
  toggleDisplayMode: () => void;

  // Actions - Text Settings
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  setReadingMode: (mode: ReadingMode) => void;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set) => ({
      // Initial state - Navigation
      activeSurahId: undefined,
      activeAyahId: undefined,
      activeView: "surah-list",

      // Initial state - UI Settings
      fontSize: 24,
      isUIVisible: true,
      readingMode: "continuous",
      displayMode: "continuous",

      // Actions - Navigation
      setActiveSurah: (id) => set({ activeSurahId: id }),
      setActiveAyah: (id) => set({ activeAyahId: id }),
      setActiveView: (view) => set({ activeView: view }),

      // Actions - UI
      toggleUIVisibility: () =>
        set((state) => ({ isUIVisible: !state.isUIVisible })),
      toggleDisplayMode: () =>
        set((state) => ({
          displayMode:
            state.displayMode === "continuous" ? "separate" : "continuous",
        })),

      // Actions - Text Settings
      increaseFontSize: () =>
        set((state) => ({
          fontSize: state.fontSize < 40 ? state.fontSize + 2 : state.fontSize,
        })),
      decreaseFontSize: () =>
        set((state) => ({
          fontSize: state.fontSize > 18 ? state.fontSize - 2 : state.fontSize,
        })),
      setReadingMode: (mode) => set({ readingMode: mode }),
    }),
    {
      name: "quran-storage",
    }
  )
);

import { create } from "zustand";
import { QuranView, QuranError, isSurahId } from "../types";

interface MushafNavigationState {
  activeSurahId: number | undefined;
  activeAyahId: number | undefined;
  activeView: QuranView;

  // Actions
  setActiveSurah: (id: number | undefined) => void;
  setActiveAyah: (id: number | undefined) => void;
  setActiveView: (view: QuranView) => void;
  navigateToSurah: (surahId: number) => void;
  navigateToAyah: (surahId: number, ayahId: number) => void;
}

export const useMushafNavigationStore = create<MushafNavigationState>()(
  (set) => ({
    // Initial state
    activeSurahId: undefined,
    activeAyahId: undefined,
    activeView: "surah-list",

    // Basic setters
    setActiveSurah: (id) => set({ activeSurahId: id }),
    setActiveAyah: (id) => set({ activeAyahId: id }),
    setActiveView: (view) => set({ activeView: view }),

    // Navigation actions with validation
    navigateToSurah: (surahId: number) => {
      if (!isSurahId(surahId)) {
        console.error(`Invalid surah ID: ${surahId}`);
        return;
      }

      set({
        activeSurahId: surahId,
        activeView: "surah-view",
        activeAyahId: undefined,
      });
    },

    navigateToAyah: (surahId: number, ayahId: number) => {
      if (!isSurahId(surahId)) {
        console.error(`Invalid surah ID: ${surahId}`);
        return;
      }

      // Basic validation for ayahId
      if (ayahId <= 0) {
        console.error(`Invalid ayah ID: ${ayahId}`);
        return;
      }

      set({
        activeSurahId: surahId,
        activeAyahId: ayahId,
        activeView: "surah-view",
      });
    },
  })
);

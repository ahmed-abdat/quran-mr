import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DisplayMode } from "../types/quran-types";

interface QuranSettingsState {
  fontSize: number;
  displayMode: DisplayMode;
  isUIVisible: boolean;

  // Actions
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleUIVisibility: () => void;
  toggleDisplayMode: () => void;
}

export const useQuranSettingsStore = create<QuranSettingsState>()(
  persist(
    (set) => ({
      // Initial state
      fontSize: 24,
      displayMode: "continuous",
      isUIVisible: true,

      // Actions
      increaseFontSize: () =>
        set((state) => ({
          fontSize: Math.min(40, state.fontSize + 2),
        })),

      decreaseFontSize: () =>
        set((state) => ({
          fontSize: Math.max(18, state.fontSize - 2),
        })),

      toggleUIVisibility: () =>
        set((state) => ({
          isUIVisible: !state.isUIVisible,
        })),

      toggleDisplayMode: () =>
        set((state) => ({
          displayMode:
            state.displayMode === "continuous" ? "separate" : "continuous",
        })),
    }),
    {
      name: "quran-settings",
      partialize: (state) => ({
        fontSize: state.fontSize,
        displayMode: state.displayMode,
      }),
    }
  )
);

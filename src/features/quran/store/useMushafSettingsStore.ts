import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FontType } from "@/features/quran/types";

interface MushafSettingsState {
  // Display settings
  fontSize: number;
  displayMode: "separate" | "continuous";
  isUIVisible: boolean;
  fontType: FontType;

  // Actions
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleDisplayMode: () => void;
  toggleUIVisibility: () => void;
  setFontType: (font: FontType) => void;
}

export const useMushafSettingsStore = create<MushafSettingsState>()(
  persist(
    (set) => ({
      // Initial state
      fontSize: 24,
      displayMode: "separate",
      isUIVisible: true,
      fontType: "warsh",

      // Font size actions
      increaseFontSize: () =>
        set((state) => ({
          fontSize: Math.min(state.fontSize + 2, 40),
        })),

      decreaseFontSize: () =>
        set((state) => ({
          fontSize: Math.max(state.fontSize - 2, 18),
        })),

      // Display mode actions
      toggleDisplayMode: () =>
        set((state) => ({
          displayMode:
            state.displayMode === "separate" ? "continuous" : "separate",
        })),

      // UI visibility actions
      toggleUIVisibility: () =>
        set((state) => ({
          isUIVisible: !state.isUIVisible,
        })),

      // Font type action
      setFontType: (font: FontType) =>
        set(() => ({
          fontType: font,
        })),
    }),
    {
      name: "mushaf-settings-storage",
    }
  )
);

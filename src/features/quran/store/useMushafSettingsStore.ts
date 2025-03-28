import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MushafSettingsState {
  // Display settings
  fontSize: number;
  displayMode: "separate" | "continuous";
  isUIVisible: boolean;

  // Actions
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleDisplayMode: () => void;
  toggleUIVisibility: () => void;
}

export const useMushafSettingsStore = create<MushafSettingsState>()(
  persist(
    (set) => ({
      // Initial state
      fontSize: 24,
      displayMode: "separate",
      isUIVisible: true,

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
    }),
    {
      name: "mushaf-settings-storage",
    }
  )
);

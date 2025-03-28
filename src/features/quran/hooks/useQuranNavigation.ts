/**
 * useQuranNavigation Hook
 *
 * Manages navigation within the Quran application, providing:
 * 1. View navigation (Surah list, Search, Settings)
 * 2. Surah navigation (Next/Previous)
 * 3. Ayah navigation with search highlighting
 * 4. URL synchronization
 *
 * Features:
 * - Type-safe navigation
 * - URL state management
 * - Surah and ayah navigation
 * - Search integration
 *
 * @example
 * ```tsx
 * const {
 *   activeView,
 *   activeSurahId,
 *   navigateToSurah,
 *   navigateToAyah,
 *   navigateToSearch,
 * } = useQuranNavigation();
 * ```
 */

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuranData } from "./useQuranData";
import { useQuranNavigationStore } from "../store/useQuranNavigationStore";

export function useQuranNavigation() {
  const router = useRouter();
  const { getPrevSurah, getNextSurah } = useQuranData();
  const quranStore = useQuranNavigationStore();

  /**
   * Navigate to a specific surah
   * @param surahId - The ID of the surah to navigate to
   */
  const navigateToSurah = useCallback(
    (surahId: number) => {
      quranStore.setActiveView("surah-view");
      quranStore.setActiveSurah(surahId);
      quranStore.setActiveAyah(undefined); // Reset ayah selection
      router.push(`/quran/${surahId}`);
    },
    [router, quranStore]
  );

  /**
   * Navigate to a specific ayah within a surah
   * @param surahId - The ID of the surah
   * @param ayahId - The ID of the ayah
   */
  const navigateToAyah = useCallback(
    (surahId: number, ayahId: number) => {
      quranStore.setActiveView("surah-view");
      quranStore.setActiveSurah(surahId);
      quranStore.setActiveAyah(ayahId);
      router.push(`/quran/${surahId}?ayah=${ayahId}`);
    },
    [router, quranStore]
  );

  /**
   * Navigate to the search view
   */
  const navigateToSearch = useCallback(() => {
    quranStore.setActiveView("search");
    quranStore.setActiveSurah(undefined);
    quranStore.setActiveAyah(undefined);
    router.push("/quran/search");
  }, [router, quranStore]);

  /**
   * Navigate to the surah list view
   */
  const navigateToSurahList = useCallback(() => {
    quranStore.setActiveView("surah-list");
    quranStore.setActiveSurah(undefined);
    quranStore.setActiveAyah(undefined);
    router.push("/quran");
  }, [router, quranStore]);

  /**
   * Navigate to the next surah if available
   */
  const navigateToNextSurah = useCallback(() => {
    const nextSurah = getNextSurah(quranStore.activeSurahId);
    if (nextSurah) {
      navigateToSurah(nextSurah);
    }
  }, [quranStore.activeSurahId, getNextSurah, navigateToSurah]);

  /**
   * Navigate to the previous surah if available
   */
  const navigateToPrevSurah = useCallback(() => {
    const prevSurah = getPrevSurah(quranStore.activeSurahId);
    if (prevSurah) {
      navigateToSurah(prevSurah);
    }
  }, [quranStore.activeSurahId, getPrevSurah, navigateToSurah]);

  return {
    // Current state
    activeView: quranStore.activeView,
    activeSurahId: quranStore.activeSurahId,
    activeAyahId: quranStore.activeAyahId,

    // Navigation actions
    navigateToSurah,
    navigateToAyah,
    navigateToSearch,
    navigateToSurahList,
    navigateToNextSurah,
    navigateToPrevSurah,
  };
}

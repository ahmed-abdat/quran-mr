import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuranData } from "./useQuranData";
import { QuranView } from "@/features/quran/types";
import { useQuranStore } from "../store/useQuranStore";

/**
 * Custom hook for Quran navigation
 * Handles routing and navigation between different views and surahs
 */
export function useQuranNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getPrevSurah, getNextSurah, getJuzByNumber } = useQuranData();
  const quranStore = useQuranStore();

  // Navigation functions
  const navigateToSurah = useCallback(
    (surahId: number) => {
      quranStore.setActiveView("surah-view");
      quranStore.setActiveSurah(surahId);
      // Reset ayah selection when navigating to a new surah
      quranStore.setActiveAyah(undefined);
      router.push(`/quran/${surahId}`);
    },
    [router, quranStore]
  );

  const navigateToAyah = useCallback(
    (surahId: number, ayahId: number, searchQuery?: string) => {
      quranStore.setActiveView("surah-view");
      quranStore.setActiveSurah(surahId);
      quranStore.setActiveAyah(ayahId);

      // Build the URL with search query if provided
      const url = searchQuery
        ? `/quran/${surahId}?ayah=${ayahId}&q=${encodeURIComponent(
            searchQuery
          )}`
        : `/quran/${surahId}?ayah=${ayahId}`;

      router.push(url);
    },
    [router, quranStore]
  );

  const navigateToJuz = useCallback(
    (juzId: number) => {
      const juz = getJuzByNumber(juzId);
      if (juz) {
        quranStore.setActiveView("surah-view");
        quranStore.setActiveSurah(juz.startSurah);
        quranStore.setActiveAyah(juz.startAyah);
        router.push(
          `/quran/${juz.startSurah}?ayah=${juz.startAyah}&juz=${juzId}`
        );
      }
    },
    [router, quranStore, getJuzByNumber]
  );

  const navigateToJuzList = useCallback(() => {
    quranStore.setActiveView("juz-list");
    quranStore.setActiveSurah(undefined);
    quranStore.setActiveAyah(undefined);
    router.push("/quran/juz");
  }, [router, quranStore]);

  const navigateToSearch = useCallback(() => {
    quranStore.setActiveView("search");
    quranStore.setActiveSurah(undefined);
    quranStore.setActiveAyah(undefined);
    router.push("/quran/search");
  }, [router, quranStore]);

  const navigateToSurahList = useCallback(() => {
    quranStore.setActiveView("surah-list");
    quranStore.setActiveSurah(undefined);
    quranStore.setActiveAyah(undefined);
    router.push("/quran");
  }, [router, quranStore]);

  const navigateToNextSurah = useCallback(() => {
    const nextSurah = getNextSurah(quranStore.activeSurahId);
    if (nextSurah) {
      navigateToSurah(nextSurah);
    }
  }, [quranStore.activeSurahId, getNextSurah, navigateToSurah]);

  const navigateToPrevSurah = useCallback(() => {
    const prevSurah = getPrevSurah(quranStore.activeSurahId);
    if (prevSurah) {
      navigateToSurah(prevSurah);
    }
  }, [quranStore.activeSurahId, getPrevSurah, navigateToSurah]);

  return {
    activeView: quranStore.activeView,
    activeSurahId: quranStore.activeSurahId,
    activeAyahId: quranStore.activeAyahId,
    navigateToSurah,
    navigateToAyah,
    navigateToJuz,
    navigateToJuzList,
    navigateToSearch,
    navigateToSurahList,
    navigateToNextSurah,
    navigateToPrevSurah,
  };
}

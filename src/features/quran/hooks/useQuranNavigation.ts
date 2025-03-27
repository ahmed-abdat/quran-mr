import { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useQuranData } from "./useQuranData";

export type QuranView = "surah-list" | "surah-view" | "search" | "surah";

/**
 * Custom hook for Quran navigation
 * Handles routing and navigation between different views and surahs
 */
export function useQuranNavigation(
  initialView: QuranView = "surah-list",
  initialSurahId?: number,
  initialAyahId?: number
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { getPrevSurah, getNextSurah } = useQuranData();

  // State
  const [activeView, setActiveView] = useState<QuranView>(initialView);
  const [activeSurahId, setActiveSurahId] = useState<number | undefined>(
    initialSurahId
  );
  const [activeAyahId, setActiveAyahId] = useState<number | undefined>(
    initialAyahId
  );

  // Handle URL and state synchronization
  useEffect(() => {
    if (pathname === "/quran") {
      setActiveView("surah-list");
      setActiveSurahId(undefined);
      setActiveAyahId(undefined);
    } else if (pathname === "/quran/search") {
      setActiveView("search");
      setActiveSurahId(undefined);
      setActiveAyahId(undefined);
    } else if (pathname.startsWith("/quran/") && pathname !== "/quran/search") {
      const id = pathname.split("/").pop();
      if (id && !isNaN(parseInt(id))) {
        setActiveView("surah-view");
        setActiveSurahId(parseInt(id));

        const ayah = searchParams.get("ayah");
        if (ayah && !isNaN(parseInt(ayah))) {
          setActiveAyahId(parseInt(ayah));
        }
      }
    }
  }, [pathname, searchParams]);

  // Navigation functions
  const navigateToSurah = useCallback(
    (surahId: number) => {
      setActiveView("surah-view");
      setActiveSurahId(surahId);
      // Reset ayah selection when navigating to a new surah
      setActiveAyahId(undefined);
      router.push(`/quran/${surahId}`);
    },
    [router]
  );

  const navigateToAyah = useCallback(
    (surahId: number, ayahId: number) => {
      setActiveView("surah-view");
      setActiveSurahId(surahId);
      setActiveAyahId(ayahId);
      router.push(`/quran/${surahId}?ayah=${ayahId}`);
    },
    [router]
  );

  const navigateToSearch = useCallback(() => {
    setActiveView("search");
    router.push("/quran/search");
  }, [router]);

  const navigateToSurahList = useCallback(() => {
    setActiveView("surah-list");
    router.push("/quran");
  }, [router]);

  const navigateToNextSurah = useCallback(() => {
    const nextSurah = getNextSurah(activeSurahId);
    if (nextSurah) {
      navigateToSurah(nextSurah);
    }
  }, [activeSurahId, getNextSurah, navigateToSurah]);

  const navigateToPrevSurah = useCallback(() => {
    const prevSurah = getPrevSurah(activeSurahId);
    if (prevSurah) {
      navigateToSurah(prevSurah);
    }
  }, [activeSurahId, getPrevSurah, navigateToSurah]);

  return {
    activeView,
    activeSurahId,
    activeAyahId,
    setActiveAyahId,
    navigateToSurah,
    navigateToAyah,
    navigateToSearch,
    navigateToSurahList,
    navigateToNextSurah,
    navigateToPrevSurah,
  };
}

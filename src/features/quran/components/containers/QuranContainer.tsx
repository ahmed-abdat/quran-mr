"use client";

import { useEffect, useRef } from "react";
import { useQuranStore } from "@/features/quran/store/useQuranStore";
import { useQuranData } from "@/features/quran/hooks/useQuranData";
import { QuranViewRouter } from "./QuranViewRouter";
import { QuranLayout } from "../layouts/QuranLayout";
import { useSearchParams } from "next/navigation";

interface QuranContainerProps {
  initialView?: "surah-list" | "surah-view" | "search" | "juz-list";
  initialSurahId?: number;
  initialAyahId?: number;
}

export function QuranContainer({
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: QuranContainerProps) {
  const quranStore = useQuranStore();
  const { allSurahs, allJuzs } = useQuranData();
  const isInitialRender = useRef(true);
  const searchParams = useSearchParams();

  // Initialize store from props and URL parameters ONLY on first render
  useEffect(() => {
    if (isInitialRender.current) {
      if (initialView) quranStore.setActiveView(initialView);
      if (initialSurahId) quranStore.setActiveSurah(initialSurahId);

      // Check if we have an ayah parameter in the URL
      const ayahFromParams = searchParams.get("ayah");
      if (ayahFromParams) {
        quranStore.setActiveAyah(parseInt(ayahFromParams, 10));
      } else if (initialAyahId) {
        quranStore.setActiveAyah(initialAyahId);
      }

      isInitialRender.current = false;
    }
  }, [initialView, initialSurahId, initialAyahId, quranStore, searchParams]);

  return (
    <QuranLayout>
      <QuranViewRouter
        activeView={quranStore.activeView}
        surahs={allSurahs}
        juzs={allJuzs}
      />
    </QuranLayout>
  );
}

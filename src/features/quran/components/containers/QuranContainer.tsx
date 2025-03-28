"use client";

import { useEffect, useRef } from "react";
import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { useQuranData } from "@/features/quran/hooks/useQuranData";
import { QuranViewRouter } from "./QuranViewRouter";
import { QuranLayout } from "../layouts/QuranLayout";
import { useSearchParams } from "next/navigation";

interface QuranContainerProps {
  initialView?: "surah-list" | "surah-view" | "search";
  initialSurahId?: number;
  initialAyahId?: number;
}

export function QuranContainer({
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: QuranContainerProps) {
  const { setActiveView, setActiveSurah, setActiveAyah, activeView } =
    useQuranNavigationStore();
  const { allSurahs } = useQuranData();
  const isInitialRender = useRef(true);
  const searchParams = useSearchParams();

  // Initialize store from props and URL parameters ONLY on first render
  useEffect(() => {
    if (isInitialRender.current) {
      if (initialView) setActiveView(initialView);
      if (initialSurahId) setActiveSurah(initialSurahId);

      // Check if we have an ayah parameter in the URL
      const ayahFromParams = searchParams.get("ayah");
      if (ayahFromParams) {
        setActiveAyah(parseInt(ayahFromParams, 10));
      } else if (initialAyahId) {
        setActiveAyah(initialAyahId);
      }

      isInitialRender.current = false;
    }
  }, [
    initialView,
    initialSurahId,
    initialAyahId,
    setActiveView,
    setActiveSurah,
    setActiveAyah,
    searchParams,
  ]);

  return (
    <QuranLayout>
      <QuranViewRouter activeView={activeView} surahs={allSurahs} />
    </QuranLayout>
  );
}

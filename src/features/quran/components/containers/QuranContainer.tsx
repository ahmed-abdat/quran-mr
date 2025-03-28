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
  const { allSurahs, allJuzs, isLoading, error } = useQuranData();
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

  // Show loading state
  if (isLoading) {
    return (
      <QuranLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-lg">جاري التحميل...</p>
        </div>
      </QuranLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <QuranLayout>
        <div className="flex items-center justify-center h-[70vh] text-center">
          <div>
            <p className="text-lg text-red-500">حدث خطأ أثناء تحميل البيانات</p>
            <p className="text-sm text-muted-foreground mt-2">
              {error.message}
            </p>
          </div>
        </div>
      </QuranLayout>
    );
  }

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

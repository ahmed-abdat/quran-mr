/**
 * QuranContainer Component
 *
 * The main container component for the Quran application. It orchestrates:
 * 1. Data fetching via useQuranData
 * 2. State initialization via QuranInitializer
 * 3. Layout management via QuranLayout
 * 4. View routing via QuranRouter
 *
 * This component follows a clear separation of concerns:
 * - Data fetching and state management
 * - Layout and UI structure
 * - View routing and rendering
 *
 * @example
 * ```tsx
 * // Basic usage
 * <QuranContainer initialView="surah-list" />
 *
 * // With initial surah and ayah
 * <QuranContainer
 *   initialView="surah-view"
 *   initialSurahId={1}
 *   initialAyahId={1}
 * />
 * ```
 */

"use client";

import { useQuranData } from "@/features/quran/hooks/useQuranData";
import { QuranLayout } from "../layouts/QuranLayout";
import { QuranRouter } from "../routing/QuranRouter";
import { QuranInitializer } from "./QuranInitializer";
import { QuranView } from "@/features/quran/types";

interface QuranContainerProps {
  initialView?: QuranView;
  initialSurahId?: number;
  initialAyahId?: number;
}

export function QuranContainer({
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: QuranContainerProps) {
  // Fetch Quran data
  const { allSurahs, isLoading } = useQuranData();

  // Show loading state if data is not ready
  if (isLoading || !allSurahs.length) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <QuranInitializer
      initialView={initialView}
      initialSurahId={initialSurahId}
      initialAyahId={initialAyahId}
    >
      <QuranLayout>
        <QuranRouter surahs={allSurahs} />
      </QuranLayout>
    </QuranInitializer>
  );
}

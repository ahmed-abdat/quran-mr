/**
 * MushafContainer Component
 *
 * The main container component for the Mushaf (Quran) application. It orchestrates:
 * 1. Data fetching via useMushafData
 * 2. State initialization via MushafInitializer
 * 3. Layout management via MushafLayout
 * 4. View routing via MushafRouter
 *
 * This component follows a clear separation of concerns:
 * - Data fetching and state management
 * - Layout and UI structure
 * - View routing and rendering
 *
 * @example
 * ```tsx
 * // Basic usage
 * <MushafContainer initialView="surah-list" />
 *
 * // With initial surah and ayah
 * <MushafContainer
 *   initialView="surah-view"
 *   initialSurahId={1}
 *   initialAyahId={1}
 * />
 * ```
 */

"use client";

import { useMushafData } from "@/features/quran/hooks/useMushafData";
import { MushafLayout } from "../layouts/MushafLayout";
import { MushafRouter } from "../routing/MushafRouter";
import { MushafInitializer } from "./MushafInitializer";
import { QuranView } from "@/features/quran/types";

interface MushafContainerProps {
  initialView?: QuranView;
  initialSurahId?: number;
  initialAyahId?: number;
}

export function MushafContainer({
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: MushafContainerProps) {
  // Fetch Quran data
  const { allSurahs, isLoading } = useMushafData();

  // Show loading state if data is not ready
  if (isLoading || !allSurahs.length) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <MushafInitializer
      initialView={initialView}
      initialSurahId={initialSurahId}
      initialAyahId={initialAyahId}
    >
      <MushafLayout>
        <MushafRouter />
      </MushafLayout>
    </MushafInitializer>
  );
}

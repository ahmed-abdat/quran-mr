/**
 * QuranInitializer Component
 *
 * This component is responsible for initializing the Quran application state.
 * It handles:
 * - Setting initial view state
 * - Processing URL parameters
 * - Setting initial surah and ayah
 *
 * @example
 * ```tsx
 * <QuranInitializer initialView="surah-list">
 *   <YourComponent />
 * </QuranInitializer>
 * ```
 */

import { ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { QuranView } from "@/features/quran/types";

interface QuranInitializerProps {
  children: ReactNode;
  initialView?: QuranView;
  initialSurahId?: number;
  initialAyahId?: number;
}

export function QuranInitializer({
  children,
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: QuranInitializerProps) {
  const { setActiveView, setActiveSurah, setActiveAyah } =
    useQuranNavigationStore();
  const isInitialRender = useRef(true);
  const searchParams = useSearchParams();

  // Initialize store from props and URL parameters ONLY on first render
  useEffect(() => {
    if (isInitialRender.current) {
      // Set initial view
      if (initialView) setActiveView(initialView);

      // Set initial surah if provided
      if (initialSurahId) setActiveSurah(initialSurahId);

      // Check for ayah parameter in URL or props
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

  return children;
}

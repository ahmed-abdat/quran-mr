/**
 * MushafInitializer Component
 *
 * This component is responsible for initializing the Mushaf (Quran) application state.
 * It handles:
 * - Setting initial view state
 * - Processing URL parameters
 * - Setting initial surah and ayah
 *
 * @example
 * ```tsx
 * <MushafInitializer initialView="surah-list">
 *   <YourComponent />
 * </MushafInitializer>
 * ```
 */

import { ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { QuranView } from "@/features/quran/types";

interface MushafInitializerProps {
  children: ReactNode;
  initialView?: QuranView;
  initialSurahId?: number;
  initialAyahId?: number;
}

export function MushafInitializer({
  children,
  initialView = "surah-list",
  initialSurahId,
  initialAyahId,
}: MushafInitializerProps) {
  const { setActiveView, setActiveSurah, setActiveAyah } =
    useMushafNavigationStore();
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

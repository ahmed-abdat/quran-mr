/**
 * QuranRouter Component
 *
 * A dedicated router component that manages view switching in the Quran application.
 * It uses the navigation store to determine which view to render and provides
 * the necessary data to each view.
 *
 * @example
 * ```tsx
 * <QuranRouter surahs={allSurahs} />
 * ```
 */

import { useMemo } from "react";
import { useQuranNavigationStore } from "@/features/quran/store/useQuranNavigationStore";
import { Surah } from "@/features/quran/types";

// Import views
import { SurahListView } from "@/features/quran/components/views/SurahListView";
import { SurahView } from "@/features/quran/components/views/SurahView";
import { SearchView } from "@/features/quran/components/views/SearchView";
import { SettingsView } from "@/features/quran/components/views/SettingsView";

interface QuranRouterProps {
  surahs: Surah[];
}

export function QuranRouter({ surahs }: QuranRouterProps) {
  const { activeView, activeSurahId } = useQuranNavigationStore();

  // Get the current surah data if in surah view
  const currentSurah = useMemo(() => {
    return activeSurahId ? surahs.find((s) => s.id === activeSurahId) : null;
  }, [activeSurahId, surahs]);

  // Route to the appropriate view based on activeView
  switch (activeView) {
    case "surah-list":
      return <SurahListView surahs={surahs} />;
    case "surah-view":
      return currentSurah ? <SurahView surah={currentSurah} /> : null;
    case "search":
      return <SearchView />;
    case "settings":
      return <SettingsView />;
    default:
      return <SurahListView surahs={surahs} />;
  }
}

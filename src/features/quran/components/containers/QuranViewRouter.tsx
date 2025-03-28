import { useMemo } from "react";
import { useQuranStore } from "@/features/quran/store/useQuranStore";
import { Surah, Juz, QuranView } from "@/features/quran/types";

// Import views
import { SurahListView } from "@/features/quran/components/views/SurahListView";
import { SurahView } from "@/features/quran/components/views/SurahView";
import { JuzListView } from "@/features/quran/components/views/JuzListView";
import { SearchView } from "@/features/quran/components/views/SearchView";
import { SettingsView } from "@/features/quran/components/views/SettingsView";

interface QuranViewRouterProps {
  activeView: QuranView;
  surahs: Surah[];
  juzs: Juz[];
}

export function QuranViewRouter({
  activeView,
  surahs,
  juzs,
}: QuranViewRouterProps) {
  const { activeSurahId, activeAyahId } = useQuranStore();

  // Get the current surah data if in surah view
  const currentSurah = useMemo(() => {
    return activeSurahId ? surahs.find((s) => s.id === activeSurahId) : null;
  }, [activeSurahId, surahs]);

  switch (activeView) {
    case "surah-list":
      return <SurahListView surahs={surahs} />;
    case "surah-view":
      return currentSurah ? <SurahView surah={currentSurah} /> : null;
    case "juz-list":
      return <JuzListView juzs={juzs} />;
    case "search":
      return <SearchView />;
    case "settings":
      return <SettingsView />;
    default:
      return <SurahListView surahs={surahs} />;
  }
}

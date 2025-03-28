/**
 * MushafRouter Component
 *
 * Handles routing between different views in the Quran application:
 * - SuwarListView: List of all surahs
 * - SurahMushafView: Individual surah display
 * - SearchView: Search functionality
 * - SettingsView: Application settings
 *
 * Features:
 * - Dynamic view switching
 * - Data loading states
 * - Error handling
 * - Smooth transitions
 *
 * @example
 * ```tsx
 * <MushafRouter />
 * ```
 */

"use client";

import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { SuwarListView } from "../views/SuwarListView";
import { SurahMushafView } from "../views/SurahMushafView";
import { SearchView } from "../views/SearchView";
import { SettingsView } from "../views/SettingsView";
import { useMushafData } from "@/features/quran/hooks/useMushafData";

export function MushafRouter() {
  const { activeView, activeSurahId } = useMushafNavigationStore();
  const { allSurahs, isLoading } = useMushafData();

  // Handle loading state
  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  // Render active view
  switch (activeView) {
    case "surah-list":
      return <SuwarListView surahs={allSurahs} />;

    case "surah-view":
      const activeSurah = allSurahs.find((s) => s.id === activeSurahId);
      if (!activeSurah) {
        return <div>خطأ: السورة غير موجودة</div>;
      }
      return <SurahMushafView surah={activeSurah} />;

    case "search":
      return <SearchView />;

    case "settings":
      return <SettingsView />;

    default:
      return <div>خطأ: الصفحة غير موجودة</div>;
  }
}

import { Metadata } from "next";
import { QuranContainer } from "@/features/quran/components/containers/QuranContainer";
import { getAllSurahs } from "@/features/quran/utils/quran-data";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ ayah?: string }>;

interface SurahPageProps {
  params: Params;
  searchParams: SearchParams;
}

export async function generateMetadata({
  params,
  searchParams,
}: SurahPageProps): Promise<Metadata> {
  const surahs = getAllSurahs();
  const { id } = await params;
  const { ayah } = await searchParams;
  const surahId = parseInt(id);
  const surah = surahs.find((s) => s.id === surahId);

  if (!surah) {
    return {
      title: "سورة غير موجودة | Surah Not Found",
    };
  }

  return {
    title: `سورة ${surah.name_arabic} | ${surah.name_english}`,
    description: `قراءة سورة ${surah.name_arabic} (${surah.name_english}) - ${surah.verses_count} آية`,
  };
}

export default async function SurahPage({
  params,
  searchParams,
}: SurahPageProps) {
  const { id } = await params;
  const { ayah } = await searchParams;
  const surahId = parseInt(id);
  const ayahId = ayah ? parseInt(ayah) : undefined;

  // Validate surah ID
  if (isNaN(surahId) || surahId < 1 || surahId > 114) {
    return notFound();
  }

  return (
    <QuranContainer
      initialView="surah-view"
      initialSurahId={surahId}
      initialAyahId={ayahId}
    />
  );
}

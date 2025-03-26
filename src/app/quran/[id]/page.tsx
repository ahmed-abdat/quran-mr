import { SurahView, getSurahByNumber, getAllSurahs } from "@/features/quran";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;  

interface SurahPageProps {
  params: Params;
}

export function generateStaticParams() {
  const surahs = getAllSurahs();
  return surahs.map((surah) => ({
    id: surah.number.toString(),
  }));
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const surahId = parseInt(id);
  const surah = getSurahByNumber(surahId);

  if (!surah) {
    notFound();
  }

  const surahs = getAllSurahs();
  const surahIndex = surahs.findIndex((s) => s.number === surahId);
  const prevSurah = surahIndex > 0 ? surahs[surahIndex - 1].number : undefined;
  const nextSurah =
    surahIndex < surahs.length - 1 ? surahs[surahIndex + 1].number : undefined;

  return (
    <main className="container mx-auto px-4 py-4 max-w-5xl">
      <div className="mb-4">
        <Link
          href="/quran"
          className="inline-flex items-center text-sm hover:underline"
        >
          <ChevronRight className="ml-1 h-4 w-4" />
          العودة إلى قائمة السور
        </Link>
      </div>

      <SurahView surah={surah} nextSurah={nextSurah} prevSurah={prevSurah} />
    </main>
  );
}

import { SurahList, getAllSurahs } from "@/features/quran";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function QuranPage() {
  const surahs = getAllSurahs();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm hover:underline"
        >
          <ChevronRight className="ml-1 h-4 w-4" />
          العودة إلى الصفحة الرئيسية
        </Link>
        <h1 className="text-3xl font-bold mt-4">سور القرآن الكريم</h1>
        <p className="text-muted-foreground">
          تصفح جميع سور القرآن الكريم وعددها {surahs.length} سورة
        </p>
      </div>

      <SurahList surahs={surahs} />
    </main>
  );
}

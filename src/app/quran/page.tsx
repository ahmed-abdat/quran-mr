import { Metadata } from "next";
import { QuranContainer } from "@/features/quran/components/QuranContainer";

export const metadata: Metadata = {
  title: "القرآن الكريم | The Holy Quran",
  description: "تصفح القرآن الكريم بطريقة سهلة وبسيطة",
};

export default function QuranPage() {
  return <QuranContainer initialView="surah-list" />;
}

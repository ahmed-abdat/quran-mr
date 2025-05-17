import { Metadata } from "next";
import { MushafContainer } from "@/features/quran/components/containers/MushafContainer";

export const metadata: Metadata = {
  title: "القرآن الكريم",
  description: "تصفح القرآن الكريم بطريقة سهلة وبسيطة",
};

export default function QuranPage() {
  return <MushafContainer initialView="surah-list" />;
}

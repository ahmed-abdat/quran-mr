import { Metadata } from "next";
import { QuranContainer } from "@/features/quran/components/QuranContainer";

export const metadata: Metadata = {
  title: "البحث في القرآن الكريم | Quran Search",
  description: "البحث في آيات القرآن الكريم",
};

export default function SearchPage() {
  return <QuranContainer initialView="search" />;
}

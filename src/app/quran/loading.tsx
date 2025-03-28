import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { QuranLayout } from "@/features/quran/components/layouts/QuranLayout";

export default function QuranLoading() {
  return (
    <QuranLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg">جاري تحميل القرآن...</p>
      </div>
    </QuranLayout>
  );
}

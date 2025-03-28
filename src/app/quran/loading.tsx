import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MushafLayout } from "@/features/quran/components/layouts/MushafLayout";

export default function MushafLoading() {
  return (
    <MushafLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-lg">جاري تحميل القرآن...</p>
      </div>
    </MushafLayout>
  );
}

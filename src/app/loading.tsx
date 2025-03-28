import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-lg">جاري التحميل...</p>
    </div>
  );
}

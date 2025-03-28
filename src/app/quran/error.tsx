"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { MushafLayout } from "@/features/quran/components/layouts/MushafLayout";

export default function QuranError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MushafLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">
          عذراً، حدث خطأ في تحميل القرآن
        </h2>
        <p className="text-muted-foreground mb-4">
          {error.message || "حدث خطأ غير متوقع أثناء تحميل القرآن"}
        </p>
        <Button onClick={reset} className="mt-4">
          إعادة المحاولة
        </Button>
      </div>
    </MushafLayout>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">عذراً، حدث خطأ ما</h2>
      <p className="text-muted-foreground mb-4">
        {error.message || "حدث خطأ غير متوقع"}
      </p>
      <Button onClick={reset} className="mt-4">
        حاول مرة أخرى
      </Button>
    </div>
  );
}

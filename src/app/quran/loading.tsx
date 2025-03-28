import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuranIndexLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skeleton for header */}
      <div className="border-b sticky top-0 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-3">
          <Skeleton className="w-48 h-7 mx-auto" />
        </div>
      </div>

      <main className="container mx-auto p-4">
        {/* Skeleton for page title */}
        <div className="text-center py-4">
          <Skeleton className="h-8 w-40 mx-auto" />
        </div>

        {/* Skeleton for search bar */}
        <div className="rounded-lg border overflow-hidden mb-6">
          <Skeleton className="h-12" />
        </div>

        {/* Skeleton for Surah list */}
        <div className="border rounded-lg overflow-hidden">
          <div className="divide-y">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr_auto] items-center py-4 px-4"
              >
                <Skeleton className="w-8 h-8 rounded-full" />

                <div className="flex justify-start relative mx-4">
                  <Skeleton className="h-8 w-28 rounded" />

                  <div className="absolute left-0 -top-1">
                    <Skeleton className="h-5 w-10" />
                  </div>
                </div>

                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

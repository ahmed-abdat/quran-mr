import React from "react";

export default function SurahLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skeleton for header */}
      <div className="border-b sticky top-0 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-3">
          <div className="w-48 h-7 bg-muted/50 rounded-md mx-auto animate-pulse" />
        </div>
      </div>

      <main className="container mx-auto p-4">
        {/* Skeleton for Surah title */}
        <div className="flex flex-col items-center my-6">
          <div className="h-10 w-52 bg-muted/40 rounded-md animate-pulse mb-2" />
          <div className="h-5 w-32 bg-muted/30 rounded-md animate-pulse" />
        </div>

        {/* Skeleton for Bismillah */}
        <div className="text-center my-6">
          <div className="h-8 w-64 bg-muted/30 rounded-md animate-pulse mx-auto" />
        </div>

        {/* Skeleton for Ayahs */}
        <div className="border rounded-lg overflow-hidden p-6 bg-card">
          <div className="space-y-4 rtl">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-6 rounded-full bg-muted/40 animate-pulse" />
                  <div className="flex-1 mx-4">
                    <div
                      className="h-5 bg-muted/30 animate-pulse rounded"
                      style={{
                        width: `${Math.floor(Math.random() * 30) + 70}%`,
                      }}
                    />
                  </div>
                </div>
                <div
                  className="h-4 bg-muted/20 animate-pulse rounded mt-1"
                  style={{
                    width: `${Math.floor(Math.random() * 40) + 60}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Skeleton for bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm py-2">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="h-8 w-10 bg-muted/30 rounded animate-pulse" />
            <div className="h-8 w-24 bg-muted/40 rounded animate-pulse" />
            <div className="h-8 w-10 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Surah, Ayah } from "../../types/quran-types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselViewProps {
  surah: Surah;
  activeAyahId?: number;
  fontSize: number;
  currentPage: number;
  totalPages: number;
  pageAyahs: Ayah[];
  itemsPerPage: number;
  highlightSearchText?: (text: string, query: string) => string;
  searchQuery?: string;
  onPageChange: (page: number) => void;
  toggleUIVisibility: () => void;
  isUIVisible: boolean;
}

/**
 * CarouselView component
 * Displays a surah in carousel view, allowing users to swipe between pages
 */
export function CarouselView({
  surah,
  activeAyahId,
  fontSize,
  currentPage,
  totalPages,
  pageAyahs,
  itemsPerPage,
  highlightSearchText,
  searchQuery = "",
  onPageChange,
  toggleUIVisibility,
  isUIVisible,
}: CarouselViewProps) {
  const [api, setApi] = useState<CarouselApi>();
  const scrolledRef = useRef(false);

  // Calculate pages for carousel
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle API events
  useEffect(() => {
    if (!api) {
      return;
    }

    // Handle scroll completion
    const onSelect = () => {
      // Update currentPage based on carousel position
      const selectedIndex = api.selectedScrollSnap();
      onPageChange(selectedIndex + 1);
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onPageChange]);

  // Scroll to specific page
  useEffect(() => {
    if (api) {
      // Programmatically set the scroll position without animation
      api.scrollTo(currentPage - 1, false);
    }
  }, [api, currentPage]);

  // Scroll to active ayah
  useEffect(() => {
    if (activeAyahId && !scrolledRef.current && api) {
      // Calculate which page this ayah is on
      const ayahIndex = surah.ayahs.findIndex((a) => a.aya_no === activeAyahId);
      const targetPage = Math.floor(ayahIndex / itemsPerPage) + 1;

      // Navigate to the correct page
      if (currentPage !== targetPage) {
        onPageChange(targetPage);
      }

      // Find the ayah element after scrolling
      setTimeout(() => {
        const ayahElement = document.getElementById(`ayah-${activeAyahId}`);
        if (ayahElement) {
          ayahElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          ayahElement.classList.add("active-ayah");
          scrolledRef.current = true;
        }
      }, 500);
    }

    // Reset scroll flag when ayah changes
    return () => {
      scrolledRef.current = false;
    };
  }, [activeAyahId, api, currentPage, itemsPerPage, onPageChange, surah.ayahs]);

  return (
    <div className="space-y-4">
      {/* Surah header - only visible when UI is visible */}
      {isUIVisible && (
        <Card className="border-0 bg-transparent mb-2">
          <div className="p-2 text-center">
            <h1 className="text-2xl font-surah-names mb-0">
              {surah.name_arabic}
            </h1>
            <div className="text-center text-sm text-muted-foreground mt-1">
              صفحة {currentPage} من {totalPages}
            </div>
          </div>
        </Card>
      )}

      {/* Carousel view */}
      <Carousel
        setApi={setApi}
        className="w-full h-full"
        opts={{
          align: "start",
          loop: false,
          containScroll: "trimSnaps",
          direction: "rtl", // RTL support for Arabic
        }}
      >
        <CarouselContent className="h-full">
          {pages.map((pageNumber) => {
            // Get ayahs for this page
            const startIndex = (pageNumber - 1) * itemsPerPage;
            const displayAyahs = surah.ayahs.slice(
              startIndex,
              startIndex + itemsPerPage
            );

            // Check if Bismillah should be shown on this page
            const showBismillah =
              surah.id !== 1 && surah.id !== 9 && pageNumber === 1;

            return (
              <CarouselItem key={pageNumber} className="h-full">
                <div
                  className="mushaf-text font-arabic p-6 border rounded-lg bg-background min-h-[90vh] flex flex-col justify-center"
                  dir="rtl"
                  style={{ fontSize: `${fontSize}px` }}
                  onClick={toggleUIVisibility}
                >
                  {/* Bismillah */}
                  {showBismillah && (
                    <div className="bismillah text-center mb-4">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </div>
                  )}

                  {/* Verses */}
                  {displayAyahs.map((ayah) => (
                    <span
                      key={ayah.id}
                      id={`ayah-${ayah.aya_no}`}
                      className={cn(
                        "inline",
                        activeAyahId === ayah.aya_no ? "active-ayah" : ""
                      )}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSearchText
                            ? highlightSearchText(ayah.aya_text, searchQuery)
                            : ayah.aya_text,
                        }}
                      />{" "}
                    </span>
                  ))}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

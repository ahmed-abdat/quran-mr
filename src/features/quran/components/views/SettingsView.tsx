"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { FontType } from "@/features/quran/types";
import {
  getFontTypeName,
  getFontClass,
  getAvailableFontTypes,
} from "@/features/quran/utils/font-utils";
import { useCallback } from "react";
import {
  Check,
  Rows,
  AlignJustify,
  Minus,
  Plus,
  ChevronRight,
  Moon,
  Sun,
  Type,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * FontSizeControl component for adjusting text size
 */
function FontSizeControl({
  fontSize,
  fontType,
  onIncrease,
  onDecrease,
}: {
  fontSize: number;
  fontType: FontType;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg">حجم الخط</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
            <Button
              onClick={onDecrease}
              variant="outline"
              size="icon"
              disabled={fontSize <= 18}
              className="h-8 w-8 rounded-full"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-medium tabular-nums">
                {fontSize}
              </span>
              <span className="text-xs text-muted-foreground">حجم الخط</span>
            </div>
            <Button
              onClick={onIncrease}
              variant="outline"
              size="icon"
              disabled={fontSize >= 40}
              className="h-8 w-8 rounded-full"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="bg-muted/20 rounded-lg p-3">
            <p
              className={cn(getFontClass(fontType), "text-center")}
              style={{ fontSize: `${fontSize}px` }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
}

/**
 * FontTypeSelector component for choosing font type
 */
function FontTypeSelector({
  currentFont,
  onFontChange,
}: {
  currentFont: FontType;
  onFontChange: (font: FontType) => void;
}) {
  const fontTypes = getAvailableFontTypes();

  return (
    <>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg">نوع الخط</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-2">
          {fontTypes.map((font) => (
            <Toggle
              key={font}
              variant="outline"
              size="lg"
              pressed={currentFont === font}
              onPressedChange={() => onFontChange(font)}
              className={cn(
                "w-full justify-start",
                currentFont === font &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )}
            >
              <Type className="h-4 w-4 mr-2 opacity-90" />
              {getFontTypeName(font)}
              {currentFont === font && (
                <Check className="h-4 w-4 ms-auto opacity-90" />
              )}
            </Toggle>
          ))}
        </div>
      </CardContent>
    </>
  );
}

/**
 * DisplayModeSelector component for choosing display mode
 */
function DisplayModeSelector({
  displayMode,
  onToggleMode,
}: {
  displayMode: "separate" | "continuous";
  onToggleMode: () => void;
}) {
  return (
    <>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg">طريقة عرض الآيات</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs
          defaultValue={displayMode}
          className="w-full"
          dir="rtl"
          onValueChange={(value) => {
            if (value !== displayMode) {
              onToggleMode();
            }
          }}
        >
          <TabsList className="grid grid-cols-2 w-full mb-2">
            <TabsTrigger value="continuous">
              <AlignJustify className="h-4 w-4 ml-2" />
              عرض متصل
            </TabsTrigger>
            <TabsTrigger value="separate">
              <Rows className="h-4 w-4 ml-2" />
              عرض منفصل
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="continuous"
            className="bg-muted/20 text-sm rounded-lg p-3 mt-2"
          >
            عرض متواصل للآيات كنص مستمر، مناسب للقراءة المتواصلة ويشبه طريقة عرض
            المصحف التقليدي
          </TabsContent>
          <TabsContent
            value="separate"
            className="bg-muted/20 text-sm rounded-lg p-3 mt-2"
          >
            عرض كل آية في سطر مستقل مما يسهل القراءة وتتبع الآيات بشكل أوضح
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
}

/**
 * ThemeToggle component for selecting light/dark mode
 */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-lg">المظهر</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-muted/30 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium">
                {theme === "dark" ? "المظهر الداكن" : "المظهر الفاتح"}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {theme === "dark"
                  ? "مناسب للقراءة الليلية"
                  : "مناسب للقراءة النهارية"}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full w-10 h-10 border-2",
                theme === "dark" ? "border-primary" : "border-primary/20"
              )}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}

/**
 * SettingsView component
 * Displays and manages settings for the Quran app with an enhanced UI
 */
export function SettingsView() {
  const {
    fontSize,
    displayMode,
    fontType,
    increaseFontSize,
    decreaseFontSize,
    toggleDisplayMode,
    setFontType,
  } = useMushafSettingsStore();

  const { setActiveView } = useMushafNavigationStore();

  /**
   * Handles returning to reading view
   */
  const handleBackToReading = useCallback(() => {
    setActiveView("surah-view");
  }, [setActiveView]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-6">
      {/* Page Title */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-semibold text-primary">الإعدادات</h1>
      </div>

      {/* Settings Card */}
      <Card className="overflow-hidden shadow-sm">
        {/* Font Size controls */}
        <FontSizeControl
          fontSize={fontSize}
          fontType={fontType}
          onIncrease={increaseFontSize}
          onDecrease={decreaseFontSize}
        />

        <Separator />

        {/* Font Type selector */}
        <FontTypeSelector currentFont={fontType} onFontChange={setFontType} />

        <Separator />

        {/* Display Mode selector */}
        <DisplayModeSelector
          displayMode={displayMode}
          onToggleMode={toggleDisplayMode}
        />

        <Separator />

        {/* Theme toggle */}
        <ThemeToggle />

        <Separator className="my-0" />

        {/* About section */}
        <CardContent className="p-4 bg-muted/5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>تطبيق القرآن الكريم</span>
            <span className="font-medium">v1.0.0</span>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="mt-6 bg-background/80 backdrop-blur-sm border rounded-lg overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-row gap-3 p-4">
          <Button
            onClick={handleBackToReading}
            variant="secondary"
            size="lg"
            className="flex-1"
          >
            <span className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              العودة للقراءة
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

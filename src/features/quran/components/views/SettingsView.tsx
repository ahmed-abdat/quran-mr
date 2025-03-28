"use client";

import { Button } from "@/components/ui/button";
import { useMushafNavigationStore } from "@/features/quran/store/useMushafNavigationStore";
import { useMushafSettingsStore } from "@/features/quran/store/useMushafSettingsStore";
import { useState, useEffect } from "react";
import {
  Check,
  Rows,
  AlignJustify,
  Minus,
  Plus,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTheme } from "next-themes";

/**
 * SettingsView component
 * Displays and manages settings for the Quran app with an enhanced UI
 */
export function SettingsView() {
  const {
    fontSize,
    displayMode,
    increaseFontSize,
    decreaseFontSize,
    toggleDisplayMode,
  } = useMushafSettingsStore();

  const { setActiveView } = useMushafNavigationStore();
  const { theme, setTheme } = useTheme();

  const [savedSettings, setSavedSettings] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [initialSettings, setInitialSettings] = useState({
    fontSize,
    displayMode,
    theme: theme || "light",
  });

  // Track changes by comparing current settings with initial settings
  useEffect(() => {
    const settingsChanged =
      fontSize !== initialSettings.fontSize ||
      displayMode !== initialSettings.displayMode ||
      theme !== initialSettings.theme;
    setHasChanges(settingsChanged);
  }, [fontSize, displayMode, theme, initialSettings]);

  const handleSave = () => {
    if (!hasChanges) return;

    setSavedSettings(true);

    // Prepare changes summary
    const changes = [];
    if (fontSize !== initialSettings.fontSize) {
      changes.push(`حجم الخط: ${initialSettings.fontSize} → ${fontSize}`);
    }
    if (displayMode !== initialSettings.displayMode) {
      changes.push(
        `طريقة العرض: ${
          initialSettings.displayMode === "continuous" ? "متصل" : "منفصل"
        } → ${displayMode === "continuous" ? "متصل" : "منفصل"}`
      );
    }
    if (theme !== initialSettings.theme) {
      changes.push(
        `المظهر: ${initialSettings.theme === "dark" ? "داكن" : "فاتح"} → ${
          theme === "dark" ? "داكن" : "فاتح"
        }`
      );
    }

    // Show toast with changes
    toast.success("تم حفظ الإعدادات", {
      description: changes.join("\n"),
    });

    // Update initial settings after save
    setInitialSettings({
      fontSize,
      displayMode,
      theme: theme || "light",
    });
    setHasChanges(false);

    setTimeout(() => setSavedSettings(false), 2000);
  };

  const handleBackToReading = () => {
    if (hasChanges) {
      toast("لم يتم حفظ التغييرات", {
        description: "اضغط على حفظ الإعدادات لحفظ التغييرات",
      });
      return;
    }
    setActiveView("surah-view");
  };

  const handleFontSizeChange = (increase: boolean) => {
    if (increase) {
      increaseFontSize();
    } else {
      decreaseFontSize();
    }
  };

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Title */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-semibold text-primary">الإعدادات</h1>
      </div>

      {/* Settings sections */}
      <div className="space-y-4 bg-card rounded-xl overflow-hidden border shadow-sm">
        {/* Font Size controls */}
        <div className="p-6 space-y-3">
          <h2 className="text-lg font-semibold">حجم الخط</h2>
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
            <Button
              onClick={() => handleFontSizeChange(false)}
              variant="ghost"
              size="icon"
              disabled={fontSize <= 18}
              className="hover:bg-background/50"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-medium tabular-nums">
                {fontSize}
              </span>
              <span className="text-xs text-muted-foreground">حجم الخط</span>
            </div>
            <Button
              onClick={() => handleFontSizeChange(true)}
              variant="ghost"
              size="icon"
              disabled={fontSize >= 40}
              className="hover:bg-background/50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Display Mode selector */}
        <div className="p-6 space-y-3 border-t bg-card">
          <h2 className="text-lg font-semibold">طريقة عرض الآيات</h2>
          <div className="space-y-2">
            <button
              onClick={
                displayMode !== "continuous" ? toggleDisplayMode : undefined
              }
              className={cn(
                "w-full text-right px-4 py-3 rounded-lg transition-all",
                "flex items-center gap-3",
                displayMode === "continuous"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/50"
              )}
            >
              <AlignJustify className="h-4 w-4 opacity-90" />
              <span>عرض متصل (نص مستمر)</span>
            </button>
            <button
              onClick={
                displayMode !== "separate" ? toggleDisplayMode : undefined
              }
              className={cn(
                "w-full text-right px-4 py-3 rounded-lg transition-all",
                "flex items-center gap-3",
                displayMode === "separate"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/50"
              )}
            >
              <Rows className="h-4 w-4 opacity-90" />
              <span>عرض منفصل (كل آية في سطر)</span>
            </button>
          </div>
        </div>

        {/* Theme toggle */}
        <div className="p-6 space-y-3 border-t bg-card">
          <h2 className="text-lg font-semibold">المظهر</h2>
          <button
            onClick={handleThemeChange}
            className="w-full text-right px-4 py-3 rounded-lg transition-all flex items-center justify-between hover:bg-muted/50"
          >
            <span>{theme === "dark" ? "المظهر الداكن" : "المظهر الفاتح"}</span>
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* About section */}
        <div className="p-6 space-y-2 border-t bg-muted/10">
          <h2 className="text-lg font-semibold">عن التطبيق</h2>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>تطبيق القرآن الكريم</span>
            <span className="font-medium">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t">
        <div className="max-w-2xl mx-auto flex flex-col gap-2">
          <Button
            onClick={handleSave}
            className="w-full"
            variant={savedSettings ? "outline" : "default"}
            size="lg"
            disabled={!hasChanges}
          >
            {savedSettings ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                تم الحفظ
              </span>
            ) : hasChanges ? (
              "حفظ الإعدادات"
            ) : (
              "لا توجد تغييرات"
            )}
          </Button>

          <Button
            onClick={handleBackToReading}
            variant="ghost"
            size="lg"
            className="w-full"
          >
            <span className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              العودة للقراءة
            </span>
          </Button>
        </div>
      </div>

      {/* Safe area for fixed buttons */}
      <div className="h-32" />
    </div>
  );
}

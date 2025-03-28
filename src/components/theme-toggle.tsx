"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we have access to the theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast.success(
      newTheme === "light" ? "تم تفعيل الوضع النهاري" : "تم تفعيل الوضع الليلي",
      {
        description:
          newTheme === "light"
            ? "تم تغيير المظهر إلى الوضع النهاري"
            : "تم تغيير المظهر إلى الوضع الليلي",
      }
    );
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
      >
        <span className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      className="text-muted-foreground hover:text-foreground"
      title={theme === "light" ? "الوضع الليلي" : "الوضع النهاري"}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">تبديل السمة</span>
    </Button>
  );
}

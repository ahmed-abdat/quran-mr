"use client";

import { ThemeProvider } from "@/components/theme-provider";

interface GlobalProvidersProps {
  children: React.ReactNode;
}

/**
 * Global providers wrapper component
 * Wraps the application with all necessary providers:
 * - ThemeProvider: Handles light/dark mode theming
 * Add more providers here as needed
 */
export function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

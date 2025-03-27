"use client";

import { ThemeProvider } from "@/components/ThemeProvider";

interface GlobalProvidersProps {
  children: React.ReactNode;
}

/**
 * Global providers wrapper component
 * Wraps the application with all necessary providers
 */
export function GlobalProviders({ children }: GlobalProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

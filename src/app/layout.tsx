import { GlobalProviders } from "@/components/providers/globa-provider";
import "./globals.css";
import {
  surahNamesFont,
  warshFont,
  qalounFont,
} from "./font/fonts";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "القرآن الكريم",
  description: "تطبيق القرآن الكريم للقراءة والبحث",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${warshFont.variable} ${qalounFont.variable} ${surahNamesFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalProviders>
          <Toaster
            position="top-center"
            duration={2000}
            // richColors
          />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}

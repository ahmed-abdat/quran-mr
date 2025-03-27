import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { uthmanicFont } from "./font/fonts";
import { GlobalProviders } from "@/components/providers/globa-provider";

export const metadata: Metadata = {
  title: "تطبيق القرآن",
  description: "تطبيق قراءة القرآن بخط ورش العثماني",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${uthmanicFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}

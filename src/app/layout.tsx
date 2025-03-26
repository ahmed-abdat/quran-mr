import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { uthmanicFont } from "./font/fonts";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

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
        className={`${inter.className} ${uthmanicFont.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

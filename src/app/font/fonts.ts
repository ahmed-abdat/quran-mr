import localFont from "next/font/local";

// Uthmanic Warsh font (existing)
export const uthmanicFont = localFont({
  src: "./uthmanic_warsh_v21.ttf",
  variable: "--font-uthmanic",
  display: "swap",
  preload: true,
});

// Uthmanic Hafs font (new)
export const uthmanicHafsFont = localFont({
  src: "./uthmanic_hafs/UthmanicHafs1Ver18.ttf",
  variable: "--font-uthmanic-hafs",
  display: "swap",
  preload: true,
});

// Surah Names font (new)
export const surahNamesFont = localFont({
  src: "./surah-names/v1/sura_names.woff2",
  variable: "--font-surah-names",
  display: "swap",
});

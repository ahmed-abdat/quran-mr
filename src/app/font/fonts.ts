import localFont from "next/font/local";

// Warsh font
export const warshFont = localFont({
  src: "./UthmanicWarsh_v2-1 font/uthmanic_warsh_v21.ttf",
  variable: "--font-warsh",
  display: "swap",
  preload: true,
});

// Qaloun font
export const qalounFont = localFont({
  src: "./UthmanicQaloun_v2-1 font/uthmanic_qaloun_v21.ttf",
  variable: "--font-qaloun",
  display: "swap",
  preload: true,
});



// Surah Names font
export const surahNamesFont = localFont({
  src: "./surah-names/sura_names.ttf",
  variable: "--font-surah-names",
  display: "swap",
});

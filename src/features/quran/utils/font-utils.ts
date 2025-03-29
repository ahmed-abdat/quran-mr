import { FontType } from "@/features/quran/types";

/**
 * Centralized font configuration
 * Contains all font-related information in one place
 */
export const QURAN_FONTS = {
  warsh: {
    class: "font-arabic",
    displayName: "ورش المغاربي",
  },
  qaloun: {
    class: "font-arabic-qaloun",
    displayName: "قالون المدني",
  },
} as const;

/**
 * Get all available font types
 */
export function getAvailableFontTypes(): FontType[] {
  return Object.keys(QURAN_FONTS) as FontType[];
}

/**
 * Gets the CSS class name for a given font type
 */
export function getFontClass(fontType: FontType): string {
  return QURAN_FONTS[fontType].class;
}

/**
 * Gets the human-readable Arabic name for a font type
 */
export function getFontTypeName(fontType: FontType): string {
  return QURAN_FONTS[fontType].displayName;
}

/**
 * Get font configuration by type
 * @param fontType - The font type to get configuration for
 * @returns The full font configuration object
 */
export function getFontConfig(fontType: FontType) {
  return QURAN_FONTS[fontType];
}

import { QuranError } from "../types/mushaf-types";

/**
 * Handles QuranError types with appropriate user feedback
 */
export const handleQuranError = (error: QuranError): void => {
  switch (error.type) {
    case "SURAH_NOT_FOUND":
      console.error(`السورة غير موجودة: ${error.id}`);
      break;

    case "AYAH_NOT_FOUND":
      console.error(`الآية غير موجودة في السورة ${error.surahId}`);
      break;

    case "INVALID_NAVIGATION":
      console.error(`خطأ في التنقل من ${error.from} إلى ${error.to}`);
      break;

    case "DATA_PROCESSING_ERROR":
      console.error("حدث خطأ في معالجة البيانات");
      console.error(error.message);
      break;

    default:
      console.error("حدث خطأ غير متوقع");
  }
};

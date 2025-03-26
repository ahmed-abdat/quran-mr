export interface Ayah {
  id: number;
  jozz: number;
  page: string;
  sura_no: number;
  sura_name_en: string;
  sura_name_ar: string;
  line_start: number;
  line_end: number;
  aya_no: number;
  aya_text: string;
}

export interface Surah {
  number: number;
  name_en: string;
  name_ar: string;
  ayahs: Ayah[];
}

export interface QuranData {
  surahs: Surah[];
}

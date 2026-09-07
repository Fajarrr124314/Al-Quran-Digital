import axios from 'axios';

const BASE_URL = 'https://api.quran.com/api/v4';

export interface TranslatedName {
  language_name: string;
  name: string;
}

export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
}

export interface Translation {
  id: number;
  resource_id: number;
  text: string;
}

export interface AudioRecitation {
  url: string;
}

export interface Transliteration {
  text: string | null;
}

export interface Word {
  id: number;
  position: number;
  char_type_name: string;
  transliteration?: Transliteration;
}

export interface Ayah {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  text_uthmani_tajweed: string;
  translations: Translation[];
  audio: AudioRecitation;
  words: Word[];
  teksLatin?: string;
}

export interface SurahDetail extends Surah {
  ayat: Ayah[];
}

export interface DoaItem {
  id: number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
}

export interface KotaItem {
  id: string;
  lokasi: string;
}

export interface JadwalShalat {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  date: string;
}

export const getSurahList = async (): Promise<Surah[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/chapters?language=id`);
    return response.data.chapters;
  } catch (error) {
    console.error('Error fetching surah list:', error);
    throw error;
  }
};

export const getSurahDetail = async (id: number, reciterId: number = 7): Promise<SurahDetail> => {
  try {
    // Fetch chapter info from Quran.com, verses from Quran.com, and latin from equran.id simultaneously
    const [chapterRes, versesRes, equranRes] = await Promise.all([
      axios.get(`${BASE_URL}/chapters/${id}?language=id`),
      axios.get(`${BASE_URL}/verses/by_chapter/${id}?language=id&words=false&translations=33,57&fields=text_uthmani,text_uthmani_tajweed&audio=${reciterId}&per_page=300`),
      axios.get(`https://equran.id/api/v2/surat/${id}`)
    ]);

    const chapter = chapterRes.data.chapter;
    const quranComVerses = versesRes.data.verses;
    const equranVerses = equranRes.data.data.ayat;

    // Merge equran latin text into quranComVerses
    const mergedVerses = quranComVerses.map((verse: any, index: number) => {
      return {
        ...verse,
        teksLatin: equranVerses[index]?.teksLatin || ''
      };
    });
    
    return {
      ...chapter,
      ayat: mergedVerses,
    };
  } catch (error) {
    console.error(`Error fetching surah detail for ${id}:`, error);
    throw error;
  }
};

export const fetchDoaList = async (): Promise<DoaItem[]> => {
  try {
    const response = await axios.get('https://equran.id/api/doa');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching doa list:', error);
    throw error;
  }
};

export const fetchKotaList = async (): Promise<KotaItem[]> => {
  try {
    const response = await axios.get('https://api.myquran.com/v2/sholat/kota/semua');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching kota list:', error);
    throw error;
  }
};

export const fetchJadwalShalat = async (idKota: string, tahun: string, bulan: string, tanggal: string): Promise<JadwalShalat> => {
  try {
    const response = await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${idKota}/${tahun}/${bulan}/${tanggal}`);
    return response.data.data.jadwal;
  } catch (error) {
    console.error('Error fetching jadwal shalat:', error);
    throw error;
  }
};

const api = async (): Promise<IRes> => {
  const res = await fetch('http://139.59.156.77/test.json');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  const data = await res.json();
  return data;
};

export const mapping = {};
export default api;

export type ICategorie = {
  kategori_aciklamasi: string;
  kategori_ismi: string;
  kategori_id: number;
};

export type IProduct = {
  garanti: {
    sure: string;
    turu: string;
  };
  kampanyalar: string[];
  urunAciklamasi: string;
  urunAdi: string;
  urunFiyati: number;
  urunFotograflari: string[];
  urunID: number;
  urunIndirim: boolean;
  urunKategorisi: string;
  urunIndirimTutari: number;
};

export type IRes = {
  kategoriler: ICategorie[];
  urunler: IProduct[];
};

import { Registrasi } from "./registrasi";
import { TahunAjaran } from "./tahun_ajaran";

export type Portal = {
  id: string;
  tahun_ajaran_id: string;
  waktu_mulai: string;
  waktu_selesai: string;
  status: "AKTIF" | "NONAKTIF";
  created_at?: string;
  updated_at?: string;

  //relasi
  tahun_ajaran: TahunAjaran | null;
  registrasi?: Registrasi[];
};

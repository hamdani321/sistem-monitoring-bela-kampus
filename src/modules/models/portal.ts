import { Kelompok } from "./kelompok";
import { Registrasi } from "./registrasi";
import { TahunAjaran } from "./tahun_ajaran";

export type Portal = {
  id: number;
  tahun_ajaran_id: number;
  waktu_mulai: string;
  waktu_selesai: string;
  status: "AKTIF" | "NONAKTIF";
  created_at?: string;
  updated_at?: string;

  //relasi
  tahun_ajaran: TahunAjaran | null;
  kelompok?: Kelompok[] | null;
  registrasi?: Registrasi[];
};

import { Mahasiswa } from "./mahasiswa";

export type KelompokAnggota = {
  id: number;
  kelompok_id: number;
  nim_mahasiswa: number;
  created_at: string;
  updated_at: string;

  //relasi

  mahasiswa?: Mahasiswa;
};

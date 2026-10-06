import { KelompokAnggota } from "./kelompok_anggota";
import { Mahasiswa } from "./mahasiswa";
import { Registrasi } from "./registrasi";

export type Kelompok = {
  id: number;
  nim_mahasiswa: number;
  nama: string;
  status: string;
  created_at: string;
  updated_at: string;

  //relasi
  mahasiswa: Mahasiswa;
  kelompok_anggota: KelompokAnggota[];
  registrasi: Registrasi;
};

import { Mahasiswa } from "./mahasiswa";

export type Kelas = {
  id: number;
  nama: string;
  prodi_id: string;
  dosen_id: string;
  created_at: string;
  updated_at: string;

  //relasi
  mahasiswa: Mahasiswa[];
};

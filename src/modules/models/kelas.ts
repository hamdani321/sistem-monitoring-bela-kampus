import { Mahasiswa } from "./mahasiswa";
import { Prodi } from "./prodi";

export type Kelas = {
  id: string;
  nama: string;
  prodi_id: string;
  dosen_id: string;
  created_at: string;
  updated_at: string;

  //relasi
  mahasiswa: Mahasiswa[];
  prodi: Prodi;
};

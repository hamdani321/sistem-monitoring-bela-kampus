import { Kelas } from "./kelas";
import { Prodi } from "./prodi";
import { Undangan } from "./undangan";

export type Mahasiswa = {
  id: number;
  nama: string;
  email: string;
  nim: number;
  prodi_id: number;
  kelas_id: number;
  jenis_kelamin: string;
  created_at: string;
  updated_at: string;

  //relasi
  prodi: Prodi;
  kelas: Kelas;
  undangan: Undangan[];
};

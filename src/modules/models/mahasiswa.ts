import { Kelas } from "./kelas";
import { Prodi } from "./prodi";
import { Registrasi } from "./registrasi";
import { RegistrasiAnggota } from "./registrasi_anggota";

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
  registrasi: Registrasi[];
  registrasi_anggota: RegistrasiAnggota[];
};

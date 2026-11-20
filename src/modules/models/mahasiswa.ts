import { Kelas } from "./kelas";
import { Prodi } from "./prodi";
import { Registrasi } from "./registrasi";
import { RegistrasiAnggota } from "./registrasi_anggota";

export type Mahasiswa = {
  id: string;
  nama: string;
  email: string;
  nim: string;
  prodi_id: string;
  kelas_id: string;
  jenis_kelamin: string;
  created_at: string;
  updated_at: string;

  //relasi
  prodi: Prodi;
  kelas: Kelas;
  registrasi: Registrasi[];
  registrasi_anggota: RegistrasiAnggota[];
};

import { Mahasiswa } from "./mahasiswa";
import { Registrasi } from "./registrasi";

export type RegistrasiAnggota = {
  id: number;
  registrasi_id: number;
  nim_mahasiswa: number;
  created_at: string;
  updated_at: string;

  //relasi
  mahasiswa: Mahasiswa;
  registrasi: Registrasi;
};

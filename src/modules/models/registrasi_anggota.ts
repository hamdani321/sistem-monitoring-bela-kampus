import { Mahasiswa } from "./mahasiswa";
import { Registrasi } from "./registrasi";

export type RegistrasiAnggota = {
  id: string;
  registrasi_id: string;
  nim_mahasiswa: string;
  created_at: string;
  updated_at: string;

  //relasi
  mahasiswa: Mahasiswa;
  registrasi: Registrasi;
};

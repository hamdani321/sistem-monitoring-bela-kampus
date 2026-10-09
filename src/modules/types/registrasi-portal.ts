import { Mahasiswa } from "../models/mahasiswa";

export type RegistrasiPortal = {
  portal_id: string | undefined;
  tipe: string;
  sekolah_id: string;
  nama_kelompok?: string;
  anggota_registrasi: Mahasiswa[];
};

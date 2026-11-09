import { Mahasiswa } from "../models/mahasiswa";

export interface MahasiswaResponse {
  message: string;
  data: Mahasiswa;
}
export interface MahasiswaPayload {
  nama: string;
  email: string;
  nim: string;
  kode_prodi: string;
  kelas_id: string;
  jenis_kelamin: string; //"Pilih" | "Laki-Laki" | "Perempuan";
  //users
  username: string;
  password: string;
  password_confirmation: string;
}

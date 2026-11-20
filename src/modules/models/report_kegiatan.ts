import { FotoKegiatan } from "./foto_kegiatan";
import { Mahasiswa } from "./mahasiswa";

export type ReportKegiatan = {
  id: string;
  registrasi_id: string;
  nim_mahasiswa: string;
  nama_pic: string;
  nomor_hp_pic: string;
  video: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;

  //relasi
  mahasiswa: Mahasiswa;
  foto: FotoKegiatan[];
};

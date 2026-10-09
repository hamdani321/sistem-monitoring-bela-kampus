import { Kelompok } from "./kelompok";
import { Mahasiswa } from "./mahasiswa";
import { Portal } from "./portal";
import { RegistrasiAnggota } from "./registrasi_anggota";
import { ReportKegiatan } from "./report_kegiatan";
import { Sekolah } from "./sekolah";

export type Registrasi = {
  id: number;
  portal_id: number;
  sekolah_id: number;
  nim_mahasiswa: number;
  tipe: string;
  status: string;
  created_at: string;
  updated_at: string;

  //relasi
  portal: Portal;
  sekolah: Sekolah;
  mahasiswa: Mahasiswa;
  kelompok: Kelompok;
  report_kegiatan: ReportKegiatan[];
  registrasi_anggota: RegistrasiAnggota[];
};

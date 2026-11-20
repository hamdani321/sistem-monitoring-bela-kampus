import { Mahasiswa } from "./mahasiswa";
import { Portal } from "./portal";
import { RegistrasiAnggota } from "./registrasi_anggota";
import { ReportKegiatan } from "./report_kegiatan";
import { Sekolah } from "./sekolah";

export type Registrasi = {
  id: string;
  portal_id: string;
  sekolah_id: string;
  nim_mahasiswa: string;
  tipe: "Individu" | "Kelompok";
  status: string;
  created_at: string;
  updated_at: string;

  //relasi
  portal: Portal;
  sekolah: Sekolah;
  mahasiswa: Mahasiswa;
  report_kegiatan: ReportKegiatan[];
  registrasi_anggota: RegistrasiAnggota[];
};

import { Kelompok } from "./kelompok";
import { Mahasiswa } from "./mahasiswa";

export type Undangan = {
  id: number;
  nim_mahasiswa: number;
  kelompok_id: number;
  status: "Request" | "Accept";
  created_at: string;
  updated_at: string;

  //relasi
  kelompok: Kelompok;
  mahasiswa: Mahasiswa;
};

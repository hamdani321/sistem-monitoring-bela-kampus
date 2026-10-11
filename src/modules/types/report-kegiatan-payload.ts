export type ReportKegiatanPayload = {
  nama_pic: string;
  nomor_hp_pic: string;
  foto: File | null;
  link_video: string;
  deskripsi: string;
  registrasi_id: number | undefined;
};

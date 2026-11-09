export class MahasiswaErrors {
  message?: string;
  errors: {
    nama: string[] | null;
    email: string[] | null;
    nim: string[] | null;
    kode_prodi: string[] | null;
    kelas_id: string[] | null;
    jenis_kelamin: string[] | null;
  } | null = null;
}

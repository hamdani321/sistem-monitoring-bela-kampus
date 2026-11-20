export class MahasiswaErrors {
  message?: string;
  errors: {
    nama: string[] | null;
    email: string[] | null;
    nim: string[] | null;
    kode_prodi: string[] | null;
    kelas_id: string[] | null;
    jenis_kelamin: string[] | null;
    username: string[] | null;
    password: string[] | null;
    password_confirmation: string[] | null;
  } | null = null;
}

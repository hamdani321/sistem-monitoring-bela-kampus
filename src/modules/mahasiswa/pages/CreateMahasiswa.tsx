import Form from "@/components/form/Form";
import { FormEvent, useEffect, useState } from "react";

type MahasiswaPayload = {
  nama: string;
  email: string;
  nim: string;
  kode_prodi: string;
  kelas_id: string;
  jenis_kelamin: "Pilih" | "Laki-laki" | "Perempuan";
  //users
  username: string;
  password: string;
  password_confirmation: string;
};

export default function CreateMahasiswa() {
  const [form, setForm] = useState<MahasiswaPayload>({
    nama: "",
    email: "",
    nim: "",
    kode_prodi: "",
    kelas_id: "",
    jenis_kelamin: "Pilih",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // const formData = new FormData(e.currentTarget);
    // const data = Object.fromEntries(formData.entries());

    console.log(form);
    // Kirim data ke API Laravel di sini
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  async function fetchDataForm() {
    const [response] = await Promise.all([]);
  }

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-50/80 p-4 sm:p-6 lg:p-2">
      <div className="mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m6-10a4 4 0 100-8 4 4 0 000 8zm10-3v6m3-3h-6"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Tambah Mahasiswa
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Lengkapi informasi mahasiswa dan akun pengguna.
            </p>
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Informasi Mahasiswa */}
            <div className="border-b border-gray-100 p-5 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.08 12.08 0 0118 17.5c-3.5 2.3-8.5 2.3-12 0a12.08 12.08 0 01-.16-6.92L12 14zm0 0v6"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">
                    Informasi Mahasiswa
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Identitas dan data akademik mahasiswa.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="nama" className={labelClass}>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nama"
                    value={form.nama}
                    onChange={(e) => {
                      setForm({ ...form, nama: e.target.value });
                    }}
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className={inputClass}
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="nim" className={labelClass}>
                    NIM <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nim"
                    value={form.nim}
                    onChange={(e) => {
                      setForm({ ...form, nim: e.target.value });
                    }}
                    type="text"
                    placeholder="Masukkan NIM mahasiswa"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                    type="email"
                    placeholder="mahasiswa@students.poltek-kampar.ac.id"
                    className={inputClass}
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="prodi_id" className={labelClass}>
                    Program Studi <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="prodi_id"
                    value={form.kode_prodi}
                    onChange={(e) => {
                      setForm({ ...form, kode_prodi: e.target.value });
                    }}
                    className={inputClass}
                    required
                  >
                    <option value="" disabled>
                      Pilih program studi
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="kelas_id" className={labelClass}>
                    Kelas <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="kelas_id"
                    name="kelas_id"
                    value={form.kelas_id}
                    onChange={(e) => {
                      setForm({ ...form, kelas_id: e.target.value });
                    }}
                    defaultValue=""
                    className={inputClass}
                    required
                  >
                    <option value="" disabled>
                      Pilih kelas
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Informasi Akun */}
            <div className="p-5 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Informasi Akun</h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Kredensial untuk login ke sistem.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="username" className={labelClass}>
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="username"
                    value={form.username}
                    onChange={(e) => {
                      setForm({ ...form, username: e.target.value });
                    }}
                    type="text"
                    placeholder="Buat username mahasiswa"
                    className={inputClass}
                    autoComplete="username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                    }}
                    type="password"
                    placeholder="Minimal 8 karakter"
                    minLength={8}
                    className={inputClass}
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password_confirmation" className={labelClass}>
                    Konfirmasi Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password_confirmation"
                    value={form.password_confirmation}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        password_confirmation: e.target.value,
                      });
                    }}
                    type="password"
                    placeholder="Ulangi password"
                    minLength={8}
                    className={inputClass}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.7 3h16.96a2 2 0 001.7-3L13.7 3.86a2 2 0 00-3.4 0z"
                  />
                </svg>
                <p>
                  Pastikan username unik dan kedua password sama. Gunakan
                  password yang kuat untuk keamanan akun.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.98]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Simpan Mahasiswa
              </button>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">
            <span className="text-red-500">*</span> Wajib diisi
          </p>
        </Form>
      </div>
    </div>
  );
}

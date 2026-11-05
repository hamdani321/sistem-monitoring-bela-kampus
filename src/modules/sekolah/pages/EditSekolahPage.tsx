import { Sekolah } from "@/modules/models/sekolah";
import { useEffect, useState } from "react";
import { getSekolahById, updateSekolah } from "../services/sekolah.service";
import { useNavigate, useParams } from "react-router";
import Form from "@/components/form/Form";
import Swal from "sweetalert2";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";

export function EditSekolahPage() {
  const [sekolah, setSekolah] = useState<Sekolah>({
    id: 0,
    npsn: "",
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  async function fetchDataSekolah() {
    const result = await getSekolahById(Number(id));
    setSekolah(result.data);
    setLoading(false);
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateSekolah(sekolah);
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Berhasil update data sekolah!",
      }).then(() => {
        navigate("/sekolah");
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataSekolah();
  }, []);
  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Manajemen Sekolah</span>
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="font-medium text-indigo-600 dark:text-indigo-400">
                Edit Sekolah
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">
              Edit Data Sekolah
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Perbarui informasi identitas, kontak, dan lokasi sekolah.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
              <svg
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 8v4l3 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Mode Pengeditan
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-2 xl:grid-cols-2">
          {/* Main Form */}
          <Form onSubmit={handleSubmit}>
            <div className="space-y-4 xl:col-span-2">
              {/* Identity Information */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                      <path d="M9 9h.01M9 12h.01M9 15h.01M9 18h.01M16 14h.01M16 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Identitas Sekolah
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Informasi dasar dan identitas resmi sekolah
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  {/* NPSN */}
                  <div>
                    <label
                      htmlFor="npsn"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      NPSN <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <path d="M7 8h10M7 12h10M7 16h4" />
                        </svg>
                      </div>
                      <input
                        id="npsn"
                        type="text"
                        onChange={(event) => {
                          setSekolah({ ...sekolah, npsn: event.target.value });
                        }}
                        value={sekolah?.npsn ?? "-"}
                        placeholder="Masukkan NPSN sekolah"
                        className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-gray-400">
                      Nomor Pokok Sekolah Nasional.
                    </p>
                  </div>

                  {/* Nama Sekolah */}
                  <div>
                    <label
                      htmlFor="nama"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Nama Sekolah <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                        </svg>
                      </div>
                      <input
                        id="nama"
                        type="text"
                        onChange={(event) => {
                          setSekolah({ ...sekolah, nama: event.target.value });
                        }}
                        value={sekolah?.nama ?? "-"}
                        placeholder="Contoh: SMA Negeri 1 Pekanbaru"
                        className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72l.45 3.06a2 2 0 0 1-.57 1.7L8.1 11.32a16 16 0 0 0 4.58 4.58l1.84-1.84a2 2 0 0 1 1.7-.57l3.06.45a2 2 0 0 1 1.72 1.98Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Informasi Kontak
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Email dan nomor telepon yang dapat dihubungi
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email Sekolah <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        onChange={(event) => {
                          setSekolah({ ...sekolah, email: event.target.value });
                        }}
                        value={sekolah?.email ?? "-"}
                        placeholder="sekolah@email.com"
                        className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Telepon */}
                  <div>
                    <label
                      htmlFor="telepon"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.08 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72l.45 3.06a2 2 0 0 1-.57 1.7L8.1 11.32a16 16 0 0 0 4.58 4.58l1.84-1.84a2 2 0 0 1 1.7-.57l3.06.45a2 2 0 0 1 1.72 1.98Z" />
                        </svg>
                      </div>
                      <input
                        id="telepon"
                        type="tel"
                        onChange={(event) => {
                          setSekolah({
                            ...sekolah,
                            telepon: event.target.value,
                          });
                        }}
                        value={sekolah?.telepon ?? "-"}
                        placeholder="Contoh: 081234567890"
                        className="block w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-gray-400">
                      Nomor telepon atau WhatsApp sekolah.
                    </p>
                  </div>

                  {/* Alamat */}
                  <div>
                    <label
                      htmlFor="alamat"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Alamat Lengkap <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                          <circle cx="12" cy="10" r="2.5" />
                        </svg>
                      </div>
                      <textarea
                        id="alamat"
                        name="alamat"
                        onChange={(event) => {
                          setSekolah({
                            ...sekolah,
                            alamat: event.target.value,
                          });
                        }}
                        value={sekolah?.alamat ?? "-"}
                        rows={4}
                        placeholder="Masukkan alamat lengkap sekolah..."
                        className="block w-full resize-y rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-gray-800 sm:px-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                      Koordinat Lokasi
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Titik geografis lokasi sekolah
                    </p>
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Latitude */}
                    <div>
                      <label
                        htmlFor="latitude"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Latitude <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="latitude"
                        type="number"
                        onChange={(event) => {
                          setSekolah({
                            ...sekolah,
                            latitude: event.target.value,
                          });
                        }}
                        value={sekolah?.latitude ?? "-"}
                        placeholder="Contoh: 0.3296148"
                        className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-800 outline-none transition placeholder:font-sans placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>

                    {/* Longitude */}
                    <div>
                      <label
                        htmlFor="longitude"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Longitude <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="longitude"
                        type="number"
                        onChange={(event) => {
                          setSekolah((prevState) => ({
                            ...prevState,
                            longitude: event.target.value,
                          }));
                        }}
                        value={sekolah?.longitude ?? "-"}
                        placeholder="Contoh: 101.0327029"
                        className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 font-mono text-sm text-gray-800 outline-none transition placeholder:font-sans placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 11v5M12 7h.01" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                        Petunjuk koordinat
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-blue-700 dark:text-blue-400">
                        Pastikan latitude dan longitude sesuai dengan titik
                        lokasi sekolah yang sebenarnya. Koordinat ini akan
                        digunakan untuk menampilkan lokasi sekolah pada peta
                        Bela Kampus.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-gray-400">
                  <span className="text-red-500">*</span> Wajib diisi
                </p>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Batal
                  </button>

                  <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <ButtonSpinner text="Mohon tunggu..." />
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
                          <path d="M17 21v-8H7v8M7 3v5h8" />
                        </svg>
                        Simpan Perubahan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Form>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Tips Card */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M9 18h6M10 22h4M8 14c-1.2-.9-2-2.4-2-4a6 6 0 1 1 12 0c0 1.6-.8 3.1-2 4-.7.6-1 1.3-1 2H9c0-.7-.3-1.4-1-2Z" />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Panduan Pengisian
                  </h3>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Identitas Sekolah
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      Pastikan NPSN dan nama sekolah sesuai dengan data resmi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    2
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Informasi Kontak
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      Gunakan email dan nomor telepon sekolah yang masih aktif.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      Lokasi Sekolah
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                      Periksa kembali koordinat agar lokasi sekolah tampil
                      akurat pada peta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reminder Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white shadow-lg shadow-indigo-600/10">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10" />

              <div className="relative">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 2 3 7v5c0 5.5 3.8 8.8 9 10 5.2-1.2 9-4.5 9-10V7l-9-5Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <h3 className="text-sm font-bold">Periksa Kembali Data</h3>
                <p className="mt-2 text-xs leading-relaxed text-indigo-100">
                  Data sekolah yang akurat membantu tim PMB mengelola kunjungan
                  dan memantau kegiatan promosi Bela Kampus dengan lebih baik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

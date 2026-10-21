import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Sekolah } from "@/modules/models/sekolah";
import { createSekolah } from "../services/sekolah.service";
import Swal from "sweetalert2";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";

const initialForm: Sekolah = {
  nama: "",
  email: "",
  alamat: "",
  telepon: "",
  latitude: "",
  longitude: "",
  id: 0,
  created_at: "",
  updated_at: "",
};

export default function CreateSekolah() {
  const [form, setForm] = useState<Sekolah>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Sekolah, string>>>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama sekolah wajib diisi.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!form.alamat.trim()) {
      newErrors.alamat = "Alamat sekolah wajib diisi.";
    }

    if (!form.telepon.trim()) {
      newErrors.telepon = "Nomor telepon wajib diisi.";
    }

    if (form.latitude.trim() === "") {
      newErrors.latitude = "Latitude wajib diisi.";
    } else if (
      !Number.isFinite(Number(form.latitude)) ||
      Number(form.latitude) < -90 ||
      Number(form.latitude) > 90
    ) {
      newErrors.latitude = "Latitude harus antara -90 dan 90.";
    }

    if (form.longitude.trim() === "") {
      newErrors.longitude = "Longitude wajib diisi.";
    } else if (
      !Number.isFinite(Number(form.longitude)) ||
      Number(form.longitude) < -180 ||
      Number(form.longitude) > 180
    ) {
      newErrors.longitude = "Longitude harus antara -180 dan 180.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!validate()) {
      setLoading(false);
      return;
    }

    // Hubungkan ke API Laravel di sini.

    try {
      await createSekolah(form);
      Swal.fire({
        title: "Sukses!",
        text: "Berhasil tambah sekolah!",
        icon: "success",
      });
      setLoading(false);
    } catch (error) {}
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  return (
    <ComponentCard title="Form Tambah Sekolah">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Sekolah */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Nama Sekolah */}
          <div className="md:col-span-2">
            <label
              htmlFor="nama"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Nama Sekolah
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="text"
              id="nama"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama sekolah"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {errors.nama && (
              <p className="mt-1.5 text-sm text-red-500">{errors.nama}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Email Sekolah
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="sekolah@email.com"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Telepon */}
          <div>
            <label
              htmlFor="telepon"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Nomor Telepon
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              type="tel"
              id="telepon"
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {errors.telepon && (
              <p className="mt-1.5 text-sm text-red-500">{errors.telepon}</p>
            )}
          </div>

          {/* Alamat */}
          <div className="md:col-span-2">
            <label
              htmlFor="alamat"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Alamat Sekolah
              <span className="ml-1 text-red-500">*</span>
            </label>

            <textarea
              id="alamat"
              name="alamat"
              rows={4}
              value={form.alamat}
              onChange={handleChange}
              placeholder="Masukkan alamat lengkap sekolah"
              className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {errors.alamat && (
              <p className="mt-1.5 text-sm text-red-500">{errors.alamat}</p>
            )}
          </div>
        </div>

        {/* Koordinat Lokasi */}
        <div className="border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
              Koordinat Lokasi Sekolah
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Masukkan titik koordinat geografis lokasi sekolah.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Latitude */}
            <div>
              <label
                htmlFor="latitude"
                className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Latitude
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="number"
                id="latitude"
                name="latitude"
                step="any"
                min="-90"
                max="90"
                value={form.latitude}
                onChange={handleChange}
                placeholder="Contoh: -0.3347"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />

              {errors.latitude && (
                <p className="mt-1.5 text-sm text-red-500">{errors.latitude}</p>
              )}

              <p className="mt-1.5 text-xs text-gray-400">
                Rentang nilai: -90 hingga 90
              </p>
            </div>

            {/* Longitude */}
            <div>
              <label
                htmlFor="longitude"
                className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Longitude
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                type="number"
                id="longitude"
                name="longitude"
                step="any"
                min="-180"
                max="180"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Contoh: 101.0250"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />

              {errors.longitude && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.longitude}
                </p>
              )}

              <p className="mt-1.5 text-xs text-gray-400">
                Rentang nilai: -180 hingga 180
              </p>
            </div>
          </div>

          {/* Informasi koordinat */}
          <div className="mt-5 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12Z"
              />
              <circle cx="12" cy="9" r="2.5" />
            </svg>

            <div>
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                Petunjuk koordinat
              </p>
              <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-400">
                Cari lokasi sekolah di Google Maps, kemudian klik titik
                lokasinya untuk memperoleh latitude dan longitude.
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end dark:border-gray-700">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Reset
          </button>

          <button
            disabled={loading}
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            {loading ? (
              <>
                <ButtonSpinner text="Please Wait..." />
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Simpan Sekolah
              </>
            )}
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}

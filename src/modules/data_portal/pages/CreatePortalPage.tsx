import ComponentCard from "../../../components/common/ComponentCard";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Swal from "sweetalert2";
import Form from "@/components/form/Form";
import getTahunAjaran from "@/modules/tahun_ajaran/services/tahun-ajaran.service";
import type { TahunAjaran } from "@/modules/models/tahun_ajaran";
import { createPortal } from "@/modules/portal/services/portal.service";
interface CreatePortalValidationErrors {
  message: string;
  errors: {
    tahun_ajaran_id: string[];
    waktu_mulai: string[];
    waktu_selesai: string[];
  };
}

export function CreatePortalPage() {
  const [tahunAjar, setTahunAjar] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTahunAjaran, setLoadingTahunAjaran] = useState(true);
  const [dataTahunAjaran, setDataTahunAjaran] = useState<TahunAjaran[]>([]);
  const [errors, setErrors] = useState<CreatePortalValidationErrors>();

  useEffect(() => {
    let isMounted = true;

    const fetchTahunAjaran = async () => {
      try {
        const data = await getTahunAjaran();

        if (isMounted) {
          setDataTahunAjaran(data ?? []);
        }
      } catch {
      } finally {
        if (isMounted) {
          setLoadingTahunAjaran(false);
        }
      }
    };

    fetchTahunAjaran();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const result = await createPortal({
        tahunAjar,
        waktuMulai,
        waktuSelesai,
      });

      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: result.message,
      });
      setTahunAjar("");
      setWaktuMulai("");
      setWaktuSelesai("");
    } catch (error: any) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm font-medium text-blue-100">
              MANAJEMEN PORTAL
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Tambah Portal Bela Kampus
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
              Buat portal registrasi baru dengan menentukan tahun ajaran dan
              periode pelaksanaannya.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <ComponentCard title="Informasi Portal">
        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Informasi umum */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-4 dark:border-gray-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Tahun Ajaran
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Pilih tahun ajaran untuk portal yang akan dibuat.
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="tahun_ajaran">
                Tahun Ajaran <span className="text-red-500">*</span>
              </Label>

              <div className="mt-2">
                <Select
                  options={dataTahunAjaran.map((item) => ({
                    value: String(item.id),
                    label: `${item.nama} (${item.jenis})`,
                  }))}
                  placeholder={
                    loadingTahunAjaran
                      ? "Memuat tahun ajaran..."
                      : "Pilih tahun ajaran"
                  }
                  onChange={(value) => {
                    setTahunAjar(value);
                  }}
                  className={`${
                    errors?.errors.tahun_ajaran_id ? "border-red-700" : ""
                  }`}
                />
              </div>
              {errors?.errors?.tahun_ajaran_id?.map((message) => {
                return (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                    {message}
                  </p>
                );
              })}
            </div>

            {/* Periode portal */}
            <div className="flex items-start gap-3 border-b border-gray-200 pb-4 pt-2 dark:border-gray-800">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7v5l3 2"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white">
                  Periode Pelaksanaan
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Tentukan kapan registrasi portal dimulai dan berakhir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Tanggal mulai */}
              <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
                <Label htmlFor="waktu_mulai">
                  Tanggal Mulai <span className="text-red-500">*</span>
                </Label>

                <p className="mb-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Hari pertama portal dapat digunakan.
                </p>

                <input
                  type="datetime-local"
                  value={waktuMulai}
                  onChange={(event) => {
                    setWaktuMulai(event.target.value);
                  }}
                  className={`block w-full rounded-xl border ${
                    errors?.errors?.waktu_mulai
                      ? "border-red-700"
                      : "border-gray-200"
                  } bg-white py-3 pl-3 pr-3 text-sm text-gray-700 shadow-sm outline-none transition hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
                />
                {errors?.errors?.waktu_mulai?.map((message) => {
                  return (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                      {message}
                    </p>
                  );
                })}
              </div>

              {/* Tanggal selesai */}
              <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
                <Label htmlFor="waktu_selesai">
                  Tanggal Selesai <span className="text-red-500">*</span>
                </Label>

                <p className="mb-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Hari terakhir portal menerima registrasi.
                </p>

                <input
                  type="datetime-local"
                  value={waktuSelesai}
                  onChange={(event) => {
                    setWaktuSelesai(event.target.value);
                  }}
                  className={`block w-full rounded-xl border ${
                    errors?.errors?.waktu_selesai
                      ? "border-red-700"
                      : "border-gray-200"
                  } bg-white py-3 pl-3 pr-3 text-sm text-gray-700 shadow-sm outline-none transition hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10`}
                />
                {errors?.errors?.waktu_selesai?.map((message) => {
                  return (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                      {message}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Informasi tambahan */}
            <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11v5M12 8h.01"
                />
              </svg>

              <div>
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                  Informasi
                </p>
                <p className="mt-1 text-sm leading-6 text-blue-700 dark:text-blue-200/80">
                  Pastikan periode pelaksanaan sudah benar. Status aktif portal
                  sebaiknya dikelola terpisah agar admin dapat menentukan kapan
                  portal tersedia untuk mahasiswa.
                </p>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row">
              <Button
                variant="outline"
                disabled={loading}
                onClick={() => {
                  setTahunAjar("");
                  setWaktuMulai("");
                  setWaktuSelesai("");
                }}
              >
                Reset Form
              </Button>

              <Button
                disabled={
                  loading || loadingTahunAjaran || dataTahunAjaran.length === 0
                }
                variant="primary"
              >
                {loading ? "Menyimpan..." : "Simpan Portal"}
              </Button>
            </div>
          </div>
        </Form>
      </ComponentCard>
    </div>
  );
}

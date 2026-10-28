import DatePicker from "@/components/form/date-picker";
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

export function CreatePortal() {
  const [tahunAjar, setTahunAjar] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTahunAjaran, setLoadingTahunAjaran] = useState(true);
  const [dataTahunAjaran, setDataTahunAjaran] = useState<TahunAjaran[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorTahunAjaran, setErrorTahunAjaran] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchTahunAjaran = async () => {
      try {
        const data = await getTahunAjaran();

        if (isMounted) {
          setDataTahunAjaran(data ?? []);
        }
      } catch {
        if (isMounted) {
          setErrorTahunAjaran(
            "Gagal memuat data tahun ajaran. Silakan coba kembali."
          );
        }
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
    setErrors({});

    const validationErrors: Record<string, string> = {};

    if (!tahunAjar) {
      validationErrors.tahunAjar = "Silakan pilih tahun ajaran.";
    }

    if (!waktuMulai) {
      validationErrors.waktuMulai = "Tanggal mulai wajib diisi.";
    }

    if (!waktuSelesai) {
      validationErrors.waktuSelesai = "Tanggal selesai wajib diisi.";
    }

    if (waktuMulai && waktuSelesai && waktuSelesai < waktuMulai) {
      validationErrors.waktuSelesai =
        "Tanggal selesai tidak boleh sebelum tanggal mulai.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const result = await createPortal({
        tahunAjar,
        waktuMulai,
        waktuSelesai,
      });

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: result.message,
        });

        setTahunAjar("");
        setWaktuMulai("");
        setWaktuSelesai("");
        setErrors({});
      } else {
        setErrors((result.errors as Record<string, string>) ?? {});

        if (!result.errors) {
          await Swal.fire({
            icon: "error",
            title: "Gagal membuat portal",
            text: result.message,
            confirmButtonColor: "#2563eb",
          });
        }
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan yang tidak diketahui.";

      await Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: message,
        confirmButtonText: "Tutup",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (value: string) => {
    setTahunAjar(value);
    setErrors((prev) => ({ ...prev, tahunAjar: "" }));
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
                  onChange={handleSelectChange}
                  className="dark:bg-dark-900"
                />
              </div>

              {errors.tahunAjar && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-red-500">
                  <span>!</span>
                  {errors.tahunAjar}
                </p>
              )}

              {errorTahunAjaran && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-300">
                  {errorTahunAjaran}
                  <button
                    type="button"
                    onClick={() => {
                      setErrorTahunAjaran("");
                      setLoadingTahunAjaran(true);

                      getTahunAjaran()
                        .then((data) => setDataTahunAjaran(data ?? []))
                        .catch(() =>
                          setErrorTahunAjaran(
                            "Gagal memuat data tahun ajaran. Silakan coba kembali."
                          )
                        )
                        .finally(() => setLoadingTahunAjaran(false));
                    }}
                    className="ml-2 font-semibold underline underline-offset-2"
                  >
                    Coba lagi
                  </button>
                </div>
              )}
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

                <DatePicker
                  id="waktu_mulai"
                  placeholder="Pilih tanggal mulai"
                  onChange={(_, dateString) => {
                    setWaktuMulai(dateString);
                    setErrors((prev) => ({
                      ...prev,
                      waktuMulai: "",
                      waktuSelesai: "",
                    }));
                  }}
                />

                {errors.waktuMulai && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.waktuMulai}
                  </p>
                )}
              </div>

              {/* Tanggal selesai */}
              <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
                <Label htmlFor="waktu_selesai">
                  Tanggal Selesai <span className="text-red-500">*</span>
                </Label>

                <p className="mb-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Hari terakhir portal menerima registrasi.
                </p>

                <DatePicker
                  id="waktu_selesai"
                  placeholder="Pilih tanggal selesai"
                  onChange={(_, dateString) => {
                    setWaktuSelesai(dateString);
                    setErrors((prev) => ({
                      ...prev,
                      waktuSelesai: "",
                    }));
                  }}
                />

                {errors.waktuSelesai && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.waktuSelesai}
                  </p>
                )}
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
                  setErrors({});
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

// Lama

// import DatePicker from "@/components/form/date-picker";
// import ComponentCard from "../../../components/common/ComponentCard";
// import Label from "../../../components/form/Label";
// import Select from "@/components/form/Select";
// import Button from "@/components/ui/button/Button";
// import { FormEvent, useEffect, useState } from "react";
// // import { createPortal } from "../services/portal.service";
// import Swal from "sweetalert2";
// import Form from "@/components/form/Form";
// import getTahunAjaran from "@/modules/tahun_ajaran/services/tahun-ajaran.service";
// import { TahunAjaran } from "@/modules/models/tahun_ajaran";

// export function CreatePortal() {
//   const [tahunAjar, setTahunAjar] = useState("");
//   const [waktuMulai, setWaktuMulai] = useState("");
//   const [waktuSelesai, setWaktuSelesai] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [dataTahunAjaran, setDataTahunAjaran] = useState<TahunAjaran[]>();
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     const tahunAjaran = async () => {
//       const dataTahunAjaran = await getTahunAjaran();

//       setDataTahunAjaran(dataTahunAjaran);
//     };

//     tahunAjaran();
//   }, []);

//   const handleSubmit = async (event: FormEvent) => {
//     // event.preventDefault();

//     setLoading(true);

//     try {
//       const result = await createPortal({
//         tahunAjar,
//         waktuMulai,
//         waktuSelesai,
//       });
//       if (result.success) {
//         Swal.fire({
//           icon: result.icon,
//           text: result.message,
//         });
//       } else {
//         setErrors(result.errors);
//       }
//     } catch (error) {
//       // console.error("Gagal membuat portal : ", error);

//       if (error instanceof Error) {
//         console.log(error.message);
//         setErrors(error.message);
//       } else {
//         console.log("Terjadi kesalahan yang tidak diketahui.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectChange = (value: string) => {
//     setTahunAjar(value);
//   };
//   return (
//     <>
//       <ComponentCard title="Form Tambah Portal">
//         <Form onSubmit={handleSubmit}>
//           <div className="mt-3">
//             <Label htmlFor="nama">
//               Tahun Ajaran <span className="text-red-600">*</span>
//             </Label>
//             <Select
//               options={
//                 dataTahunAjaran?.map((tahunAjaran) => ({
//                   value: tahunAjaran.id,
//                   label: `${tahunAjaran.nama} (${tahunAjaran.jenis})`,
//                 })) ?? []
//               }
//               placeholder="Select Option"
//               onChange={handleSelectChange}
//               className="dark:bg-dark-900"
//             />
//             {/* <Input type="text" id="nama" /> */}
//           </div>

//           <div className="mt-3">
//             <Label htmlFor="nama">
//               Tanggal Mulai <span className="text-red-600">*</span>
//             </Label>
//             <DatePicker
//               id="waktu_mulai"
//               placeholder="Pilih Tanggal Mulai"
//               onChange={(dates, currentDateString) => {
//                 // Handle your logic
//                 setWaktuMulai(currentDateString);
//               }}
//             />
//           </div>

//           <div className="mt-3">
//             <Label htmlFor="nama">
//               Tanggal Selesai <span className="text-red-600">*</span>
//             </Label>
//             <DatePicker
//               id="waktu_selesai"
//               placeholder="Pilih Tanggal Selesai"
//               onChange={(dates, currentDateString) => {
//                 // Handle your logic
//                 setWaktuSelesai(currentDateString);
//               }}
//             />
//           </div>

//           <div className="mt-3">
//             <Button disabled={loading} variant="primary">
//               Simpan
//             </Button>
//           </div>
//         </Form>
//       </ComponentCard>
//     </>
//   );
// }

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import { Mahasiswa as DataMahasiswa } from "@/modules/models/mahasiswa";
import { getMahasiswa } from "@/modules/mahasiswa/service/mahasiswa.service";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CellStyle, ColDef, ICellRendererParams } from "ag-grid-community";
import MahasiswaTable from "../components/MahasiswaTable";
import { Link } from "react-router";
import Button from "@/components/ui/button/Button";

const nomorCellStyle: CellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
};

const nimCellStyle: CellStyle = {
  color: "#6b7280",
  fontWeight: 500,
};

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState<DataMahasiswa[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMahasiswa = useCallback(async () => {
    const isInitialLoad = mahasiswa.length === 0;

    if (isInitialLoad) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    setError(null);

    try {
      const response = await getMahasiswa();

      if (!response.ok) {
        throw new Error("Gagal mengambil data mahasiswa.");
      }

      const responseBody = await response.json();

      setMahasiswa(responseBody.data ?? []);
    } catch (err) {
      console.error("Gagal mengambil data mahasiswa:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data mahasiswa."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [mahasiswa.length]);

  useEffect(() => {
    void loadMahasiswa();
  }, [loadMahasiswa]);

  const statistik = useMemo(() => {
    const lakiLaki = mahasiswa.filter(
      (item) => item.jenis_kelamin === "L"
    ).length;

    const perempuan = mahasiswa.filter(
      (item) => item.jenis_kelamin === "P"
    ).length;

    const prodiUnik = new Set(
      mahasiswa
        .map((item) => item.prodi?.nama)
        .filter((nama): nama is string => Boolean(nama))
    );

    return {
      total: mahasiswa.length,
      lakiLaki,
      perempuan,
      totalProdi: prodiUnik.size,
    };
  }, [mahasiswa]);

  const colDefs = useMemo<ColDef<DataMahasiswa>[]>(
    () => [
      {
        headerName: "No",
        width: 70,
        minWidth: 70,
        maxWidth: 70,
        pinned: "left",
        sortable: false,
        filter: false,
        resizable: false,
        valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
        cellStyle: nomorCellStyle,
      },
      {
        field: "nama",
        headerName: "Nama Mahasiswa",
        flex: 1.3,
        minWidth: 220,
        autoHeight: true,
        cellRenderer: (params: ICellRendererParams<DataMahasiswa>) => {
          const nama = params.value as string | undefined;

          return (
            <div className="flex h-full items-center gap-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold uppercase text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                {nama?.trim().charAt(0) || "M"}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-800 dark:text-white/90">
                  {nama || "-"}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Mahasiswa
                </p>
              </div>
            </div>
          );
        },
      },
      {
        field: "nim",
        headerName: "NIM",
        flex: 0.8,
        minWidth: 140,
        cellStyle: nimCellStyle,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1.3,
        minWidth: 230,
        cellRenderer: (params: ICellRendererParams<DataMahasiswa>) => {
          const email = params.value as string | undefined;

          return (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4 shrink-0 text-gray-400"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4 7 8 6 8-6"
                />
              </svg>

              <span className="truncate text-sm text-gray-600 dark:text-gray-300">
                {email || "-"}
              </span>
            </div>
          );
        },
      },
      {
        field: "jenis_kelamin",
        headerName: "Jenis Kelamin",
        flex: 0.9,
        minWidth: 150,
        valueFormatter: (params) => {
          switch (params.value) {
            case "L":
              return "Laki-laki";
            case "P":
              return "Perempuan";
            default:
              return params.value ?? "-";
          }
        },
        cellRenderer: (params: ICellRendererParams<DataMahasiswa>) => {
          const jenisKelamin = params.value;
          const isLakiLaki = jenisKelamin === "L";
          const isPerempuan = jenisKelamin === "P";

          const colorClass = isLakiLaki
            ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20"
            : isPerempuan
            ? "bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-500/10 dark:text-pink-400 dark:ring-pink-500/20"
            : "bg-gray-100 text-gray-600 ring-gray-500/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600/30";

          const label =
            jenisKelamin === "L"
              ? "Laki-laki"
              : jenisKelamin === "P"
              ? "Perempuan"
              : "-";

          return (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${colorClass}`}
            >
              {label}
            </span>
          );
        },
      },
      {
        field: "prodi.nama",
        headerName: "Program Studi",
        flex: 1.2,
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams<DataMahasiswa>) => {
          const namaProdi = params.value as string | undefined;

          return (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9 12 4l9 5-9 5-9-5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 12v5c3 2.5 7 2.5 10 0v-5M21 9v6"
                  />
                </svg>
              </div>

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {namaProdi || "-"}
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  // const colDefs = useMemo<ColDef<DataMahasiswa>[]>(
  //   () => [
  //     {
  //       headerName: "No",
  //       width: 70,
  //       minWidth: 70,
  //       maxWidth: 70,
  //       pinned: "left",
  //       sortable: false,
  //       filter: false,
  //       resizable: false,
  //       valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
  //       cellStyle: {
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         color: "#6b7280",
  //       },
  //     },
  //     {
  //       field: "nama",
  //       headerName: "Nama Mahasiswa",
  //       flex: 1.3,
  //       minWidth: 220,
  //       autoHeight: true,
  //       cellRenderer: (params: { value?: string }) => (
  //         <div className="flex h-full items-center gap-3 py-2">
  //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold uppercase text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
  //             {params.value?.trim().charAt(0) || "M"}
  //           </div>

  //           <div className="min-w-0">
  //             <p className="truncate font-semibold text-gray-800 dark:text-white/90">
  //               {params.value || "-"}
  //             </p>
  //             <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
  //               Mahasiswa
  //             </p>
  //           </div>
  //         </div>
  //       ),
  //     },
  //     {
  //       field: "nim",
  //       headerName: "NIM",
  //       flex: 0.8,
  //       minWidth: 140,
  //       cellStyle: {
  //         color: "#6b7280",
  //         fontWeight: "500",
  //       },
  //     },
  //     {
  //       field: "email",
  //       headerName: "Email",
  //       flex: 1.3,
  //       minWidth: 230,
  //       cellRenderer: (params: { value?: string }) => (
  //         <div className="flex items-center gap-2">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             stroke="currentColor"
  //             strokeWidth="1.7"
  //             className="h-4 w-4 shrink-0 text-gray-400"
  //             aria-hidden="true"
  //           >
  //             <rect x="3" y="5" width="18" height="14" rx="2" />
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="m4 7 8 6 8-6"
  //             />
  //           </svg>

  //           <span className="truncate text-sm text-gray-600 dark:text-gray-300">
  //             {params.value || "-"}
  //           </span>
  //         </div>
  //       ),
  //     },
  //     {
  //       field: "jenis_kelamin",
  //       headerName: "Jenis Kelamin",
  //       flex: 0.9,
  //       minWidth: 150,
  //       valueFormatter: (params) => {
  //         switch (params.value) {
  //           case "L":
  //             return "Laki-laki";
  //           case "P":
  //             return "Perempuan";
  //           default:
  //             return params.value ?? "-";
  //         }
  //       },
  //       cellRenderer: (params: { valueFormatted?: string; value?: string }) => {
  //         const jenisKelamin = params.value;
  //         const isLakiLaki = jenisKelamin === "L";
  //         const isPerempuan = jenisKelamin === "P";

  //         const colorClass = isLakiLaki
  //           ? "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20"
  //           : isPerempuan
  //           ? "bg-pink-50 text-pink-700 ring-pink-600/20 dark:bg-pink-500/10 dark:text-pink-400 dark:ring-pink-500/20"
  //           : "bg-gray-100 text-gray-600 ring-gray-500/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600/30";

  //         return (
  //           <span
  //             className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${colorClass}`}
  //           >
  //             {params.valueFormatted || "-"}
  //           </span>
  //         );
  //       },
  //     },
  //     {
  //       field: "prodi.nama",
  //       headerName: "Program Studi",
  //       flex: 1.2,
  //       minWidth: 200,
  //       cellRenderer: (params: { value?: string }) => (
  //         <div className="flex items-center gap-2">
  //           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="1.7"
  //               className="h-4 w-4"
  //               aria-hidden="true"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M3 9 12 4l9 5-9 5-9-5Z"
  //               />
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M7 12v5c3 2.5 7 2.5 10 0v-5M21 9v6"
  //               />
  //             </svg>
  //           </div>

  //           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
  //             {params.value || "-"}
  //           </span>
  //         </div>
  //       ),
  //     },
  //   ],
  //   []
  // );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/10" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5.5A2.5 2.5 0 016.5 3H20v18H6.5A2.5 2.5 0 014 18.5v-13zM4 18.5A2.5 2.5 0 016.5 16H20M8 7h7M8 11h5"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
                Manajemen Akademik
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Mahasiswa
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Kelola data mahasiswa
              </p>
            </div>
          </div>

          <Link to="/mahasiswa/create" className="relative shrink-0">
            <Button
              variant="primary"
              className="w-full border border-white/20 bg-blue-500 text-blue-700 shadow-sm hover:bg-blue-50 sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14M5 12h14"
                  />
                </svg>
                Tambah Mahasiswa
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-600/10 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-indigo-300/20 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-blue-50 ring-1 ring-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Manajemen Akademik
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Data Mahasiswa
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Kelola, cari, dan pantau informasi mahasiswa yang terdaftar dalam
              sistem Bela Kampus.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-9 w-9"
              aria-hidden="true"
            >
              <circle cx="9" cy="8" r="3.5" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.5 20v-1.5a6.5 6.5 0 0 1 13 0V20M16 5a3.5 3.5 0 0 1 0 6.8M18 14a5.5 5.5 0 0 1 3.5 5.1V20"
              />
            </svg>
          </div>
        </div>
      </div> */}

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-red-500/20 dark:bg-red-500/5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v5m0 3h.01"
                />
              </svg>
            </div>

            <div>
              <p className="font-semibold text-red-800 dark:text-red-400">
                Gagal memuat data mahasiswa
              </p>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void loadMahasiswa()}
            disabled={loading || refreshing}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/20 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total mahasiswa */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Mahasiswa
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                {loading ? "—" : statistik.total}
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Mahasiswa terdaftar
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <circle cx="9" cy="8" r="3.5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.5 20v-1.5a6.5 6.5 0 0 1 13 0V20M16 5a3.5 3.5 0 0 1 0 6.8M18 14a5.5 5.5 0 0 1 3.5 5.1V20"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Laki-laki */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Laki-laki
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                {loading ? "—" : statistik.lakiLaki}
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Mahasiswa laki-laki
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <circle cx="10" cy="14" r="6" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.5 9.5 6-6M15 3.5h5.5V9"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Perempuan */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Perempuan
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                {loading ? "—" : statistik.perempuan}
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Mahasiswa perempuan
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <circle cx="12" cy="9" r="6" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v7m-3.5-3.5h7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Program studi */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Program Studi
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                {loading ? "—" : statistik.totalProdi}
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Program studi terwakili
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 9 12 4l9 5-9 5-9-5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 12v5c3 2.5 7 2.5 10 0v-5M21 9v6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel mahasiswa */}
      <ComponentCard title="Daftar Mahasiswa">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Direktori Mahasiswa
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Cari informasi mahasiswa berdasarkan nama, NIM, email, atau
                program studi.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadMahasiswa()}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7v5h-5M4 17v-5h5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.6 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.4-3"
                />
              </svg>
              {refreshing ? "Memuat..." : "Refresh Data"}
            </button>
          </div>

          <div className="w-full sm:max-w-md">
            <Input
              placeholder="Cari nama, NIM, email, atau prodi..."
              value={quickFilter}
              onChange={(event) => setQuickFilter(event.target.value)}
            />
          </div>

          {error && mahasiswa.length === 0 && !loading ? (
            <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
              <p className="font-medium text-gray-700 dark:text-gray-300">
                Data mahasiswa belum dapat ditampilkan.
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Silakan coba refresh data.
              </p>
            </div>
          ) : (
            <MahasiswaTable
              loading={loading}
              mahasiswa={mahasiswa}
              quickFilter={quickFilter}
              colDefs={colDefs}
            />
          )}

          {!loading && !error && (
            <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
              <span>Total {statistik.total} mahasiswa</span>
              <span>
                {statistik.lakiLaki} laki-laki · {statistik.perempuan} perempuan
                · {statistik.totalProdi} program studi
              </span>
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}

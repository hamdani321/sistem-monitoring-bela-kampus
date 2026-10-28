import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import type { TahunAjaran as DataTahunAjaran } from "@/modules/models/tahun_ajaran";
import {
  AllCommunityModule,
  CellStyle,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import getTahunAjaran from "../services/tahun-ajaran.service";
import { Link } from "react-router";

const modules = [AllCommunityModule];

const nomorCellStyle: CellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
};

const aksiCellStyle: CellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function TahunAjaran() {
  const [data, setData] = useState<DataTahunAjaran[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTahunAjaran = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTahunAjaran();
      setData(response ?? []);
    } catch (error) {
      console.error("Gagal mengambil data tahun ajaran:", error);
      setError("Data tahun ajaran gagal dimuat. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTahunAjaran();
  }, [loadTahunAjaran]);

  const totalGanjil = useMemo(
    () => data.filter((item) => item.jenis === "Ganjil").length,
    [data]
  );

  const totalGenap = useMemo(
    () => data.filter((item) => item.jenis === "Genap").length,
    [data]
  );

  const colDefs = useMemo<ColDef<DataTahunAjaran>[]>(
    () => [
      {
        headerName: "No.",
        width: 75,
        minWidth: 75,
        maxWidth: 75,
        pinned: "left",
        sortable: false,
        filter: false,
        resizable: false,
        valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
        cellStyle: nomorCellStyle,
      },
      {
        headerName: "Tahun Ajaran",
        field: "nama",
        flex: 1.6,
        minWidth: 220,
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
          <div className="flex h-full items-center gap-3 py-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 2v4M8 2v4M3 9h18M8 13h3M8 17h7"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800 dark:text-white">
                {params.data?.nama ?? "-"}
              </p>
              <p className="mt-1 text-xs text-gray-500">Periode akademik</p>
            </div>
          </div>
        ),
      },
      {
        headerName: "Tahun",
        field: "tahun",
        flex: 0.8,
        minWidth: 130,
        cellClass: "font-medium text-gray-700",
      },
      {
        headerName: "Tipe Semester",
        field: "jenis",
        flex: 0.9,
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => {
          const jenis = params.data?.jenis;

          return (
            <div className="flex h-full items-center">
              <Badge
                variant="light"
                color={jenis === "Ganjil" ? "success" : "info"}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      jenis === "Ganjil" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  />
                  {jenis ?? "-"}
                </span>
              </Badge>
            </div>
          );
        },
      },
      {
        headerName: "Dibuat Pada",
        field: "created_at",
        flex: 1,
        minWidth: 160,
        valueFormatter: (params) => {
          if (!params.value) return "-";

          const date = new Date(params.value);

          if (Number.isNaN(date.getTime())) return "-";

          return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }).format(date);
        },
      },
      {
        headerName: "Aksi",
        width: 125,
        minWidth: 125,
        maxWidth: 125,
        sortable: false,
        filter: false,
        resizable: false,
        pinned: "right",
        cellStyle: aksiCellStyle,
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (params.data) {
                console.log("Detail tahun ajaran:", params.data);
              }
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              Detail
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 18 6-6-6-6"
                />
              </svg>
            </span>
          </Button>
        ),
      },
    ],
    []
  );

  // const colDefs = useMemo<ColDef<DataTahunAjaran>[]>(
  //   () => [
  //     {
  //       headerName: "No.",
  //       width: 75,
  //       minWidth: 75,
  //       maxWidth: 75,
  //       pinned: "left",
  //       sortable: false,
  //       filter: false,
  //       resizable: false,
  //       valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
  //       cellStyle: {
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         color: "#64748b",
  //       },
  //     },
  //     {
  //       headerName: "Tahun Ajaran",
  //       field: "nama",
  //       flex: 1.6,
  //       minWidth: 220,
  //       cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
  //         <div className="flex h-full items-center gap-3 py-2">
  //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
  //             <svg
  //               className="h-5 w-5"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="1.8"
  //             >
  //               <rect x="3" y="4" width="18" height="17" rx="2" />
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="M16 2v4M8 2v4M3 9h18M8 13h3M8 17h7"
  //               />
  //             </svg>
  //           </div>

  //           <div className="min-w-0">
  //             <p className="truncate font-semibold text-gray-800 dark:text-white">
  //               {params.data?.nama ?? "-"}
  //             </p>
  //             <p className="mt-1 text-xs text-gray-500">Periode akademik</p>
  //           </div>
  //         </div>
  //       ),
  //     },
  //     {
  //       headerName: "Tahun",
  //       field: "tahun",
  //       flex: 0.8,
  //       minWidth: 130,
  //       cellClass: "font-medium text-gray-700",
  //     },
  //     {
  //       headerName: "Tipe Semester",
  //       field: "jenis",
  //       flex: 0.9,
  //       minWidth: 150,
  //       cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => {
  //         const jenis = params.data?.jenis;

  //         return (
  //           <div className="flex h-full items-center">
  //             <Badge
  //               variant="light"
  //               color={jenis === "Ganjil" ? "success" : "info"}
  //             >
  //               <span className="inline-flex items-center gap-1.5">
  //                 <span
  //                   className={`h-1.5 w-1.5 rounded-full ${
  //                     jenis === "Ganjil" ? "bg-green-500" : "bg-blue-500"
  //                   }`}
  //                 />
  //                 {jenis ?? "-"}
  //               </span>
  //             </Badge>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       headerName: "Dibuat Pada",
  //       field: "created_at",
  //       flex: 1,
  //       minWidth: 160,
  //       valueFormatter: (params) => {
  //         if (!params.value) return "-";

  //         const date = new Date(params.value);

  //         if (Number.isNaN(date.getTime())) return "-";

  //         return new Intl.DateTimeFormat("id-ID", {
  //           day: "2-digit",
  //           month: "short",
  //           year: "numeric",
  //         }).format(date);
  //       },
  //     },
  //     {
  //       headerName: "Aksi",
  //       width: 125,
  //       minWidth: 125,
  //       maxWidth: 125,
  //       sortable: false,
  //       filter: false,
  //       resizable: false,
  //       pinned: "right",
  //       cellStyle: {
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       },
  //       cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => {
  //             if (params.data) {
  //               console.log("Detail tahun ajaran:", params.data);
  //             }
  //           }}
  //         >
  //           <span className="inline-flex items-center gap-1.5">
  //             Detail
  //             <svg
  //               className="h-4 w-4"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 d="m9 18 6-6-6-6"
  //               />
  //             </svg>
  //           </span>
  //         </Button>
  //       ),
  //     },
  //   ],
  //   []
  // );

  const defaultColDef = useMemo<ColDef<DataTahunAjaran>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    }),
    []
  );

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
                Tahun Ajaran
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                Kelola data tahun ajaran dan semester untuk mendukung kegiatan
                akademik kampus.
              </p>
            </div>
          </div>

          <Link to="/tahun-ajaran/create" className="relative shrink-0">
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
                Tambah Tahun Ajaran
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Tahun Ajaran
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                {loading ? "—" : data.length}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Seluruh data terdaftar
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 2v4M8 2v4M3 9h18"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Semester Ganjil
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                {loading ? "—" : totalGanjil}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Total data semester ganjil
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
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
                  d="m5 12 4 4L19 6"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03] sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Semester Genap
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
                {loading ? "—" : totalGenap}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Total data semester genap
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
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
                  d="M12 3v18M3 12h18"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <ComponentCard title="Daftar Tahun Ajaran">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Data Akademik
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Cari dan lihat informasi tahun ajaran yang terdaftar.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-72">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16 16 4 4"
                  />
                </svg>

                <Input
                  placeholder="Cari tahun atau semester..."
                  value={quickFilter}
                  onChange={(event) => setQuickFilter(event.target.value)}
                  className="pl-10"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={loadTahunAjaran}
                disabled={loading}
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 7v5h-5M4 17v-5h5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.6 9A7 7 0 0118 6l2 6M4 12l2 6a7 7 0 0012.4-3"
                    />
                  </svg>
                  Refresh
                </span>
              </Button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-red-500/30 dark:bg-red-500/10"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v5M12 16h.01"
                  />
                </svg>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={loadTahunAjaran}
                disabled={loading}
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && data.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-12 text-center dark:border-gray-700">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 2v4M8 2v4M3 9h18M12 13v4M10 15h4"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">
                Belum Ada Tahun Ajaran
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                Data tahun ajaran belum tersedia. Tambahkan tahun ajaran baru
                untuk mulai mengelola periode akademik.
              </p>

              <Link to="/tahun-ajaran/create" className="mt-5 inline-flex">
                <Button variant="primary">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-lg">+</span>
                    Tambah Tahun Ajaran
                  </span>
                </Button>
              </Link>
            </div>
          )}

          {/* AG Grid */}
          {(loading || data.length > 0) && (
            <AgGridProvider modules={modules}>
              <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="h-[520px] w-full">
                  <AgGridReact<DataTahunAjaran>
                    rowData={data}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    loading={loading}
                    quickFilterText={quickFilter}
                    pagination
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50]}
                    animateRows
                    suppressCellFocus
                    rowSelection={{ mode: "singleRow" }}
                    rowHeight={66}
                    headerHeight={48}
                    overlayNoRowsTemplate="Tidak ada data yang cocok dengan pencarian."
                  />
                </div>
              </div>
            </AgGridProvider>
          )}

          {/* Footer tabel */}
          {!loading && !error && data.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
              <p>Menampilkan data tahun ajaran yang tersedia.</p>
              <p>
                Total{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {data.length}
                </span>{" "}
                data
              </p>
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}

// Lama

// import ComponentCard from "@/components/common/ComponentCard";
// import Input from "@/components/form/input/InputField";
// import Badge from "@/components/ui/badge/Badge";
// import Button from "@/components/ui/button/Button";
// import { TahunAjaran as DataTahunAjaran } from "@/modules/models/tahun_ajaran";
// import { FormatDate } from "@/modules/utils/date-formatter";
// import {
//   AllCommunityModule,
//   ColDef,
//   ICellRendererParams,
//   ValueFormatterParams,
// } from "ag-grid-community";
// import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import getTahunAjaran from "../services/tahun-ajaran.service";
// import { Link } from "react-router";

// const modules = [AllCommunityModule];

// export default function TahunAjaran() {
//   const [data, setData] = useState<DataTahunAjaran[]>([]);
//   const [quickFilter, setQuickFilter] = useState("");
//   const [loading, setLoading] = useState(true);

//   const loadTahunAjaran = useCallback(async () => {
//     try {
//       setLoading(true);

//       const response = await getTahunAjaran();

//       setData(response);
//     } catch (error) {
//       console.error("Gagal mengambil data tahun ajaran:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadTahunAjaran();
//   }, [loadTahunAjaran]);

//   const colDefs = useMemo<ColDef<DataTahunAjaran>[]>(
//     () => [
//       {
//         headerName: "No",
//         width: 70,
//         minWidth: 70,
//         maxWidth: 70,
//         pinned: "left",
//         sortable: false,
//         filter: false,
//         resizable: false,
//         valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
//         cellStyle: {
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         },
//       },
//       {
//         headerName: "Tahun Ajaran",
//         field: "nama",
//         flex: 1.5,
//         minWidth: 200,
//         cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => {
//           return (
//             <div className="py-2">
//               <div className="font-semibold text-gray-800">
//                 {params.data?.nama ?? "-"}
//               </div>

//               <div className="mt-1 text-xs text-gray-500">Tahun Ajaran</div>
//             </div>
//           );
//         },
//       },
//       {
//         headerName: "Tahun",
//         field: "tahun",
//         flex: 1,
//         minWidth: 150,
//         cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
//           <span className="font-medium text-gray-700">
//             {params.data?.tahun ?? "-"}
//           </span>
//         ),
//       },

//       {
//         headerName: "Tipe",
//         field: "jenis",
//         width: 140,
//         minWidth: 140,
//         cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => {
//           const status = params.data?.jenis;

//           let color: "primary" | "success" | "warning" | "error" | "info" =
//             "info";

//           color = "primary";

//           return (
//             <Badge
//               variant="light"
//               color={(color = status == "Ganjil" ? "success" : "info")}
//             >
//               {status ?? "-"}
//             </Badge>
//           );
//         },
//       },
//       {
//         headerName: "Aksi",
//         width: 120,
//         minWidth: 120,
//         maxWidth: 120,
//         sortable: false,
//         filter: false,
//         resizable: false,
//         cellStyle: {
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         },
//         cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
//           <Button
//             variant="primary"
//             size="sm"
//             onClick={() => {
//               console.log("Detail:", params.data);
//             }}
//           >
//             Detail
//           </Button>
//         ),
//       },
//     ],
//     []
//   );

//   const defaultColDef = useMemo<ColDef>(
//     () => ({
//       sortable: true,
//       filter: true,
//       resizable: true,
//       wrapHeaderText: true,
//       autoHeaderHeight: true,
//     }),
//     []
//   );

//   return (
//     <ComponentCard title="Data Tahun Ajaran">
//       <div className="space-y-4">
//         {/* Header */}

//         {/* Header */}
//         <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h3 className="text-sm font-semibold text-gray-800">
//               Daftar Sekolah
//             </h3>

//             <p className="mt-1 text-sm text-gray-500">
//               Kelola informasi sekolah dan lokasi sekolah.
//             </p>
//           </div>

//           <Link to="/tahun-ajaran/create">
//             <Button variant="primary" size="sm">
//               + Tambah Tahun Ajaran
//             </Button>
//           </Link>
//         </div>

//         {/* Search */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="w-full sm:w-80">
//             <Input
//               placeholder="Cari sekolah..."
//               value={quickFilter}
//               onChange={(e) => setQuickFilter(e.target.value)}
//             />
//           </div>

//           <div className="text-sm text-gray-500">
//             Total:{" "}
//             <span className="font-semibold text-gray-700">{data.length}</span>{" "}
//             sekolah
//           </div>
//         </div>

//         {/* AG Grid */}
//         <AgGridProvider modules={modules}>
//           <div className="w-full overflow-hidden rounded-lg border border-gray-200">
//             <div className="h-[600px] w-full">
//               <AgGridReact<DataTahunAjaran>
//                 rowData={data}
//                 columnDefs={colDefs}
//                 defaultColDef={defaultColDef}
//                 loading={loading}
//                 pagination
//                 paginationAutoPageSize
//                 quickFilterText={quickFilter}
//                 animateRows
//                 suppressCellFocus
//                 rowSelection="single"
//               />
//             </div>
//           </div>
//         </AgGridProvider>
//       </div>
//     </ComponentCard>
//   );
// }

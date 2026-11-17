import { useMemo, useState } from "react";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";

// AG Grid CSS
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-quartz.css";
import { FormatDate } from "@/modules/utils/date-formatter";
import { Registrasi } from "@/modules/models/registrasi";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";
import { Link } from "react-router";

const modules = [AllCommunityModule];
interface RegistrasiGridProps {
  registrasi: Registrasi[];
  registrasiAnggota: RegistrasiAnggota[];
  //   onDetail: (item: any) => void;
}

export default function RegistrasiGrid({
  registrasi,
  registrasiAnggota,
}: //   onDetail,
RegistrasiGridProps) {
  const [search, setSearch] = useState("");

  const columnDefsRegistrasi = useMemo<ColDef<Registrasi>[]>(
    () => [
      {
        headerName: "NO",
        width: 75,
        minWidth: 75,
        maxWidth: 75,
        sortable: false,
        filter: false,
        resizable: false,
        valueGetter: (params) =>
          params.node?.rowIndex != null ? params.node.rowIndex + 1 : "",
        cellClass: "text-slate-400 font-medium",
      },

      // Mahasiswa
      {
        headerName: "MAHASISWA",
        field: "mahasiswa.nama",
        minWidth: 230,
        flex: 1.3,
        filter: "agTextColumnFilter",
        valueGetter: (params) => params.data?.mahasiswa?.nama ?? "",
        cellRenderer: (params: any) => {
          const nama = params.data?.mahasiswa?.nama ?? "-";
          const nim = params.data?.mahasiswa?.nim ?? "-";

          const initial = nama
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word: string) => word.charAt(0).toUpperCase())
            .join("");

          return (
            <div className="flex h-full items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 ring-4 ring-blue-50/70">
                {initial || "?"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {nama}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">{nim}</p>
              </div>
            </div>
          );
        },
      },

      // Sekolah
      {
        headerName: "SEKOLAH",
        field: "sekolah.nama",
        minWidth: 230,
        flex: 1.3,
        filter: "agTextColumnFilter",
        valueGetter: (params) => params.data?.sekolah?.nama ?? "",
        cellRenderer: (params: any) => {
          const sekolah = params.data?.sekolah;

          return (
            <div className="flex h-full flex-col justify-center">
              <p className="text-sm font-semibold text-slate-700">
                {sekolah?.nama ?? "-"}
              </p>
              <p className="mt-1 max-w-[220px] truncate text-xs text-slate-400">
                {sekolah?.alamat ?? "-"}
              </p>
            </div>
          );
        },
      },

      // Jenis Kegiatan
      {
        headerName: "JENIS KEGIATAN",
        field: "tipe",
        minWidth: 155,
        maxWidth: 190,
        filter: "agSetColumnFilter",
        cellRenderer: (params: any) => {
          const isKelompok = params.value === "KELOMPOK";

          return (
            <div className="flex h-full items-center">
              <span
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  isKelompok
                    ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                    : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isKelompok ? "bg-violet-500" : "bg-blue-500"
                  }`}
                />
                {params.value ?? "-"}
              </span>
            </div>
          );
        },
      },

      // Tanggal
      {
        headerName: "TANGGAL",
        field: "created_at",
        minWidth: 155,
        maxWidth: 180,
        filter: "agDateColumnFilter",
        valueFormatter: (params) =>
          params.value ? FormatDate(params.value) : "-",
        cellClass: "text-slate-600 font-medium",
      },

      // Status
      {
        headerName: "STATUS",
        field: "status",
        minWidth: 165,
        maxWidth: 190,
        filter: "agSetColumnFilter",
        cellRenderer: (params: any) => {
          const status = params.value;

          const statusStyle: Record<string, string> = {
            Approve: "bg-emerald-50 text-emerald-700 ring-emerald-100",
            "DALAM PROSES": "bg-amber-50 text-amber-700 ring-amber-100",
            Pending: "bg-amber-50 text-amber-700 ring-amber-100",
            "BELUM TERLAKSANA": "bg-rose-50 text-rose-700 ring-rose-100",
          };

          const style =
            statusStyle[String(status).toUpperCase()] ??
            "bg-slate-100 text-slate-600 ring-slate-200";

          return (
            <div className="flex h-full items-center">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${style}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {status ?? "-"}
              </span>
            </div>
          );
        },
      },

      // Aksi
      {
        headerName: "AKSI",
        minWidth: 100,
        maxWidth: 110,
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: (params: ICellRendererParams<Registrasi>) => (
          <div className="flex h-full items-center justify-center">
            <Link
              to={`/kegiatan-laporan/${params.data?.id}`}
              //   type="button"
              //   onClick={() => onDetail(params.data)}
              title="Lihat detail kegiatan"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                />
                <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
              </svg>
            </Link>
          </div>
        ),
      },
    ],
    []
    // [onDetail]
  );

  const columnDefsRegistrasiAnggota = useMemo<ColDef<RegistrasiAnggota>[]>(
    () => [
      {
        headerName: "NO",
        width: 75,
        minWidth: 75,
        maxWidth: 75,
        sortable: false,
        filter: false,
        resizable: false,
        valueGetter: (params) =>
          params.node?.rowIndex != null ? params.node.rowIndex + 1 : "",
        cellClass: "text-slate-400 font-medium",
      },
      // Mahasiswa
      {
        headerName: "Ketua Kelompok",
        field: "registrasi.mahasiswa.nama",
        minWidth: 230,
        flex: 1.3,
        filter: true,
        cellRenderer: (params: ICellRendererParams<RegistrasiAnggota>) => {
          const nama = params.data?.registrasi?.mahasiswa?.nama ?? "-";
          const nim = params.data?.registrasi.mahasiswa?.nim ?? "-";

          const initial = nama
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word: string) => word.charAt(0).toUpperCase())
            .join("");

          return (
            <div className="flex h-full items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 ring-4 ring-blue-50/70">
                {initial || "?"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {nama}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">{nim}</p>
              </div>
            </div>
          );
        },
      },

      // Mahasiswa
      {
        headerName: "MAHASISWA",
        field: "mahasiswa.nama",
        minWidth: 230,
        flex: 1.3,
        // filter: "agTextColumnFilter",
        // valueGetter: (params) => params.data?.mahasiswa?.nama ?? "",
        cellRenderer: (params: ICellRendererParams<RegistrasiAnggota>) => {
          const nama = params.data?.mahasiswa?.nama ?? "-";
          const nim = params.data?.mahasiswa?.nim ?? "-";

          const initial = nama
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word: string) => word.charAt(0).toUpperCase())
            .join("");

          return (
            <div className="flex h-full items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 ring-4 ring-blue-50/70">
                {initial || "?"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {nama}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">{nim}</p>
              </div>
            </div>
          );
        },
      },

      // Sekolah
      {
        headerName: "SEKOLAH",
        field: "registrasi.sekolah.nama",
        minWidth: 230,
        flex: 1.3,
        filter: "agTextColumnFilter",
        // valueGetter: (params) => params.data?.registrasi.sekolah?.nama ?? "",
        cellRenderer: (params: ICellRendererParams<RegistrasiAnggota>) => {
          const sekolah = params.data?.registrasi?.sekolah.nama;
          const alamat = params.data?.registrasi?.sekolah.alamat;
          return (
            <div className="flex h-full flex-col justify-center">
              <p className="text-sm font-semibold text-slate-700">
                {sekolah ?? "-"}
              </p>
              <p className="mt-1 max-w-[220px] truncate text-xs text-slate-400">
                {alamat ?? "-"}
              </p>
            </div>
          );
        },
      },

      // Jenis Kegiatan
      {
        headerName: "JENIS KEGIATAN",
        field: "registrasi.tipe",
        minWidth: 155,
        maxWidth: 190,
        filter: "agSetColumnFilter",
        cellRenderer: (params: any) => {
          const isKelompok = params.value === "KELOMPOK";

          return (
            <div className="flex h-full items-center">
              <span
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                  isKelompok
                    ? "bg-violet-50 text-violet-700 ring-1 ring-violet-100"
                    : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isKelompok ? "bg-violet-500" : "bg-blue-500"
                  }`}
                />
                {params.value ?? "-"}
              </span>
            </div>
          );
        },
      },

      // Tanggal
      {
        headerName: "TANGGAL",
        field: "created_at",
        minWidth: 155,
        maxWidth: 180,
        filter: "agDateColumnFilter",
        valueFormatter: (params) =>
          params.value ? FormatDate(params.value) : "-",
        cellClass: "text-slate-600 font-medium",
      },

      // Status
      {
        headerName: "STATUS",
        field: "registrasi.status",
        minWidth: 165,
        maxWidth: 190,
        filter: "agSetColumnFilter",
        cellRenderer: (params: any) => {
          const status = params.value;

          const statusStyle: Record<string, string> = {
            Approve: "bg-emerald-50 text-emerald-700 ring-emerald-100",
            "DALAM PROSES": "bg-amber-50 text-amber-700 ring-amber-100",
            Pending: "bg-amber-50 text-amber-700 ring-amber-100",
            "BELUM TERLAKSANA": "bg-rose-50 text-rose-700 ring-rose-100",
          };

          const style =
            statusStyle[String(status).toUpperCase()] ??
            "bg-slate-100 text-slate-600 ring-slate-200";

          return (
            <div className="flex h-full items-center">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${style}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {status ?? "-"}
              </span>
            </div>
          );
        },
      },

      // Aksi
      {
        headerName: "AKSI",
        minWidth: 100,
        maxWidth: 110,
        sortable: false,
        filter: false,
        resizable: false,
        cellRenderer: (params: ICellRendererParams<RegistrasiAnggota>) => (
          <div className="flex h-full items-center justify-center">
            <Link
              to={`/kegiatan-laporan/${params.data?.registrasi.id}`}
              title="Lihat detail kegiatan"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
                />
                <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
              </svg>
            </Link>
          </div>
        ),
      },
    ],
    []
    // [onDetail]
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressHeaderMenuButton: true,
    }),
    []
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Daftar Kegiatan
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Informasi kegiatan promosi yang telah didaftarkan mahasiswa.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17v3h16v-3"
              />
            </svg>
            Export Data
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="2" />
              <path strokeLinecap="round" strokeWidth="2" d="m16 16 4 4" />
            </svg>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama mahasiswa, sekolah, atau kegiatan..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500">
            <option value="">Semua Status</option>
            <option value="selesai">Selesai</option>
            <option value="proses">Dalam Proses</option>
            <option value="belum">Belum Terlaksana</option>
          </select>

          <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500">
            <option value="">Semua Jenis</option>
            <option value="individu">Individu</option>
            <option value="kelompok">Kelompok</option>
          </select>
        </div>
      </div>
      {/* <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Daftar Kegiatan
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Informasi kegiatan Bela Kampus yang telah didaftarkan mahasiswa.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm font-semibold text-blue-700">
              {registrasi.length} Kegiatan
            </span>
          </div>
        </div>

        <div className="relative mt-5 w-full sm:max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path strokeLinecap="round" strokeWidth="2" d="m16 16 4 4" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari mahasiswa, sekolah, status..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div> */}

      {/* AG Grid*/}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* ================= REGISTRASI ================= */}
        <section>
          {/* Header Registrasi */}
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Data Registrasi
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Daftar mahasiswa yang telah melakukan registrasi kegiatan Bela
                  Kampus.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              {registrasi.length} Registrasi
            </span>
          </div>

          {/* AG Grid Registrasi */}
          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[250px] w-full">
                <AgGridReact<Registrasi>
                  rowData={registrasi}
                  columnDefs={columnDefsRegistrasi}
                  defaultColDef={defaultColDef}
                  // loading={}
                  pagination
                  paginationAutoPageSize
                  //   quickFilterText={quickFilter}
                  animateRows
                  suppressCellFocus
                />
              </div>
            </div>
          </AgGridProvider>
          {/* <div className="w-full min-w-0 overflow-x-auto">
            <div className="ag-theme-quartz min-w-[950px]">
              <AgGridReact
                rowData={registrasi}
                columnDefs={columnDefsRegistrasi}
                defaultColDef={defaultColDef}
                quickFilterText={search}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50]}
                rowHeight={76}
                headerHeight={48}
                animateRows={true}
                suppressCellFocus={true}
                theme="legacy"
                domLayout="autoHeight"
                overlayNoRowsTemplate={
                  '<span class="text-sm text-slate-500">Belum ada data registrasi</span>'
                }
              />
            </div>
          </div> */}
        </section>

        {/* ================= PEMISAH ================= */}
        <div className="relative flex items-center justify-center border-y border-slate-200 bg-slate-50 px-5 py-5">
          <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-slate-300" />

          <div className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <svg
              className="h-4 w-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 10l5 5 5-5"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Detail Keanggotaan
            </span>
          </div>
        </div>

        {/* ================= REGISTRASI ANGGOTA ================= */}
        <section>
          {/* Header Anggota */}
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m16-13a4 4 0 11-8 0 4 4 0 018 0zm2 13v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Data Keanggotaan Registrasi
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Daftar mahasiswa yang tergabung dalam kelompok registrasi Bela
                  Kampus.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              {registrasiAnggota.length} Anggota
            </span>
          </div>

          {/* AG Grid Registrasi Anggota */}
          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[250px] w-full">
                <AgGridReact<RegistrasiAnggota>
                  rowData={registrasiAnggota}
                  columnDefs={columnDefsRegistrasiAnggota}
                  defaultColDef={defaultColDef}
                  // loading={}
                  pagination
                  paginationAutoPageSize
                  //   quickFilterText={quickFilter}
                  animateRows
                  suppressCellFocus
                />
              </div>
            </div>
          </AgGridProvider>
          {/* <div className="w-full min-w-0 overflow-x-auto">
            <div className="ag-theme-quartz min-w-[950px]">
              <AgGridReact
                rowData={registrasiAnggota}
                columnDefs={columnDefsRegistrasiAnggota}
                defaultColDef={defaultColDef}
                // quickFilterText={search}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 20, 50]}
                rowHeight={76}
                headerHeight={48}
                animateRows={true}
                suppressCellFocus={true}
                theme="legacy"
                domLayout="autoHeight"
                overlayNoRowsTemplate={
                  '<span class="text-sm text-slate-500">Belum ada data keanggotaan</span>'
                }
              />
            </div>
          </div> */}
        </section>
      </div>

      {/* AG Grid Registrasi */}
      {/* <div className="w-full min-w-0 overflow-x-auto">
        <div className="ag-theme-quartz min-w-[950px]">
          <AgGridReact
            rowData={registrasi}
            columnDefs={columnDefsRegistrasi}
            defaultColDef={defaultColDef}
            quickFilterText={search}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            rowHeight={76}
            headerHeight={48}
            animateRows={true}
            suppressCellFocus={true}
            theme="legacy"
            domLayout="autoHeight"
            overlayNoRowsTemplate={
              '<span class="text-sm text-slate-500">Belum ada data kegiatan</span>'
            }
          />
        </div>
      </div> */}

      {/* Registrasi Anggota */}

      {/* <div className="w-full min-w-0 overflow-x-auto">
        <div className="ag-theme-quartz min-w-[950px]">
          <AgGridReact
            rowData={registrasiAnggota}
            columnDefs={columnDefsRegistrasiAnggota}
            defaultColDef={defaultColDef}
            quickFilterText={search}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            rowHeight={76}
            headerHeight={48}
            animateRows={true}
            suppressCellFocus={true}
            theme="legacy"
            domLayout="autoHeight"
            overlayNoRowsTemplate={
              '<span class="text-sm text-slate-500">Belum ada data kegiatan</span>'
            }
          />
        </div>
      </div> */}
    </div>
  );
}

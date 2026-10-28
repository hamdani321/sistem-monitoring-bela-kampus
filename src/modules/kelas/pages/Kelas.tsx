import { Kelas as DataKelas } from "@/modules/models/kelas";
import {
  GraduationCap,
  Users,
  BookOpen,
  CalendarDays,
  School,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getKelas } from "../services/kelas.service";
import KelasTable from "../components/KelasTable";
import { CellStyle, ColDef, ICellRendererParams } from "ag-grid-community";
import { FormatDate } from "@/modules/utils/date-formatter";
// import KelasTable from "../components/KelasTable";

// const dummyKelas: DataKelas[] = [
//   {
//     id: 1,
//     nama: "TI-1A",
//     prodi_id: "1",
//     dosen_id: "12",
//     created_at: "2026-01-10T08:00:00",
//     updated_at: "2026-01-10T08:00:00",
//   },
//   {
//     id: 2,
//     nama: "TI-1B",
//     prodi_id: "1",
//     dosen_id: "15",
//     created_at: "2026-01-12T08:00:00",
//     updated_at: "2026-01-12T08:00:00",
//   },
//   {
//     id: 3,
//     nama: "SI-2A",
//     prodi_id: "2",
//     dosen_id: "18",
//     created_at: "2026-01-15T08:00:00",
//     updated_at: "2026-01-15T08:00:00",
//   },
// ];

// export default function Kelas() {
//   const [kelas, setKelas] = useState<DataKelas[]>([]);
//   const [loading, setLoading] = useState(true);
//   async function fetchDataKelas() {
//     const result = await getKelas();
//     setLoading(false);
//     setKelas(result.kelas);
//   }

//   useEffect(() => {
//     fetchDataKelas();
//   }, []);

//   return (
//     <>
//       <KelasPage data={kelas} loading={loading} />
//     </>
//   );
// }

// type KelasPageProps = {
//   data: DataKelas[];
//   loading: boolean;
// };

export const Kelas = () => {
  const [kelas, setKelas] = useState<DataKelas[]>();
  const [loading, setLoading] = useState(true);

  async function fetchDataKelas() {
    const result = await getKelas();
    setLoading(false);
    setKelas(result.kelas);
  }

  useEffect(() => {
    fetchDataKelas();
  }, []);

  const nomorCellStyle: CellStyle = useMemo(
    () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#64748b",
      fontWeight: "500",
    }),
    []
  );

  const colDefs = useMemo<ColDef<DataKelas>[]>(
    () => [
      {
        headerName: "No.",
        width: 76,
        minWidth: 76,
        maxWidth: 76,
        sortable: false,
        filter: false,
        resizable: false,
        valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
        cellStyle: {
          ...nomorCellStyle,
          paddingLeft: "12px",
          paddingRight: "12px",
        },
      },
      {
        headerName: "Nama Kelas",
        field: "nama",
        flex: 1.4,
        minWidth: 230,
        cellStyle: {
          paddingLeft: "16px",
          paddingRight: "16px",
        },
        cellRenderer: (params: ICellRendererParams<DataKelas>) => {
          const kelas = params.data;

          if (!kelas) {
            return <span className="text-sm text-slate-400">-</span>;
          }

          return (
            <div className="flex h-full items-center gap-3 py-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                <Users size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {kelas.nama || "-"}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Kode kelas #{kelas.id}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Program Studi",
        field: "prodi_id",
        flex: 1.1,
        minWidth: 190,
        cellStyle: {
          paddingLeft: "16px",
          paddingRight: "16px",
        },
        cellRenderer: (params: ICellRendererParams<DataKelas>) => {
          const prodiId = params.value;

          return (
            <div className="flex h-full items-center gap-3 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <BookOpen size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">Program Studi</p>
                {prodiId != null ? (
                  <span className="mt-1 inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-700">
                    ID {prodiId}
                  </span>
                ) : (
                  <p className="mt-1 text-sm text-slate-400">
                    Belum ditentukan
                  </p>
                )}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Dosen Pengampu",
        field: "dosen_id",
        flex: 1.1,
        minWidth: 190,
        cellStyle: {
          paddingLeft: "16px",
          paddingRight: "16px",
        },
        cellRenderer: (params: ICellRendererParams<DataKelas>) => {
          const dosenId = params.value;

          return (
            <div className="flex h-full items-center gap-3 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                <GraduationCap size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-slate-400">Dosen Pengampu</p>
                <p className="mt-1 truncate text-sm font-medium text-slate-700">
                  {dosenId != null ? `ID ${dosenId}` : "Belum ditentukan"}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Tanggal Dibuat",
        field: "created_at",
        flex: 1.1,
        minWidth: 200,
        cellStyle: {
          paddingLeft: "16px",
          paddingRight: "16px",
        },
        cellRenderer: (params: ICellRendererParams<DataKelas>) => {
          const tanggal = params.value;

          return (
            <div className="flex h-full items-center gap-3 py-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <CalendarDays size={18} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700">
                  {tanggal ? FormatDate(tanggal) : "-"}
                </p>
                <p className="mt-1 text-xs text-slate-400">Tanggal pembuatan</p>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-2">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={30} />
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Sistem Informasi Akademik
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Data Kelas
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Informasi kelas dan pengelolaan data akademik.
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <School size={18} className="text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700">
              Data Akademik
            </span>
          </div>
        </header>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg shadow-indigo-100">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-100">
                  Total Kelas
                </p>
                <div className="rounded-xl bg-white/15 p-3">
                  <Users size={24} />
                </div>
              </div>

              <p className="mt-4 text-4xl font-bold">{kelas?.length}</p>
              <p className="mt-2 text-sm text-indigo-100">
                Jumlah kelas yang terdaftar
              </p>
            </div>

            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 right-24 h-36 w-36 rounded-full bg-white/5" />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Informasi Akademik
              </p>
              <h2 className="mt-2 text-lg font-bold text-slate-800">
                Kelas Mahasiswa
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Informasi nama kelas, program studi, dan dosen terkait.
              </p>
            </div>

            <div className="ml-3 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <BookOpen size={28} />
            </div>
          </div>
        </section>

        {/* Table Container */}
        <KelasTable
          kelas={kelas}
          colDefs={colDefs}
          loading={loading}
          quickFilter=""
        />
      </div>
    </main>
  );
};

import ComponentCard from "@/components/common/ComponentCard";
import { Registrasi } from "@/modules/models/registrasi";
import { ReportKegiatan } from "@/modules/models/report_kegiatan";
import { Component, ReactNode } from "react";
import { Link, useParams } from "react-router";
import { getRegistrasiById } from "../services/registrasi.service";

import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";

import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";
import TabelAnggotaRegistrasi from "../components/TabelAnggotaRegistrasi";
import Badge from "@/components/ui/badge/Badge";
import { UserIcon } from "lucide-react";

const modules = [AllCommunityModule];

export default function Report() {
  const { id } = useParams();

  return <ReportPage id={id} />;
}

interface ReportPageProps {
  id: string | undefined;
}

interface ReportPageState {
  registrasi: Registrasi | null;
  registasiAnggota: RegistrasiAnggota | null;
  loading: boolean;
  refreshing: boolean;
  quickFilter: string;
  error: string | null;
}

class ReportPage extends Component<ReportPageProps, ReportPageState> {
  state: ReportPageState = {
    registrasi: null,
    registasiAnggota: null,
    loading: true,
    refreshing: false,
    quickFilter: "",
    error: null,
  };

  async componentDidMount() {
    await this.fetchRegistrasi();
  }

  async fetchRegistrasi() {
    const isInitialLoad = this.state.registrasi === null;

    this.setState({
      loading: isInitialLoad,
      refreshing: !isInitialLoad,
      error: null,
    });

    try {
      const result = await getRegistrasiById(this.props.id);
      console.log("Result : ", result);

      if (!result) {
        this.setState({
          registrasi: null,
          error: "Data registrasi tidak ditemukan.",
        });
        return;
      }

      this.setState({
        registrasi: result,
        error: null,
      });
    } catch (error) {
      console.error("Gagal mengambil data registrasi:", error);

      this.setState({
        error: "Terjadi kesalahan saat mengambil data. Silakan coba kembali.",
      });
    } finally {
      this.setState({
        loading: false,
        refreshing: false,
      });
    }
  }

  handleSearch = (value: string) => {
    this.setState({ quickFilter: value });
  };

  getTipeColor(tipe?: string) {
    switch (tipe?.toLowerCase()) {
      case "individu":
        return "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20";

      case "kelompok":
        return "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/20";

      default:
        return "bg-gray-100 text-gray-600 ring-gray-500/20 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600/30";
    }
  }

  colDefs: ColDef<ReportKegiatan>[] = [
    {
      headerName: "No",
      width: 75,
      minWidth: 75,
      maxWidth: 75,
      pinned: "left",
      sortable: false,
      filter: false,
      resizable: false,
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
      },
    },
    {
      field: "nama_pic",
      headerName: "Penanggung Jawab",
      minWidth: 230,
      flex: 1.5,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => (
        <div className="py-3">
          <div className="font-semibold text-gray-800 dark:text-white/90">
            {params.data?.nama_pic || "-"}
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h8M8 11h8"
              />
            </svg>
            Laporan kegiatan
          </div>
        </div>
      ),
    },
    {
      field: "nomor_hp_pic",
      headerName: "Nomor HP",
      minWidth: 160,
      flex: 1,
      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
        const nomorHp = params.data?.nomor_hp_pic;

        if (!nomorHp) {
          return <span className="text-gray-400">Belum tersedia</span>;
        }

        return (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-4 w-4 shrink-0 text-emerald-600"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 18h4" />
            </svg>
            <span>{nomorHp}</span>
          </div>
        );
      },
    },
    {
      field: "video",
      headerName: "Video Kegiatan",
      minWidth: 180,
      flex: 1,
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
        const videoUrl = params.data?.video?.trim();

        if (!videoUrl) {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.47 4.47a.75.75 0 0 1 1.06 0l10 10a.75.75 0 1 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
                <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Z" />
              </svg>
              Tidak ada video
            </span>
          );
        }

        return (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lihat video kegiatan"
            className="group inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-600 hover:text-white hover:shadow-md hover:shadow-rose-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20 dark:hover:bg-rose-600 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" />
            </svg>

            <span>Lihat Video</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        );
      },
    },
    {
      headerName: "Aksi",
      minWidth: 120,
      maxWidth: 140,
      pinned: "right",
      sortable: false,
      filter: false,
      resizable: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
        const report = params.data;

        if (!report) return null;

        return (
          <Link
            to={`/registrasi/report-kegiatan/${report.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Detail
          </Link>
        );
      },
    },
  ];

  defaultColDef: ColDef<ReportKegiatan> = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  render(): ReactNode {
    const { registrasi, loading, refreshing, quickFilter, error } = this.state;

    const reports = registrasi?.report_kegiatan ?? [];
    const totalReport = reports.length;
    const totalDenganVideo = reports.filter((report) =>
      Boolean(report.video?.trim())
    ).length;
    const totalTanpaVideo = totalReport - totalDenganVideo;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-600/10 sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-indigo-300/20 blur-2xl" />

          <div className="relative z-10">
            <Link
              to="/registrasi"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-blue-100 transition-colors hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 18-6-6 6-6"
                />
              </svg>
              Kembali ke Registrasi
            </Link>

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-blue-50 ring-1 ring-white/20">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Sistem Bela Kampus
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Report Kegiatan
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                  Kelola dan pantau seluruh laporan kegiatan mahasiswa yang
                  terdaftar dalam portal Bela Kampus.
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-8 w-8"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 3.75h7l5 5v11.5A.75.75 0 0 1 18.25 21h-11.5a.75.75 0 0 1-.75-.75v-16a.5.5 0 0 1 .5-.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 4v5h5M9 13h6M9 16.5h6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error state */}
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
                  Gagal memuat data
                </p>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void this.fetchRegistrasi()}
              disabled={refreshing || loading}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/20 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {/* Detail Registrasi */}
        <ComponentCard title="Informasi Registrasi">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-64 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="h-4 w-40 rounded bg-gray-100 dark:bg-gray-800" />
            </div>
          ) : registrasi ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 20v-1.5a7 7 0 0 1 14 0V20"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Mahasiswa
                  </p>
                  <p className="mt-1 break-words font-semibold text-gray-800 dark:text-white/90">
                    {registrasi.mahasiswa?.nama ?? "Nama tidak tersedia"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    NIM: {registrasi.nim_mahasiswa}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-4h4v4"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Program Studi
                  </p>
                  <p className="mt-1 break-words font-semibold text-gray-800 dark:text-white/90">
                    {registrasi.mahasiswa?.prodi?.nama ?? "-"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Data akademik
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 2v4M8 2v4M3 10h18"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tahun Ajaran
                  </p>
                  <p className="mt-1 break-words font-semibold text-gray-800 dark:text-white/90">
                    {registrasi.portal?.tahun_ajaran?.nama ?? "-"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Portal Bela Kampus
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12 2 2 4-4"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tipe Registrasi
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${this.getTipeColor(
                        registrasi.tipe
                      )}`}
                    >
                      {registrasi.tipe || "Tidak diketahui"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm flex text-gray-500 dark:text-gray-400">
                    Status :{" "}
                    <span
                      className={`ms-1 ${
                        registrasi.status === "Pending"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {registrasi.status ?? "-"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Informasi registrasi belum tersedia.
            </div>
          )}
        </ComponentCard>

        {/* Statistik */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Laporan
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                  {loading ? "—" : totalReport}
                </h3>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Seluruh laporan kegiatan
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 3.75h7l5 5v11.5A.75.75 0 0 1 18.25 21h-11.5a.75.75 0 0 1-.75-.75v-16a.5.5 0 0 1 .5-.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 4v5h5M9 13h6M9 16.5h6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Dengan video */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Dengan Video
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                  {loading ? "—" : totalDenganVideo}
                </h3>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Laporan dengan tautan video
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m10 8 6 4-6 4V8Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Tanpa video */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tanpa Video
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
                  {loading ? "—" : totalTanpaVideo}
                </h3>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Laporan tanpa tautan video
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l6 6m0-6-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabel Anggota Kegiatan */}
        <ComponentCard title="Data Anggota Kegiatan">
          <TabelAnggotaRegistrasi
            registrasi_anggota={registrasi?.registrasi_anggota}
          />
        </ComponentCard>

        {/* Tabel Report */}
        <ComponentCard title="Daftar Report Kegiatan">
          <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Data Laporan
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Cari dan lihat detail laporan kegiatan mahasiswa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => void this.fetchRegistrasi()}
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

            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16 16 4 4"
                />
              </svg>

              <input
                type="search"
                value={quickFilter}
                onChange={(event) => this.handleSearch(event.target.value)}
                placeholder="Cari nama PIC, nomor HP, atau video..."
                aria-label="Cari laporan kegiatan"
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-blue-500"
              />
            </div>

            {/* Table */}
            {error && !registrasi ? (
              <div className="rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Data belum dapat ditampilkan.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Periksa koneksi atau coba muat ulang data.
                </p>
              </div>
            ) : (
              <AgGridProvider modules={modules}>
                <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="h-[560px] w-full">
                    <AgGridReact<ReportKegiatan>
                      rowData={reports}
                      columnDefs={this.colDefs}
                      defaultColDef={this.defaultColDef}
                      quickFilterText={quickFilter}
                      loading={loading}
                      pagination
                      paginationPageSize={10}
                      paginationPageSizeSelector={[10, 20, 50]}
                      animateRows
                      suppressCellFocus
                      rowHeight={68}
                      headerHeight={48}
                      overlayNoRowsTemplate={
                        '<span class="text-sm text-gray-500">Belum ada laporan kegiatan.</span>'
                      }
                    />
                  </div>
                </div>
              </AgGridProvider>
            )}

            {!loading && !error && (
              <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
                <span>Total {totalReport} laporan kegiatan</span>
                <span>
                  {totalDenganVideo} laporan memiliki video · {totalTanpaVideo}{" "}
                  laporan tanpa video
                </span>
              </div>
            )}
          </div>
        </ComponentCard>
      </div>
    );
  }
}

// Lama

// import ComponentCard from "@/components/common/ComponentCard";
// import { Registrasi } from "@/modules/models/registrasi";
// import { Component, ReactNode, useMemo } from "react";
// import { Link, useParams } from "react-router";
// import { getRegistrasiById } from "../services/registrasi.service";
// import {
//   AllCommunityModule,
//   ColDef,
//   ICellRendererParams,
// } from "ag-grid-community";
// import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { ReportKegiatan } from "@/modules/models/report_kegiatan";
// import Button from "@/components/ui/button/Button";

// const modules = [AllCommunityModule];

// export default function Report() {
//   const { id } = useParams();

//   return <ReportPage id={id} />;
// }

// interface ReportPageState {
//   registrasi: Registrasi | null;
//   loading: boolean;
// }

// interface ReportPageProps {
//   id: string | undefined;
// }

// class ReportPage extends Component<ReportPageProps, ReportPageState> {
//   state: ReportPageState = {
//     registrasi: null,
//     loading: true,
//   };
//   async componentDidMount() {
//     const result = await getRegistrasiById(this.props.id);
//     console.log(result);
//     this.setState({ registrasi: result, loading: false });
//   }

//   colDefs: ColDef<ReportKegiatan>[] = [
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
//       },
//     },
//     {
//       field: "nama_pic",
//       headerName: "Nama PIC",
//       flex: 1.4,
//       minWidth: 220,
//       cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
//         return (
//           <div className="py-2">
//             <div className="font-semibold text-gray-800">
//               {params.data?.nama_pic ?? "-"}
//             </div>

//             <div className="mt-1 text-xs text-gray-400">
//               Nomor HP : {params.data?.nomor_hp_pic ?? "-"}
//             </div>
//           </div>
//         );
//       },

//       autoHeight: true,
//     },

//     {
//       headerName: "Video",
//       field: "video",
//       minWidth: 160,
//       maxWidth: 190,
//       flex: 1,
//       sortable: false,
//       filter: false,
//       cellStyle: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       },
//       cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
//         const videoUrl = params.data?.video;

//         if (!videoUrl?.trim()) {
//           return (
//             <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className="h-4 w-4"
//                 aria-hidden="true"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.47 4.47a.75.75 0 0 1 1.06 0l10 10a.75.75 0 1 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06Z"
//                   clipRule="evenodd"
//                 />
//                 <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Z" />
//               </svg>
//               Tidak ada video
//             </span>
//           );
//         }

//         return (
//           <a
//             href={videoUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             aria-label="Lihat video kegiatan"
//             className="group inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-600 hover:text-white hover:shadow-md hover:shadow-rose-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20 dark:hover:bg-rose-600 dark:hover:text-white"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               className="h-5 w-5 shrink-0"
//               aria-hidden="true"
//             >
//               <circle cx="12" cy="12" r="9" />
//               <path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" />
//             </svg>

//             <span>Lihat Video</span>

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
//               aria-hidden="true"
//             >
//               <path d="M7 17 17 7M7 7h10v10" />
//             </svg>
//           </a>
//         );
//       },
//     },

//     {
//       headerName: "Aksi",
//       field: "video",
//       minWidth: 160,
//       maxWidth: 190,
//       flex: 1,
//       sortable: false,
//       filter: false,
//       cellStyle: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       },
//       cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
//         const reportKegiatan = params.data;

//         return (
//           <Link to={`/report-kegiatan/${reportKegiatan?.id}`}>
//             <Button size="sm">Detail</Button>
//           </Link>
//         );
//       },
//     },
//   ];

//   defaultColDef = {
//     sortable: true,
//     filter: true,
//     resizable: true,
//   };

//   render(): ReactNode {
//     const { registrasi, loading } = this.state;
//     return (
//       <>
//         <ComponentCard title="Detail Registrasi" className="mb-3">
//           <h1>Data {registrasi?.nim_mahasiswa}</h1>
//         </ComponentCard>

//         <ComponentCard title="Report Kegiatan">
//           {/* Table */}
//           <AgGridProvider modules={modules}>
//             <div className="w-full overflow-hidden rounded-lg border border-gray-200">
//               <div className="h-[650px] w-full">
//                 <AgGridReact<Registrasi>
//                   rowData={registrasi?.report_kegiatan}
//                   columnDefs={this.colDefs}
//                   defaultColDef={this.defaultColDef}
//                   loading={loading}
//                   pagination
//                   paginationAutoPageSize
//                   //   quickFilterText={quickFilter}
//                   animateRows
//                   suppressCellFocus
//                 />
//               </div>
//             </div>
//           </AgGridProvider>
//         </ComponentCard>
//       </>
//     );
//   }
// }

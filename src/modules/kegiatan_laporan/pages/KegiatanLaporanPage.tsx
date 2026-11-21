import { Registrasi } from "@/modules/models/registrasi";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";
import { Component, ReactNode } from "react";
import { getKegiatan } from "../services/kegiatan-laporan.service";
import RegistrasiGrid from "../components/RegistrasiGrid";

export default function KegiatanLaporanPage() {
  return (
    <>
      <KegiatanLaporan />
    </>
  );
}

interface KegiatanLaporanState {
  loading: boolean;
  registrasi: Registrasi[];
  registrasiAnggota: RegistrasiAnggota[];
}

class KegiatanLaporan extends Component<{}, KegiatanLaporanState> {
  state: KegiatanLaporanState = {
    loading: true,
    registrasi: [],
    registrasiAnggota: [],
  };

  async fetchDataKegiatan() {
    const result = await getKegiatan();
    console.log(result);

    this.setState({
      registrasi: result.data.registrasi,
      registrasiAnggota: result.data.registrasi_anggota,
      loading: false,
    });
  }

  componentDidMount(): void {
    this.fetchDataKegiatan();
  }

  render(): ReactNode {
    const { loading, registrasi, registrasiAnggota } = this.state;
    return (
      <>
        {/* <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-2">
          <div className="mx-auto max-w-7xl space-y-6"> */}
        {loading ? (
          <>
            <div className="mt-3 flex min-h-[75vh] flex-col items-center justify-center">
              {/* Loading Illustration */}
              <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-[5px] border-blue-100 border-t-blue-600"></div>

                <div className="absolute inset-3 animate-pulse rounded-full bg-blue-50"></div>

                <svg
                  className="relative h-12 w-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span className="absolute right-1 top-3 h-4 w-4 animate-ping rounded-full bg-blue-400 opacity-50"></span>
                <span className="absolute bottom-3 left-1 h-3 w-3 animate-pulse rounded-full bg-indigo-400"></span>
              </div>

              {/* Loading Information */}
              <div className="text-center">
                <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                  Sedang Menyiapkan Data
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  Mohon tunggu sebentar. Kami sedang mengambil dan mempersiapkan
                  informasi yang kamu butuhkan.
                </p>
              </div>

              {/* Animated Progress */}
              <div className="mt-8 w-full max-w-xs">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-500"></span>
                  <span className="ml-1 text-xs font-medium text-slate-400">
                    Memuat, harap tunggu...
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Bela Kampus
                <span className="text-slate-300">•</span>
                Sistem Informasi
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="font-medium text-blue-600">
                    Kegiatan Bela Kampus
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                  Data Kegiatan Bela Kampus
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Kelola dan pantau seluruh aktivitas promosi kampus yang
                  dilakukan mahasiswa.
                </p>
              </div>

              {/* <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Tambah Kegiatan
                  </button> */}
            </div>

            {/* Statistics */}
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <svg
                      className="h-6 w-6"
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
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                    Total
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  Total Kegiatan
                </p>
                <h2 className="mt-1 text-3xl font-bold text-slate-800">128</h2>
                <p className="mt-2 text-xs text-slate-400">
                  Seluruh kegiatan terdaftar
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M9 12l2 2 4-4m5 2a8 8 0 11-16 0 8 8 0 0116 0z"
                      />
                    </svg>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    Selesai
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  Kegiatan Selesai
                </p>
                <h2 className="mt-1 text-3xl font-bold text-slate-800">86</h2>
                <p className="mt-2 text-xs text-slate-400">
                  67% dari total kegiatan
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
                    Proses
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  Dalam Proses
                </p>
                <h2 className="mt-1 text-3xl font-bold text-slate-800">24</h2>
                <p className="mt-2 text-xs text-slate-400">
                  Menunggu penyelesaian
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M12 9v4m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.7 3h16.96a2 2 0 001.7-3L13.7 3.86a2 2 0 00-3.4 0z"
                      />
                    </svg>
                  </div>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
                    Belum
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-500">
                  Belum Terlaksana
                </p>
                <h2 className="mt-1 text-3xl font-bold text-slate-800">18</h2>
                <p className="mt-2 text-xs text-slate-400">
                  Belum dilaksanakan mahasiswa
                </p>
              </div>
            </div>

            {/* Table */}
            <RegistrasiGrid
              registrasi={registrasi}
              registrasiAnggota={registrasiAnggota}
              // onDetail={(item) => {}}
            />
          </>
        )}
        {/* </div>
        </main> */}
      </>
    );
  }
}

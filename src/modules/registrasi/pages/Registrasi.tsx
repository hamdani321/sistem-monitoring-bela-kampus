import { Component } from "react";
import type { ChangeEvent } from "react";

import Input from "@/components/form/input/InputField";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import type { Registrasi as DataRegistrasi } from "@/modules/models/registrasi";

import {
  AllCommunityModule,
  type ColDef,
  type ICellRendererParams,
} from "ag-grid-community";

import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { Link } from "react-router";

import getRegistrasi from "../services/registrasi.service";
import ComponentCard from "@/components/common/ComponentCard";
import CardDataRegistrasi from "../components/CardDataRegistrasi";
import HeaderRegistrasi from "../components/HeaderRegistrasi";

const modules = [AllCommunityModule];

type BadgeColor = "primary" | "success" | "warning" | "error" | "info";

interface RegistrasiState {
  registrasi: DataRegistrasi[];
  quickFilter: string;
  loading: boolean;
  error: string;
}

export default class Registrasi extends Component<
  Record<string, never>,
  RegistrasiState
> {
  state: RegistrasiState = {
    registrasi: [],
    quickFilter: "",
    loading: true,
    error: "",
  };

  componentDidMount() {
    this.loadRegistrasi();
  }

  /**
   * Mengambil data registrasi dari API.
   */
  private loadRegistrasi = async () => {
    this.setState({ loading: true, error: "" });

    try {
      const data = await getRegistrasi();
      console.log("Bnayk : ", data);

      this.setState({
        registrasi: data ?? [],
      });
    } catch (error: unknown) {
      console.error("Gagal mengambil data registrasi:", error);

      this.setState({
        error:
          "Data registrasi gagal dimuat. Periksa koneksi dan coba kembali.",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  /**
   * Mengatur nilai pencarian tabel.
   */
  private handleQuickFilter = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ quickFilter: event.target.value });
  };

  /**
   * Warna badge berdasarkan tipe registrasi.
   */
  private getTipeColor = (tipe?: string): BadgeColor => {
    switch (tipe?.toLowerCase()) {
      case "individu":
        return "primary";
      case "kelompok":
        return "warning";
      default:
        return "info";
    }
  };

  /**
   * Warna badge berdasarkan status registrasi.
   */
  private getStatusColor = (status?: string): BadgeColor => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";
      case "approved":
      case "disetujui":
      case "done":
        return "success";
      case "rejected":
      case "ditolak":
        return "error";
      default:
        return "info";
    }
  };

  /**
   * Konfigurasi kolom AG Grid.
   */
  private colDefs: ColDef<DataRegistrasi>[] = [
    {
      headerName: "No.",
      width: 75,
      minWidth: 75,
      maxWidth: 75,
      sortable: false,
      filter: false,
      resizable: false,
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
      },
    },
    {
      headerName: "Mahasiswa",
      field: "mahasiswa.nama",
      flex: 1.6,
      minWidth: 260,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const mahasiswa = params.data?.mahasiswa;

        if (!mahasiswa) {
          return <span className="text-gray-400">Data tidak tersedia</span>;
        }

        return (
          <div className="flex h-full items-center gap-3 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
              {(mahasiswa.nama?.trim().charAt(0) || "M").toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800 dark:text-white">
                {mahasiswa.nama ?? "-"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                NIM: {mahasiswa.nim ?? "-"}
              </p>
              <p className="mt-1 truncate text-xs text-gray-400">
                {mahasiswa.prodi?.nama ?? "Program studi tidak tersedia"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Tahun Ajaran",
      field: "portal.tahun_ajaran.nama",
      flex: 1,
      minWidth: 175,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => (
        <div className="flex h-full flex-col justify-center">
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {params.data?.portal?.tahun_ajaran?.nama ?? "-"}
          </span>
          <span className="mt-1 text-xs text-gray-500">
            {params.data?.portal?.tahun_ajaran?.jenis ?? "Semester -"}
          </span>
        </div>
      ),
    },
    {
      headerName: "Tipe Registrasi",
      field: "tipe",
      flex: 0.85,
      minWidth: 145,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const tipe = params.data?.tipe;

        return (
          <div className="flex h-full items-center">
            <Badge variant="light" color={this.getTipeColor(tipe)}>
              {tipe ?? "-"}
            </Badge>
          </div>
        );
      },
    },
    {
      headerName: "Jumlah Anggota",
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const registrasi_anggota = params.data?.registrasi_anggota;
        return <span>{registrasi_anggota?.length}</span>;
      },
    },
    {
      headerName: "Status",
      field: "status",
      flex: 0.85,
      minWidth: 135,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const status = params.data?.status;
        return (
          <div className="flex h-full items-center">
            <Badge variant="solid" color={this.getStatusColor(status)}>
              {status ?? "-"}
            </Badge>
          </div>
        );
      },
    },
    {
      headerName: "Sekolah",
      field: "sekolah.nama",
      flex: 1,
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => (
        <div className="flex h-full items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {params.data?.sekolah?.nama ?? "-"}
          </span>
        </div>
      ),
    },
    {
      headerName: "Aksi",
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      pinned: "right",
      sortable: false,
      filter: false,
      resizable: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const id = params.data?.id;

        if (id == null) {
          return <span className="text-gray-400">-</span>;
        }

        return (
          <>
            <div className="flex h-full flex-col items-start justify-center gap-1">
              <Link to={`/registrasi/${id}`}>
                <Button
                  size="sm"
                  variant="primary"
                  className="!h-7 !min-h-0 !px-2 !py-1 !text-xs"
                >
                  Detail
                </Button>
              </Link>

              <Button
                size="sm"
                variant="primary"
                className="!h-7 !min-h-0 !bg-green-500 !px-2 !py-1 !text-xs hover:!bg-green-600"
              >
                Accept
              </Button>
            </div>

            {/* <Link to={`/registrasi/${id}`}>
              <Button variant="primary" size="sm">
                <span className="inline-flex items-center gap-1">
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
            </Link>

            <Button size="sm" variant="primary" className="bg-green-500">
              Accept
            </Button> */}
          </>
        );
      },
    },
  ];

  private defaultColDef: ColDef<DataRegistrasi> = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  render() {
    const { registrasi, quickFilter, loading, error } = this.state;

    const totalIndividu = registrasi.filter(
      (item) => item.tipe?.toLowerCase() === "individu"
    ).length;

    const totalKelompok = registrasi.filter(
      (item) => item.tipe?.toLowerCase() === "kelompok"
    ).length;

    const totalPending = registrasi.filter(
      (item) => item.status?.toLowerCase() === "pending"
    ).length;

    return (
      <div className="space-y-6">
        {/* HEADER */}
        <HeaderRegistrasi loading={loading} />
        {/* <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
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
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
                  Manajemen Bela Kampus
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  Data Registrasi
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                  Pantau pendaftaran mahasiswa, tipe registrasi, dan status
                  verifikasi dalam satu tempat.
                </p>
              </div>
            </div>

            <div className="relative flex shrink-0 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  loading ? "animate-pulse bg-yellow-300" : "bg-green-300"
                }`}
              />
              <span className="text-sm font-medium">
                {loading ? "Memuat data..." : "Data registrasi"}
              </span>
            </div>
          </div>
        </section> */}

        {/* STATISTIK */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total */}
          <CardDataRegistrasi
            backgroundColor="bg-blue-50"
            color="text-blue-600"
            title="Total Registrasi"
            loading={loading}
            icon={
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
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6"
                />
              </svg>
            }
            value={registrasi.length}
            text="Seluruh pendaftaran"
          />

          {/* Individu */}
          <CardDataRegistrasi
            color="text-violet-600"
            title="Registrasi Individu"
            loading={loading}
            icon={
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 21v-2a8 8 0 0116 0v2"
                />
              </svg>
            }
            value={totalIndividu}
            text="Pendaftaran Perorangan"
            backgroundColor="bg-violet-50"
          />

          {/* Kelompok */}
          <CardDataRegistrasi
            color="text-amber-600"
            title="Registrasi Kelompok"
            loading={loading}
            icon={
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
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM16 3.2a4 4 0 010 7.6M18 15h.5a3.5 3.5 0 013.5 3.5V21"
                />
              </svg>
            }
            value={totalKelompok}
            text="Pendaftaran Kelompok"
            backgroundColor="bg-amber-50"
          />

          {/* Pending */}
          <CardDataRegistrasi
            color="text-orange-600"
            title="Menunggu Verifikasi"
            loading={loading}
            icon={
              <svg
                className="h-6 w-6"
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
            }
            value={totalPending}
            text="Status Pending"
            backgroundColor="bg-orange-50"
          />
        </section>

        {/* TABEL */}
        <ComponentCard title="Daftar Registrasi Mahasiswa">
          <div className="space-y-5">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Data Pendaftaran
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Cari mahasiswa berdasarkan nama, NIM, sekolah, atau informasi
                  registrasi lainnya.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-80">
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
                    placeholder="Cari data registrasi..."
                    value={quickFilter}
                    onChange={this.handleQuickFilter}
                    className="pl-10"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={this.loadRegistrasi}
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
                  disabled={loading}
                  onClick={this.loadRegistrasi}
                >
                  Coba Lagi
                </Button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && registrasi.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-12 text-center dark:border-gray-700">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6"
                    />
                  </svg>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-gray-800 dark:text-white">
                  Belum Ada Registrasi
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Data registrasi mahasiswa belum tersedia. Data akan muncul di
                  sini setelah mahasiswa mendaftar melalui portal.
                </p>
              </div>
            )}

            {/* AG Grid */}
            {(loading || registrasi.length > 0) && (
              <AgGridProvider modules={modules}>
                <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="h-[580px] w-full">
                    <AgGridReact<DataRegistrasi>
                      rowData={registrasi}
                      columnDefs={this.colDefs}
                      defaultColDef={this.defaultColDef}
                      loading={loading}
                      quickFilterText={quickFilter}
                      pagination
                      paginationPageSize={10}
                      paginationPageSizeSelector={[10, 20, 50]}
                      animateRows
                      suppressCellFocus
                      rowSelection="single"
                      rowHeight={72}
                      headerHeight={48}
                      overlayNoRowsTemplate="Tidak ada registrasi yang cocok dengan pencarian."
                    />
                  </div>
                </div>
              </AgGridProvider>
            )}

            {/* Footer */}
            {!loading && !error && registrasi.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
                <p>Gunakan pencarian untuk menemukan registrasi mahasiswa.</p>
                <p>
                  Total{" "}
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {registrasi.length}
                  </span>{" "}
                  registrasi
                </p>
              </div>
            )}
          </div>
        </ComponentCard>
      </div>
    );
  }
}

// Lama

// import { Component } from "react";

// import ComponentCard from "@/components/common/ComponentCard";
// import Input from "@/components/form/input/InputField";
// import Badge from "@/components/ui/badge/Badge";
// import Button from "@/components/ui/button/Button";
// import { Registrasi as DataRegistrasi } from "@/modules/models/registrasi";

// import {
//   AllCommunityModule,
//   ColDef,
//   ICellRendererParams,
// } from "ag-grid-community";

// import { AgGridProvider, AgGridReact } from "ag-grid-react";

// import getRegistrasi from "../services/registrasi.service";
// import { Link } from "react-router";

// const modules = [AllCommunityModule];

// interface RegistrasiState {
//   registrasi: DataRegistrasi[];
//   quickFilter: string;
//   loading: boolean;
// }

// export default class Registrasi extends Component<{}, RegistrasiState> {
//   state: RegistrasiState = {
//     registrasi: [],
//     quickFilter: "",
//     loading: true,
//   };

//   /**
//    * Column definitions
//    *
//    * Tidak perlu useMemo karena property class
//    * ini dibuat satu kali selama lifecycle instance.
//    */
//   private colDefs: ColDef<DataRegistrasi>[] = [
//     // =========================
//     // NO
//     // =========================
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

//     // =========================
//     // MAHASISWA
//     // =========================
//     {
//       headerName: "Mahasiswa",
//       field: "mahasiswa.nama",
//       flex: 1.6,
//       minWidth: 280,
//       autoHeight: true,
//       cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
//         const mahasiswa = params.data?.mahasiswa;

//         if (!mahasiswa) {
//           return <span className="text-gray-400">-</span>;
//         }

//         return (
//           <div className="py-2 leading-tight">
//             <div className="font-semibold text-gray-800">{mahasiswa.nama}</div>

//             <div className="mt-1 text-sm text-gray-500">{mahasiswa.nim}</div>

//             <div className="mt-1 text-xs text-gray-400">
//               {mahasiswa.prodi?.nama ?? "-"}
//             </div>
//           </div>
//         );
//       },
//     },

//     // =========================
//     // PORTAL
//     // =========================
//     {
//       headerName: "Portal",
//       field: "portal.tahun_ajaran.nama",
//       flex: 1,
//       minWidth: 180,
//       cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
//         const tahunAjaran = params.data?.portal?.tahun_ajaran?.nama;

//         return (
//           <span className="font-medium text-gray-700">
//             {tahunAjaran ?? "-"}
//           </span>
//         );
//       },
//     },

//     // =========================
//     // TIPE
//     // =========================
//     {
//       headerName: "Tipe",
//       flex: 0.8,
//       minWidth: 130,
//       cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
//         const tipe = params.data?.tipe;

//         return (
//           <Badge
//             variant="light"
//             color={tipe === "Kelompok" ? "warning" : "primary"}
//           >
//             {tipe}
//           </Badge>
//         );
//       },
//     },

//     // =========================
//     // STATUS
//     // =========================
//     {
//       headerName: "Status",
//       field: "status",
//       width: 130,
//       minWidth: 130,
//       cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
//         const status = params.data?.status;

//         let color: "primary" | "success" | "warning" | "error" | "info" =
//           "info";

//         switch (status) {
//           case "Pending":
//             color = "warning";
//             break;

//           case "Approved":
//             color = "success";
//             break;

//           case "Rejected":
//             color = "error";
//             break;
//         }

//         return (
//           <Badge variant="solid" color={color}>
//             {status ?? "-"}
//           </Badge>
//         );
//       },
//     },

//     // =========================
//     // SEKOLAH
//     // =========================
//     {
//       headerName: "Sekolah",
//       field: "sekolah.nama",
//       flex: 1,
//       minWidth: 180,
//       cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
//         return (
//           <span className="text-gray-700">
//             {params.data?.sekolah?.nama ?? "-"}
//           </span>
//         );
//       },
//     },

//     // =========================
//     // AKSI
//     // =========================
//     {
//       headerName: "Aksi",
//       width: 120,
//       minWidth: 120,
//       maxWidth: 120,
//       sortable: false,
//       filter: false,
//       resizable: false,
//       cellStyle: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       },
//       cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
//         return (
//           <>
//             <Link to={`/registrasi/${params.data?.id}`}>
//               <Button
//                 variant="primary"
//                 size="sm"
//                 onClick={() => {
//                   console.log("Detail:", params.data);
//                 }}
//               >
//                 Detail
//               </Button>
//             </Link>
//           </>
//         );
//       },
//     },
//   ];

//   /**
//    * Default column definition
//    *
//    * Sama seperti useMemo(() => ..., []).
//    */
//   private defaultColDef: ColDef = {
//     sortable: true,
//     filter: true,
//     resizable: true,
//     wrapHeaderText: true,
//     autoHeaderHeight: true,
//   };

//   /**
//    * Lifecycle pengganti useEffect(() => {}, [])
//    */
//   componentDidMount() {
//     this.loadRegistrasi();
//   }

//   /**
//    * Mengambil data registrasi.
//    */
//   private async loadRegistrasi() {
//     try {
//       this.setState({
//         loading: true,
//       });

//       const data = await getRegistrasi();

//       this.setState({
//         registrasi: data,
//       });
//     } catch (error) {
//       console.error("Gagal mengambil data registrasi:", error);
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   /**
//    * Handler pencarian.
//    */
//   private handleQuickFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({
//       quickFilter: event.target.value,
//     });
//   };

//   render() {
//     const { registrasi, quickFilter, loading } = this.state;

//     return (
//       <ComponentCard title="Data Registrasi">
//         <div className="space-y-4">
//           {/* =========================
//               TOOLBAR
//           ========================= */}
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h3 className="text-sm font-medium text-gray-800">
//                 Daftar Registrasi
//               </h3>

//               <p className="text-sm text-gray-500">
//                 Kelola data registrasi mahasiswa.
//               </p>
//             </div>

//             <div className="w-full sm:w-72">
//               <Input
//                 placeholder="Cari mahasiswa..."
//                 value={quickFilter}
//                 onChange={this.handleQuickFilter}
//               />
//             </div>
//           </div>

//           {/* =========================
//               TABLE
//           ========================= */}
//           <AgGridProvider modules={modules}>
//             <div className="w-full overflow-hidden rounded-lg border border-gray-200">
//               <div className="h-[650px] w-full">
//                 <AgGridReact<DataRegistrasi>
//                   rowData={registrasi}
//                   columnDefs={this.colDefs}
//                   defaultColDef={this.defaultColDef}
//                   loading={loading}
//                   pagination
//                   paginationAutoPageSize
//                   quickFilterText={quickFilter}
//                   animateRows
//                   suppressCellFocus
//                   rowSelection="single"
//                 />
//               </div>
//             </div>
//           </AgGridProvider>
//         </div>
//       </ComponentCard>
//     );
//   }
// }

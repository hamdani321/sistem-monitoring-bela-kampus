import ComponentCard from "@/components/common/ComponentCard";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";
import { Component, ReactNode } from "react";
import { Link, useParams } from "react-router";
import {
  createReportKegiatan,
  getRegistrasi,
} from "../services/portal.service";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { Registrasi } from "@/modules/models/registrasi";
import { ReportKegiatan as DataReportKegiatan } from "@/modules/models/report_kegiatan";
import { FormatDate } from "@/modules/utils/date-formatter";
import ModalLaporanKegiatan from "../components/ModalLaporanKegiatan";
import MapView from "../components/MapView";
import Button from "@/components/ui/button/Button";
const modules = [AllCommunityModule];
export default function ReportKegiatanPage() {
  const { registrasiId } = useParams();
  return (
    <>
      <ReportKegiatan registrasiId={registrasiId} />
    </>
  );
}

interface ReportKegiatanState {
  loading: boolean;
  loadingSubmit: boolean;
  // registrasi_anggota: RegistrasiAnggota[];
  registrasi: Registrasi | null | undefined;
  // report_kegiatan: DataReportKegiatan[];
  openModalLaporanKegiatan: boolean;
}

class ReportKegiatan extends Component<
  { registrasiId: string | undefined },
  ReportKegiatanState
> {
  state: ReportKegiatanState = {
    loading: true,
    loadingSubmit: false,
    // registrasi_anggota: [],
    // report_kegiatan: [],
    registrasi: null,
    openModalLaporanKegiatan: false,
  };

  fetchData = async () => {
    const data = await getRegistrasi(this.props.registrasiId);
    this.setState({
      registrasi: data?.data,
      loading: false,
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  colDefs: ColDef<RegistrasiAnggota>[] = [
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
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    {
      field: "mahasiswa.nama",
      headerName: "Nama",
      flex: 1.3,
      minWidth: 200,
    },

    {
      field: "mahasiswa.nim",
      headerName: "NIM",
      flex: 0.8,
      minWidth: 140,
    },

    {
      field: "mahasiswa.email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 220,
    },

    {
      field: "mahasiswa.jenis_kelamin",
      headerName: "Jenis Kelamin",
      flex: 0.8,
      minWidth: 140,
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
    },
  ];

  colDefsReportKegiatan: ColDef<DataReportKegiatan>[] = [
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
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },

    {
      field: "nama_pic",
      headerName: "Nama PIC",
      flex: 1.3,
      minWidth: 200,
    },

    {
      field: "nomor_hp_pic",
      headerName: "Nomor PIC",
      flex: 0.8,
      minWidth: 140,
    },

    {
      field: "mahasiswa.email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 220,
    },

    {
      field: "mahasiswa.jenis_kelamin",
      headerName: "Jenis Kelamin",
      flex: 0.8,
      minWidth: 140,
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
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: false,
  };

  render(): ReactNode {
    const {
      // registrasi_anggota,
      registrasi,
      // report_kegiatan,
      loading,
      loadingSubmit,
      openModalLaporanKegiatan,
    } = this.state;
    return (
      <>
        {/* data portal dan registrasi */}

        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Detail Registrasi
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Informasi portal dan data registrasi Bela Kampus.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Terdaftar
            </span>
          </div>

          <Link to={"/portal"}>
            <Button
              size="sm"
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    // fill-rule="evenodd"
                    fillRule="evenodd"
                    d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z"
                    // clip-rule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              }
              variant="primary"
            >
              Kembali
            </Button>
          </Link>

          {/* Informasi Portal */}
          <section className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Informasi Portal
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Periode pelaksanaan Bela Kampus
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-500">
                  Tahun Ajaran
                </p>
                <h4 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                  {/* {portal.tahun_ajaran} */}
                  {/* fdsf */}
                  {registrasi?.portal.tahun_ajaran?.nama ?? "kosong"}
                </h4>
              </div>

              {/* Periode Pelaksanaan */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    Waktu Mulai
                  </div>

                  <p className="mt-3 font-semibold text-gray-900">
                    {/* {formatTanggal(portal.waktu_mulai)} */}
                    {FormatDate(registrasi?.portal.waktu_mulai)}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {/* Pukul {formatWaktu(portal.waktu_mulai)} WIB */}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Waktu Selesai
                  </div>

                  <p className="mt-3 font-semibold text-gray-900">
                    {FormatDate(registrasi?.portal.waktu_selesai)}
                    {/* {formatTanggal(portal.waktu_selesai)} */}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {/* Pukul {formatWaktu(portal.waktu_selesai)} WIB */}
                  </p>
                </div>
              </div>

              {/* Semester */}
              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Semester</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {/* {portal.semester} */}
                    {registrasi?.portal.tahun_ajaran?.jenis}
                  </p>
                </div>

                {/* <div>
                  <p className="text-sm text-gray-500">Tipe Semester</p>
                  <span className="mt-1 inline-flex rounded-lg bg-indigo-50 px-2.5 py-1 text-sm font-medium text-indigo-700">
                    dfs
                  </span>
                </div> */}
              </div>
            </div>
          </section>

          {/* Data Registrasi */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="8" r="4" />
                    <path d="M3 21v-2a6 6 0 0 1 12 0v2M16 4.5a4 4 0 0 1 0 7.5M18 15a5 5 0 0 1 3 4.6V21" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Data Registrasi
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Identitas ketua registrasi
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {/* Ketua Registrasi */}
              <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                  {registrasi?.mahasiswa.nama.trim().charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ketua Registrasi
                  </p>
                  <p className="mt-1 break-words font-semibold text-gray-900">
                    {registrasi?.mahasiswa.nama}
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                  Ketua
                </span>
              </div>

              {/* Detail Identitas */}
              <div className="mt-5 divide-y divide-gray-100">
                <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <p className="text-sm text-gray-500">NIM</p>
                  <p className="break-words text-sm font-medium text-gray-900">
                    {registrasi?.mahasiswa.nim}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="break-all text-sm font-medium text-gray-900">
                    {registrasi?.mahasiswa.email}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <p className="text-sm text-gray-500">Kelas</p>
                  <p className="break-words text-sm font-medium text-gray-900">
                    {registrasi?.mahasiswa.kelas.nama}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <p className="text-sm text-gray-500">Program Studi</p>
                  <p className="break-words text-sm font-medium text-gray-900">
                    {/* {registrasi.prodi} */}
                    {registrasi?.mahasiswa.prodi.nama}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <p className="text-sm text-gray-500">Sekolah</p>
                  <p className="break-words text-sm font-medium text-gray-900">
                    {/* {registrasi.prodi} */}
                    {registrasi?.sekolah?.nama}
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <p className="text-sm text-gray-500">Alamat Sekolah</p>
                  <p className="break-words text-sm font-medium text-gray-900">
                    {/* {registrasi.prodi} */}
                    {registrasi?.sekolah?.alamat}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* end data portal dan registrasi */}

        {/* Map */}

        <ComponentCard title="Lokasi Sekolah" className="mt-6">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-20 rounded-xl bg-gray-100 dark:bg-gray-800" />
              <div className="h-[320px] rounded-xl bg-gray-100 dark:bg-gray-800" />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Informasi Sekolah */}
              <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
                      <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01M16 14v.01M16 17v.01" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {registrasi?.sekolah?.nama ??
                        "Nama sekolah tidak tersedia"}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Lokasi pelaksanaan kegiatan Bela Kampus
                    </p>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Lokasi terdaftar
                </span>
              </div>

              {/* Peta */}
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      Peta Lokasi
                    </span>
                  </div>

                  <span className="text-xs text-gray-400">
                    Titik koordinat sekolah
                  </span>
                </div>

                <div className="relative h-[350px] w-full sm:h-[420px]">
                  <MapView
                    latitude={Number(registrasi?.sekolah?.latitude ?? 0)}
                    longitude={Number(registrasi?.sekolah?.longitude ?? 0)}
                    sekolah={registrasi?.sekolah}
                    title="Lokasi Bela Kampus"
                  />
                </div>
              </div>

              {/* Koordinat */}
              <div className="flex flex-col gap-2 rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                  Koordinat lokasi
                </div>

                <p className="font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                  {registrasi?.sekolah?.latitude ?? "-"},{" "}
                  {registrasi?.sekolah?.longitude ?? "-"}
                </p>
              </div>
            </div>
          )}
        </ComponentCard>

        {/* <ComponentCard title="Peta Sekolah" className="mt-4">
          {loading ? null : (
            <>
              <MapView
                latitude={Number(registrasi?.sekolah.latitude ?? 0)}
                longitude={Number(registrasi?.sekolah.longitude ?? 0)}
                sekolah={registrasi?.sekolah}
                title="Lokasi Bela Kampus"
              />
            </>
          )}
        </ComponentCard> */}

        {/* Map End */}

        {registrasi?.registrasi_anggota?.length > 0 ? (
          <>
            <ComponentCard
              className="mt-6"
              title="Anggota Kegiatan"
              desc="Daftar mahasiswa yang terdaftar sebagai anggota dalam kegiatan Bela Kampus."
            >
              <div className="space-y-5">
                {/* Summary */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                        Data Anggota
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        Mahasiswa yang mengikuti kegiatan ini
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total anggota
                      </p>
                      <p className="text-xl font-bold text-gray-800 dark:text-white">
                        {registrasi?.registrasi_anggota?.length ?? 0}
                        <span className="ml-1 text-xs font-medium text-gray-400">
                          Mahasiswa
                        </span>
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                      <span className="text-sm font-bold">
                        {registrasi?.registrasi_anggota?.length ?? 0}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AG Grid */}
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col gap-1 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                        Daftar Mahasiswa
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                        Informasi identitas anggota kegiatan
                      </p>
                    </div>

                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Data anggota
                    </span>
                  </div>

                  <AgGridProvider modules={modules}>
                    <div className="h-[380px] w-full">
                      <AgGridReact<RegistrasiAnggota>
                        rowData={registrasi?.registrasi_anggota ?? []}
                        columnDefs={this.colDefs}
                        defaultColDef={this.defaultColDef}
                        loading={loading}
                        pagination
                        paginationAutoPageSize
                        animateRows
                        suppressCellFocus
                        overlayNoRowsTemplate={
                          '<span class="text-sm text-gray-500">Belum ada anggota kegiatan.</span>'
                        }
                      />
                    </div>
                  </AgGridProvider>
                </div>

                {/* Footer information */}
                <div className="flex items-start gap-2 rounded-lg bg-blue-50/70 px-4 py-3 dark:bg-blue-500/5">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 11v5M12 7h.01" />
                  </svg>

                  <p className="text-xs leading-relaxed text-blue-700 dark:text-blue-300">
                    Data ini menampilkan mahasiswa yang telah terdaftar dalam
                    kegiatan Bela Kampus. Pastikan informasi anggota sudah
                    sesuai sebelum kegiatan dilaksanakan.
                  </p>
                </div>
              </div>
            </ComponentCard>

            {/* <ComponentCard
              className="mt-6"
              title="Anggota Kegiatan"
              desc="Anggota kegiatan bela kampus"
            >
              <AgGridProvider modules={modules}>
                <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                  <div className="h-[320px] w-full">
                    <AgGridReact<RegistrasiAnggota>
                      rowData={registrasi?.registrasi_anggota}
                      columnDefs={this.colDefs}
                      defaultColDef={this.defaultColDef}
                      loading={loading}
                      pagination
                      paginationAutoPageSize
                      // quickFilterText={quickFilter}
                      animateRows
                      suppressCellFocus
                    />
                  </div>
                </div>
              </AgGridProvider>
            </ComponentCard> */}
          </>
        ) : null}

        {/* Report */}

        <ComponentCard
          title="Laporan Kegiatan"
          desc="Kelola dan pantau laporan pelaksanaan kegiatan Bela Kampus."
          className="mt-5"
        >
          <div className="space-y-5">
            {/* Header Action */}
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M8 13h8M8 17h8M8 9h2" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Dokumentasi Kegiatan
                  </h4>
                  <p className="mt-1 max-w-md text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    Kirim laporan hasil kunjungan sekolah beserta dokumentasi
                    foto dan video kegiatan Bela Kampus.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  this.setState({ openModalLaporanKegiatan: true });
                }}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Buat Laporan
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Total Laporan
                  </p>
                  <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M8 13h8M8 17h5" />
                    </svg>
                  </div>
                </div>

                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                  {registrasi?.report_kegiatan?.length ?? 0}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Laporan yang telah dibuat
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Status Dokumentasi
                  </p>
                  <div className="rounded-lg bg-green-50 p-2 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </div>
                </div>

                <p className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                  {registrasi?.report_kegiatan?.length
                    ? "Tersedia"
                    : "Belum Ada"}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Ketersediaan laporan kegiatan
                </p>
              </div>
            </div>

            {/* Report Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-1 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Riwayat Laporan
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Daftar laporan kegiatan yang telah dikirimkan
                  </p>
                </div>

                <span className="inline-flex w-fit items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                  {registrasi?.report_kegiatan?.length ?? 0} Laporan
                </span>
              </div>

              <AgGridProvider modules={modules}>
                <div className="h-[380px] w-full">
                  <AgGridReact<DataReportKegiatan>
                    rowData={registrasi?.report_kegiatan ?? []}
                    columnDefs={this.colDefsReportKegiatan}
                    defaultColDef={this.defaultColDef}
                    loading={loading}
                    pagination
                    paginationAutoPageSize
                    animateRows
                    suppressCellFocus
                    overlayNoRowsTemplate={
                      '<span class="text-sm text-gray-500">Belum ada laporan kegiatan. Silakan buat laporan pertama.</span>'
                    }
                  />
                </div>
              </AgGridProvider>
            </div>

            {/* Information */}
            <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-4 py-3 dark:bg-amber-500/5">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 11v5M12 7h.01" />
              </svg>

              <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                Pastikan laporan kegiatan dilengkapi dengan informasi
                pelaksanaan serta dokumentasi foto dan video sebagai bukti
                kegiatan Bela Kampus telah dilaksanakan.
              </p>
            </div>
          </div>

          {/* Modal */}
          <ModalLaporanKegiatan
            loadingSubmit={loadingSubmit}
            open={openModalLaporanKegiatan}
            onClose={() => {
              this.setState({ openModalLaporanKegiatan: false });
            }}
            onSubmit={async (data) => {
              data.registrasi_id = registrasi?.id;
              this.setState({ loadingSubmit: true });

              try {
                await createReportKegiatan(data);
                this.setState({ openModalLaporanKegiatan: false });
              } finally {
                this.setState({ loadingSubmit: false });
              }
            }}
          />
        </ComponentCard>

        {/* <ComponentCard title="Report" className="mt-5">
          <button
            type="button"
            onClick={() => {
              this.setState({ openModalLaporanKegiatan: true });
            }}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Buat Laporan Kegiatan
          </button>

          <ModalLaporanKegiatan
            loadingSubmit={loadingSubmit}
            open={openModalLaporanKegiatan}
            onClose={() => {
              this.setState({ openModalLaporanKegiatan: false });
            }}
            onSubmit={async (data) => {
              data.registrasi_id = registrasi?.id;
              this.setState({ loadingSubmit: true });
              await createReportKegiatan(data);
              this.setState({ loadingSubmit: false });
            }}
          />

          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[320px] w-full">
                <AgGridReact<DataReportKegiatan>
                  rowData={registrasi?.report_kegiatan}
                  columnDefs={this.colDefsReportKegiatan}
                  defaultColDef={this.defaultColDef}
                  loading={loading}
                  pagination
                  paginationAutoPageSize
                  // quickFilterText={quickFilter}
                  animateRows
                  suppressCellFocus
                />
              </div>
            </div>
          </AgGridProvider>
        </ComponentCard> */}

        {/* End Report */}
      </>
    );
  }
}

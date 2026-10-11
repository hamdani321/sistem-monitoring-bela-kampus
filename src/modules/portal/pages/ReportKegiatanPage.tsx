import ComponentCard from "@/components/common/ComponentCard";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";
import { Component, ReactNode } from "react";
import { useParams } from "react-router";
import {
  createReportKegiatan,
  getAnggotaRegistrasi,
} from "../services/portal.service";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { Registrasi } from "@/modules/models/registrasi";
import { FormatDate } from "@/modules/utils/date-formatter";
import ModalLaporanKegiatan from "../components/ModalLaporanKegiatan";
import MapView from "../components/MapView";
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
  registrasi_anggota: RegistrasiAnggota[];
  registrasi: Registrasi | null;
  openModalLaporanKegiatan: boolean;
}

class ReportKegiatan extends Component<
  { registrasiId: string | undefined },
  ReportKegiatanState
> {
  state: ReportKegiatanState = {
    loading: true,
    loadingSubmit: false,
    registrasi_anggota: [],
    registrasi: null,
    openModalLaporanKegiatan: false,
  };

  fetchData = async () => {
    const data = await getAnggotaRegistrasi(this.props.registrasiId);
    console.log(data);

    this.setState({
      registrasi_anggota: data.registrasi_anggota,
      registrasi: data.registrasi,
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

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: false,
  };

  render(): ReactNode {
    const {
      registrasi_anggota,
      registrasi,
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

          {/* Informasi Portal */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
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

        <ComponentCard title="Peta Sekolah" className="mt-4">
          <MapView
            latitude={registrasi?.sekolah?.latitude}
            longitude={registrasi?.sekolah?.longitude}
            sekolah={registrasi?.sekolah}
            title="Lokasi Bela Kampus"
          />
        </ComponentCard>

        {/* Map End */}

        <ComponentCard
          className="mt-6"
          title="Anggota Kegiatan"
          desc="Anggota kegiatan bela kampus"
        >
          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[320px] w-full">
                <AgGridReact<RegistrasiAnggota>
                  rowData={registrasi_anggota}
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
        </ComponentCard>

        <ComponentCard title="Report" className="mt-5">
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
        </ComponentCard>
      </>
    );
  }
}

import { Component } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Registrasi as DataRegistrasi } from "@/modules/models/registrasi";

import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";

import { AgGridProvider, AgGridReact } from "ag-grid-react";
import getRegistrasi from "@/modules/registrasi/services/registrasi.service";
import { FormatDate } from "@/modules/utils/date-formatter";
import { Link } from "react-router";

const modules = [AllCommunityModule];

interface RegistrasiState {
  registrasi: DataRegistrasi[];
  quickFilter: string;
  loading: boolean;
}

export default class ReportKegiatan extends Component<{}, RegistrasiState> {
  state: RegistrasiState = {
    registrasi: [],
    quickFilter: "",
    loading: true,
  };

  /**
   * Column definitions
   *
   * Tidak perlu useMemo karena property class
   * ini dibuat satu kali selama lifecycle instance.
   */
  private colDefs: ColDef<DataRegistrasi>[] = [
    // =========================
    // NO
    // =========================
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

    // =========================
    // MAHASISWA
    // =========================
    {
      headerName: "Mahasiswa",
      field: "mahasiswa.nama",
      flex: 1.6,
      minWidth: 280,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const mahasiswa = params.data?.mahasiswa;

        if (!mahasiswa) {
          return <span className="text-gray-400">-</span>;
        }

        return (
          <div className="py-2 leading-tight">
            <div className="font-semibold text-gray-800">{mahasiswa.nama}</div>

            <div className="mt-1 text-sm text-gray-500">{mahasiswa.nim}</div>

            <div className="mt-1 text-xs text-gray-400">
              {mahasiswa.prodi?.nama ?? "-"}
            </div>
          </div>
        );
      },
    },

    // =========================
    // PORTAL
    // =========================
    {
      headerName: "Portal",
      field: "portal.tahun_ajaran.nama",
      flex: 1.4,
      minWidth: 260,
      autoHeight: true,

      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const portal = params.data?.portal;
        const tahunAjaran = portal?.tahun_ajaran;

        if (!portal) {
          return (
            <span className="text-sm text-gray-400">Portal tidak tersedia</span>
          );
        }

        return (
          <div className="flex flex-col gap-1.5 py-2">
            {/* Tahun Ajaran */}
            <div className="font-semibold text-gray-800">
              {`${tahunAjaran?.nama} (${portal.tahun_ajaran?.jenis})`}
            </div>

            {/* Waktu Mulai */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-20 shrink-0 text-gray-400">Mulai</span>

              <span className="font-medium text-gray-600">
                {FormatDate(portal.waktu_mulai)}
              </span>
            </div>

            {/* Waktu Selesai */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-20 shrink-0 text-gray-400">Selesai</span>

              <span className="font-medium text-gray-600">
                {FormatDate(portal.waktu_selesai)}
              </span>
            </div>
          </div>
        );
      },
    },

    // =========================
    // TIPE
    // =========================
    {
      headerName: "Tipe",
      flex: 0.8,
      minWidth: 130,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const tipe = params.data?.tipe;

        return (
          <Badge
            variant="light"
            color={tipe === "Kelompok" ? "warning" : "primary"}
          >
            {tipe}
          </Badge>
        );
      },
    },

    // =========================
    // STATUS
    // =========================
    {
      headerName: "Status",
      field: "status",
      width: 130,
      minWidth: 130,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const status = params.data?.status;

        let color: "primary" | "success" | "warning" | "error" | "info" =
          "info";

        switch (status) {
          case "Pending":
            color = "warning";
            break;

          case "Approved":
            color = "success";
            break;

          case "Rejected":
            color = "error";
            break;
        }

        return (
          <Badge variant="solid" color={color}>
            {status ?? "-"}
          </Badge>
        );
      },
    },

    // =========================
    // SEKOLAH
    // =========================
    {
      headerName: "Sekolah",
      field: "sekolah.nama",
      flex: 1,
      minWidth: 180,
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        return (
          <span className="text-gray-700">
            {params.data?.sekolah?.nama ?? "-"}
          </span>
        );
      },
    },

    // =========================
    // AKSI
    // =========================
    {
      headerName: "Aksi",
      width: 120,
      minWidth: 120,
      maxWidth: 120,
      sortable: false,
      filter: false,
      resizable: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<DataRegistrasi>) => {
        const registrasi = params.data;
        return (
          <Link to={`/report-kegiatan/registrasi/${registrasi?.id}`}>
            <Button size="sm" className="bg-green-400">
              Buat Report
            </Button>
          </Link>
        );
      },
    },
  ];

  /**
   * Default column definition
   *
   * Sama seperti useMemo(() => ..., []).
   */
  private defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  /**
   * Lifecycle pengganti useEffect(() => {}, [])
   */
  componentDidMount() {
    this.loadRegistrasi();
  }

  /**
   * Mengambil data registrasi.
   */
  private async loadRegistrasi() {
    try {
      this.setState({
        loading: true,
      });

      const data = await getRegistrasi();

      this.setState({
        registrasi: data,
      });
    } catch (error) {
      console.error("Gagal mengambil data registrasi:", error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  /**
   * Handler pencarian.
   */
  private handleQuickFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      quickFilter: event.target.value,
    });
  };

  /**
   * Handler detail registrasi.
   */
  //   private handleDetail = (data?: DataRegistrasi) => {
  //     console.log("Detail:", data);
  //   };

  render() {
    const { registrasi, quickFilter, loading } = this.state;

    return (
      <ComponentCard title="Data Registrasi">
        <div className="space-y-4">
          {/* =========================
              TOOLBAR
          ========================= */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Daftar Registrasi
              </h3>

              <p className="text-sm text-gray-500">
                Kelola data registrasi mahasiswa.
              </p>
            </div>

            <div className="w-full sm:w-72">
              <Input
                placeholder="Cari mahasiswa..."
                value={quickFilter}
                onChange={this.handleQuickFilter}
              />
            </div>
          </div>

          {/* =========================
              TABLE
          ========================= */}
          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[650px] w-full">
                <AgGridReact<DataRegistrasi>
                  rowData={registrasi}
                  columnDefs={this.colDefs}
                  defaultColDef={this.defaultColDef}
                  loading={loading}
                  pagination
                  paginationAutoPageSize
                  quickFilterText={quickFilter}
                  animateRows
                  suppressCellFocus
                  rowSelection="single"
                />
              </div>
            </div>
          </AgGridProvider>
        </div>
      </ComponentCard>
    );
  }
}

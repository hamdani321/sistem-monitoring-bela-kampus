import { Component } from "react";
import {
  AllCommunityModule,
  type ColDef,
  type ICellRendererParams,
  type RowStyle,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import {
  Search,
  Users,
  GraduationCap,
  AlertTriangle,
  Mail,
  UserRound,
} from "lucide-react";
import { Mahasiswa } from "@/modules/models/mahasiswa";
import Badge from "@/components/ui/badge/Badge";

// import type { Mahasiswa } from "@/types/mahasiswa";
const module = [AllCommunityModule];
type Props = {
  data: Mahasiswa[];
};

type State = {
  search: string;
};

export default class MahasiswaTable extends Component<Props, State> {
  state: State = {
    search: "",
  };

  columnDefs: ColDef<Mahasiswa>[] = [
    {
      headerName: "MAHASISWA",
      field: "nama",
      minWidth: 230,
      flex: 1.5,
      cellRenderer: (params: ICellRendererParams<Mahasiswa>) => {
        const mahasiswa = params.data;

        if (!mahasiswa) return null;

        const initials = mahasiswa.nama
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((word) => word[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex h-full items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800">
                {mahasiswa.nama}
              </p>
              <p className="text-xs text-gray-500">ID: {mahasiswa.id}</p>
            </div>
          </div>
        );
      },
    },
    {
      headerName: "NIM",
      field: "nim",
      minWidth: 120,
      flex: 0.8,
      cellClass: "font-mono text-sm",
    },
    {
      headerName: "EMAIL",
      field: "email",
      minWidth: 250,
      flex: 1.5,
      cellRenderer: (params: ICellRendererParams<Mahasiswa>) => (
        <div className="flex h-full items-center gap-2 text-sm text-gray-600">
          <Mail size={15} className="shrink-0 text-gray-400" />
          <span className="truncate">{params.value}</span>
        </div>
      ),
    },
    {
      headerName: "JENIS KELAMIN",
      field: "jenis_kelamin",
      minWidth: 150,
      flex: 0.9,
      cellRenderer: (params: ICellRendererParams<Mahasiswa>) => {
        const isMale =
          params.value?.toLowerCase() === "laki-laki" ||
          params.value?.toLowerCase() === "l";

        return (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isMale ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"
            }`}
          >
            <UserRound size={13} />
            {params.value || "-"}
          </span>
        );
      },
    },
    {
      headerName: "REGISTRASI",
      cellRenderer: (params: ICellRendererParams<Mahasiswa>) => {
        const mahasiswa = params.data;
        return (
          <Badge
            variant="solid"
            color={
              mahasiswa?.registrasi?.length > 0 ||
              mahasiswa?.registrasi_anggota?.length > 0
                ? "success"
                : "error"
            }
          >
            {mahasiswa?.registrasi?.length > 0 ||
            mahasiswa?.registrasi_anggota?.length > 0
              ? "Sudah Registrasi"
              : "Belum Registrasi"}
          </Badge>
        );
      },
    },
  ];

  defaultColDef: ColDef<Mahasiswa> = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  getRowStyle = (params: { data?: Mahasiswa }): RowStyle | undefined => {
    const mahasiswa = params.data;

    if (!mahasiswa) return undefined;

    const isRed =
      (mahasiswa.registrasi?.length ?? 0) > 1 ||
      (mahasiswa.registrasi_anggota?.length ?? 0) > 1;

    if (isRed) {
      return {
        backgroundColor: "#FEF2F2",
        color: "#991B1B",
        borderLeft: "4px solid #EF4444",
      };
    }

    return {
      backgroundColor: "#FFFFFF",
      color: "#374151",
      borderLeft: "4px solid transparent",
    };
  };

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    const { data } = this.props;
    const { search } = this.state;

    const keyword = search.toLowerCase().trim();

    const filteredData = data.filter((mahasiswa) =>
      [mahasiswa.nama, mahasiswa.nim.toString(), mahasiswa.email].some(
        (value) => value.toLowerCase().includes(keyword)
      )
    );

    const mahasiswaBermasalah = data.filter(
      (mahasiswa) =>
        (mahasiswa.registrasi?.length ?? 0) > 1 ||
        (mahasiswa.registrasi_anggota?.length ?? 0) > 1
    ).length;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <GraduationCap size={27} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                Data Mahasiswa
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Informasi mahasiswa dan riwayat registrasi
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700">
            <Users size={18} />
            {data.length} Mahasiswa
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Mahasiswa
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {data.length}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Mahasiswa terdaftar
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Users size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Perlu Diperiksa
                </p>
                <p className="mt-2 text-3xl font-bold text-red-600">
                  {mahasiswaBermasalah}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Memiliki lebih dari satu registrasi
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <AlertTriangle size={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="font-bold text-gray-800">Daftar Mahasiswa</h2>
              <p className="mt-1 text-sm text-gray-500">
                Data identitas dan jumlah registrasi mahasiswa
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={this.handleSearch}
                placeholder="Cari nama, NIM, atau email..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Keterangan */}
          <div className="flex flex-wrap items-center gap-4 border-b border-gray-100 bg-gray-50/70 px-5 py-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="h-3 w-3 rounded-sm border border-red-300 bg-red-100" />
              Registrasi lebih dari satu
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="h-3 w-3 rounded-sm border border-gray-200 bg-white" />
              Tidak melebihi batas
            </div>
          </div>

          <AgGridProvider modules={module}>
            <AgGridReact<Mahasiswa>
              rowData={filteredData}
              columnDefs={this.columnDefs}
              defaultColDef={this.defaultColDef}
              getRowId={(params) => String(params.data.id)}
              getRowStyle={this.getRowStyle}
              rowHeight={68}
              headerHeight={48}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 25, 50]}
              domLayout="autoHeight"
              overlayNoRowsTemplate="Tidak ada data mahasiswa"
            />
          </AgGridProvider>
        </div>
      </div>
    );
  }
}

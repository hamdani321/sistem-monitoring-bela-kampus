import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { TahunAjaran as DataTahunAjaran } from "@/modules/models/tahun_ajaran";
import { FormatDate } from "@/modules/utils/date-formatter";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import getTahunAjaran from "../services/tahun-ajaran.service";
import { Link } from "react-router";

const modules = [AllCommunityModule];

export default function TahunAjaran() {
  const [data, setData] = useState<DataTahunAjaran[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTahunAjaran = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getTahunAjaran();

      setData(response);
    } catch (error) {
      console.error("Gagal mengambil data tahun ajaran:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTahunAjaran();
  }, [loadTahunAjaran]);

  const colDefs = useMemo<ColDef<DataTahunAjaran>[]>(
    () => [
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
        headerName: "Tahun Ajaran",
        field: "nama",
        flex: 1.5,
        minWidth: 200,
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => {
          return (
            <div className="py-2">
              <div className="font-semibold text-gray-800">
                {params.data?.nama ?? "-"}
              </div>

              <div className="mt-1 text-xs text-gray-500">Tahun Ajaran</div>
            </div>
          );
        },
      },
      {
        headerName: "Tahun",
        field: "tahun",
        flex: 1,
        minWidth: 150,
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
          <span className="font-medium text-gray-700">
            {params.data?.tahun ?? "-"}
          </span>
        ),
      },

      {
        headerName: "Tipe",
        field: "jenis",
        width: 140,
        minWidth: 140,
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => {
          const status = params.data?.jenis;

          let color: "primary" | "success" | "warning" | "error" | "info" =
            "info";

          color = "primary";

          return (
            <Badge
              variant="light"
              color={(color = status == "Ganjil" ? "success" : "info")}
            >
              {status ?? "-"}
            </Badge>
          );
        },
      },
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
        cellRenderer: (params: ICellRendererParams<DataTahunAjaran>) => (
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              console.log("Detail:", params.data);
            }}
          >
            Detail
          </Button>
        ),
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
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
    <ComponentCard title="Data Tahun Ajaran">
      <div className="space-y-4">
        {/* Header */}

        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Daftar Sekolah
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Kelola informasi sekolah dan lokasi sekolah.
            </p>
          </div>

          <Link to="/tahun-ajaran/create">
            <Button variant="primary" size="sm">
              + Tambah Tahun Ajaran
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Cari sekolah..."
              value={quickFilter}
              onChange={(e) => setQuickFilter(e.target.value)}
            />
          </div>

          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-700">{data.length}</span>{" "}
            sekolah
          </div>
        </div>

        {/* AG Grid */}
        <AgGridProvider modules={modules}>
          <div className="w-full overflow-hidden rounded-lg border border-gray-200">
            <div className="h-[600px] w-full">
              <AgGridReact<DataTahunAjaran>
                rowData={data}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
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

import { useCallback, useEffect, useMemo, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

import { AgGridProvider, AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";

import { getUndangan, acceptUndangan } from "../services/undangan.service";
import { Undangan as DataUndangan } from "@/modules/models/undangan";
import { FormatDate } from "@/modules/utils/date-formatter";

const modules = [AllCommunityModule];

export default function Undangan() {
  const [undangan, setUndangan] = useState<DataUndangan[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUndangan = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUndangan();

      setUndangan(data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data undangan:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data undangan."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUndangan();
  }, [loadUndangan]);

  const colDefs = useMemo<ColDef<DataUndangan>[]>(() => [
    {
      headerName: "No",
      width: 70,
      pinned: "left",
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
    },
    {
      headerName: "Mahasiswa",
      minWidth: 220,
      flex: 1.2,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: ICellRendererParams<DataUndangan>) => {
        const mahasiswa = params.data?.mahasiswa;

        return (
          <div className="py-2 leading-5">
            <div className="font-medium text-gray-800 dark:text-white/90">
              {mahasiswa?.nama ?? "-"}
            </div>

            <div className="text-xs text-gray-500">
              NIM: {mahasiswa?.nim ?? "-"}
            </div>
          </div>
        );
      },
    },

    {
      headerName: "Kelompok",
      minWidth: 180,
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: ICellRendererParams<DataUndangan>) => {
        const kelompok = params.data?.kelompok;
        return (
          <div className="py-2 leading-5">
            <div className="font-medium text-gray-800 dark:text-white/90">
              {kelompok?.nama ?? "-"}
            </div>

            <div className="text-xs text-gray-500">
              Ketua: {kelompok?.mahasiswa?.nama ?? "-"}
            </div>
          </div>
        );
      },
    },

    {
      headerName: "Sekolah Tujuan",
      minWidth: 200,
      flex: 1,
      autoHeight: true,
      wrapText: true,
      cellRenderer: (params: ICellRendererParams<DataUndangan>) => {
        const sekolah = params.data?.kelompok?.registrasi?.sekolah;
        return (
          <div className="py-2">
            <div className="font-medium text-gray-800 dark:text-white/90">
              {sekolah?.nama ?? "-"}
            </div>

            <div className="text-xs text-gray-500">{sekolah?.alamat ?? ""}</div>
          </div>
        );
      },
    },

    {
      headerName: "Status Request",
      width: 150,
      cellStyle: {
        display: "flex",
        alignItems: "center",
      },
      cellRenderer: (params: ICellRendererParams<DataUndangan>) => {
        const status = params.data?.status;
        const isRequest = status === "Request";
        return (
          <Badge variant="solid" color={isRequest ? "info" : "success"}>
            {status ?? "-"}
          </Badge>
        );
      },
    },
    {
      headerName: "Portal",
      minWidth: 210,
      flex: 1,
      wrapText: true,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DataUndangan>) => {
        const portal = params.data?.kelompok?.registrasi?.portal;
        return (
          <div className="py-2 leading-5">
            <div className="text-xs text-gray-500">Mulai</div>

            <div className="font-medium text-gray-800 dark:text-white/90">
              {/* {portal?.waktu_mulai ?? "-"} */}
              {FormatDate(portal?.waktu_mulai) ?? "-"}
            </div>

            <div className="mt-1 text-xs text-gray-500">Selesai</div>

            <div className="font-medium text-gray-800 dark:text-white/90">
              {/* {portal?.waktu_selesai ?? "-"} */}

              {FormatDate(portal?.waktu_selesai) ?? "-"}
            </div>
          </div>
        );
      },
    },

    {
      headerName: "Aksi",
      width: 130,
      pinned: "right",
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<DataUndangan>) => {
        const status = params.data?.status;

        if (status !== "Request") {
          return <span className="text-xs text-gray-400">Tidak tersedia</span>;
        }

        return (
          <Button
            variant="primary"
            size="sm"
            className="bg-success-500 hover:bg-success-600"
            onClick={() => {
              acceptUndangan(params.data!);
            }}
          >
            Accept
          </Button>
        );
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef<DataUndangan>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <ComponentCard title="Data Undangan">
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
            Daftar Undangan
          </h3>

          <p className="text-sm text-gray-500">
            Kelola undangan mahasiswa untuk bergabung ke kelompok.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            value={quickFilter}
            onChange={(e) => setQuickFilter(e.target.value)}
            placeholder="Cari undangan..."
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-600">
          <span>{error}</span>

          <Button size="sm" variant="primary" onClick={loadUndangan}>
            Coba Lagi
          </Button>
        </div>
      )}

      {/* Grid */}
      <AgGridProvider modules={modules}>
        <div className="h-[650px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <AgGridReact<DataUndangan>
            rowData={undangan}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            loading={loading}
            pagination
            paginationAutoPageSize
            quickFilterText={quickFilter}
            animateRows
            suppressCellFocus
          />
        </div>
      </AgGridProvider>
    </ComponentCard>
  );
}

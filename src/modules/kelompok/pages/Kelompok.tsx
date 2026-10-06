import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";

import { Kelompok as DataKelompok } from "../../models/kelompok";
import { getKelompok } from "@/modules/kelompok/services/kelompok.service";

const modules = [AllCommunityModule];

export default function Kelompok() {
  const [kelompok, setKelompok] = useState<DataKelompok[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadKelompok = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getKelompok();
      setKelompok(data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data kelompok:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data kelompok."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKelompok();
  }, [loadKelompok]);
  const cellStyleConfig = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const colDefs = useMemo<ColDef<DataKelompok>[]>(() => [
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
    // NAMA KELOMPOK
    // =========================
    {
      field: "nama",
      headerName: "Nama Kelompok",
      flex: 1.3,
      minWidth: 200,

      cellRenderer: (params: ICellRendererParams<DataKelompok>) => {
        return (
          <div className="py-2">
            <div className="font-semibold text-gray-800">
              {params.data?.nama ?? "-"}
            </div>

            <div className="mt-1 text-xs text-gray-400">
              ID Kelompok: {params.data?.id ?? "-"}
            </div>
          </div>
        );
      },

      autoHeight: true,
    },

    // =========================
    // KETUA
    // =========================
    {
      headerName: "Ketua",
      flex: 1.4,
      minWidth: 220,

      cellRenderer: (params: ICellRendererParams<DataKelompok>) => {
        const mahasiswa = params.data?.mahasiswa;

        if (!mahasiswa) {
          return <span className="text-gray-400">Tidak tersedia</span>;
        }

        return (
          <div className="py-2 leading-tight">
            <div className="font-medium text-gray-800">{mahasiswa.nama}</div>

            <div className="mt-1 text-sm text-gray-500">{mahasiswa.nim}</div>

            {mahasiswa.prodi?.nama && (
              <div className="mt-1 text-xs text-gray-400">
                {mahasiswa.prodi.nama}
              </div>
            )}
          </div>
        );
      },

      autoHeight: true,
    },

    // =========================
    // JUMLAH ANGGOTA
    // =========================
    {
      headerName: "Jumlah Anggota",
      flex: 0.9,
      minWidth: 150,

      cellStyle: cellStyleConfig,

      cellRenderer: (params: ICellRendererParams<DataKelompok>) => {
        const jumlah = params.data?.kelompok_anggota?.length ?? 0;

        return (
          <Badge variant="light" color={jumlah > 0 ? "primary" : "warning"}>
            {jumlah} Anggota
          </Badge>
        );
      },
    },

    // =========================
    // STATUS
    // =========================
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 130,
      cellStyle: cellStyleConfig,
      cellRenderer: (params: ICellRendererParams<DataKelompok>) => {
        const status = params.data?.status;

        let color: "primary" | "success" | "warning" | "error" | "info" =
          "info";

        switch (status) {
          case "PENDING":
            color = "error";
            break;

          case "APPROVE":
            color = "primary";
            break;
        }

        return (
          <Badge variant="solid" color={color}>
            {status}
          </Badge>
        );
      },
    },

    // =========================
    // AKSI
    // =========================
    {
      headerName: "Aksi",
      width: 190,
      minWidth: 190,
      maxWidth: 190,

      sortable: false,
      filter: false,
      resizable: false,

      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },

      cellRenderer: (params: ICellRendererParams<DataKelompok>) => {
        const id = params.data?.id;

        return (
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                console.log("Edit kelompok:", id);
              }}
            >
              Edit
            </Button>

            <Link to={`/kelompok/member/${id}`}>
              <Button variant="outline" size="sm">
                Member
              </Button>
            </Link>
          </div>
        );
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <ComponentCard title="Data Kelompok">
      <div className="space-y-4">
        {/* =========================
            HEADER
        ========================= */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Daftar Kelompok
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Kelola kelompok mahasiswa dan anggotanya.
            </p>
          </div>

          {/* <Link to="/kelompok/create">
            <Button variant="primary" size="sm">
              + Tambah Kelompok
            </Button>
          </Link> */}
        </div>

        {/* =========================
            TOOLBAR
        ========================= */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-80">
            <Input
              placeholder="Cari kelompok atau ketua..."
              value={quickFilter}
              onChange={(e) => setQuickFilter(e.target.value)}
            />
          </div>

          <div className="text-sm text-gray-500">
            Total{" "}
            <span className="font-semibold text-gray-700">
              {kelompok.length}
            </span>{" "}
            kelompok
          </div>
        </div>

        {/* =========================
            ERROR
        ========================= */}
        {error && (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-600">{error}</p>

            <Button variant="outline" size="sm" onClick={loadKelompok}>
              Coba Lagi
            </Button>
          </div>
        )}

        {/* =========================
            TABLE
        ========================= */}
        <AgGridProvider modules={modules}>
          <div className="w-full overflow-hidden rounded-lg border border-gray-200">
            <div className="h-[650px] w-full">
              <AgGridReact<DataKelompok>
                rowData={kelompok}
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
          </div>
        </AgGridProvider>
      </div>
    </ComponentCard>
  );
}

import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import { Mahasiswa as DataMahasiswa } from "@/modules/models/mahasiswa";
import { getMahasiswa } from "@/modules/mahasiswa/service/mahasiswa.service";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import MahasiswaTable from "../components/MahasiswaTable";
const modules = [AllCommunityModule];

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState<DataMahasiswa[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const loadMahasiswa = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getMahasiswa();

      if (!response.ok) {
        throw new Error("Gagal mengambil data mahasiswa");
      }

      const responseBody = await response.json();

      setMahasiswa(responseBody.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data mahasiswa:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMahasiswa();
  }, [loadMahasiswa]);

  const colDefs: ColDef<DataMahasiswa>[] = [
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
      field: "nama",
      headerName: "Nama",
      flex: 1.3,
      minWidth: 200,
    },

    {
      field: "nim",
      headerName: "NIM",
      flex: 0.8,
      minWidth: 140,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.3,
      minWidth: 220,
    },

    {
      field: "jenis_kelamin",
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

    {
      field: "prodi.nama",
      headerName: "Program Studi",
      flex: 1.2,
      minWidth: 200,
    },
  ];

  return (
    <ComponentCard title="Data Mahasiswa">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-800">
              Daftar Mahasiswa
            </h3>

            <p className="text-sm text-gray-500">
              Kelola dan lihat data mahasiswa.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <Input
              placeholder="Cari mahasiswa..."
              value={quickFilter}
              onChange={(e) => {
                setQuickFilter(e.target.value);
              }}
            />
          </div>
        </div>

        {/* AG Grid */}
        <MahasiswaTable
          mahasiswa={mahasiswa}
          quickFilter={quickFilter}
          colDefs={colDefs}
        />
      </div>
    </ComponentCard>
  );
}

import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { Kelas as DataKelas } from "@/modules/models/kelas";
import { useMemo } from "react";

const modules = [AllCommunityModule];

export default function KelasTable({
  kelas,
  colDefs,
  quickFilter,
  loading,
}: {
  kelas: DataKelas[];
  colDefs: ColDef<DataKelas>[];
  quickFilter: string;
  loading: boolean;
}) {
  const defaultColDef = useMemo<ColDef<DataKelas>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: false,
    }),
    []
  );

  return (
    <AgGridProvider modules={modules}>
      <div className="w-full overflow-hidden rounded-lg border border-gray-200">
        <div className="h-[650px] w-full">
          <AgGridReact<DataKelas>
            rowData={kelas}
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
  );
}

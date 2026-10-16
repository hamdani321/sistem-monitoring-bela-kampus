import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { Mahasiswa as DataMahasiswa } from "@/modules/models/mahasiswa";
import { useMemo } from "react";
const modules = [AllCommunityModule];

export default function MahasiswaTable({
  mahasiswa,
  colDefs,
  quickFilter,
  loading,
}: {
  mahasiswa: DataMahasiswa[];
  colDefs: ColDef<DataMahasiswa>[];
  quickFilter: string;
  loading: boolean;
}) {
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: false,
    }),
    []
  );

  return (
    <>
      <AgGridProvider modules={modules}>
        <div className="w-full overflow-hidden rounded-lg border border-gray-200">
          <div className="h-[650px] w-full">
            <AgGridReact<DataMahasiswa>
              rowData={mahasiswa}
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
    </>
  );
}

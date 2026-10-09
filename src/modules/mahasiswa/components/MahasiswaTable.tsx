import { AllCommunityModule, ColDef } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { Mahasiswa as DataMahasiswa } from "@/modules/models/mahasiswa";
import { useMemo } from "react";
const modules = [AllCommunityModule];

export default function MahasiswaTable({
  mahasiswa,
  colDefs,
  quickFilter,
}: {
  mahasiswa: DataMahasiswa[];
  colDefs: ColDef<DataMahasiswa>[];
  quickFilter: string;
}) {
  //   const colDefs = useMemo<ColDef<DataMahasiswa>[]>(
  //     () => [
  //       {
  //         headerName: "No",
  //         width: 70,
  //         minWidth: 70,
  //         maxWidth: 70,
  //         pinned: "left",
  //         sortable: false,
  //         filter: false,
  //         resizable: false,
  //         valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
  //         cellStyle: {
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         },
  //       },

  //       {
  //         field: "nama",
  //         headerName: "Nama",
  //         flex: 1.3,
  //         minWidth: 200,
  //       },

  //       {
  //         field: "nim",
  //         headerName: "NIM",
  //         flex: 0.8,
  //         minWidth: 140,
  //       },

  //       {
  //         field: "email",
  //         headerName: "Email",
  //         flex: 1.3,
  //         minWidth: 220,
  //       },

  //       {
  //         field: "jenis_kelamin",
  //         headerName: "Jenis Kelamin",
  //         flex: 0.8,
  //         minWidth: 140,
  //         valueFormatter: (params) => {
  //           switch (params.value) {
  //             case "L":
  //               return "Laki-laki";

  //             case "P":
  //               return "Perempuan";

  //             default:
  //               return params.value ?? "-";
  //           }
  //         },
  //       },

  //       {
  //         field: "prodi.nama",
  //         headerName: "Program Studi",
  //         flex: 1.2,
  //         minWidth: 200,
  //       },
  //     ],
  //     []
  //   );

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
              //   loading={loading}
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

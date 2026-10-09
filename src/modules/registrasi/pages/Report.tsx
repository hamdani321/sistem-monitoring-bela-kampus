import ComponentCard from "@/components/common/ComponentCard";
import { Registrasi } from "@/modules/models/registrasi";
import { Component, ReactNode, useMemo } from "react";
import { useParams } from "react-router";
import { getRegistrasiById } from "../services/registrasi.service";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { ReportKegiatan } from "@/modules/models/report_kegiatan";

const modules = [AllCommunityModule];

export default function Report() {
  const { id } = useParams();

  return <ReportPage id={id} />;
}

interface ReportPageState {
  registrasi: Registrasi | null;
  loading: boolean;
}

interface ReportPageProps {
  id: string | undefined;
}

class ReportPage extends Component<ReportPageProps, ReportPageState> {
  state: ReportPageState = {
    registrasi: null,
    loading: true,
  };
  async componentDidMount() {
    const result = await getRegistrasiById(this.props.id);
    console.log(result);
    this.setState({ registrasi: result, loading: false });
  }

  colDefs: ColDef<ReportKegiatan>[] = [
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
      field: "nama_pic",
      headerName: "Nama PIC",
      flex: 1.4,
      minWidth: 220,

      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
        return (
          <div className="py-2">
            <div className="font-semibold text-gray-800">
              {params.data?.nama_pic ?? "-"}
            </div>

            <div className="mt-1 text-xs text-gray-400">
              ID: {params.data?.id ?? "-"}
            </div>
          </div>
        );
      },

      autoHeight: true,
    },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  render(): ReactNode {
    const { registrasi, loading } = this.state;
    return (
      <>
        <ComponentCard title="Detail Registrasi" className="mb-3">
          <h1>Data {registrasi?.nim_mahasiswa}</h1>
        </ComponentCard>

        <ComponentCard title="Report Kegiatan">
          {/* Table */}
          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[650px] w-full">
                <AgGridReact<Registrasi>
                  rowData={registrasi?.report_kegiatan}
                  columnDefs={this.colDefs}
                  defaultColDef={this.defaultColDef}
                  loading={loading}
                  pagination
                  paginationAutoPageSize
                  //   quickFilterText={quickFilter}
                  animateRows
                  suppressCellFocus
                />
              </div>
            </div>
          </AgGridProvider>
        </ComponentCard>
      </>
    );
  }
}

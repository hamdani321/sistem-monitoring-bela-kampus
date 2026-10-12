import ComponentCard from "@/components/common/ComponentCard";
import { Registrasi } from "@/modules/models/registrasi";
import { Component, ReactNode, useMemo } from "react";
import { Link, useParams } from "react-router";
import { getRegistrasiById } from "../services/registrasi.service";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { ReportKegiatan } from "@/modules/models/report_kegiatan";
import Button from "@/components/ui/button/Button";

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
              Nomor HP : {params.data?.nomor_hp_pic ?? "-"}
            </div>
          </div>
        );
      },

      autoHeight: true,
    },

    {
      headerName: "Video",
      field: "video",
      minWidth: 160,
      maxWidth: 190,
      flex: 1,
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
        const videoUrl = params.data?.video;

        if (!videoUrl?.trim()) {
          return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.47 4.47a.75.75 0 0 1 1.06 0l10 10a.75.75 0 1 1-1.06 1.06l-10-10a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
                <path d="M10 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8Zm0 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Z" />
              </svg>
              Tidak ada video
            </span>
          );
        }

        return (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lihat video kegiatan"
            className="group inline-flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-600 hover:text-white hover:shadow-md hover:shadow-rose-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20 dark:hover:bg-rose-600 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" />
            </svg>

            <span>Lihat Video</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        );
      },
    },

    {
      headerName: "Aksi",
      field: "video",
      minWidth: 160,
      maxWidth: 190,
      flex: 1,
      sortable: false,
      filter: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<ReportKegiatan>) => {
        const reportKegiatan = params.data;

        return (
          <Link to={`/report-kegiatan/${reportKegiatan?.id}`}>
            <Button size="sm">Detail</Button>
          </Link>
        );
      },
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

import ComponentCard from "@/components/common/ComponentCard";
import { User as DataUser } from "@/modules/models/user";
import { Component } from "react";
import getUsers from "../services/users.service";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { Link } from "react-router";
import Button from "@/components/ui/button/Button";
// import Badge from "@/components/ui/badge/Badge";
import CardStatistic from "../components/CardStatistic";

const modules = [AllCommunityModule];

interface State {
  users: DataUser[];
  loading: boolean;
  quickFilter: string;
}
export default class Users extends Component<{}, State> {
  state: State = {
    users: [],
    loading: true,
    quickFilter: "",
  };
  async componentDidMount() {
    try {
      const dataUser = await getUsers();
      console.log(dataUser);

      this.setState({ users: dataUser, loading: false });
    } catch (error) {}
  }

  isValidCoordinate(latitude: unknown, longitude: unknown): boolean {
    const lat = Number(latitude);
    const lng = Number(longitude);

    return (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }

  colDefs: ColDef[] = [
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
      field: "name",
      headerName: "Sekolah",
      flex: 1.4,
      minWidth: 220,

      cellRenderer: (params: ICellRendererParams<DataUser>) => {
        return (
          <div className="py-2">
            <div className="font-semibold text-gray-800">
              {params.data?.name ?? "-"}
            </div>

            <div className="mt-1 text-xs text-gray-400">
              ID: {params.data?.id ?? "-"}
            </div>
          </div>
        );
      },

      autoHeight: true,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      minWidth: 220,
      cellRenderer: (params: ICellRendererParams<DataUser>) => {
        const email = params.data?.email;

        if (!email) {
          return <span className="text-gray-400">Tidak tersedia</span>;
        }

        return (
          <a
            href={`mailto:${email}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {email}
          </a>
        );
      },
    },
    {
      headerName: "Aksi",
      flex: 0.9,
      minWidth: 150,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: () => {
        return (
          <Button variant="primary" size="sm">
            Reset
          </Button>
        );
      },
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  render() {
    const { users, loading } = this.state;
    if (loading) {
      return (
        <ComponentCard title="Data Users">
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              {/* Spinner */}
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

              {/* Text */}
              <p className="text-sm font-medium text-gray-500">
                Memuat data users...
              </p>
            </div>
          </div>
        </ComponentCard>
      );
    }

    return (
      <>
        <ComponentCard title="Data Users">
          {/* Header / Toolbar */}
          <div className="mb-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: Information */}
              <div>
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                  Daftar Users
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Kelola data pengguna yang terdaftar di dalam sistem.
                </p>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Refresh */}
                <button
                  type="button"
                  // onClick={this.handleRefresh}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h5M20 20v-5h-5M5.05 9A7 7 0 0117.9 6.1L20 4m-3.05 11A7 7 0 016.1 17.9L4 20"
                    />
                  </svg>
                  Refresh
                </button>

                {/* Add User */}
                <button
                  type="button"
                  // onClick={this.handleAddUser}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Tambah User
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total */}
            <CardStatistic
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
              }
              value={users.length}
              title="Total Users"
            />
            {/* <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Users
                  </p>

                  <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                    {users.length}
                  </h4>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                </div>
              </div>
            </div> */}

            {/* Active */}
            {/* <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active Users
                  </p>

                  <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                    0
                  </h4>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
              </div>
            </div> */}

            {/* Inactive */}
            {/* <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Inactive Users
                  </p>

                  <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                    0
                  </h4>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </div>
              </div>
            </div> */}

            {/* Roles */}
            {/* <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Roles
                  </p>

                  <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white">
                    0
                  </h4>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.4 15a1.7 1.7 0 00.34 1.88l.06.06-1.4 1.4-.06-.06a1.7 1.7 0 00-1.88-.34 1.7 1.7 0 00-1.03 1.56V20h-2v-.09a1.7 1.7 0 00-1.03-1.56 1.7 1.7 0 00-1.88.34l-.06.06-1.4-1.4.06-.06A1.7 1.7 0 009.46 15a1.7 1.7 0 00-1.56-1.03H7v-2h.9A1.7 1.7 0 009.46 11a1.7 1.7 0 00-.34-1.88l-.06-.06 1.4-1.4.06.06a1.7 1.7 0 001.88.34A1.7 1.7 0 0013.43 6V5h2v1a1.7 1.7 0 001.03 1.56 1.7 1.7 0 001.88-.34l.06-.06 1.4 1.4-.06.06A1.7 1.7 0 0019.4 11a1.7 1.7 0 001.56 1.03H22v2h-1.04A1.7 1.7 0 0019.4 15z"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
          </div>

          {/* Search & Filter Toolbar */}
          <div className="mb-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                type="text"
                placeholder="Cari nama, email, username..."
                value={this.state.quickFilter}
                onChange={(event) => {
                  this.setState({
                    quickFilter: event.target.value,
                  });
                }}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
              />
            </div>

            {/* Toolbar actions */}
            {/* <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h18M6 10h12M10 16h4"
                  />
                </svg>
                Filter
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Export
              </button>
            </div> */}
          </div>

          {/* Table */}
          <AgGridProvider modules={modules}>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="h-[600px] w-full">
                <AgGridReact<DataUser>
                  rowData={users}
                  columnDefs={this.colDefs}
                  defaultColDef={this.defaultColDef}
                  loading={loading}
                  quickFilterText={this.state.quickFilter}
                  pagination
                  paginationAutoPageSize
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

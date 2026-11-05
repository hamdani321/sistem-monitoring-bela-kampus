import ComponentCard from "@/components/common/ComponentCard";
import { User as DataUser, User } from "@/modules/models/user";
import { Component } from "react";
import getUsers from "../services/users.service";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { Link } from "react-router";
// import Button from "@/components/ui/button/Button";
// import Badge from "@/components/ui/badge/Badge";
import CardStatistic from "../components/CardStatistic";
import { KeyRound, Mail } from "lucide-react";

const modules = [AllCommunityModule];

interface State {
  users: DataUser[];
  loading: boolean;
  quickFilter: string;
}
export default class UsersPage extends Component<{}, State> {
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
  AVATAR_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-cyan-100 text-cyan-700",
    "bg-indigo-100 text-indigo-700",
    "bg-teal-100 text-teal-700",
  ];
  getAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.AVATAR_COLORS[Math.abs(hash) % this.AVATAR_COLORS.length];
  };

  getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  colDefs: ColDef<User>[] = [
    {
      headerName: "No",
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      pinned: "left",
      sortable: false,
      filter: false,
      resizable: false,
      headerClass: "text-center",
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      cellRenderer: (params: ICellRendererParams<DataUser>) => (
        <div className="flex h-full items-center justify-center">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
            {params.value}
          </span>
        </div>
      ),
    },

    {
      field: "name",
      headerName: "Sekolah",
      flex: 1.4,
      minWidth: 260,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DataUser>) => {
        const name = params.data?.name ?? "-";
        const id = params.data?.id ?? "-";

        return (
          <div className="flex items-center gap-3 py-2.5">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${this.getAvatarColor(
                name
              )}`}
            >
              {this.getInitials(name)}
            </div>

            <div className="min-w-0 leading-tight">
              <div className="truncate font-semibold text-gray-800">{name}</div>
              <span className="mt-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] text-gray-500">
                ID: {id}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      minWidth: 240,
      cellRenderer: (params: ICellRendererParams<DataUser>) => {
        const email = params.data?.email;

        if (!email) {
          return (
            <div className="flex h-full items-center">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-400">
                Tidak tersedia
              </span>
            </div>
          );
        }

        return (
          <div className="flex h-full items-center">
            <a
              href={`mailto:${email}`}
              className="group inline-flex max-w-full items-center gap-2 rounded-lg px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <Mail className="h-4 w-4 shrink-0 text-blue-400 group-hover:text-blue-600" />
              <span className="truncate">{email}</span>
            </a>
          </div>
        );
      },
    },

    {
      headerName: "Aksi",
      flex: 0.8,
      minWidth: 150,
      sortable: false,
      filter: false,
      headerClass: "text-center",
      cellRenderer: () => (
        <div className="flex h-full items-center justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow active:scale-95"
          >
            <KeyRound className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      ),
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

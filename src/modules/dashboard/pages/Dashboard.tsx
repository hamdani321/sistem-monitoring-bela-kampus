import { Component, ReactNode } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import Switch from "../components/Switch";
import { Portal } from "@/modules/models/portal";
import { getDataDashboard } from "../services/dashboard.service";

// type PortalStatus = "Aktif" | "Akan Datang" | "Selesai";
type PortalStatus = "AKTIF" | "NONAKTIF";

// interface Portal {
//   id: number;
//   nama: string;
//   tahun_ajaran: string;
//   waktu_mulai: string;
//   waktu_selesai: string;
//   semester: string;
//   status: PortalStatus;
//   total_registrasi: number;
// }

interface DashboardState {
  search: string;
  statusFilter: string;
  currentPage: number;
  portals: Portal[];
  loading: boolean;
}

// const portals: Portal[] = [
//   {
//     id: 1,
//     nama: "Bela Kampus 2026/2027",
//     tahun_ajaran: "2026/2027",
//     waktu_mulai: "2026-10-01",
//     waktu_selesai: "2026-11-30",
//     semester: "Ganjil",
//     status: "Aktif",
//     total_registrasi: 386,
//   },
//   {
//     id: 2,
//     nama: "Bela Kampus 2025/2026",
//     tahun_ajaran: "2025/2026",
//     waktu_mulai: "2026-03-01",
//     waktu_selesai: "2026-06-30",
//     semester: "Genap",
//     status: "Selesai",
//     total_registrasi: 542,
//   },
//   {
//     id: 3,
//     nama: "Bela Kampus 2027/2028",
//     tahun_ajaran: "2027/2028",
//     waktu_mulai: "2027-01-01",
//     waktu_selesai: "2027-02-28",
//     semester: "Ganjil",
//     status: "Akan Datang",
//     total_registrasi: 0,
//   },
//   {
//     id: 4,
//     nama: "Bela Kampus Semester Genap",
//     tahun_ajaran: "2026/2027",
//     waktu_mulai: "2027-03-01",
//     waktu_selesai: "2027-06-30",
//     semester: "Genap",
//     status: "Akan Datang",
//     total_registrasi: 0,
//   },
// ];

const statistics = [
  {
    title: "Mahasiswa Terdaftar",
    value: "1.248",
    description: "Total mahasiswa terdaftar",
    icon: "graduation",
    color: "indigo",
  },
  {
    title: "Registrasi Individu",
    value: "386",
    description: "Registrasi perorangan",
    icon: "user",
    color: "blue",
  },
  {
    title: "Registrasi Kelompok",
    value: "862",
    description: "Registrasi dalam kelompok",
    icon: "users",
    color: "violet",
  },
  {
    title: "Total Portal",
    value: "8",
    description: "Seluruh portal",
    icon: "portal",
    color: "amber",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <DashboardPage navigate={navigate} />
    </>
  );
}

class DashboardPage extends Component<
  { navigate: NavigateFunction },
  DashboardState
> {
  state: DashboardState = {
    search: "",
    statusFilter: "Semua",
    currentPage: 1,
    portals: [],
    loading: true,
  };

  pageSize = 5;

  formatDate(date: string) {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  // get filteredPortals() {
  //   const { search, statusFilter, portals } = this.state;

  //   return portals.filter((portal) => {
  //     const matchesSearch = [
  //       portal.id,
  //       portal.tahun_ajaran?.nama,
  //       portal.waktu_mulai,
  //     ].some((value) => value.toLowerCase().includes(search.toLowerCase()));

  //     const matchesStatus =
  //       statusFilter === "Semua" || portal.status === statusFilter;

  //     return matchesSearch && matchesStatus;
  //   });
  // }

  renderIcon(icon: string) {
    const common = {
      className: "h-6 w-6",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.7,
      "aria-hidden": true as const,
    };

    switch (icon) {
      case "graduation":
        return (
          <svg {...common}>
            <path d="m2 10 10-6 10 6-10 6-10-6Z" />
            <path d="M6 13v5c4 3 8 3 12 0v-5M22 10v6" />
          </svg>
        );
      case "user":
        return (
          <svg {...common}>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        );
      case "users":
        return (
          <svg {...common}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      default:
        return (
          <svg {...common}>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 10h18M9 4v6" />
          </svg>
        );
    }
  }

  renderStatus(status: PortalStatus) {
    const styles: Record<PortalStatus, string> = {
      AKTIF: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
      // "Akan Datang": "bg-amber-50 text-amber-700 ring-amber-600/20",
      NONAKTIF: "bg-slate-100 text-slate-600 ring-slate-500/20",
    };

    const dotStyles: Record<PortalStatus, string> = {
      AKTIF: "bg-emerald-500",
      // "Akan Datang": "bg-amber-500",
      NONAKTIF: "bg-slate-400",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
        {status}
      </span>
    );
  }

  async fetchDataDashboard() {
    const result = await getDataDashboard();
    this.setState({
      portals: result.data.portal,
      loading: false,
    });
  }

  componentDidMount(): void {
    this.fetchDataDashboard();
  }

  render(): ReactNode {
    const { search, statusFilter, currentPage, portals } = this.state;
    // const filteredPortals = this.filteredPortals;
    // const totalPages = Math.max(
    //   1,
    //   Math.ceil(filteredPortals.length / this.pageSize)
    // );

    // const page = Math.min(currentPage, totalPages);
    // const startIndex = (page - 1) * this.pageSize;
    // const paginatedPortals = filteredPortals.slice(
    //   startIndex,
    //   startIndex + this.pageSize
    // );

    return (
      <div className="min-h-screen bg-slate-50">
        {/* Main content */}
        <main className="mx-auto max-w-[1600px] space-y-4 px-4 py-4 sm:px-4 lg:px-2">
          {/* Header */}
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                SISTEM BELA KAMPUS
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Ringkasan aktivitas registrasi dan portal Bela Kampus.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 sm:flex">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
                </svg>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                  AD
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Administrator
                  </p>
                  <p className="text-xs text-slate-500">Pengelola sistem</p>
                </div>
              </div>
            </div>
          </header>

          {/* Statistics */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                Ringkasan Data
              </h2>
              <span className="text-xs text-slate-500">
                Statistik keseluruhan
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {statistics.map((item) => {
                const colorStyles: Record<string, string> = {
                  indigo: "bg-indigo-50 text-indigo-600",
                  blue: "bg-sky-50 text-sky-600",
                  violet: "bg-violet-50 text-violet-600",
                  amber: "bg-amber-50 text-amber-600",
                };

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {item.title}
                        </p>
                        <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                          {item.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          colorStyles[item.color]
                        }`}
                      >
                        {this.renderIcon(item.icon)}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <p className="text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Registration composition */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-bold text-slate-800">
                    Komposisi Registrasi
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Perbandingan registrasi individu dan kelompok.
                  </p>
                </div>
                <span className="text-xs text-slate-400">Data ilustrasi</span>
              </div>

              <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                <div className="flex justify-center">
                  <div className="relative h-44 w-44">
                    <svg
                      viewBox="0 0 120 120"
                      className="h-full w-full -rotate-90"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#EDE9FE"
                        strokeWidth="16"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="16"
                        strokeDasharray="87.96 282.74"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-slate-900">
                        1.248
                      </span>
                      <span className="mt-1 text-xs text-slate-500">
                        Registrasi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-indigo-600" />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Individu
                        </p>
                        <p className="text-xs text-slate-500">
                          Registrasi mandiri
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">386</p>
                      <p className="text-xs text-slate-500">31%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-violet-200" />
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Kelompok
                        </p>
                        <p className="text-xs text-slate-500">Registrasi tim</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">862</p>
                      <p className="text-xs text-slate-500">69%</p>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-violet-100">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: "31%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 to-violet-700 p-6 text-white shadow-lg shadow-indigo-900/10">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  {this.renderIcon("portal")}
                </div>

                <p className="mt-6 text-sm font-medium text-indigo-100">
                  Portal Bela Kampus
                </p>
                <h2 className="mt-2 text-4xl font-bold">8</h2>
                <p className="mt-2 text-sm leading-6 text-indigo-100">
                  Total portal yang sudah dibuat untuk berbagai periode
                  pelaksanaan Bela Kampus.
                </p>

                <div className="mt-6 border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-indigo-100">Portal aktif</span>
                    <span className="font-bold">1 portal</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/20">
                    <div
                      className="h-2 rounded-full bg-white"
                      style={{ width: "12.5%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portal table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Data Portal
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Kelola dan pantau seluruh periode portal Bela Kampus.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/portal/create";
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Tambah Portal
              </button>
            </div>

            {/* Search and filter */}
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    this.setState({
                      search: event.target.value,
                      currentPage: 1,
                    })
                  }
                  placeholder="Cari nama portal atau tahun ajaran..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  this.setState({
                    statusFilter: event.target.value,
                    currentPage: 1,
                  })
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-semibold">Portal</th>
                    <th className="px-6 py-4 font-semibold">Tahun Ajaran</th>
                    <th className="px-6 py-4 font-semibold">
                      Periode Pelaksanaan
                    </th>
                    <th className="px-6 py-4 font-semibold">Semester</th>
                    <th className="px-6 py-4 font-semibold">Registrasi</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {portals.map((portal) => (
                    <tr
                      key={portal.id}
                      className="transition hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            {this.renderIcon("portal")}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {portal.tahun_ajaran?.nama}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              ID Portal: {portal.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {portal.tahun_ajaran?.nama}
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {this.formatDate(portal.waktu_mulai)}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          s.d. {this.formatDate(portal.waktu_selesai)}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {/* {portal.semester} */}
                          fdd
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                        {/* {portal.total_registrasi.toLocaleString("id-ID")} */}
                        dfdf
                      </td>

                      <td className="px-6 py-4">
                        {this.renderStatus(portal.status)}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <Switch />
                        {/* <button
                          type="button"
                          onClick={() => {
                            this.props.navigate("/sekolah");
                          }}
                          aria-label={`Lihat detail ${portal.nama}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="M7 17 17 7M7 7h10v10" />
                          </svg>
                        </button> */}
                      </td>
                    </tr>
                  ))}

                  {portals.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="h-7 w-7"
                            aria-hidden="true"
                          >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m16 16 4 4M8 11h6" />
                          </svg>
                        </div>
                        <p className="mt-4 font-semibold text-slate-700">
                          Portal tidak ditemukan
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Coba ubah kata kunci pencarian atau filter status.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {/* <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-slate-500">
                Menampilkan{" "}
                <span className="font-semibold text-slate-700">
                  {filteredPortals.length === 0 ? 0 : startIndex + 1}–
                  {Math.min(startIndex + this.pageSize, filteredPortals.length)}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-slate-700">
                  {filteredPortals.length}
                </span>{" "}
                portal
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => this.setState({ currentPage: page - 1 })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sebelumnya
                </button>

                <span className="px-2 text-sm font-semibold text-slate-700">
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => this.setState({ currentPage: page + 1 })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Berikutnya
                </button>
              </div>
            </div> */}
          </section>

          <footer className="pb-4 text-center text-xs text-slate-400">
            Sistem Bela Kampus · Dashboard Administrator
          </footer>
        </main>
      </div>
    );
  }
}

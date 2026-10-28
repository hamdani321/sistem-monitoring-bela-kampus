import { Portal } from "@/modules/models/portal";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import getDataPortal from "../services/data-portal.service";
// import type { Portal, TahunAjaran } from "../types";

// const dummyTahunAjaran: TahunAjaran[] = [
//   {
//     id: 1,
//     nama: "Tahun Ajaran 2026/2027",
//     tahun: "2026/2027",
//     jenis: "Ganjil",
//     created_at: "2026-01-01T00:00:00",
//     updated_at: "2026-01-01T00:00:00",
//   },
//   {
//     id: 2,
//     nama: "Tahun Ajaran 2025/2026",
//     tahun: "2025/2026",
//     jenis: "Genap",
//     created_at: "2025-01-01T00:00:00",
//     updated_at: "2025-01-01T00:00:00",
//   },
//   {
//     id: 3,
//     nama: "Tahun Ajaran 2027/2028",
//     tahun: "2027/2028",
//     jenis: "Ganjil",
//     created_at: "2026-01-01T00:00:00",
//     updated_at: "2026-01-01T00:00:00",
//   },
// ];

// const dummyPortals: Portal[] = [
//   {
//     id: 1,
//     tahun_ajaran_id: 1,
//     waktu_mulai: "2026-09-01T00:00:00",
//     waktu_selesai: "2026-12-31T23:59:59",
//     status: "AKTIF",
//     tahun_ajaran: dummyTahunAjaran[0],
//   },
//   {
//     id: 2,
//     tahun_ajaran_id: 2,
//     waktu_mulai: "2026-02-01T00:00:00",
//     waktu_selesai: "2026-06-30T23:59:59",
//     status: "NONAKTIF",
//     tahun_ajaran: dummyTahunAjaran[1],
//   },
//   {
//     id: 3,
//     tahun_ajaran_id: 3,
//     waktu_mulai: "2027-02-01T00:00:00",
//     waktu_selesai: "2027-06-30T23:59:59",
//     status: "NONAKTIF",
//     tahun_ajaran: dummyTahunAjaran[2],
//   },
// ];

type StatusTampilan = "AKTIF" | "NONAKTIF" | "AKAN_DATANG" | "SELESAI";

const getStatusTampilan = (portal: Portal): StatusTampilan => {
  if (portal.status === "NONAKTIF") return "NONAKTIF";

  const now = new Date();
  const mulai = new Date(portal.waktu_mulai);
  const selesai = new Date(portal.waktu_selesai);

  if (now < mulai) return "AKAN_DATANG";
  if (now > selesai) return "SELESAI";

  return "AKTIF";
};

const statusStyle: Record<StatusTampilan, string> = {
  AKTIF: "bg-emerald-100 text-emerald-700",
  NONAKTIF: "bg-slate-100 text-slate-600",
  AKAN_DATANG: "bg-blue-100 text-blue-700",
  SELESAI: "bg-amber-100 text-amber-700",
};

const statusLabel: Record<StatusTampilan, string> = {
  AKTIF: "Aktif",
  NONAKTIF: "Nonaktif",
  AKAN_DATANG: "Akan Datang",
  SELESAI: "Selesai",
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// const inputClass =
//   "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-50";

export default function DataPortal() {
  // const [portals, setPortals] = useState<Portal[]>(dummyPortals);
  const [portals, setPortals] = useState<Portal[]>([]);
  // const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const fetchDataPortal = useCallback(async () => {
    const dataPortal = await getDataPortal();
    setPortals(dataPortal.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataPortal();
  }, []);

  // const [form, setForm] = useState({
  //   tahun_ajaran_id: "",
  //   waktu_mulai: "",
  //   waktu_selesai: "",
  // });

  // Portal yang statusnya AKTIF dan sedang dalam periode pelaksanaan.
  const activePortals = portals.filter(
    (portal) => getStatusTampilan(portal) === "AKTIF"
  );

  const sortedPortals = [...portals].sort(
    (a, b) =>
      new Date(b.waktu_mulai).getTime() - new Date(a.waktu_mulai).getTime()
  );

  // Switch untuk mengubah status portal.
  const togglePortal = (id: number) => {
    setPortals((previous) =>
      previous.map((portal) =>
        portal.id === id
          ? {
              ...portal,
              status: portal.status === "AKTIF" ? "NONAKTIF" : "AKTIF",
            }
          : portal
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center">
          {/* Animasi spinner */}
          <div className="relative mx-auto mb-6 h-16 w-16">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100" />

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600" />

            <div className="absolute inset-3 flex items-center justify-center rounded-full bg-white">
              <svg
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h10"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-800">
            Memuat Data Portal
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Mohon tunggu, kami sedang menyiapkan data portal...
          </p>

          {/* Progress bar dekoratif */}
          <div className="mx-auto mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-1">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-teal-700">
              Sistem Bela Kampus
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Portal Bela Kampus
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Kelola portal dan periode pelaksanaan Bela Kampus.
            </p>
          </div>

          {/* <Link
            to={"/data-portal/create"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100"
          >
            Tambah Portal
          </Link> */}

          <Link
            to={"/data-portal/create"}
            // type="button"
            // onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Tambah Portal
          </Link>
        </header>

        {/* Portal Aktif */}
        <section>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 2 4 14h7l-1 8 10-12h-7l0-8Z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Portal Sedang Aktif
            </h2>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {activePortals.length} Aktif
            </span>
          </div>

          {activePortals.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {activePortals.map((portal) => (
                <article
                  key={portal.id}
                  className="overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="h-2 bg-gradient-to-r from-teal-600 to-emerald-400" />

                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                        PORTAL AKTIF
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                        Semester {portal.tahun_ajaran?.jenis ?? "-"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
                      {portal.tahun_ajaran?.nama ?? "Portal Bela Kampus"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Periode pelaksanaan Bela Kampus yang sedang berlangsung.
                    </p>

                    <div className="my-6 grid grid-cols-1 gap-5 border-y border-slate-100 py-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          TAHUN AJARAN
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {portal.tahun_ajaran?.tahun ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          JENIS SEMESTER
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {portal.tahun_ajaran?.jenis ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          WAKTU MULAI
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {formatDate(portal.waktu_mulai)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          WAKTU SELESAI
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {formatDate(portal.waktu_selesai)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => console.log("Detail portal:", portal.id)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                      Lihat Detail Portal <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18M9 15h6" />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Tidak Ada Portal yang Aktif
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Saat ini belum ada portal yang aktif dalam periode pelaksanaan.
                Aktifkan portal melalui switch pada daftar di bawah.
              </p>
            </div>
          )}
        </section>

        {/* Semua Portal */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Semua Portal</h2>
              <p className="mt-1 text-sm text-slate-500">
                Kelola status dan informasi setiap portal.
              </p>
            </div>

            <span className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
              {sortedPortals.length} Portal
            </span>
          </div>

          {sortedPortals.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {sortedPortals.map((portal) => {
                const status = getStatusTampilan(portal);

                return (
                  <article
                    key={portal.id}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="4" width="18" height="17" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
                      >
                        {statusLabel[status]}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-800">
                      {portal.tahun_ajaran?.nama ?? "Portal Bela Kampus"}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Tahun {portal.tahun_ajaran?.tahun ?? "-"}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">Jenis Semester</span>
                        <span className="font-medium text-slate-700">
                          {portal.tahun_ajaran?.jenis ?? "-"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">Waktu Mulai</span>
                        <span className="text-right font-medium text-slate-700">
                          {formatDate(portal.waktu_mulai)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">Waktu Selesai</span>
                        <span className="text-right font-medium text-slate-700">
                          {formatDate(portal.waktu_selesai)}
                        </span>
                      </div>
                    </div>

                    {/* Switch Status Portal */}
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-3.5">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {portal.status === "AKTIF"
                            ? "Portal Diaktifkan"
                            : "Portal Dinonaktifkan"}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {portal.status === "AKTIF"
                            ? "Diizinkan berjalan sesuai periode"
                            : "Tidak dapat digunakan mahasiswa"}
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={portal.status === "AKTIF"}
                        aria-label={`${
                          portal.status === "AKTIF" ? "Nonaktifkan" : "Aktifkan"
                        } ${portal.tahun_ajaran?.nama ?? "portal"}`}
                        onClick={() => togglePortal(portal.id)}
                        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-teal-100 ${
                          portal.status === "AKTIF"
                            ? "bg-teal-600"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                            portal.status === "AKTIF"
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <Link
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700"
                      to={`/data-portal/${portal.id}`}
                    >
                      Lihat Detail <span>→</span>
                    </Link>

                    {/* <button
                      type="button"
                      onClick={() => console.log("Detail portal:", portal.id)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:bg-teal-50 hover:text-teal-700"
                    >
                      Lihat Detail <span>→</span>
                    </button> */}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
              <p className="font-semibold text-slate-700">
                Belum Ada Data Portal
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Klik Tambah Portal untuk membuat portal baru.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Modal Tambah Portal */}
      {/* {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2
                  id="modal-title"
                  className="text-xl font-bold text-slate-900"
                >
                  Tambah Portal
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Lengkapi informasi portal Bela Kampus.
                </p>
              </div>

              <button
                type="button"
                aria-label="Tutup modal"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPortal} className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="tahun_ajaran_id"
                  className="text-sm font-semibold text-slate-700"
                >
                  Tahun Ajaran
                </label>

                <select
                  id="tahun_ajaran_id"
                  required
                  value={form.tahun_ajaran_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      tahun_ajaran_id: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  <option value="">Pilih tahun ajaran</option>

                  {dummyTahunAjaran.map((tahun) => (
                    <option key={tahun.id} value={tahun.id}>
                      {tahun.nama} ({tahun.jenis})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="waktu_mulai"
                  className="text-sm font-semibold text-slate-700"
                >
                  Waktu Mulai
                </label>
                <input
                  id="waktu_mulai"
                  type="date"
                  required
                  value={form.waktu_mulai}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      waktu_mulai: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="waktu_selesai"
                  className="text-sm font-semibold text-slate-700"
                >
                  Waktu Selesai
                </label>
                <input
                  id="waktu_selesai"
                  type="date"
                  required
                  min={form.waktu_mulai || undefined}
                  value={form.waktu_selesai}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      waktu_selesai: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div className="rounded-xl bg-blue-50 p-3.5">
                <p className="text-xs leading-5 text-blue-700">
                  Portal baru disimpan dengan status NONAKTIF. Kamu bisa
                  mengaktifkannya melalui switch pada daftar portal.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100"
                >
                  Simpan Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </main>
  );
}

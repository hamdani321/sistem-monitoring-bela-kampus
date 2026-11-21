import { useAuth } from "@/context/UseAuth";
import { useEffect, useState } from "react";
import { getDataDashboardMahasiswa } from "../services/dashboard.service";
import { Portal } from "@/modules/models/portal";
import { Link } from "react-router";

export default function DashboardMahasiswa() {
  const [portalActive, setPortalActive] = useState<Portal | null>(null);
  async function fetchData() {
    try {
      const result = await getDataDashboardMahasiswa();
      console.log(result);
      setPortalActive(result.data.portalActive);
    } catch (error) {}
  }
  useEffect(() => {
    fetchData();
  }, []);
  const { user } = useAuth();
  return (
    <>
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-2">
        <div className="mx-auto max-w-8xl space-y-4">
          {/* Welcome Section */}
          <section className="z-0 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-white/5" />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-blue-50 backdrop-blur">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  Sistem Bela Kampus
                </div>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Halo, {user?.mahasiswa?.nama ?? "-"} ! 👋
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                  Selamat datang di dashboard Bela Kampus. Yuk, berkontribusi
                  memperkenalkan Politeknik Kampar kepada calon mahasiswa baru!
                </p>
              </div>

              <div className="hidden shrink-0 items-center justify-center md:flex">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                  <div className="text-center">
                    <span className="text-5xl">🎓</span>
                    <p className="mt-2 text-xs font-medium text-blue-100">
                      Student Portal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Student Information */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  👤
                </div>
                <span className="text-xs font-medium text-emerald-600">
                  Mahasiswa
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">NIM</p>
              <h3 className="mt-1 text-lg font-bold text-slate-800">
                230101001
              </h3>
              <p className="mt-1 text-xs text-slate-400">Identitas mahasiswa</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
                📚
              </div>
              <p className="mt-4 text-sm text-slate-500">Program Studi</p>
              <h3 className="mt-1 text-lg font-bold text-slate-800">
                Teknik Informatika
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Program studi mahasiswa
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                🏫
              </div>
              <p className="mt-4 text-sm text-slate-500">Kelas</p>
              <h3 className="mt-1 text-lg font-bold text-slate-800">TI 3A</h3>
              <p className="mt-1 text-xs text-slate-400">Kelas aktif</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                🏆
              </div>
              <p className="mt-4 text-sm text-slate-500">Total Kegiatan</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">05</h3>
              <p className="mt-1 text-xs text-emerald-600">
                Kegiatan terdaftar
              </p>
            </div>
          </section>

          {/* Main Content */}
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Progress */}

              {/* Registered Portal */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Portal Registrasi
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Daftar portal Bela Kampus yang kamu ikuti.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5">
                  {portalActive != null ? (
                    <>
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="flex gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                            🎯
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800">
                              Bela Kampus Semester Ganjil
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              {/* Tahun Ajaran 2026/2027 */}
                              {portalActive.tahun_ajaran?.nama}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                          Terdaftar
                        </span>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-blue-100 pt-4">
                        <div>
                          <p className="text-xs text-slate-500">
                            Tanggal mulai
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {/* 01 Agustus 2026 */}
                            {new Intl.DateTimeFormat("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }).format(new Date(portalActive.waktu_mulai))}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">
                            Tanggal berakhir
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {new Intl.DateTimeFormat("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            }).format(new Date(portalActive.waktu_selesai))}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                          <i className="bi bi-calendar-x text-2xl"></i>
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-800 sm:text-base">
                              Belum Ada Portal yang Dibuka
                            </h3>

                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                              Tidak Tersedia
                            </span>
                          </div>

                          <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
                            Saat ini belum ada portal Bela Kampus yang sedang
                            dibuka. Silakan periksa kembali secara berkala untuk
                            mengetahui informasi pembukaan portal berikutnya.
                          </p>

                          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-700">
                            <i className="bi bi-info-circle"></i>
                            <span>Pantau informasi portal secara berkala.</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 p-4 sm:flex-row">
                  {portalActive != null ? (
                    <>
                      <Link
                        to={`/portal/registrasi/${portalActive.id}`}
                        className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                      >
                        + Daftar Portal
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Recent Activities */}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">
                  Akses Cepat
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Akses fitur yang sering digunakan.
                </p>

                <div className="mt-5 space-y-3">
                  <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-lg">
                      📋
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        Portal Bela Kampus
                      </p>
                      <p className="text-xs text-slate-400">
                        Lihat portal tersedia
                      </p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-lg">
                      📝
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        Laporan Kegiatan
                      </p>
                      <p className="text-xs text-slate-400">
                        Buat laporan kunjungan
                      </p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </button>
                </div>
              </div>

              {/* Notification */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">
                    Notifikasi
                  </h2>
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
                    2 Baru
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm">
                      ⚠️
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Laporan belum lengkap
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Lengkapi laporan kunjungan SMK Negeri 1 Bangkinang.
                      </p>
                      <p className="mt-2 text-[11px] text-slate-400">
                        2 jam yang lalu
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm">
                      ✓
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        Registrasi berhasil
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Kamu berhasil terdaftar pada portal Bela Kampus.
                      </p>
                      <p className="mt-2 text-[11px] text-slate-400">Kemarin</p>
                    </div>
                  </div>
                </div>

                <button className="mt-5 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                  Lihat Semua Notifikasi
                </button>
              </div>

              {/* Information Card */}
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 py-5 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-slate-400">
              © 2026 Sistem Bela Kampus · Politeknik Kampar
            </p>
            <p className="text-xs text-slate-400">
              Bersama membangun masa depan pendidikan.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

import { useAuth } from "@/context/UseAuth";

export default function DashboardMahasiswa() {
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

                {/* <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50">
                    Lihat Portal Aktif
                  </button>
                  <button className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                    Panduan Kegiatan
                  </button>
                </div> */}
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
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Progress Bela Kampus
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Pantau pencapaian kegiatan Bela Kampus kamu.
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Tahun Ajaran 2026/2027
                  </span>
                </div>

                <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="relative flex h-36 w-36 shrink-0 items-center justify-center self-center sm:self-auto">
                    <svg
                      className="h-full w-full -rotate-90"
                      viewBox="0 0 120 120"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="49"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="49"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="10"
                        strokeDasharray="308"
                        strokeDashoffset="92"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <p className="text-3xl font-bold text-slate-800">70%</p>
                      <p className="text-xs text-slate-500">Tercapai</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          Target kunjungan
                        </span>
                        <span className="font-semibold text-slate-800">
                          7 / 10 Sekolah
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[70%] rounded-full bg-blue-600" />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-slate-700">
                          Laporan kegiatan
                        </span>
                        <span className="font-semibold text-slate-800">
                          5 / 7 Laporan
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full w-[71%] rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    <div className="rounded-xl bg-blue-50 p-3">
                      <p className="text-sm font-medium text-blue-800">
                        Terus tingkatkan kontribusimu!
                      </p>
                      <p className="mt-1 text-xs leading-5 text-blue-600">
                        Selesaikan 3 kunjungan sekolah lagi untuk mencapai
                        target kegiatan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Registered Portal */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Portal Saya
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Daftar portal Bela Kampus yang kamu ikuti.
                    </p>
                  </div>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Lihat Semua →
                  </button>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5">
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
                          Tahun Ajaran 2026/2027
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-blue-700">
                            Individu
                          </span>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            Aktif
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Terdaftar
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-blue-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-500">Tanggal mulai</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        01 Agustus 2026
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Tanggal berakhir</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        31 Desember 2026
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-slate-300 p-4 sm:flex-row">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Ingin mengikuti kegiatan lainnya?
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Temukan portal Bela Kampus yang masih terbuka.
                    </p>
                  </div>
                  <button className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                    + Daftar Portal
                  </button>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">
                      Aktivitas Terbaru
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Riwayat kegiatan Bela Kampus kamu.
                    </p>
                  </div>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Lihat Semua →
                  </button>
                </div>

                <div className="mt-5 space-y-5">
                  {[
                    {
                      school: "SMA Negeri 1 Bangkinang",
                      date: "20 Oktober 2026",
                      status: "Disetujui",
                      color: "emerald",
                      icon: "🏫",
                    },
                    {
                      school: "SMK Negeri 1 Bangkinang",
                      date: "15 Oktober 2026",
                      status: "Menunggu",
                      color: "amber",
                      icon: "🏫",
                    },
                    {
                      school: "SMA Negeri 2 Kampar",
                      date: "10 Oktober 2026",
                      status: "Disetujui",
                      color: "emerald",
                      icon: "🏫",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.school}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.date}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          item.color === "emerald"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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

                  <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-lg">
                      👥
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">
                        Kelompok Saya
                      </p>
                      <p className="text-xs text-slate-400">
                        Informasi anggota kelompok
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
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">💡</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                    Informasi
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold">Jadilah Duta Kampus!</h3>
                <p className="mt-2 text-sm leading-6 text-emerald-50">
                  Bagikan pengalaman kuliahmu dan bantu adik-adik SMA mengenal
                  lebih dekat Politeknik Kampar.
                </p>
                <button className="mt-5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
                  Pelajari Lebih Lanjut →
                </button>
              </div>
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

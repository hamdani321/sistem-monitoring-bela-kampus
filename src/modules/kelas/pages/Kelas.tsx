import { useMemo, useState } from "react";

const dataKelas = [
  {
    id: 1,
    nama: "TI - A",
    prodi: "Teknik Informatika",
    waliKelas: "Ahmad Fauzi, S.Kom.",
    jumlahMahasiswa: 32,
    warna: "blue",
  },
  {
    id: 2,
    nama: "TI - B",
    prodi: "Teknik Informatika",
    waliKelas: "Siti Rahma, M.Kom.",
    jumlahMahasiswa: 28,
    warna: "violet",
  },
  {
    id: 3,
    nama: "SI - A",
    prodi: "Sistem Informasi",
    waliKelas: "Budi Santoso, M.Kom.",
    jumlahMahasiswa: 30,
    warna: "emerald",
  },
  {
    id: 4,
    nama: "SI - B",
    prodi: "Sistem Informasi",
    waliKelas: "Dewi Anggraini, S.Kom.",
    jumlahMahasiswa: 25,
    warna: "amber",
  },
  {
    id: 5,
    nama: "MI - A",
    prodi: "Manajemen Informatika",
    waliKelas: "Rizky Pratama, M.Kom.",
    jumlahMahasiswa: 35,
    warna: "rose",
  },
  {
    id: 6,
    nama: "TI - C",
    prodi: "Teknik Informatika",
    waliKelas: "Andi Saputra, S.Kom.",
    jumlahMahasiswa: 26,
    warna: "cyan",
  },
];

const warnaKelas = {
  blue: "bg-blue-600",
  violet: "bg-violet-600",
  emerald: "bg-emerald-600",
  amber: "bg-amber-500",
  rose: "bg-rose-600",
  cyan: "bg-cyan-600",
};

const ikon = {
  sekolah: <path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-7h6v7" />,
  pengguna: (
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
  ),
  mahasiswa: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-1h6m-3-3v6" />
  ),
  cari: (
    <path d="m21 21-4.3-4.3m2.3-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
  ),
  tambah: <path d="M12 5v14m-7-7h14" />,
  panah: <path d="m9 18 6-6-6-6" />,
  menu: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
};

function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ikon[name]}
    </svg>
  );
}

function StatCard({ title, value, description, icon, color }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </h3>
          <p className="mt-2 text-xs text-gray-400">{description}</p>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon name={icon} className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

export default function Kelas() {
  const [search, setSearch] = useState("");
  const [filterProdi, setFilterProdi] = useState("Semua");
  const [menuAktif, setMenuAktif] = useState(null);

  const daftarProdi = [
    "Semua",
    ...new Set(dataKelas.map((kelas) => kelas.prodi)),
  ];

  const filteredKelas = useMemo(() => {
    return dataKelas.filter((kelas) => {
      const cocokSearch = [kelas.nama, kelas.waliKelas, kelas.prodi].some(
        (value) => value.toLowerCase().includes(search.toLowerCase())
      );

      const cocokProdi = filterProdi === "Semua" || kelas.prodi === filterProdi;

      return cocokSearch && cocokProdi;
    });
  }, [search, filterProdi]);

  const totalMahasiswa = dataKelas.reduce(
    (total, kelas) => total + kelas.jumlahMahasiswa,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-4 lg:p-2">
      <div className="mx-auto max-w-8xl space-y-4">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <span>Akademik</span>
              <Icon name="panah" className="h-3.5 w-3.5" />
              <span className="font-medium text-blue-600">Data Kelas</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Data Kelas
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Kelola informasi kelas, wali kelas, dan mahasiswa.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("Buka form tambah kelas")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Icon name="tambah" />
            Tambah Kelas
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Kelas"
            value={dataKelas.length}
            description="Kelas yang terdaftar dalam sistem"
            icon="sekolah"
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            title="Total Mahasiswa"
            value={totalMahasiswa}
            description="Mahasiswa dari seluruh kelas"
            icon="mahasiswa"
            color="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Wali Kelas"
            value={dataKelas.length}
            description="Kelas dengan wali kelas terdata"
            icon="pengguna"
            color="bg-violet-50 text-violet-600"
          />
        </div>

        {/* Search and filter */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Icon
                name="cari"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama kelas, wali kelas, atau prodi..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="filterProdi"
                className="shrink-0 text-sm font-medium text-gray-600"
              >
                Program Studi
              </label>
              <select
                id="filterProdi"
                value={filterProdi}
                onChange={(e) => setFilterProdi(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:min-w-52"
              >
                {daftarProdi.map((prodi) => (
                  <option key={prodi} value={prodi}>
                    {prodi === "Semua" ? "Semua Prodi" : prodi}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Daftar Kelas</h2>
            <p className="mt-1 text-sm text-gray-500">
              Menampilkan {filteredKelas.length} dari {dataKelas.length} kelas
            </p>
          </div>
        </div>

        {/* Class cards */}
        {filteredKelas.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredKelas.map((kelas) => (
              <div
                key={kelas.id}
                className="group relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-200/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm ${
                        warnaKelas[kelas.warna]
                      }`}
                    >
                      {kelas.nama.split(" - ")[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{kelas.nama}</h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {kelas.prodi}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      aria-label={`Aksi untuk ${kelas.nama}`}
                      aria-expanded={menuAktif === kelas.id}
                      onClick={() =>
                        setMenuAktif(menuAktif === kelas.id ? null : kelas.id)
                      }
                      className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                    >
                      <Icon name="menu" />
                    </button>

                    {menuAktif === kelas.id && (
                      <div className="absolute right-0 top-10 z-10 w-40 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuAktif(null);
                            alert(`Edit ${kelas.nama}`);
                          }}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Edit kelas
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuAktif(null);
                            alert(`Detail ${kelas.nama}`);
                          }}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Lihat detail
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="my-5 border-t border-gray-100" />

                {/* Homeroom teacher */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <Icon name="pengguna" className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">Wali Kelas</p>
                    <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                      {kelas.waliKelas}
                    </p>
                  </div>
                </div>

                {/* Student count */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                      <Icon name="mahasiswa" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Jumlah Mahasiswa</p>
                      <p className="mt-0.5 text-lg font-bold text-gray-900">
                        {kelas.jumlahMahasiswa}
                        <span className="ml-1 text-xs font-normal text-gray-400">
                          orang
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Terdaftar
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Lihat detail ${kelas.nama}`)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Lihat Detail
                  <Icon name="panah" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <Icon name="cari" className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-semibold text-gray-900">
              Data kelas tidak ditemukan
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Coba kata kunci lain atau ubah filter program studi.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilterProdi("Semua");
              }}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Layers3,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  UserRound,
  UserRoundCheck,
} from "lucide-react";

export type Prodi = {
  id: number;
  kode_prodi: number;
  nama: string;
  singkatan: string;
  jenjang: string;
  kaprodi: string;
  created_at: string;
  updated_at: string;
};

const DUMMY_PRODI: Prodi[] = [
  {
    id: 1,
    kode_prodi: 101,
    nama: "Teknik Informatika",
    singkatan: "TI",
    jenjang: "D3",
    kaprodi: "Ahmad Fauzi, S.Kom.",
    created_at: "2026-01-10T08:00:00",
    updated_at: "2026-02-12T08:00:00",
  },
  {
    id: 2,
    kode_prodi: 102,
    nama: "Sistem Informasi",
    singkatan: "SI",
    jenjang: "S1",
    kaprodi: "Siti Rahma, M.Kom.",
    created_at: "2026-01-11T08:00:00",
    updated_at: "2026-02-12T08:00:00",
  },
  {
    id: 3,
    kode_prodi: 103,
    nama: "Manajemen Informatika",
    singkatan: "MI",
    jenjang: "D3",
    kaprodi: "Budi Santoso, M.Kom.",
    created_at: "2026-01-12T08:00:00",
    updated_at: "2026-02-12T08:00:00",
  },
  {
    id: 4,
    kode_prodi: 104,
    nama: "Teknik Mesin",
    singkatan: "TM",
    jenjang: "D3",
    kaprodi: "Dewi Anggraini, S.T.",
    created_at: "2026-01-13T08:00:00",
    updated_at: "2026-02-12T08:00:00",
  },
  {
    id: 5,
    kode_prodi: 105,
    nama: "Agribisnis",
    singkatan: "AGB",
    jenjang: "S1",
    kaprodi: "Belum ditentukan",
    created_at: "2026-01-14T08:00:00",
    updated_at: "2026-02-12T08:00:00",
  },
  {
    id: 6,
    kode_prodi: 106,
    nama: "Teknologi Rekayasa Komputer",
    singkatan: "TRK",
    jenjang: "D4",
    kaprodi: "Rizky Pratama, S.Kom.",
    created_at: "2026-01-15T08:00:00",
    updated_at: "2026-02-12T08:00:00",
  },
];

const PRODI_COLORS = [
  {
    avatar: "bg-blue-600",
    badge: "bg-blue-50 text-blue-700",
    hover: "hover:border-blue-200",
  },
  {
    avatar: "bg-violet-600",
    badge: "bg-violet-50 text-violet-700",
    hover: "hover:border-violet-200",
  },
  {
    avatar: "bg-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
    hover: "hover:border-emerald-200",
  },
  {
    avatar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700",
    hover: "hover:border-amber-200",
  },
  {
    avatar: "bg-rose-600",
    badge: "bg-rose-50 text-rose-700",
    hover: "hover:border-rose-200",
  },
  {
    avatar: "bg-cyan-600",
    badge: "bg-cyan-50 text-cyan-700",
    hover: "hover:border-cyan-200",
  },
];

type StatCardProps = {
  label: string;
  value: number;
  description: string;
  icon: typeof BookOpen;
  color: string;
};

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  color,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
          <p className="mt-2 text-xs text-gray-400">{description}</p>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

type ProdiCardProps = {
  prodi: Prodi;
  index: number;
  onEdit: (prodi: Prodi) => void;
  onDetail: (prodi: Prodi) => void;
};

function ProdiCard({ prodi, index, onEdit, onDetail }: ProdiCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const color = PRODI_COLORS[index % PRODI_COLORS.length];
  const kaprodiTersedia =
    prodi.kaprodi.trim() !== "" &&
    prodi.kaprodi.toLowerCase() !== "belum ditentukan";

  return (
    <article
      className={`group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${color.hover}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-sm ${color.avatar}`}
          >
            {prodi.singkatan}
          </div>

          <div className="min-w-0">
            <h3 className="font-bold leading-snug text-gray-900">
              {prodi.nama}
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Kode: {prodi.kode_prodi}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label={`Menu ${prodi.nama}`}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <MoreHorizontal size={21} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-10 w-36 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(prodi);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Pencil size={15} />
                Edit prodi
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDetail(prodi);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                <ArrowUpRight size={15} />
                Lihat detail
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Degree */}
      <div className="mt-5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${color.badge}`}
        >
          <Layers3 size={14} />
          Jenjang {prodi.jenjang}
        </span>
      </div>

      <div className="my-5 border-t border-gray-100" />

      {/* Head of program */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 ring-4 ring-gray-50">
          <UserRound size={20} />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-400">Ketua Program Studi</p>
          <p
            className={`mt-1 break-words text-sm font-semibold ${
              kaprodiTersedia ? "text-gray-800" : "text-amber-600"
            }`}
          >
            {kaprodiTersedia ? prodi.kaprodi : "Belum ditentukan"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <button
        type="button"
        onClick={() => onDetail(prodi)}
        className="mt-5 flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        Lihat Detail
        <ArrowUpRight size={17} />
      </button>
    </article>
  );
}

export default function Prodi() {
  const [search, setSearch] = useState("");
  const [jenjang, setJenjang] = useState("Semua");

  const filteredProdis = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return DUMMY_PRODI.filter((prodi) => {
      const matchesSearch = [
        prodi.nama,
        prodi.singkatan,
        prodi.kaprodi,
        String(prodi.kode_prodi),
        prodi.jenjang,
      ].some((value) => value.toLowerCase().includes(keyword));

      const matchesJenjang =
        jenjang === "Semua" || prodi.jenjang.toUpperCase() === jenjang;

      return matchesSearch && matchesJenjang;
    });
  }, [search, jenjang]);

  const totalJenjang = new Set(
    DUMMY_PRODI.map((prodi) => prodi.jenjang.toUpperCase())
  ).size;

  const totalKaprodi = DUMMY_PRODI.filter(
    (prodi) =>
      prodi.kaprodi.trim() !== "" &&
      prodi.kaprodi.toLowerCase() !== "belum ditentukan"
  ).length;

  const handleTambah = () => {
    alert("Buka halaman tambah program studi");
  };

  const handleEdit = (prodi: Prodi) => {
    alert(`Edit program studi: ${prodi.nama}`);
  };

  const handleDetail = (prodi: Prodi) => {
    alert(`Lihat detail program studi: ${prodi.nama}`);
  };

  return (
    <main className="min-h-screen bg-gray-50/80 p-4 sm:p-6 lg:p-2">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <span>Akademik</span>
              <span>/</span>
              <span className="font-medium text-blue-600">Program Studi</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Program Studi
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Kelola program studi dan informasi akademik kampus.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTambah}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            <Plus size={19} />
            Tambah Program Studi
          </button>
        </header>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Total Program Studi"
            value={DUMMY_PRODI.length}
            description="Seluruh program studi terdaftar"
            icon={BookOpen}
            color="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Jenjang Pendidikan"
            value={totalJenjang}
            description="Variasi jenjang pendidikan"
            icon={Layers3}
            color="bg-violet-50 text-violet-600"
          />
          <StatCard
            label="Kaprodi Terdata"
            value={totalKaprodi}
            description="Ketua program studi terdata"
            icon={UserRoundCheck}
            color="bg-emerald-50 text-emerald-600"
          />
        </section>

        {/* Search and filter */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama, kode, singkatan, atau kaprodi..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="jenjang"
                className="shrink-0 text-sm font-medium text-gray-600"
              >
                Jenjang
              </label>
              <select
                id="jenjang"
                value={jenjang}
                onChange={(event) => setJenjang(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:min-w-36"
              >
                {["Semua", "D1", "D2", "D3", "D4", "S1", "S2", "S3"].map(
                  (item) => (
                    <option key={item} value={item}>
                      {item === "Semua" ? "Semua Jenjang" : item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Semua", "D3", "D4", "S1", "S2"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setJenjang(item)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                  jenjang === item
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item === "Semua" ? "Semua Jenjang" : item}
              </button>
            ))}
          </div>
        </section>

        {/* List heading */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Daftar Program Studi
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Menampilkan {filteredProdis.length} dari {DUMMY_PRODI.length}{" "}
                program studi
              </p>
            </div>
          </div>

          {filteredProdis.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProdis.map((prodi) => (
                <ProdiCard
                  key={prodi.id}
                  prodi={prodi}
                  index={DUMMY_PRODI.findIndex((item) => item.id === prodi.id)}
                  onEdit={handleEdit}
                  onDetail={handleDetail}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <Search size={27} />
              </div>
              <h3 className="mt-4 font-bold text-gray-900">
                Data tidak ditemukan
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Coba kata kunci lain atau ubah filter jenjang.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setJenjang("Semua");
                }}
                className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Reset filter
              </button>
            </div>
          )}
        </section>

        <footer className="border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
          Data Program Studi · Sistem Informasi Akademik
        </footer>
      </div>
    </main>
  );
}

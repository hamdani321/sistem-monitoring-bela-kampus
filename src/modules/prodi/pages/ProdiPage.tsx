import { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Hash,
  Users,
  CalendarDays,
  Landmark,
  Award,
} from "lucide-react";
import { Prodi as DataProdi } from "@/modules/models/prodi";
import { getProdi } from "../services/prodi.service";

// import type { Prodi } from "@/types/Prodi";

const dummyProdi: DataProdi[] = [
  {
    id: 1,
    kode_prodi: 55201,
    nama: "Teknik Informatika",
    singkatan: "TI",
    jenjang: "S1",
    kaprodi: "Ahmad Fauzi, S.Kom., M.Kom.",
    created_at: "2026-01-10T08:00:00",
    updated_at: "2026-01-10T08:00:00",
  },
  {
    id: 2,
    kode_prodi: 57201,
    nama: "Sistem Informasi",
    singkatan: "SI",
    jenjang: "S1",
    kaprodi: "Budi Santoso, S.Kom., M.Kom.",
    created_at: "2026-01-12T08:00:00",
    updated_at: "2026-01-12T08:00:00",
  },
  {
    id: 3,
    kode_prodi: 57401,
    nama: "Manajemen Informatika",
    singkatan: "MI",
    jenjang: "D3",
    kaprodi: "Siti Rahma, S.Kom., M.Kom.",
    created_at: "2026-01-15T08:00:00",
    updated_at: "2026-01-15T08:00:00",
  },
];

export default function ProdiPage() {
  return (
    <>
      <Prodi data={dummyProdi} />
    </>
  );
}

type ProdiPageProps = {
  data: DataProdi[];
};

const getJenjangStyle = (jenjang: string) => {
  const value = jenjang.toUpperCase();

  if (value.includes("D3") || value.includes("DIPLOMA III")) {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  if (value.includes("D4") || value.includes("SARJANA TERAPAN")) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (value.includes("S1") || value.includes("SARJANA")) {
    return "bg-indigo-50 text-indigo-700 ring-indigo-200";
  }

  if (value.includes("S2") || value.includes("MAGISTER")) {
    return "bg-violet-50 text-violet-700 ring-violet-200";
  }

  if (value.includes("S3") || value.includes("DOKTOR")) {
    return "bg-rose-50 text-rose-700 ring-rose-200";
  }

  return "bg-slate-100 text-slate-700 ring-slate-200";
};

const formatDate = (date: string) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const Prodi = ({ data }: ProdiPageProps) => {
  const totalProdi = data.length;

  const totalJenjang = useMemo(
    () => new Set(data.map((prodi) => prodi.jenjang)).size,
    [data]
  );
  const [prodi, setProdi] = useState<DataProdi[]>([]);

  async function fetchProdi() {
    const [dataProdi] = await Promise.all([getProdi()]);
    setProdi(dataProdi.data);
  }

  useEffect(() => {
    fetchProdi();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-2">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Header */}
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={30} />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Sistem Informasi Akademik
                </p>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Program Studi
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Informasi program studi dan data akademik perguruan tinggi.
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <Landmark size={18} className="text-indigo-600" />
            <span className="text-sm font-semibold text-slate-700">
              Data Akademik
            </span>
          </div>
        </header>

        {/* Overview Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Prodi */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-lg shadow-indigo-100">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <BookOpen size={23} />
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-indigo-50">
                  Keseluruhan
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-indigo-100">
                Total Program Studi
              </p>

              <div className="mt-1 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  {prodi.length}
                </span>
                <span className="mb-1 text-sm text-indigo-100">
                  program studi
                </span>
              </div>
            </div>

            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 right-24 h-36 w-36 rounded-full bg-white/5" />
          </div>

          {/* Total Jenjang */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Jenjang Pendidikan
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight text-slate-800">
                  3
                </span>
                <span className="mb-1 text-sm text-slate-500">
                  jenis jenjang
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Berdasarkan data yang tersedia
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Award size={28} />
            </div>
          </div>

          {/* Informasi Data */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Informasi Data
              </p>

              <p className="mt-2 text-lg font-bold text-slate-800">
                Data Program Studi
              </p>

              <p className="mt-2 max-w-[220px] text-sm leading-6 text-slate-500">
                Daftar program studi beserta kode dan ketua program studi.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Users size={27} />
            </div>
          </div>
        </section>

        {/* Prodi Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Daftar Program Studi
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Seluruh program studi yang terdaftar dalam sistem.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700">
              <BookOpen size={16} />
              <span>{totalProdi} Program Studi</span>
            </div>
          </div>

          {data.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                      <th className="whitespace-nowrap px-6 py-4 font-semibold">
                        No.
                      </th>
                      <th className="whitespace-nowrap px-6 py-4 font-semibold">
                        Program Studi
                      </th>
                      <th className="whitespace-nowrap px-6 py-4 font-semibold">
                        Kode Prodi
                      </th>
                      <th className="whitespace-nowrap px-6 py-4 font-semibold">
                        Jenjang
                      </th>

                      <th className="whitespace-nowrap px-6 py-4 font-semibold">
                        Tanggal Dibuat
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {prodi.map((item, index) => (
                      <tr
                        key={item.id}
                        className="group transition-colors duration-200 hover:bg-indigo-50/40"
                      >
                        {/* Number */}
                        <td className="px-6 py-5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-600 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-700">
                            {index + 1}
                          </span>
                        </td>

                        {/* Prodi Name */}
                        <td className="px-6 py-5">
                          <div className="flex min-w-[220px] items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
                              <GraduationCap size={22} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {item.nama}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                ID: {item.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Code */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <Hash size={15} className="text-slate-400" />
                            <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-sm font-semibold text-slate-700">
                              {item.kode_prodi}
                            </span>
                          </div>
                        </td>

                        {/* Level */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getJenjangStyle(
                              item.jenjang
                            )}`}
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                            {item.jenjang}
                          </span>
                        </td>

                        {/* Head */}
                        {/* <td className="px-6 py-5">
                          <div className="flex min-w-[170px] items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700 ring-1 ring-emerald-100">
                              {prodi.kaprodi?.trim()
                                ? prodi.kaprodi.trim().charAt(0).toUpperCase()
                                : "?"}
                            </div>

                            <span className="text-sm font-medium text-slate-700">
                              {item.kaprodi || "-"}
                            </span>
                          </div>
                        </td> */}

                        {/* Created At */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CalendarDays
                              size={15}
                              className="text-slate-400"
                            />
                            {formatDate(item.created_at)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 p-4 md:hidden">
                {data.map((prodi, index) => (
                  <article
                    key={prodi.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-indigo-200 hover:shadow-sm"
                  >
                    <div className="flex items-start gap-3 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <GraduationCap size={25} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                            #{index + 1}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getJenjangStyle(
                              prodi.jenjang
                            )}`}
                          >
                            {prodi.jenjang}
                          </span>
                        </div>

                        <h3 className="mt-2 break-words text-base font-bold text-slate-800">
                          {prodi.nama}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {prodi.singkatan || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-slate-100 bg-slate-50/70 p-4">
                      <div>
                        <p className="text-xs text-slate-400">Kode Prodi</p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <Hash size={14} className="text-indigo-500" />
                          <span className="text-sm font-semibold text-slate-700">
                            {prodi.kode_prodi}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">Ketua Prodi</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                            {prodi.kaprodi?.trim()
                              ? prodi.kaprodi.trim().charAt(0).toUpperCase()
                              : "?"}
                          </div>
                          <span className="break-words text-sm font-medium text-slate-700">
                            {prodi.kaprodi || "-"}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2 border-t border-slate-200 pt-3">
                        <p className="text-xs text-slate-400">Tanggal Dibuat</p>
                        <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays size={15} className="text-slate-400" />
                          {formatDate(prodi.created_at)}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-400">
                <GraduationCap size={38} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Belum Ada Program Studi
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Data program studi belum tersedia. Informasi program studi akan
                ditampilkan di halaman ini setelah data tersedia.
              </p>
            </div>
          )}

          {/* Footer */}
          <footer className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500">
              Menampilkan{" "}
              <span className="font-semibold text-slate-800">{totalProdi}</span>{" "}
              program studi
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CalendarDays size={14} />
              <span>Informasi program studi</span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
};

import {
  Search,
  Users,
  UserRound,
  GraduationCap,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";

// type Mahasiswa = {
//   id: number;
//   nama: string;
//   nim: string;
//   email: string;
//   jenis_kelamin: "Laki-laki" | "Perempuan";
// };

export default function TabelAnggotaRegistrasi({
  registrasi_anggota,
}: {
  registrasi_anggota: RegistrasiAnggota[] | null;
}) {
  const totalLakiLaki = registrasi_anggota?.filter(
    (item) => item.mahasiswa.jenis_kelamin === "Laki-laki"
  ).length;
  const totalPerempuan = registrasi_anggota?.filter(
    (item) => item.mahasiswa.jenis_kelamin === "Perempuan"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <GraduationCap size={26} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">Data Mahasiswa</h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola informasi mahasiswa
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
          {registrasi_anggota?.length} Mahasiswa
        </span>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Mahasiswa"
          value={registrasi_anggota?.length}
          icon={<Users size={22} />}
          color="blue"
        />

        <StatCard
          title="Laki-laki"
          // value={2}
          value={totalLakiLaki}
          icon={<UserRound size={22} />}
          color="teal"
        />

        <StatCard
          title="Perempuan"
          // value={1}
          value={totalPerempuan}
          icon={<UserRound size={22} />}
          color="pink"
        />
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-5 py-4">Mahasiswa</th>
                <th className="px-5 py-4">NIM</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Jenis Kelamin</th>
                <th className="px-5 py-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {registrasi_anggota?.map((m) => {
                console.log(m);

                const initials = m.mahasiswa.nama
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("");

                const isMale = m.mahasiswa.jenis_kelamin === "Laki-laki";

                return (
                  <tr key={m.id} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            isMale
                              ? "bg-blue-100 text-blue-700"
                              : "bg-pink-100 text-pink-700"
                          }`}
                        >
                          {/* dd */}
                          {initials}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {m.mahasiswa.nama}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">
                            ID: {m.mahasiswa.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-gray-600">
                        {m.mahasiswa.nim}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={15} className="shrink-0 text-gray-400" />
                        {m.mahasiswa.email}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          isMale
                            ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100"
                            : "bg-pink-50 text-pink-700 ring-1 ring-pink-100"
                        }`}
                      >
                        {m.mahasiswa.jenis_kelamin}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        aria-label={`Aksi untuk ${m.mahasiswa.nama}`}
                        onClick={() => console.log("Mahasiswa:", m)}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      >
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {registrasi_anggota?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <Search size={22} />
                    </div>
                    <p className="mt-3 font-semibold text-gray-700">
                      Data tidak ditemukan
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Coba gunakan kata kunci pencarian lain.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-gray-700">
              {filteredData.length === 0 ? 0 : startIndex + 1}
              {"–"}
              {Math.min(startIndex + perPage, filteredData.length)}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-gray-700">
              {filteredData.length}
            </span>{" "}
            mahasiswa
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="px-2 text-sm text-gray-600">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "teal" | "pink";
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    teal: "bg-teal-50 text-teal-600",
    pink: "bg-pink-50 text-pink-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`rounded-xl p-2.5 ${colors[color]}`}>{icon}</div>
      </div>

      <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
      <p className="mt-1 text-xs text-gray-400">Data mahasiswa terdaftar</p>
    </div>
  );
}

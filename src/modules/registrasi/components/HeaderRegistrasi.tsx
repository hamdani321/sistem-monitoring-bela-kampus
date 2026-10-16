import { Component, ReactNode } from "react";
type HeaderRegistrasiProps = {
  loading: boolean;
};
export default class HeaderRegistrasi extends Component<HeaderRegistrasiProps> {
  render(): ReactNode {
    const { loading } = this.props;
    return (
      <>
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
                  Manajemen Bela Kampus
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  Data Registrasi
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                  Pantau pendaftaran mahasiswa, tipe registrasi, dan status
                  verifikasi dalam satu tempat.
                </p>
              </div>
            </div>

            <div className="relative flex shrink-0 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  loading ? "animate-pulse bg-yellow-300" : "bg-green-300"
                }`}
              />
              <span className="text-sm font-medium">
                {loading ? "Memuat data..." : "Data registrasi"}
              </span>
            </div>
          </div>
        </section>
      </>
    );
  }
}

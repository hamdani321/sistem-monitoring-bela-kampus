//komponen lama

import { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Portal as DataPortal } from "@/modules/models/portal";
import { getPortal } from "@/modules/portal/services/portal.service";
import Spinner from "@/components/ui/spinner/Spinner";
import CardPortal from "@/modules/portal/components/CardPortal";
import { Registrasi } from "@/modules/models/registrasi";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";

export default function Portal() {
  const [portal, setPortal] = useState<DataPortal | null>();
  const [registrasi, setRegistrasi] = useState<Registrasi | null>(null);
  const [anggotaRegistrasi, setAnggotaRegistrasi] =
    useState<RegistrasiAnggota | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDataPortal = async () => {
      const response = await getPortal();
      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody);
        setPortal(responseBody.data.portal);
        setRegistrasi(responseBody.data.registrasi);
        setAnggotaRegistrasi(responseBody.data.registrasi_anggota);

        setLoading(false);
      }
    };
    getDataPortal();
  }, []);

  return (
    <>
      <ComponentCard title="Data Portal">
        {/* <ComponentPermission allowedRoles={["admin"]}>
          <Link to={"/portal/create"}>
            <Button variant="primary" size="sm" className="m-3">
              Tambah Portal
            </Button>
          </Link>
        </ComponentPermission> */}

        {loading ? (
          <>
            <Spinner textColor="text-black" />
          </>
        ) : portal == null ? (
          <>
            <section className="flex min-h-[65vh] items-center justify-center px-4 py-12">
              <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
                {/* Ilustrasi kalender */}
                <div className="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-indigo-50">
                  <div className="relative flex h-24 w-20 flex-col overflow-hidden rounded-xl border border-indigo-200 bg-white shadow-sm">
                    <div className="flex h-8 items-center justify-center bg-indigo-600">
                      <span className="text-sm font-bold tracking-widest text-white">
                        PORTAL
                      </span>
                    </div>

                    <div className="grid flex-1 grid-cols-3 gap-2 p-3">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={index}
                          className="rounded-sm bg-indigo-100"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-1 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-indigo-600 shadow-md">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-6 w-6 text-white"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="5" y="10" width="14" height="11" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                      <circle cx="12" cy="15" r="1" fill="currentColor" />
                    </svg>
                  </div>

                  <span className="absolute right-2 top-4 h-3 w-3 rounded-full bg-blue-400" />
                  <span className="absolute bottom-7 left-2 h-2 w-2 rounded-full bg-indigo-300" />
                </div>

                {/* Status */}
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Portal belum tersedia
                </span>

                {/* Pesan utama */}
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Belum Ada Portal yang Dibuka
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                  Saat ini belum ada portal Bela Kampus yang membuka
                  pendaftaran. Silakan periksa kembali nanti untuk melihat
                  informasi dan jadwal pendaftaran terbaru.
                </p>

                {/* Informasi tambahan */}
                <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        Pantau jadwal pendaftaran
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        Portal dapat diakses ketika periode pendaftaran dibuka
                        oleh admin.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tombol aksi */}
                <button
                  type="button"
                  onClick={() => {}}
                  disabled={loading}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M20 7v5h-5M4 17v-5h5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.6 9a7 7 0 0 1 11.5-2L20 12M4 12l2.9 5a7 7 0 0 0 11.5-2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {loading ? "Memuat ulang..." : "Periksa Kembali"}
                </button>
              </div>
            </section>
          </>
        ) : (
          // <>Tidak ada portal</>
          <>
            <CardPortal
              canRegister={registrasi == null && anggotaRegistrasi == null}
              portal={portal}
              anggotaRegistrasi={anggotaRegistrasi}
              registrasi={registrasi}
              status="aktif"
            />
          </>
        )}
      </ComponentCard>
    </>
  );
}

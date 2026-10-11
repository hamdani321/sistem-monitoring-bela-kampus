import Button from "@/components/ui/button/Button";
import ComponentPermission from "@/context/ComponentPermission";
import { FormatDate } from "@/modules/utils/date-formatter";
import { Portal } from "@/modules/models/portal";
import { Link } from "react-router";
import CardDatePortal from "./CardDatePortal";
import Alert from "@/components/ui/alert/Alert";
import { Registrasi } from "@/modules/models/registrasi";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";

type Status = "aktif" | "akan-datang" | "selesai";

interface CardPortalProps {
  portal: Portal | null;
  registrasi: Registrasi | null;
  anggotaRegistrasi: RegistrasiAnggota | null;
  canRegister: boolean;
  status?: "aktif" | "akan-datang" | "selesai";
}

const statusConfig: Record<
  Status,
  {
    label: string;
    className: string;
    dot: string;
  }
> = {
  aktif: {
    label: "Registrasi Dibuka",
    className: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  "akan-datang": {
    label: "Segera Dibuka",
    className: "bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
  },
  selesai: {
    label: "Registrasi Ditutup",
    className: "bg-red-50 text-red-700",
    dot: "bg-red-500",
  },
};

export default function CardPortal({
  portal,
  status = "aktif",
  canRegister,
  registrasi,
  anggotaRegistrasi,
}: CardPortalProps) {
  const currentStatus = statusConfig[status];
  const isClosed = status === "selesai";

  return (
    <div className="w-full max-w-4xl animate-fade-in">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3.75h10.5A2.25 2.25 0 0119.5 6v14.25a.75.75 0 01-1.15.63L12 17.25l-6.35 3.63a.75.75 0 01-1.15-.63V6a2.25 2.25 0 012.25-2.25z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Portal Registrasi
                </p>

                <h2 className="mt-1 text-lg font-semibold text-gray-800 sm:text-xl">
                  Tahun Ajaran{" "}
                  {`${portal?.tahun_ajaran?.tahun} (${portal?.tahun_ajaran?.jenis})`}
                </h2>
              </div>
            </div>

            {/* Status */}
            <div
              className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${currentStatus.className}`}
            >
              <span className={`h-2 w-2 rounded-full ${currentStatus.dot}`} />
              {currentStatus.label}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-100" />

          {/* Period */}
          <div className="grid gap-3 sm:grid-cols-2">
            <CardDatePortal
              title="Tanggal Mulai"
              tanggal={FormatDate(portal?.waktu_mulai)}
            />

            <CardDatePortal
              title="Tanggal Selesai"
              tanggal={FormatDate(portal?.waktu_selesai)}
            />
          </div>

          <div className="mt-3">
            {canRegister ? (
              <></>
            ) : (
              <>
                <div>
                  <Alert
                    variant="success"
                    title="Sukses!"
                    message="Anda sudah terdaftar di portal bela kampus ini!"
                    showLink={false}
                    linkHref="/"
                    linkText="Learn more"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 flex flex-col gap-4 rounded-xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Periode Registrasi
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {isClosed
                  ? "Periode registrasi telah berakhir."
                  : "Pastikan melakukan registrasi sebelum batas waktu."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Laporan */}

              {/* Detail */}
              <ComponentPermission allowedRoles={["admin"]}>
                <Link to={`/portal/${portal?.id}`}>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </Link>
              </ComponentPermission>

              {canRegister ? (
                <>
                  <ComponentPermission allowedRoles={["mahasiswa"]}>
                    <Link to={`/portal/registrasi/${portal?.id}`}>
                      <Button size="sm" variant="primary" disabled={isClosed}>
                        Registrasi
                      </Button>
                    </Link>
                  </ComponentPermission>
                </>
              ) : (
                <>
                  <ComponentPermission allowedRoles={["mahasiswa"]}>
                    <Link
                      to={`/portal/registrasi/${registrasi?.id ?? anggotaRegistrasi?.registrasi_id}/report`}
                    >
                      <Button size="sm" variant="primary">
                        Report
                      </Button>
                    </Link>
                  </ComponentPermission>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen Lama

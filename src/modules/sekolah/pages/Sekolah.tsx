import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, LatLngBounds } from "leaflet";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import Input from "@/components/form/input/InputField";

import { Sekolah as DataSekolah } from "@/modules/models/sekolah";
import { getSekolah } from "../services/sekolah.service";

const modules = [AllCommunityModule];

const DEFAULT_CENTER: [number, number] = [0.3296148, 101.0327029];
const DEFAULT_ZOOM = 13;

const blueIcon = new Icon({
  iconUrl: "/images/icons/blue-icon.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

/* =========================================================
   HELPERS
========================================================= */

function isValidCoordinate(latitude: unknown, longitude: unknown): boolean {
  if (
    latitude === null ||
    latitude === undefined ||
    latitude === "" ||
    longitude === null ||
    longitude === undefined ||
    longitude === ""
  ) {
    return false;
  }

  const lat = Number(latitude);
  const lng = Number(longitude);

  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function getCoordinates(sekolah: DataSekolah[]): [number, number][] {
  return sekolah
    .filter((item) => isValidCoordinate(item.latitude, item.longitude))
    .map(
      (item) =>
        [Number(item.latitude), Number(item.longitude)] as [number, number]
    );
}

/* =========================================================
   MAP BOUNDS
========================================================= */

function MapBounds({ sekolah }: { sekolah: DataSekolah[] }) {
  const map = useMap();

  const coordinates = useMemo(() => getCoordinates(sekolah), [sekolah]);

  useEffect(() => {
    if (coordinates.length === 0) {
      return;
    }

    if (coordinates.length === 1) {
      map.setView(coordinates[0], 15);
      return;
    }

    const bounds = new LatLngBounds(coordinates);

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 15,
    });
  }, [map, coordinates]);

  return null;
}

/* =========================================================
   STAT CARD
========================================================= */

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  iconClassName: string;
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-800 dark:text-white/90">
            {value}
          </h3>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function SchoolIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9 12 4l9 5-9 5-9-5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 12v5c3 2.5 7 2.5 10 0v-5M21 9v6"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

/* =========================================================
   COLUMN DEFINITIONS
========================================================= */

function createColumnDefs(): ColDef<DataSekolah>[] {
  return [
    {
      headerName: "No",
      width: 70,
      minWidth: 70,
      maxWidth: 70,
      pinned: "left",
      sortable: false,
      filter: false,
      resizable: false,
      valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6b7280",
      },
    },
    {
      field: "nama",
      headerName: "Nama Sekolah",
      flex: 1.3,
      minWidth: 220,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DataSekolah>) => (
        <div className="flex items-center gap-3 py-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <SchoolIcon />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-gray-800 dark:text-white/90">
              {params.data?.nama ?? "-"}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              ID: {params.data?.id ?? "-"}
            </p>
          </div>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      minWidth: 220,
      cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
        const email = params.data?.email;

        if (!email) {
          return <span className="text-sm text-gray-400">Tidak tersedia</span>;
        }

        return (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-sm text-blue-600 transition hover:text-blue-800 hover:underline dark:text-blue-400"
          >
            <MailIcon />
            <span>{email}</span>
          </a>
        );
      },
    },
    {
      field: "telepon",
      headerName: "Telepon",
      flex: 0.9,
      minWidth: 160,
      cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
        const telepon = params.data?.telepon;

        if (!telepon) {
          return <span className="text-sm text-gray-400">Tidak tersedia</span>;
        }

        return (
          <a
            href={`tel:${telepon}`}
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
          >
            {telepon}
          </a>
        );
      },
    },
    {
      field: "alamat",
      headerName: "Alamat",
      flex: 1.5,
      minWidth: 250,
      wrapText: true,
      autoHeight: true,
      cellRenderer: (params: ICellRendererParams<DataSekolah>) => (
        <div className="py-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {params.data?.alamat || "Alamat belum tersedia"}
        </div>
      ),
    },
    {
      headerName: "Koordinat",
      minWidth: 180,
      flex: 1,
      sortable: false,
      cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
        const latitude = params.data?.latitude;
        const longitude = params.data?.longitude;

        if (!isValidCoordinate(latitude, longitude)) {
          return (
            <Badge variant="light" color="error">
              Lokasi tidak valid
            </Badge>
          );
        }

        return (
          <div className="text-sm leading-tight">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Lat:</span>{" "}
              {Number(latitude).toFixed(6)}
            </p>

            <p className="mt-1 text-gray-500 dark:text-gray-400">
              <span className="font-medium">Lng:</span>{" "}
              {Number(longitude).toFixed(6)}
            </p>
          </div>
        );
      },
    },
    {
      headerName: "Aksi",
      width: 120,
      minWidth: 120,
      maxWidth: 120,
      pinned: "right",
      sortable: false,
      filter: false,
      resizable: false,
      cellStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
        const id = params.data?.id;

        if (id == null) {
          return null;
        }

        return (
          <Link
            to={`/sekolah/${id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Detail
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9 18 6-6-6-6"
              />
            </svg>
          </Link>
        );
      },
    },
  ];
}

const DEFAULT_COL_DEF: ColDef<DataSekolah> = {
  sortable: true,
  filter: true,
  resizable: true,
};

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Sekolah() {
  const [sekolah, setSekolah] = useState<DataSekolah[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSekolah = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const response = await getSekolah();

      if (!response.ok) {
        throw new Error("Gagal mengambil data sekolah.");
      }

      const responseBody = await response.json();

      setSekolah(responseBody.data ?? []);
    } catch (err) {
      console.error("Gagal mengambil data sekolah:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data sekolah."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadSekolah();
  }, [loadSekolah]);

  const colDefs = useMemo(() => createColumnDefs(), []);

  const statistik = useMemo(() => {
    const lokasiValid = sekolah.filter((item) =>
      isValidCoordinate(item.latitude, item.longitude)
    ).length;

    const memilikiEmail = sekolah.filter((item) =>
      Boolean(item.email?.trim())
    ).length;

    return {
      total: sekolah.length,
      lokasiValid,
      lokasiTidakValid: sekolah.length - lokasiValid,
      memilikiEmail,
    };
  }, [sekolah]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-600/10 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-indigo-300/20 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-blue-50 ring-1 ring-white/20">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Manajemen Data
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Data Sekolah
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Kelola informasi sekolah, data kontak, dan koordinat lokasi
              sekolah dalam satu halaman.
            </p>
          </div>

          <Link
            to="/sekolah/create"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
            Tambah Sekolah
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-red-500/20 dark:bg-red-500/5"
        >
          <div>
            <p className="font-semibold text-red-800 dark:text-red-400">
              Gagal memuat data sekolah
            </p>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">
              {error}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => void loadSekolah()}
          >
            Coba Lagi
          </Button>
        </div>
      )}

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Sekolah"
          value={loading ? "—" : statistik.total}
          description="Sekolah yang terdaftar"
          icon={<SchoolIcon />}
          iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        />

        <StatCard
          title="Lokasi Valid"
          value={loading ? "—" : statistik.lokasiValid}
          description="Sekolah dengan koordinat valid"
          icon={<MapPinIcon />}
          iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        />

        <StatCard
          title="Lokasi Belum Valid"
          value={loading ? "—" : statistik.lokasiTidakValid}
          description="Perlu memeriksa koordinat"
          icon={<MapPinIcon />}
          iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
        />

        <StatCard
          title="Email Tersedia"
          value={loading ? "—" : statistik.memilikiEmail}
          description="Sekolah dengan alamat email"
          icon={<MailIcon />}
          iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
        />
      </div>

      {/* Tabel */}
      <ComponentCard title="Direktori Sekolah">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Daftar Sekolah
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Cari dan lihat informasi lengkap sekolah yang terdaftar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadSekolah(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7v5h-5M4 17v-5h5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.6 9A7 7 0 0 1 18 6l2 2M4 16l2 2a7 7 0 0 0 12.4-3"
                />
              </svg>

              {refreshing ? "Memuat..." : "Refresh Data"}
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-md">
              <Input
                placeholder="Cari nama, email, telepon, alamat..."
                value={quickFilter}
                onChange={(event) => setQuickFilter(event.target.value)}
              />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total{" "}
              <span className="font-semibold text-gray-800 dark:text-white/90">
                {statistik.total}
              </span>{" "}
              sekolah
            </p>
          </div>

          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="h-[560px] w-full">
                <AgGridReact<DataSekolah>
                  rowData={sekolah}
                  columnDefs={colDefs}
                  defaultColDef={DEFAULT_COL_DEF}
                  loading={loading}
                  quickFilterText={quickFilter}
                  pagination
                  paginationPageSize={10}
                  paginationPageSizeSelector={[10, 20, 50]}
                  animateRows
                  suppressCellFocus
                  rowHeight={64}
                  headerHeight={48}
                  overlayNoRowsTemplate={
                    '<span class="text-sm text-gray-500">Belum ada data sekolah.</span>'
                  }
                />
              </div>
            </div>
          </AgGridProvider>

          {!loading && !error && (
            <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
              <span>{statistik.total} sekolah terdaftar</span>
              <span>
                {statistik.lokasiValid} lokasi valid ·{" "}
                {statistik.lokasiTidakValid} lokasi perlu diperiksa
              </span>
            </div>
          )}
        </div>
      </ComponentCard>

      {/* Peta */}
      <ComponentCard title="Peta Lokasi Sekolah">
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Sebaran Lokasi Sekolah
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Pilih marker untuk melihat informasi sekolah.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {statistik.lokasiValid} marker tersedia
            </div>
          </div>

          {loading && sekolah.length === 0 ? (
            <div className="flex h-[400px] items-center justify-center rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.02]">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Memuat lokasi sekolah...
                </p>
              </div>
            </div>
          ) : statistik.lokasiValid === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 text-center dark:border-gray-700 dark:bg-white/[0.02]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                <MapPinIcon />
              </div>

              <h4 className="mt-4 font-semibold text-gray-800 dark:text-white/90">
                Belum ada lokasi yang valid
              </h4>

              <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                Pastikan data latitude dan longitude sekolah sudah diisi dengan
                benar agar dapat ditampilkan pada peta.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <MapContainer
                center={DEFAULT_CENTER}
                zoom={DEFAULT_ZOOM}
                scrollWheelZoom
                style={{
                  height: "500px",
                  width: "100%",
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapBounds sekolah={sekolah} />

                {sekolah.map((item) => {
                  if (!isValidCoordinate(item.latitude, item.longitude)) {
                    return null;
                  }

                  const latitude = Number(item.latitude);
                  const longitude = Number(item.longitude);

                  return (
                    <Marker
                      key={item.id}
                      icon={blueIcon}
                      position={[latitude, longitude]}
                    >
                      <Popup>
                        <div className="min-w-[220px] space-y-2">
                          <h4 className="font-semibold text-gray-800">
                            {item.nama}
                          </h4>

                          <p className="text-sm leading-5 text-gray-600">
                            {item.alamat || "Alamat belum tersedia"}
                          </p>

                          {item.email && (
                            <p className="text-sm">
                              <span className="font-medium">Email:</span>{" "}
                              <a
                                href={`mailto:${item.email}`}
                                className="text-blue-600 hover:underline"
                              >
                                {item.email}
                              </a>
                            </p>
                          )}

                          {item.telepon && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Telepon:</span>{" "}
                              {item.telepon}
                            </p>
                          )}

                          <p className="text-xs text-gray-400">
                            {latitude.toFixed(6)}, {longitude.toFixed(6)}
                          </p>

                          <Link
                            to={`/sekolah/${item.id}`}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                          >
                            Lihat detail sekolah
                            <span aria-hidden="true">→</span>
                          </Link>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Peta menggunakan OpenStreetMap. Hanya sekolah dengan koordinat
            latitude dan longitude valid yang ditampilkan.
          </p>
        </div>
      </ComponentCard>
    </div>
  );
}

// Lama

// import { useCallback, useEffect, useMemo, useState } from "react";
// import { Link } from "react-router";
// import {
//   AllCommunityModule,
//   ColDef,
//   ICellRendererParams,
// } from "ag-grid-community";
// import { AgGridProvider, AgGridReact } from "ag-grid-react";
// import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// import ComponentCard from "@/components/common/ComponentCard";
// import Button from "@/components/ui/button/Button";
// import Badge from "@/components/ui/badge/Badge";
// import Input from "@/components/form/input/InputField";

// import { Sekolah as DataSekolah } from "@/modules/models/sekolah";
// import { getSekolah } from "../services/sekolah.service";

// import { Icon, LatLngBounds } from "leaflet";

// const modules = [AllCommunityModule];

// const DEFAULT_CENTER: [number, number] = [0.3296148, 101.0327029];
// const DEFAULT_ZOOM = 13;

// const blueIcon = new Icon({
//   iconUrl: "/images/icons/blue-icon.png",
//   iconSize: [40, 40],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
// });

// /**
//  * Mengecek apakah koordinat valid.
//  */
// function isValidCoordinate(latitude: unknown, longitude: unknown): boolean {
//   const lat = Number(latitude);
//   const lng = Number(longitude);

//   return (
//     Number.isFinite(lat) &&
//     Number.isFinite(lng) &&
//     lat >= -90 &&
//     lat <= 90 &&
//     lng >= -180 &&
//     lng <= 180
//   );
// }

// /**
//  * Otomatis menyesuaikan map berdasarkan marker sekolah.
//  */
// function MapBounds({ sekolah }: { sekolah: DataSekolah[] }) {
//   const map = useMap();

//   useEffect(() => {
//     const coordinates = sekolah
//       .filter((item) => isValidCoordinate(item.latitude, item.longitude))
//       .map(
//         (item) =>
//           [Number(item.latitude), Number(item.longitude)] as [number, number]
//       );

//     if (coordinates.length === 0) {
//       return;
//     }

//     if (coordinates.length === 1) {
//       map.setView(coordinates[0], 15);
//       return;
//     }

//     const bounds = coordinates.reduce(
//       (bounds, coordinate) => bounds.extend(coordinate),
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       // (require("leaflet") as any).LatLngBounds()
//       new LatLngBounds()
//     );

//     map.fitBounds(bounds, {
//       padding: [40, 40],
//     });
//   }, [map, sekolah]);

//   return null;
// }

// export default function Sekolah() {
//   const [sekolah, setSekolah] = useState<DataSekolah[]>([]);
//   const [quickFilter, setQuickFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadSekolah = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await getSekolah();

//       if (!response.ok) {
//         throw new Error("Gagal mengambil data sekolah.");
//       }

//       const responseBody = await response.json();

//       setSekolah(responseBody.data ?? []);
//     } catch (error) {
//       console.error("Gagal mengambil data sekolah:", error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "Terjadi kesalahan saat mengambil data sekolah."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadSekolah();
//   }, [loadSekolah]);

//   const colDefs = useMemo<ColDef<DataSekolah>[]>(
//     () => [
//       {
//         headerName: "No",
//         width: 70,
//         minWidth: 70,
//         maxWidth: 70,
//         pinned: "left",
//         sortable: false,
//         filter: false,
//         resizable: false,

//         valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,

//         cellStyle: {
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         },
//       },

//       {
//         field: "nama",
//         headerName: "Sekolah",
//         flex: 1.4,
//         minWidth: 220,

//         cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
//           return (
//             <div className="py-2">
//               <div className="font-semibold text-gray-800">
//                 {params.data?.nama ?? "-"}
//               </div>

//               <div className="mt-1 text-xs text-gray-400">
//                 ID: {params.data?.id ?? "-"}
//               </div>
//             </div>
//           );
//         },

//         autoHeight: true,
//       },

//       {
//         field: "email",
//         headerName: "Email",
//         flex: 1.2,
//         minWidth: 220,

//         cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
//           const email = params.data?.email;

//           if (!email) {
//             return <span className="text-gray-400">Tidak tersedia</span>;
//           }

//           return (
//             <a
//               href={`mailto:${email}`}
//               className="text-sm text-blue-600 hover:underline"
//             >
//               {email}
//             </a>
//           );
//         },
//       },

//       {
//         field: "telepon",
//         headerName: "Telepon",
//         flex: 0.9,
//         minWidth: 150,

//         cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
//           const telepon = params.data?.telepon;

//           if (!telepon) {
//             return <span className="text-gray-400">-</span>;
//           }

//           return (
//             <a
//               href={`tel:${telepon}`}
//               className="text-sm text-gray-700 hover:text-blue-600"
//             >
//               {telepon}
//             </a>
//           );
//         },
//       },

//       {
//         field: "alamat",
//         headerName: "Alamat",
//         flex: 1.5,
//         minWidth: 250,

//         wrapText: true,
//         autoHeight: true,

//         cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
//           return (
//             <div className="py-2 text-sm text-gray-600">
//               {params.data?.alamat ?? "-"}
//             </div>
//           );
//         },
//       },

//       {
//         headerName: "Lokasi",
//         flex: 1,
//         minWidth: 200,

//         cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
//           const latitude = params.data?.latitude;
//           const longitude = params.data?.longitude;

//           const valid = isValidCoordinate(latitude, longitude);

//           if (!valid) {
//             return (
//               <Badge variant="light" color="error">
//                 Lokasi tidak valid
//               </Badge>
//             );
//           }

//           return (
//             <div className="text-sm leading-tight">
//               <div className="text-gray-700">
//                 <span className="font-medium">Lat:</span>{" "}
//                 {Number(latitude).toFixed(6)}
//               </div>

//               <div className="mt-1 text-gray-500">
//                 <span className="font-medium">Lng:</span>{" "}
//                 {Number(longitude).toFixed(6)}
//               </div>
//             </div>
//           );
//         },

//         autoHeight: true,
//       },

//       {
//         headerName: "Aksi",
//         width: 130,
//         minWidth: 130,
//         maxWidth: 130,

//         sortable: false,
//         filter: false,
//         resizable: false,

//         cellStyle: {
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         },

//         cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
//           const id = params.data?.id;

//           return (
//             <Link to={`/sekolah/${id}`}>
//               <Button variant="outline" size="sm">
//                 Detail
//               </Button>
//             </Link>
//           );
//         },
//       },
//     ],
//     []
//   );

//   const defaultColDef = useMemo<ColDef>(
//     () => ({
//       sortable: true,
//       filter: true,
//       resizable: true,
//     }),
//     []
//   );

//   return (
//     <div className="space-y-6">
//       {/* =====================================================
//           DATA SEKOLAH
//       ====================================================== */}
//       <ComponentCard title="Data Sekolah">
//         <div className="space-y-4">
//           {/* Header */}
//           <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h3 className="text-sm font-semibold text-gray-800">
//                 Daftar Sekolah
//               </h3>

//               <p className="mt-1 text-sm text-gray-500">
//                 Kelola informasi sekolah dan lokasi sekolah.
//               </p>
//             </div>

//             <Link to="/sekolah/create">
//               <Button variant="primary" size="sm">
//                 + Tambah Sekolah
//               </Button>
//             </Link>
//           </div>

//           {/* Search */}
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div className="w-full sm:w-80">
//               <Input
//                 placeholder="Cari sekolah..."
//                 value={quickFilter}
//                 onChange={(e) => setQuickFilter(e.target.value)}
//               />
//             </div>

//             <div className="text-sm text-gray-500">
//               Total:{" "}
//               <span className="font-semibold text-gray-700">
//                 {sekolah.length}
//               </span>{" "}
//               sekolah
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
//               <div className="flex items-center justify-between gap-4">
//                 <p className="text-sm text-red-600">{error}</p>

//                 <Button variant="outline" size="sm" onClick={loadSekolah}>
//                   Coba Lagi
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* Table */}
//           <AgGridProvider modules={modules}>
//             <div className="w-full overflow-hidden rounded-lg border border-gray-200">
//               <div className="h-[650px] w-full">
//                 <AgGridReact<DataSekolah>
//                   rowData={sekolah}
//                   columnDefs={colDefs}
//                   defaultColDef={defaultColDef}
//                   loading={loading}
//                   pagination
//                   paginationAutoPageSize
//                   quickFilterText={quickFilter}
//                   animateRows
//                   suppressCellFocus
//                 />
//               </div>
//             </div>
//           </AgGridProvider>
//         </div>
//       </ComponentCard>

//       {/* =====================================================
//           MAP
//       ====================================================== */}
//       <ComponentCard title="Peta Sekolah">
//         <div className="space-y-4">
//           <div>
//             <h3 className="text-sm font-semibold text-gray-800">
//               Lokasi Sekolah
//             </h3>

//             <p className="mt-1 text-sm text-gray-500">
//               Visualisasi lokasi sekolah berdasarkan koordinat yang tersimpan.
//             </p>
//           </div>

//           <div className="overflow-hidden rounded-xl border border-gray-200">
//             <MapContainer
//               center={DEFAULT_CENTER}
//               zoom={DEFAULT_ZOOM}
//               scrollWheelZoom
//               style={{
//                 height: "550px",
//                 width: "100%",
//               }}
//             >
//               <TileLayer
//                 attribution="&copy; OpenStreetMap contributors"
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />

//               <MapBounds sekolah={sekolah} />

//               {sekolah.map((item) => {
//                 if (!isValidCoordinate(item.latitude, item.longitude)) {
//                   return null;
//                 }

//                 const latitude = Number(item.latitude);

//                 const longitude = Number(item.longitude);

//                 return (
//                   <Marker
//                     icon={blueIcon}
//                     key={`school-marker-${item.id}`}
//                     position={[latitude, longitude]}
//                   >
//                     <Popup>
//                       <div className="min-w-[200px]">
//                         <div className="font-semibold text-gray-800">
//                           {item.nama}
//                         </div>

//                         <div className="mt-2 text-sm text-gray-600">
//                           {item.alamat || "Alamat tidak tersedia"}
//                         </div>

//                         {item.telepon && (
//                           <div className="mt-2 text-sm">
//                             <span className="font-medium">Telepon:</span>{" "}
//                             {item.telepon}
//                           </div>
//                         )}

//                         <div className="mt-2 text-xs text-gray-400">
//                           {latitude.toFixed(6)}, {longitude.toFixed(6)}
//                         </div>
//                       </div>
//                     </Popup>
//                   </Marker>
//                 );
//               })}
//             </MapContainer>
//           </div>
//         </div>
//       </ComponentCard>
//     </div>
//   );
// }

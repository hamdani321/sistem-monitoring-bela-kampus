import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import Input from "@/components/form/input/InputField";

import { Sekolah as DataSekolah } from "@/modules/models/sekolah";
import { getSekolah } from "../services/sekolah.service";

import { Icon, LatLngBounds } from "leaflet";

const modules = [AllCommunityModule];

const DEFAULT_CENTER: [number, number] = [0.3296148, 101.0327029];
const DEFAULT_ZOOM = 13;

const blueIcon = new Icon({
  iconUrl: "/images/icons/blue-icon.png",
  iconSize: [40, 40],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

/**
 * Mengecek apakah koordinat valid.
 */
function isValidCoordinate(latitude: unknown, longitude: unknown): boolean {
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

/**
 * Otomatis menyesuaikan map berdasarkan marker sekolah.
 */
function MapBounds({ sekolah }: { sekolah: DataSekolah[] }) {
  const map = useMap();

  useEffect(() => {
    const coordinates = sekolah
      .filter((item) => isValidCoordinate(item.latitude, item.longitude))
      .map(
        (item) =>
          [Number(item.latitude), Number(item.longitude)] as [number, number]
      );

    if (coordinates.length === 0) {
      return;
    }

    if (coordinates.length === 1) {
      map.setView(coordinates[0], 15);
      return;
    }

    const bounds = coordinates.reduce(
      (bounds, coordinate) => bounds.extend(coordinate),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // (require("leaflet") as any).LatLngBounds()
      new LatLngBounds()
    );

    map.fitBounds(bounds, {
      padding: [40, 40],
    });
  }, [map, sekolah]);

  return null;
}

export default function Sekolah() {
  const [sekolah, setSekolah] = useState<DataSekolah[]>([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSekolah = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getSekolah();

      if (!response.ok) {
        throw new Error("Gagal mengambil data sekolah.");
      }

      const responseBody = await response.json();

      setSekolah(responseBody.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data sekolah:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengambil data sekolah."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSekolah();
  }, [loadSekolah]);

  const colDefs = useMemo<ColDef<DataSekolah>[]>(
    () => [
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
        },
      },

      {
        field: "nama",
        headerName: "Sekolah",
        flex: 1.4,
        minWidth: 220,

        cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
          return (
            <div className="py-2">
              <div className="font-semibold text-gray-800">
                {params.data?.nama ?? "-"}
              </div>

              <div className="mt-1 text-xs text-gray-400">
                ID: {params.data?.id ?? "-"}
              </div>
            </div>
          );
        },

        autoHeight: true,
      },

      {
        field: "email",
        headerName: "Email",
        flex: 1.2,
        minWidth: 220,

        cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
          const email = params.data?.email;

          if (!email) {
            return <span className="text-gray-400">Tidak tersedia</span>;
          }

          return (
            <a
              href={`mailto:${email}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {email}
            </a>
          );
        },
      },

      {
        field: "telepon",
        headerName: "Telepon",
        flex: 0.9,
        minWidth: 150,

        cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
          const telepon = params.data?.telepon;

          if (!telepon) {
            return <span className="text-gray-400">-</span>;
          }

          return (
            <a
              href={`tel:${telepon}`}
              className="text-sm text-gray-700 hover:text-blue-600"
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

        cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
          return (
            <div className="py-2 text-sm text-gray-600">
              {params.data?.alamat ?? "-"}
            </div>
          );
        },
      },

      {
        headerName: "Lokasi",
        flex: 1,
        minWidth: 200,

        cellRenderer: (params: ICellRendererParams<DataSekolah>) => {
          const latitude = params.data?.latitude;
          const longitude = params.data?.longitude;

          const valid = isValidCoordinate(latitude, longitude);

          if (!valid) {
            return (
              <Badge variant="light" color="error">
                Lokasi tidak valid
              </Badge>
            );
          }

          return (
            <div className="text-sm leading-tight">
              <div className="text-gray-700">
                <span className="font-medium">Lat:</span>{" "}
                {Number(latitude).toFixed(6)}
              </div>

              <div className="mt-1 text-gray-500">
                <span className="font-medium">Lng:</span>{" "}
                {Number(longitude).toFixed(6)}
              </div>
            </div>
          );
        },

        autoHeight: true,
      },

      {
        headerName: "Aksi",
        width: 130,
        minWidth: 130,
        maxWidth: 130,

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

          return (
            <Link to={`/sekolah/${id}`}>
              <Button variant="outline" size="sm">
                Detail
              </Button>
            </Link>
          );
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  return (
    <div className="space-y-6">
      {/* =====================================================
          DATA SEKOLAH
      ====================================================== */}
      <ComponentCard title="Data Sekolah">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Daftar Sekolah
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Kelola informasi sekolah dan lokasi sekolah.
              </p>
            </div>

            <Link to="/sekolah/create">
              <Button variant="primary" size="sm">
                + Tambah Sekolah
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-80">
              <Input
                placeholder="Cari sekolah..."
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
              />
            </div>

            <div className="text-sm text-gray-500">
              Total:{" "}
              <span className="font-semibold text-gray-700">
                {sekolah.length}
              </span>{" "}
              sekolah
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-red-600">{error}</p>

                <Button variant="outline" size="sm" onClick={loadSekolah}>
                  Coba Lagi
                </Button>
              </div>
            </div>
          )}

          {/* Table */}
          <AgGridProvider modules={modules}>
            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
              <div className="h-[650px] w-full">
                <AgGridReact<DataSekolah>
                  rowData={sekolah}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  loading={loading}
                  pagination
                  paginationAutoPageSize
                  quickFilterText={quickFilter}
                  animateRows
                  suppressCellFocus
                />
              </div>
            </div>
          </AgGridProvider>
        </div>
      </ComponentCard>

      {/* =====================================================
          MAP
      ====================================================== */}
      <ComponentCard title="Peta Sekolah">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Lokasi Sekolah
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Visualisasi lokasi sekolah berdasarkan koordinat yang tersimpan.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <MapContainer
              center={DEFAULT_CENTER}
              zoom={DEFAULT_ZOOM}
              scrollWheelZoom
              style={{
                height: "550px",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
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
                    icon={blueIcon}
                    key={`school-marker-${item.id}`}
                    position={[latitude, longitude]}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="font-semibold text-gray-800">
                          {item.nama}
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                          {item.alamat || "Alamat tidak tersedia"}
                        </div>

                        {item.telepon && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Telepon:</span>{" "}
                            {item.telepon}
                          </div>
                        )}

                        <div className="mt-2 text-xs text-gray-400">
                          {latitude.toFixed(6)}, {longitude.toFixed(6)}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}

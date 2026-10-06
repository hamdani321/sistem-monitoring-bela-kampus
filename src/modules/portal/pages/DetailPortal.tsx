import ComponentCard from "@/components/common/ComponentCard";
import Input from "@/components/form/input/InputField";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import BasicMessage from "@/components/ui/messages/BasicMessage";
import Spinner from "@/components/ui/spinner/Spinner";
import { Portal as DataPortal } from "@/modules/models/portal";
import { Sekolah } from "@/modules/models/sekolah";
import { getPortalById } from "@/modules/portal/services/portal.service";
import { FormatDate } from "@/modules/utils/date-formatter";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const modules = [AllCommunityModule];

export default function DetailPortal() {
  const { id } = useParams();
  const redIcon = L.icon({
    iconUrl: "/images/icons/red-icon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  const blueIcon = L.icon({
    iconUrl: "/images/icons/blue-icon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  const [portal, setPortal] = useState<DataPortal>();
  const [sekolah, setSekolah] = useState<Sekolah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quickFilter, setQuickFilter] = useState("");

  // =========================================================
  // LOAD DATA
  // =========================================================

  const loadPortal = useCallback(async () => {
    if (!id) {
      setError("ID portal tidak ditemukan.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [portalResponse] = await Promise.all([
        getPortalById(id),
        // getSekolah(),
      ]);

      setPortal(portalResponse.data.portal);
      setSekolah(portalResponse.data.sekolah);
      // setSekolah(sekolahResponse.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil detail portal:", error);
      setError("Terjadi kesalahan saat mengambil data portal.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPortal();
  }, [loadPortal]);

  // =========================================================
  // REGISTRASI DATA
  // =========================================================

  const registrasi = useMemo(() => {
    return portal?.registrasi ?? [];
  }, [portal]);

  const totalRegistrasi = registrasi.length;

  const totalKelompok = useMemo(() => {
    return registrasi.filter((item) => item.tipe === "Kelompok").length;
  }, [registrasi]);

  const totalIndividu = useMemo(() => {
    return registrasi.filter((item) => item.tipe !== "Kelompok").length;
  }, [registrasi]);

  // =========================================================
  // AG GRID COLUMN DEFINITIONS
  // =========================================================

  const colDefs = useMemo<ColDef<(typeof registrasi)[number]>[]>(
    () => [
      {
        headerName: "No",
        width: 75,
        minWidth: 75,
        maxWidth: 75,
        pinned: "left",
        sortable: false,
        filter: false,
        resizable: false,
        valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "500",
        },
      },

      // =====================================================
      // MAHASISWA
      // =====================================================

      {
        headerName: "Mahasiswa",
        flex: 1.7,
        minWidth: 280,
        autoHeight: true,
        cellRenderer: (
          params: ICellRendererParams<(typeof registrasi)[number]>
        ) => {
          const mahasiswa = params.data?.mahasiswa;

          if (!mahasiswa) {
            return (
              <span className="text-sm text-gray-400 dark:text-gray-500">
                Data mahasiswa tidak tersedia
              </span>
            );
          }

          return (
            <div className="py-2 leading-tight">
              <div className="font-semibold text-gray-800 dark:text-white/90">
                {mahasiswa.nama ?? "-"}
              </div>

              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {mahasiswa.email ?? "-"}
              </div>
            </div>
          );
        },
      },

      // =====================================================
      // NIM
      // =====================================================

      {
        headerName: "NIM",
        field: "nim_mahasiswa",
        flex: 0.9,
        minWidth: 140,
        cellRenderer: (
          params: ICellRendererParams<(typeof registrasi)[number]>
        ) => (
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {params.data?.nim_mahasiswa ?? "-"}
          </span>
        ),
      },

      // =====================================================
      // JENIS KELAMIN
      // =====================================================

      {
        headerName: "Jenis Kelamin",
        flex: 0.9,
        minWidth: 150,
        cellRenderer: (
          params: ICellRendererParams<(typeof registrasi)[number]>
        ) => {
          const jenisKelamin = params.data?.mahasiswa?.jenis_kelamin;

          if (!jenisKelamin) {
            return <span className="text-gray-400 dark:text-gray-500">-</span>;
          }

          return (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {jenisKelamin}
            </span>
          );
        },
      },

      // =====================================================
      // TIPE
      // =====================================================

      {
        headerName: "Tipe",
        flex: 0.8,
        minWidth: 130,
        cellRenderer: (
          params: ICellRendererParams<(typeof registrasi)[number]>
        ) => {
          const tipe = params.data?.tipe;

          return (
            <Badge
              variant="light"
              color={tipe === "Kelompok" ? "warning" : "primary"}
            >
              {tipe ?? "-"}
            </Badge>
          );
        },
      },

      {
        headerName: "Sekolah",
        flex: 0.8,
        minWidth: 130,
        cellRenderer: (
          params: ICellRendererParams<(typeof registrasi)[number]>
        ) => {
          const sekolah = params.data?.sekolah;

          return (
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {sekolah?.nama}
            </span>
          );
        },
      },

      // {
      //   field: "",
      //   headerName: "Sekolah",
      // },
    ],
    []
  );

  // =========================================================
  // DEFAULT COLUMN
  // =========================================================

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      floatingFilter: false,
    }),
    []
  );

  // =========================================================
  // ERROR STATE
  // =========================================================

  if (error && !portal) {
    return (
      <ComponentCard title="Data Portal">
        <div className="flex min-h-[300px] items-center justify-center">
          <BasicMessage title="Gagal memuat data" message={error} />
        </div>
      </ComponentCard>
    );
  }

  return (
    <div className="space-y-5">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/portal"
              className="transition-colors hover:text-brand-500"
            >
              Portal
            </Link>

            <span>/</span>

            <span>Detail</span>
          </div>

          <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Detail Portal
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Informasi portal dan daftar mahasiswa yang telah melakukan
            registrasi.
          </p>
        </div>

        <Link to="/portal">
          <Button variant="outline" size="sm">
            ← Kembali
          </Button>
        </Link>
      </div>

      {/* =====================================================
          PORTAL INFORMATION
      ===================================================== */}

      <ComponentCard title="Informasi Portal">
        {loading ? (
          <div className="flex min-h-[180px] items-center justify-center">
            <Spinner textColor="text-gray-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Tahun Ajaran */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Tahun Ajaran
              </p>

              <p className="mt-2 text-base font-semibold text-gray-800 dark:text-white/90">
                {portal?.tahun_ajaran?.nama ?? "-"}
              </p>
            </div>

            {/* Jenis */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Jenis
              </p>

              <div className="mt-2">
                <Badge variant="light" color="primary">
                  {portal?.tahun_ajaran?.jenis ?? "-"}
                </Badge>
              </div>
            </div>

            {/* Waktu Mulai */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Waktu Mulai
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                {FormatDate(portal?.waktu_mulai)}
              </p>
            </div>

            {/* Waktu Selesai */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/[0.06] dark:bg-white/[0.03]">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Waktu Selesai
              </p>

              <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white/90">
                {FormatDate(portal?.waktu_selesai)}
              </p>
            </div>
          </div>
        )}
      </ComponentCard>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Registrasi
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalRegistrasi}
            </h3>

            <span className="text-xs font-medium text-gray-400">Mahasiswa</span>
          </div>
        </div>

        {/* Kelompok */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Registrasi Kelompok
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalKelompok}
            </h3>

            <Badge variant="light" color="warning">
              Kelompok
            </Badge>
          </div>
        </div>

        {/* Individu */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/[0.05] dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Registrasi Individu
          </p>

          <div className="mt-2 flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalIndividu}
            </h3>

            <Badge variant="light" color="primary">
              Individu
            </Badge>
          </div>
        </div>
      </div>

      {/* =====================================================
          DATA REGISTRASI
      ===================================================== */}

      <ComponentCard
        title="Data Registrasi"
        desc="Daftar mahasiswa yang telah melakukan registrasi pada portal ini."
      >
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
                Daftar Registrasi
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Gunakan pencarian untuk menemukan data dengan cepat.
              </p>
            </div>

            <div className="w-full sm:w-72">
              <Input
                placeholder="Cari mahasiswa..."
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
              />
            </div>
          </div>

          {/* AG Grid */}
          {loading ? (
            <div className="flex h-[400px] items-center justify-center rounded-xl border border-gray-200 dark:border-white/[0.05]">
              <Spinner textColor="text-gray-500" />
            </div>
          ) : registrasi.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-200 dark:border-white/[0.05]">
              <BasicMessage
                title="Belum ada registrasi"
                message="Belum ada mahasiswa yang melakukan registrasi pada portal ini."
              />
            </div>
          ) : (
            <AgGridProvider modules={modules}>
              <div className="w-full overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
                <div className="h-[600px] w-full">
                  <AgGridReact<(typeof registrasi)[number]>
                    rowData={registrasi}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    quickFilterText={quickFilter}
                    pagination
                    paginationAutoPageSize
                    animateRows
                    suppressCellFocus
                    rowSelection="single"
                    rowHeight={58}
                    headerHeight={48}
                    overlayNoRowsTemplate="Tidak ada data registrasi"
                  />
                </div>
              </div>
            </AgGridProvider>
          )}
        </div>
      </ComponentCard>

      {/* =====================================================
          SCHOOL MAP
      ===================================================== */}

      <ComponentCard
        title="Peta Sekolah"
        desc="Lokasi sekolah yang terdaftar pada sistem."
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05]">
          <MapContainer
            center={[0.3296148, 101.0327029]}
            zoom={13}
            style={{
              height: "500px",
              width: "100%",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {sekolah.map((item) => {
              const sudahDipakai = portal?.registrasi?.some(
                (itemRegistrasi) => itemRegistrasi.sekolah_id == item.id
              );

              const latitude = Number(item.latitude);
              const longitude = Number(item.longitude);

              if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
                return null;
              }

              return (
                <Marker
                  icon={sudahDipakai ? redIcon : blueIcon}
                  key={item.id}
                  position={[latitude, longitude]}
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <p className="text-sm font-semibold text-gray-800">
                        {item.nama}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {latitude}, {longitude}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            Total lokasi sekolah :{" "}
            <strong className="text-gray-700 dark:text-gray-300">
              {sekolah.length}
            </strong>
          </span>
          <span>OpenStreetMap</span>
        </div>
      </ComponentCard>
    </div>
  );
}

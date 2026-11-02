import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Sekolah } from "@/modules/models/sekolah";

// Memastikan ikon marker tampil dengan benar pada Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  latitude: number | undefined | null;
  longitude: number | undefined | null;
  title?: string;
  sekolah: Sekolah | null | undefined;
}

export default function MapView({
  latitude,
  longitude,
  title = "Lokasi Kegiatan",
  sekolah,
}: MapViewProps) {
  const position: [number, number] = [Number(latitude), Number(longitude)];
  const customIcon = L.icon({
    iconUrl: "/images/icons/blue-icon.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[400px] w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker icon={customIcon} position={position}>
          <Popup>
            <div className="min-w-32">
              <p className="font-semibold">
                {title} {sekolah?.nama}
              </p>
              <p className="text-sm text-slate-600">
                {latitude}, {longitude}
              </p>
            </div>
          </Popup>
        </Marker> */}

        <Marker icon={customIcon} position={position}>
          <Popup className="school-popup">
            <div className="w-64 overflow-hidden rounded-xl bg-white">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-slate-100 p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"
                    />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                    Lokasi Sekolah
                  </span>

                  <h3 className="mt-0.5 line-clamp-2 text-sm font-bold leading-5 text-slate-800">
                    {title} {sekolah?.nama}
                  </h3>
                </div>
              </div>

              {/* Coordinates */}
              <div className="p-3">
                <p className="mb-2 text-xs font-semibold text-slate-500">
                  Koordinat Lokasi
                </p>

                <div className="rounded-lg bg-slate-50 p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">Latitude</span>
                    <span className="font-mono text-xs font-semibold text-slate-700">
                      {latitude}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">Longitude</span>
                    <span className="font-mono text-xs font-semibold text-slate-700">
                      {longitude}
                    </span>
                  </div>
                </div>

                {/* Google Maps */}
                <a
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 3h6v6m-11 5L21 3M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"
                    />
                  </svg>
                  Lihat di Google Maps
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

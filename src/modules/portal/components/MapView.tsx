import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Sekolah } from "@/modules/models/sekolah";
import { useState } from "react";

// Memastikan ikon marker tampil dengan benar pada Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  latitude: number;
  longitude: number;
  title?: string;
  sekolah: Sekolah | null;
}

export default function MapView({
  latitude = 0.3333,
  longitude = 100.2222,
  title = "Lokasi Kegiatan",
  sekolah,
}: MapViewProps) {
  //   const position: [number, number] = [latitude, longitude];
  const position: [number, number] = [latitude, longitude];
  //   const [center, setCenter] = useState<[number | null, number | null]>([
  //     latitude,
  //     longitude,
  //   ]);
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
        className="h-[400px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker icon={customIcon} position={position}>
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
        </Marker>
      </MapContainer>
    </div>
  );
}

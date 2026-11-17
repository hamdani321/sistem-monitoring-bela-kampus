import { Registrasi } from "@/modules/models/registrasi";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";

interface KegiatanLaporanResponse {
  message: string;
  data: {
    registrasi: Registrasi[];
    registrasi_anggota: RegistrasiAnggota[];
  };
}
export async function getKegiatan(): Promise<KegiatanLaporanResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}kegiatan-laporan`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const responseBody: KegiatanLaporanResponse = await response.json();
  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

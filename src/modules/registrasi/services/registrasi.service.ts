import { Registrasi } from "@/modules/models/registrasi";
import { ReportKegiatan } from "@/modules/models/report_kegiatan";

export default async function getRegistrasi(): Promise<Registrasi[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}registrasi`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      console.log(responseBody);

      return responseBody.data as Registrasi[];
    }
    return [];
  } catch (error) {
    throw new Error("Ada kesalahan!");
  }
}

export async function getRegistrasiById(
  id: string | undefined
): Promise<Registrasi> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}registrasi/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const responseBody = await response.json();
  return responseBody.data as Registrasi;
}

export async function getReportKegiatan(
  reportKegiatanId: string | undefined
): Promise<ReportKegiatan> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}report-kegiatan/${reportKegiatanId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const responseBody = await response.json();
  return responseBody.data;
}

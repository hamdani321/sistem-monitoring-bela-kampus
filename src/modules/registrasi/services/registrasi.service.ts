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

    const responseBody = await response.json();

    return responseBody.data as Registrasi[];

    return [];
  } catch (error) {
    throw new Error("Ada kesalahan!");
  }
}

export async function getRegistrasiById(
  id: string | undefined,
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
    },
  );
  const responseBody = await response.json();
  return responseBody.data as Registrasi;
}

export async function getReportKegiatan(
  reportKegiatanId: string | undefined,
): Promise<ReportKegiatan> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}report-kegiatan/${reportKegiatanId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody.data;
}

export async function acceptRegistrasi(id: string) {
  const repsonse = await fetch(
    `${import.meta.env.VITE_API_URL}registrasi/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  const repsonseBody = await repsonse.json();
  if (!repsonse.ok) {
    throw repsonseBody;
  }
  return repsonseBody;
}

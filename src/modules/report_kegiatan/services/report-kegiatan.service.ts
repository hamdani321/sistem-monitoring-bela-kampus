import { Registrasi } from "@/modules/models/registrasi";

export interface PayloadReportKegiatan {
  namaPIC: string;
  nomorHpPIC: string;
  foto: File | null;
  linkVideo: string;
  deskripsi: string;
}

export async function getDataRegistrasi(): Registrasi[] {
  const response = await fetch(`${import.meta.env.VITE_API_URL}`);
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.data as Registrasi[];
  }

  return [];
}

export async function createReportKegiatan(
  payload: PayloadReportKegiatan,
  registrasiId: string | undefined
) {
  const form = new FormData();
  form.append("registrasi_id", registrasiId);
  form.append("nama_pic", payload.namaPIC);
  form.append("nomor_hp_pic", payload.nomorHpPIC);
  form.append("link_video", payload.linkVideo);
  form.append("deskripsi", payload.deskripsi);
  form.append("foto", payload.file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}report-kegiatan`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    }
  );

  if (response.ok) {
    const responseBody = await response.json();
    console.log(responseBody);
  }
}

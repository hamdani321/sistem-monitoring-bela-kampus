import { Mahasiswa } from "@/modules/models/mahasiswa";
import { Portal } from "@/modules/models/portal";
import { Registrasi } from "@/modules/models/registrasi";
import { RegistrasiAnggota } from "@/modules/models/registrasi_anggota";
import { ReportKegiatan } from "@/modules/models/report_kegiatan";
import { Sekolah } from "@/modules/models/sekolah";
import { RegistrasiPortal } from "@/modules/types/registrasi-portal";
import { ReportKegiatanPayload } from "@/modules/types/report-kegiatan-payload";
import Swal from "sweetalert2";

export async function getPortal() {
  return await fetch(`${import.meta.env.VITE_API_URL}portal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

interface DetailPortalAPIResponse {
  success: boolean;
  message: string;
  data: {
    mahasiswa: Mahasiswa[];
    portal: Portal;
    sekolah: Sekolah[];
  };
}
export async function getPortalById(id: string | undefined) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}portal/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const responseBody = await response.json();
  return responseBody as DetailPortalAPIResponse;
}

export async function getPortalByIdForRegistration(id: string | undefined) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}portal/registrasi/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const responseBody = await response.json();
  return responseBody;
}

export async function createPortal({
  tahunAjar,
  waktuMulai,
  waktuSelesai,
}: {
  tahunAjar: string;
  waktuMulai: string;
  waktuSelesai: string;
}) {
  const portal: Portal = {
    id: 0,
    tahun_ajaran_id: Number(tahunAjar),
    waktu_mulai: waktuMulai,
    waktu_selesai: waktuSelesai,
    kelompok: null,
    tahun_ajaran: null,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}portal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(portal),
  });

  const responseBody = await response.json();

  if (response.ok) {
    console.log(responseBody);
    return { success: true, message: "Berhasil simpan data!", icon: "success" };
  } else {
    return {
      success: false,
      message: "Gagal simpan data!",
      errors: responseBody.errors,
    };
  }
}

export async function registrasiPortal(dataRegistrasi: RegistrasiPortal) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}registrasi`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(dataRegistrasi),
  });
  return response;
}

export async function getAnggotaRegistrasi(registrasiId: string | undefined) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}registrasi-anggota/${registrasiId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.ok) {
    const responseBody = await response.json();

    return {
      registrasi_anggota: responseBody.data
        .registrasi_anggota as RegistrasiAnggota[],
      registrasi: responseBody.data.registrasi as Registrasi,
      report_kegiatan: responseBody.data.report_kegiatan as ReportKegiatan[],
    };
  }

  throw new Error("Ada kesalahan!");
}

export async function createReportKegiatan(
  payloadReportKegiatan: ReportKegiatanPayload
) {
  const formData: FormData = new FormData();
  formData.append("nama_pic", payloadReportKegiatan.nama_pic);
  formData.append("nomor_hp_pic", payloadReportKegiatan.nomor_hp_pic);
  formData.append("foto", payloadReportKegiatan.foto);
  formData.append("video", payloadReportKegiatan.link_video);
  formData.append("deskripsi", payloadReportKegiatan.deskripsi);
  formData.append("registrasi_id", payloadReportKegiatan.registrasi_id);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}report-kegiatan`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    }
  );

  if (response.ok) {
    Swal.fire({
      title: "Sukses!",
      text: "Berhasil simpan data report!",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "Oops!",
      text: "Gagal simpan data report!",
      icon: "error",
    });
  }
}

import { Portal } from "@/modules/models/portal";
import { RegistrasiPortal } from "@/modules/types/registrasi-portal";

export async function getPortal() {
  return await fetch(`${import.meta.env.VITE_API_URL}portal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function getPortalById(id: number) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}portal/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const responseBody = await response.json();
  console.log(responseBody);

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

// export async function createPortal({
//   tahunAjaran,
//   waktuMulai,
//   waktuSelesai,
// }: {
//   tahunAjaran: string;
//   waktuMulai: string;
//   waktuSelesai: string;
// }) {
//   try {
//     const portal: Portal = {
//       id: 0,
//       tahun_ajaran_id: parseInt(tahunAjaran),
//       waktu_mulai: waktuMulai,
//       waktu_selesai: waktuSelesai,
//       kelompok: null,
//       tahun_ajaran: null,
//     };

//     const response = await fetch(`${import.meta.env.VITE_API_URL}portal`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(portal),
//     });
//     // if (response.ok) {
//     const responseBody = await response.json();

//     return { success: true, message: responseBody.message };
//     // }
//   } catch (error) {
//     throw error;
//   }
// }

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

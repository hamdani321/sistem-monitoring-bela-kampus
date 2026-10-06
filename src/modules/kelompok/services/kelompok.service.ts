import { Undangan } from "@/modules/models/undangan";
import Swal from "sweetalert2";

export async function getKelompok() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}kelompok`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.data;
  }
  return [];
}

export async function getKelompokById(kelompokId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}kelompok/${kelompokId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.ok) {
    const responseBody = await response.json();
    // console.log(responseBody);

    return responseBody;
  }
  return null;
}

export async function inviteJoinGroup(
  nimMahasiswa: number,
  kelompokId: number
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}kelompok/invite-group`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        nim_mahasiswa: nimMahasiswa,
        kelompok_id: kelompokId,
      }),
    }
  );

  if (response.ok) {
    const responseBody = await response.json();
    console.log(responseBody);

    Swal.fire({
      icon: "success",
      title: "Sukses!",
      text: "Berhasil invite mahasiswa",
    });
  }
}

export async function getUndanganByKelompok(
  kelompokId: number
): Promise<Undangan[]> {
  // console.log(
  //   `${import.meta.env.VITE_API_URL}undangan/mahasiswa/${kelompokId}`
  // );

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}undangan/mahasiswa/${kelompokId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.ok) {
    const responseBody = await response.json();
    console.log(`Data request join kelompok : ${kelompokId}`, responseBody);

    return responseBody.data as Undangan[];
  }

  return [];
}

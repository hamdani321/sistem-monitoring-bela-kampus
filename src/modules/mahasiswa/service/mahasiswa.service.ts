import { Mahasiswa } from "@/modules/models/mahasiswa";

export async function getMahasiswa() {
  return await fetch(`${import.meta.env.VITE_API_URL}mahasiswa`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function getMahasiswaWithInvitation(kelompokId: number) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}mahasiswa/invitation/${kelompokId}`,
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
    return responseBody.data as Mahasiswa[];
  }

  return [] as Mahasiswa[];
}

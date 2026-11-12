import { Sekolah } from "@/modules/models/sekolah";

export async function getSekolah() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}sekolah`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
}

interface FindSekolahResponse {
  message: string;
  data: Sekolah;
}

export async function getSekolahById(id: number): Promise<FindSekolahResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}sekolah/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseBody: FindSekolahResponse = await response.json();
  console.log("Hasil Sekolah", responseBody);

  return responseBody;
}

export async function updateSekolah(
  sekolah: Sekolah,
): Promise<SekolahAPIResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}sekolah/${sekolah.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(sekolah),
    },
  );
  const responseBody: SekolahAPIResponse = await response.json();
  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

class SekolahAPIResponse {
  message?: string;
  data?: Sekolah;
}
export async function createSekolah(sekolah: Sekolah) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}sekolah`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(sekolah),
  });

  const responseBody: SekolahAPIResponse = await response.json();
  return responseBody;
}

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

type CreateSekolahAPIResponse = {
  message: string;
  data: Sekolah;
};
export async function createSekolah(sekolah: Sekolah) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}sekolah`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(sekolah),
  });

  const responseBody = await response.json();
  return responseBody as CreateSekolahAPIResponse;
}

import { MahasiswaPayload } from "@/modules/interfaces/mahasiswa.interface";

export async function getMahasiswa() {
  return await fetch(`${import.meta.env.VITE_API_URL}mahasiswa`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function createMahasiswa(mahasiswa: MahasiswaPayload) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}mahasiswa`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(mahasiswa),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

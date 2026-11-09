import { MahasiswaErrors } from "@/modules/errors/mahasiswa.error";
import {
  MahasiswaPayload,
  MahasiswaResponse,
} from "@/modules/interfaces/mahasiswa.interface";

export async function getMahasiswa() {
  return await fetch(`${import.meta.env.VITE_API_URL}mahasiswa`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export async function createMahasiswa(
  mahasiswa: MahasiswaPayload
): Promise<MahasiswaResponse | MahasiswaErrors> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}mahasiswa`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(mahasiswa),
  });

  if (response.status == 422) {
    const responseBody: MahasiswaErrors = await response.json();
    return responseBody;
  }
  const responseBody: MahasiswaResponse = await response.json();
  return responseBody;
}

import { Prodi } from "@/modules/models/prodi";

interface ProdiResponse {
  message: string;
  data: Prodi[];
}

export async function getProdi(): Promise<ProdiResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}prodi`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });
  const responseBody: ProdiResponse = await response.json();
  return responseBody;
}

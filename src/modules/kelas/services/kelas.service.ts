import { Kelas } from "@/modules/models/kelas";

class KelasAPIResponse {
  kelas: Kelas[];
  constructor(kelas: Kelas[]) {
    this.kelas = kelas;
  }
}
export async function getKelas() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}kelas`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseBody = await response.json();
  return new KelasAPIResponse(responseBody.data);
}

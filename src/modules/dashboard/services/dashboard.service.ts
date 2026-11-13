import { Portal } from "@/modules/models/portal";
import { Registrasi } from "@/modules/models/registrasi";

interface DashboardApiResponse {
  message: string;
  data: { portal: Portal[]; registrasi: Registrasi[] };
}
export async function getDataDashboardAdmin() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}dashboard-admin`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const responseBody = await response.json();
  return responseBody as DashboardApiResponse;
}

export async function getDataDashboardMahasiswa() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}dashboard-mahasiswa`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

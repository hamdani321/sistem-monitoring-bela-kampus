import { Portal } from "@/modules/models/portal";
import { Registrasi } from "@/modules/models/registrasi";

interface DashboardApiResponse {
  message: string;
  data: { portal: Portal[]; registrasi: Registrasi[] };
}
export async function getDataDashboard() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}dashboard`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseBody = await response.json();
  console.log(responseBody);

  return responseBody as DashboardApiResponse;
}

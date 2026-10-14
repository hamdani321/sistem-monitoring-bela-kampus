import { Portal } from "@/modules/models/portal";

interface DataPortalAPIResponse {
  message: string;
  data: Portal[];
}

export default async function getDataPortal() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}data-portal`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseBody = await response.json();
  return responseBody as DataPortalAPIResponse;
}

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

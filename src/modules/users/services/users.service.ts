import { User } from "@/modules/models/user";

export default async function getUsers(): Promise<User[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.data as User[];
  }
  return [];
}

export async function resetPassword(id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}users/reset-password/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  );
  const responseBody = await response.json();
  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

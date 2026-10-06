import { Undangan } from "@/modules/models/undangan";

export async function getUndangan(): Promise<Undangan[]> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}undangan`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const responseBody = await response.json();
      console.log("Undangan : ", responseBody);

      return responseBody.data as Undangan[];
    }
    return [];
  } catch (error) {
    throw new Error("ada kesalahan!");
  }
}

export async function acceptUndangan(undangan: Undangan) {
  const payload = {
    undangan_id: undangan.id,
    kelompok_id: undangan.kelompok_id,
    registrasi_id: undangan.kelompok.registrasi.id,
  };
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}undangan/accept-join-group`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    }
  );
  const responseBody = await response.json();
  console.log(responseBody);
}

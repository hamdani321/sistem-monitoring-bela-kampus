import { TahunAjaran } from "@/modules/models/tahun_ajaran";
import Swal from "sweetalert2";

export default async function getTahunAjaran(): Promise<TahunAjaran[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}tahun-ajaran`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody.data as TahunAjaran[];
  }

  return [] as TahunAjaran[];
}

export async function createTahunAjaran(
  nama: string,
  tahun: string,
  tipe: "Ganjil" | "Genap" | ""
) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}tahun-ajaran`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      nama: nama,
      tahun: tahun,
      tipe: tipe,
    }),
  });
  const responseBody = await response.json();
  if (response.ok || response.status == 201) {
    Swal.fire({
      title: "Sukses",
      icon: "success",
      text: responseBody.message,
    });
    return null;
  }

  if (response.status == 422) {
    return responseBody;
  }
}

export async function findTahunAjaran(id: string | undefined | null) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}tahun-ajaran/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const responseBody = await response.json();
  console.log(responseBody);

  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

export async function editTahunAjaran(
  id: string | null | undefined,
  nama: string,
  tahun: string,
  tipe: "Ganjil" | "Genap" | ""
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}tahun-ajaran/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        nama: nama,
        tahun: tahun,
        tipe: tipe,
      }),
    }
  );

  const responseBody = await response.json();
  if (!response.ok) {
    throw responseBody;
  }
  return responseBody;
}

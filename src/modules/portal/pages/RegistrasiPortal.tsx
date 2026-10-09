import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Sekolah } from "@/modules/models/sekolah";
import React, { useEffect, useState } from "react";
import { getPortalById, registrasiPortal } from "../services/portal.service";
import { RegistrasiPortal as DataRegistrasiPortal } from "@/modules/types/registrasi-portal";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/components/ui/spinner/Spinner";
import Swal from "sweetalert2";
import { Portal } from "@/modules/models/portal";
import { Mahasiswa } from "@/modules/models/mahasiswa";
import MahasiswaTable from "@/modules/mahasiswa/components/MahasiswaTable";

import { ICellRendererParams } from "ag-grid-community";
import { FormatDate } from "@/modules/utils/date-formatter";
import CardInfo from "../components/CardInfo";
export default function RegistrasiPortal() {
  const [portal, setPortal] = useState<Portal>();
  const [sekolah, setSekolah] = useState<Sekolah[]>();
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>([]);
  const [tipe, setTipe] = useState("");
  const [selectSekolah, setSelectSekolah] = useState("");
  // const [namaKelompok, setNamaKelompok] = useState("");
  const [loading, setLoading] = useState(false);

  const [anggotaRegistrasi, setAnggotaRegistrasi] = useState<Mahasiswa[]>([]);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const getPortal = async () => {
      const response = await getPortalById(params.portalId);
      console.log("Data portal ", response);
      setPortal(response.data.portal);
      setSekolah(response.data.sekolah);
      setMahasiswa(response.data.mahasiswa);
    };

    getPortal();
  }, []);

  const handleChangeSekolah = (value: string) => {
    setSelectSekolah(value);
  };

  const handleChangeTipe = (value: string) => {
    //jika tipe kegiatan bukan kelompok, maka hapus anggota registrasi
    if (value != "Kelompok") {
      setAnggotaRegistrasi([]);
    }
    setTipe(value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const dataRegistrasi: DataRegistrasiPortal = {
      portal_id: params.portalId,
      sekolah_id: selectSekolah,
      tipe: tipe,
      anggota_registrasi: anggotaRegistrasi,
    };
    const response = await registrasiPortal(dataRegistrasi);
    if (response.ok) {
      const responseBody = await response.json();
      console.log(responseBody);

      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: responseBody.message,
      }).then(() => {
        navigate("/portal");
      });
    } else {
      const responseBody = await response.json();

      setErrors(responseBody.errors);
    }

    setLoading(false);
  }

  return (
    <>
      <ComponentCard title="Data Portal">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Tahun Ajaran */}
          <CardInfo
            title="Tahun Ajaran"
            text={portal?.tahun_ajaran?.nama}
            iconColor="text-blue-600"
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
          />

          {/* Tahun */}
          <CardInfo
            title="Tahun"
            text={portal?.tahun_ajaran?.tahun}
            iconColor="text-purple-600"
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5v12a2 2 0 002 2z"
                />
              </svg>
            }
          />

          {/* Jenis */}
          <CardInfo
            title="Jenis"
            text={portal?.tahun_ajaran?.jenis}
            iconColor="text-green-600"
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 12c0 5.591 3.824 10.29 9 11.622C17.176 22.29 21 17.591 21 12c0-1.04-.133-2.049-.382-3.016z"
                />
              </svg>
            }
          />

          {/* Waktu Mulai */}
          <CardInfo
            title="Tanggal Mulai"
            text={FormatDate(portal?.waktu_mulai)}
            iconColor="text-orange-600"
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />

          {/* Waktu Selesai */}
          <CardInfo
            title="Tanggal Selesai"
            text={FormatDate(portal?.waktu_selesai)}
            iconColor="text-red-600"
            icon={
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>
      </ComponentCard>

      <ComponentCard className="mt-3" title="Form Registrasi">
        <Form onSubmit={handleSubmit}>
          <div className="mt-3">
            <Label>
              Sekolah Tujuan <span className="text-red-600">*</span>
            </Label>
            <Select
              options={
                sekolah?.map((item) => {
                  return { value: item.id.toString(), label: item.nama };
                }) ?? []
              }
              onChange={handleChangeSekolah}
              placeholder="Pilih Sekolah"
              className={`border ${errors?.sekolah_id ? "border-red-600" : ""}`}
            />
            {errors.sekolah_id?.map((message, index) => (
              <span className="text-red-600" key={`error-sekolah${index}`}>
                {message}
              </span>
            ))}
          </div>

          <div className="mt-3">
            <Label>
              Tipe <span className="text-red-600">*</span>
            </Label>
            <Select
              options={[
                { value: "Individu", label: "Individu" },
                { value: "Kelompok", label: "Kelompok" },
              ]}
              onChange={handleChangeTipe}
              placeholder="Pilih Tipe"
              className={`border ${errors.tipe ? "border-red-600" : ""}`}
            />
            {errors.tipe?.map((message, index) => (
              <span className="text-red-600" key={`error-tipe${index}`}>
                {message}
              </span>
            ))}
          </div>

          {tipe === "Kelompok" ? (
            <>
              <div className="mt-3">
                <div className="mb-3">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                            Anggota Registrasi
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Daftar mahasiswa yang terdaftar dalam kegiatan ini.
                          </p>
                        </div>

                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                          {anggotaRegistrasi.length} Anggota
                        </span>
                      </div>
                    </div>

                    {/* Table Wrapper */}
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px] text-left">
                        <thead className="bg-gray-50 dark:bg-white/[0.03]">
                          <tr className="border-b border-gray-200 dark:border-gray-800">
                            <th
                              scope="col"
                              className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              No
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Nama
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              NIM
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                            >
                              Aksi
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                          {anggotaRegistrasi.length > 0 ? (
                            anggotaRegistrasi.map((mahasiswa, index) => (
                              <tr
                                key={mahasiswa.id}
                                className="group transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                              >
                                {/* No */}
                                <td className="whitespace-nowrap px-6 py-4">
                                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                    {index + 1}
                                  </span>
                                </td>

                                {/* Nama */}
                                <td className="whitespace-nowrap px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                                      {mahasiswa.nama?.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                        {mahasiswa.nama}
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Mahasiswa
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                {/* NIM */}
                                <td className="whitespace-nowrap px-6 py-4">
                                  <input
                                    type="hidden"
                                    name="anggota[]"
                                    value={mahasiswa.nim}
                                  />

                                  <span className="inline-flex rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                    {mahasiswa.nim}
                                  </span>
                                </td>

                                {/* Aksi */}
                                <td className="whitespace-nowrap px-6 py-4">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newData = anggotaRegistrasi.filter(
                                        (item) => item.id != mahasiswa.id
                                      );
                                      console.log(newData);

                                      setAnggotaRegistrasi(newData);
                                      // setAnggotaRegistrasi((prev) => {
                                      //   return prev.filter(
                                      //     (item) => item.nim == mahasiswa.nim
                                      //   );
                                      // });
                                    }}
                                  >
                                    Hapus
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-12 text-center"
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <svg
                                      className="h-6 w-6 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M15 19a3 3 0 01-6 0m9-3a6 6 0 10-12 0m12 0H6"
                                      />
                                    </svg>
                                  </div>

                                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Belum ada anggota
                                  </p>

                                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Belum ada mahasiswa yang ditambahkan.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <MahasiswaTable
                    mahasiswa={mahasiswa}
                    quickFilter=""
                    colDefs={[
                      {
                        headerName: "No",
                        width: 70,
                        minWidth: 70,
                        maxWidth: 70,
                        pinned: "left",
                        sortable: false,
                        filter: false,
                        resizable: false,
                        valueGetter: (params) =>
                          (params.node?.rowIndex ?? 0) + 1,
                        cellStyle: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      },

                      {
                        field: "nama",
                        headerName: "Nama",
                        flex: 1.3,
                        minWidth: 200,
                      },

                      {
                        field: "nim",
                        headerName: "NIM",
                        flex: 0.8,
                        minWidth: 140,
                      },

                      {
                        field: "jenis_kelamin",
                        headerName: "Jenis Kelamin",
                        flex: 0.8,
                        minWidth: 140,
                        valueFormatter: (params) => {
                          switch (params.value) {
                            case "L":
                              return "Laki-laki";

                            case "P":
                              return "Perempuan";

                            default:
                              return params.value ?? "-";
                          }
                        },
                      },
                      {
                        field: "id",
                        headerName: "Aksi",
                        cellStyle: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        cellRenderer: (
                          params: ICellRendererParams<Mahasiswa>
                        ) => {
                          const mahasiswa = params.data;
                          return (
                            <button
                              type="button"
                              onClick={() => {
                                // console.log(mahasiswa);
                                if (anggotaRegistrasi.length >= 5) {
                                  Swal.fire({
                                    title: "Oopss!",
                                    text: "Melebihi kapasitas",
                                    icon: "error",
                                  });
                                  return;
                                }

                                if (
                                  anggotaRegistrasi.some((item) => {
                                    return mahasiswa?.nim == item.nim;
                                  })
                                ) {
                                  Swal.fire({
                                    title: "Oopss!",
                                    text: "Mahasiswa sudah masuk ke daftar anggota",
                                    icon: "info",
                                  });
                                  return;
                                }
                                setAnggotaRegistrasi((prev) => {
                                  if (
                                    prev.some(
                                      (item) => item.id === mahasiswa.id
                                    )
                                  ) {
                                    return prev;
                                  }

                                  return [...prev, mahasiswa];
                                });
                              }}
                            >
                              Tambah
                            </button>
                          );
                        },
                      },
                    ]}
                  />
                </div>
              </div>
            </>
          ) : null}

          <div className="mt-3">
            <Button size="sm" disabled={loading} variant="primary">
              {loading ? (
                <>
                  <Spinner textColor="text-white" />
                </>
              ) : (
                <>Simpan</>
              )}
            </Button>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
}

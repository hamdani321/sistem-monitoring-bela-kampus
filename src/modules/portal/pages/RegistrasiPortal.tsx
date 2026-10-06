import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Sekolah } from "@/modules/models/sekolah";
import { getSekolah } from "@/modules/sekolah/services/sekolah.service";
import React, { useEffect, useState } from "react";
import { getPortalById, registrasiPortal } from "../services/portal.service";
import { RegistrasiPortal as DataRegistrasiPortal } from "@/modules/types/registrasi-portal";
import { useNavigate, useParams } from "react-router";
import Spinner from "@/components/ui/spinner/Spinner";
import Swal from "sweetalert2";
import { Portal } from "@/modules/models/portal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RegistrasiPortal() {
  const [portal, setPortal] = useState<Portal>();
  const [sekolah, setSekolah] = useState<Sekolah[]>();
  const [tipe, setTipe] = useState("");
  const [selectSekolah, setSelectSekolah] = useState("");
  const [namaKelompok, setNamaKelompok] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const getPortal = async () => {
      const response = await getPortalById(params.portalId);
      console.log("Data portal ", response);
      setPortal(response.data.portal);
      setSekolah(response.data.sekolah);

      // const response = await getSekolah();
      // if (response.ok) {
      //   const responseBody = await response.json();
      //   setSekolah(responseBody.data);
      // }
    };

    getPortal();
  }, []);

  const handleChangeSekolah = (value: string) => {
    setSelectSekolah(value);
  };

  const handleChangeTipe = (value: string) => {
    setTipe(value);
  };

  const handleChangeNamaKelompok = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNamaKelompok(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const dataRegistrasi: DataRegistrasiPortal = {
      portal_id: params.portalId,
      sekolah_id: selectSekolah,
      tipe: tipe,
      nama_kelompok: namaKelompok,
    };
    const response = await registrasiPortal(dataRegistrasi);
    if (response.ok) {
      const responseBody = await response.json();
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
      <ComponentCard className="" title="Registrasi">
        <h3>Data Portal</h3>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                isHeader
                className="border border-gray-400 px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tahun Ajaran
              </TableCell>
              <TableCell
                isHeader
                className="border border-gray-400 px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                : {portal?.tahun_ajaran?.nama}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                isHeader
                className="border border-gray-400 px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tahun
              </TableCell>
              <TableCell
                isHeader
                className="border border-gray-400 px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                : {portal?.tahun_ajaran?.tahun}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                isHeader
                className="border border-gray-400 px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Jenis
              </TableCell>
              <TableCell
                isHeader
                className="border border-gray-400 px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                : {portal?.tahun_ajaran?.jenis}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3>Form Registrasi Portal</h3>

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
              className={`border ${errors.sekolah_id ? "border-red-600" : ""}`}
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
            <div className="mt-3">
              <Label>
                Nama Kelompok <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                value={namaKelompok}
                onChange={handleChangeNamaKelompok}
                className={`border ${
                  errors.nama_kelompok ? "border-red-600" : ""
                }`}
              />
              {errors.nama_kelompok?.map((message, index) => (
                <span className="text-red-600" key={`error-kelompok${index}`}>
                  {message}
                </span>
              ))}
            </div>
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

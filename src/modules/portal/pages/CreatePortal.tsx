import DatePicker from "@/components/form/date-picker";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "../services/portal.service";
import Swal from "sweetalert2";
import Form from "@/components/form/Form";
import getTahunAjaran from "@/modules/tahun_ajaran/services/tahun-ajaran.service";
import { TahunAjaran } from "@/modules/models/tahun_ajaran";

export function CreatePortal() {
  const [tahunAjar, setTahunAjar] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataTahunAjaran, setDataTahunAjaran] = useState<TahunAjaran[]>();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const tahunAjaran = async () => {
      const dataTahunAjaran = await getTahunAjaran();

      setDataTahunAjaran(dataTahunAjaran);
    };

    tahunAjaran();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    // event.preventDefault();

    setLoading(true);

    try {
      const result = await createPortal({
        tahunAjar,
        waktuMulai,
        waktuSelesai,
      });
      if (result.success) {
        Swal.fire({
          icon: result.icon,
          text: result.message,
        });
      } else {
        setErrors(result.errors);
      }
    } catch (error) {
      // console.error("Gagal membuat portal : ", error);

      if (error instanceof Error) {
        console.log(error.message);
        setErrors(error.message);
      } else {
        console.log("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (value: string) => {
    setTahunAjar(value);
  };
  return (
    <>
      <ComponentCard title="Form Tambah Portal">
        <Form onSubmit={handleSubmit}>
          <div className="mt-3">
            <Label htmlFor="nama">
              Tahun Ajaran <span className="text-red-600">*</span>
            </Label>
            <Select
              options={
                dataTahunAjaran?.map((tahunAjaran) => ({
                  value: tahunAjaran.id,
                  label: `${tahunAjaran.nama} (${tahunAjaran.jenis})`,
                })) ?? []
              }
              placeholder="Select Option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            {/* <Input type="text" id="nama" /> */}
          </div>

          <div className="mt-3">
            <Label htmlFor="nama">
              Tanggal Mulai <span className="text-red-600">*</span>
            </Label>
            <DatePicker
              id="waktu_mulai"
              placeholder="Pilih Tanggal Mulai"
              onChange={(dates, currentDateString) => {
                // Handle your logic
                setWaktuMulai(currentDateString);
              }}
            />
          </div>

          <div className="mt-3">
            <Label htmlFor="nama">
              Tanggal Selesai <span className="text-red-600">*</span>
            </Label>
            <DatePicker
              id="waktu_selesai"
              placeholder="Pilih Tanggal Selesai"
              onChange={(dates, currentDateString) => {
                // Handle your logic
                setWaktuSelesai(currentDateString);
              }}
            />
          </div>

          <div className="mt-3">
            <Button disabled={loading} variant="primary">
              Simpan
            </Button>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
}

import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import FileInput from "@/components/form/input/FileInput";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useState } from "react";
import { useParams } from "react-router";
import {
  createReportKegiatan,
  PayloadReportKegiatan,
} from "../services/report-kegiatan.service";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
import Swal from "sweetalert2";

export default function FormReportKegiatan() {
  const { registrasiId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [payload, setPayload] = useState<PayloadReportKegiatan>({
    namaPIC: "",
    nomorHpPIC: "",
    foto: null,
    video: "",
    deskripsi: "",
  });

  const handleSubmit = async () => {
    // setLoading(true);
    try {
      const result = await createReportKegiatan(payload, registrasiId);
      if (result.success) {
        Swal.fire({
          title: "Sukses!",
          text: result.message,
          icon: "success",
        });
      } else {
        setErrors(result.error);
      }
    } catch (error) {}
  };
  return (
    <>
      <ComponentCard title="Form Report Kegiatan">
        <Form onSubmit={handleSubmit}>
          <div className="mt-3">
            <Label>
              Nama PIC <span className="text-red-400">*</span>
            </Label>
            <Input
              error={errors.errors?.nama_pic != null}
              name="nama_pic"
              value={payload.namaPIC}
              onChange={(event) => {
                setPayload((prev) => ({
                  ...prev,
                  namaPIC: event.target.value,
                }));
              }}
            />
          </div>

          <div className="mt-3">
            <Label>
              Nomor HP PIC <span className="text-red-400">*</span>
            </Label>
            <Input
              error={errors.errors?.nomor_hp_pic != null}
              type="number"
              name="nomor_hp_pic"
              onChange={(event) => {
                setPayload((prev) => ({
                  ...prev,
                  nomorHpPIC: event.target.value,
                }));
              }}
            />
          </div>

          <div className="mt-3">
            <Label>
              Foto <span className="text-red-400">*</span>
            </Label>
            <FileInput
              className={`border ${
                errors.errors?.foto != null ? "border-red-400" : ""
              }`}
              onChange={(event) => {
                setPayload((prev) => ({
                  ...prev,
                  foto: event.target.files[0],
                }));
              }}
            />
          </div>

          <div className="mt-3">
            <Label>Link Video</Label>
            <Input
              error={errors.errors?.video != null}
              value={payload.video}
              onChange={(event) => {
                setPayload((prev) => ({
                  ...prev,
                  video: event.target.value,
                }));
              }}
            />
          </div>

          <div className="mt-3">
            <Label>
              Deskripsi <span className="text-red-400">*</span>
            </Label>
            <TextArea
              placeholder="Keterangan"
              value={payload.deskripsi}
              onChange={(value) => {
                setPayload((prev) => ({
                  ...prev,
                  deskripsi: value,
                }));
              }}
            />
          </div>

          <div className="mt-3">
            <Button size="sm" disabled={loading}>
              {loading ? (
                <>
                  <ButtonSpinner text="Please Wait..." />
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

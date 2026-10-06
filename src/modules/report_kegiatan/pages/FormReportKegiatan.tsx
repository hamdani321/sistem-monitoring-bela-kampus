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

export default function FormReportKegiatan() {
  const { registrasiId } = useParams();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<PayloadReportKegiatan>({
    namaPIC: "",
    nomorHpPIC: "",
    file: null,
    linkVideo: "",
    deskripsi: "",
  });

  const handleSubmit = () => {
    setLoading(true);
    try {
      createReportKegiatan(payload, registrasiId);
    } catch (error) {}
  };
  return (
    <>
      <ComponentCard title="Form Report Kegiatan">
        <Form onSubmit={handleSubmit}>
          <div className="mt-3">
            <Label>Nama PIC</Label>
            <Input
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
            <Label>Nomor HP PIC</Label>
            <Input
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
            <Label>Foto</Label>
            <FileInput
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
              value={payload.linkVideo}
              onChange={(event) => {
                setPayload((prev) => ({
                  ...prev,
                  linkVideo: event.target.value,
                }));
              }}
            />
          </div>

          <div className="mt-3">
            <Label>Deskripsi</Label>
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

import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Component, FormEvent, ReactNode } from "react";
import { createTahunAjaran } from "../services/tahun-ajaran.service";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
import { Link } from "react-router";

interface CreateTahunAjaranState {
  nama: string;
  tahun: string;
  tipe: "Ganjil" | "Genap" | undefined;
  loading: boolean;
  errors: ValidationError | undefined;
}

interface ValidationError {
  message: string;
  errors: [];
}

export default class CreateTahunAjaran extends Component<
  {},
  CreateTahunAjaranState
> {
  state: CreateTahunAjaranState = {
    nama: "",
    tahun: "",
    tipe: undefined,
    loading: false,
    errors: undefined,
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    this.setState({
      loading: true,
    });
    const { nama, tahun, tipe } = this.state;

    try {
      const result = await createTahunAjaran(nama, tahun, tipe);
      this.setState({ errors: result });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  render(): ReactNode {
    const { nama, tahun, tipe, loading, errors } = this.state;
    return (
      <ComponentCard title="Form Tambah Tahun Ajaran">
        <Form onSubmit={this.handleSubmit}>
          <div className="mt-3">
            <Label>Nama</Label>
            <Input
              value={nama}
              error={errors?.errors.nama != null}
              onChange={(event) => {
                this.setState({
                  nama: event.target.value,
                });
              }}
            />
            {errors?.errors?.nama?.map((item) => {
              return <span className="text-red-600 text-sm">{item}</span>;
            })}
          </div>

          <div className="mt-3">
            <Label>Tahun</Label>
            <Input
              value={tahun}
              type="number"
              error={errors?.errors.tahun != null}
              onChange={(event) => {
                this.setState({
                  tahun: event.target.value,
                });
              }}
            />
            {errors?.errors?.tahun?.map((item) => {
              return <span className="text-red-600 text-sm">{item}</span>;
            })}
          </div>

          <div className="mt-3">
            <Label>Tipe</Label>
            <Select
              className={`border ${
                errors?.errors?.tipe != null ? "border-red-600" : ""
              }`}
              placeholder="Pilih tipe"
              options={[
                { value: "Ganjil", label: "Ganjil" },
                { value: "Genap", label: "Genap" },
              ]}
              onChange={(value) => {
                this.setState({
                  tipe: value,
                });
              }}
            />
            {errors?.errors?.tipe?.map((item) => {
              return <span className="text-red-600 text-sm">{item}</span>;
            })}
          </div>
          <Link to={"/tahun-ajaran"} className="me-2">
            <Button variant="outline">Kembali</Button>
          </Link>
          <Button disabled={loading} className="mt-3">
            {loading ? (
              <>
                <ButtonSpinner text="Menyimpan..." />
              </>
            ) : (
              <>Simpan</>
            )}
          </Button>
        </Form>
      </ComponentCard>
    );
  }
}

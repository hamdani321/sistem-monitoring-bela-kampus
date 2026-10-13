import { Component } from "react";
import type { FormEvent, ReactNode } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Form from "@/components/form/Form";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
import { Link } from "react-router";
import { createTahunAjaran } from "../services/tahun-ajaran.service";

interface ValidationErrors {
  nama?: string[];
  tahun?: string[];
  tipe?: string[];
}

interface ValidationError {
  message?: string;
  errors?: ValidationErrors;
}

interface CreateTahunAjaranState {
  nama: string;
  tahun: string;
  tipe: "Ganjil" | "Genap" | "";
  loading: boolean;
  errors: ValidationErrors;
  generalError: string;
}

export default class CreateTahunAjaran extends Component<
  Record<string, never>,
  CreateTahunAjaranState
> {
  state: CreateTahunAjaranState = {
    nama: "",
    tahun: "",
    tipe: "",
    loading: false,
    errors: {},
    generalError: "",
  };

  handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { nama, tahun, tipe } = this.state;

    // Validasi dasar di sisi client
    const errors: ValidationErrors = {};

    if (!nama.trim()) {
      errors.nama = ["Nama tahun ajaran wajib diisi."];
    }

    if (!tahun.trim()) {
      errors.tahun = ["Tahun wajib diisi."];
    } else if (!/^\d{4}$/.test(tahun)) {
      errors.tahun = ["Tahun harus terdiri dari 4 digit."];
    }

    if (!tipe) {
      errors.tipe = ["Silakan pilih tipe semester."];
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors, generalError: "" });
      return;
    }

    this.setState({
      loading: true,
      errors: {},
      generalError: "",
    });

    try {
      const result = await createTahunAjaran(nama.trim(), tahun, tipe);

      if (result?.success) {
        // Sesuaikan jika service menggunakan struktur respons berbeda.
        this.setState({
          nama: "",
          tahun: "",
          tipe: "",
          errors: {},
          generalError: "",
        });
      } else {
        const response = result as ValidationError | undefined;

        this.setState({
          errors: response?.errors ?? {},
          generalError: response?.message ?? "Tahun ajaran gagal disimpan.",
        });
      }
    } catch (error: unknown) {
      this.setState({
        generalError:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat menyimpan tahun ajaran.",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  clearFieldError = (field: keyof ValidationErrors) => {
    this.setState((prevState) => {
      const errors = { ...prevState.errors };
      delete errors[field];

      return {
        errors,
        generalError: "",
      };
    });
  };

  render(): ReactNode {
    const { nama, tahun, tipe, loading, errors, generalError } = this.state;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-6 text-white shadow-lg shadow-blue-900/10 sm:p-8">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 2v4M8 2v4M3 9h18M8 13h3M8 17h7"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-blue-100">
                Manajemen Akademik
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Tambah Tahun Ajaran
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Kelola periode akademik dengan menambahkan tahun ajaran dan tipe
                semester baru.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <ComponentCard title="Informasi Tahun Ajaran">
          <Form onSubmit={this.handleSubmit}>
            <div className="space-y-6">
              <div className="flex items-start gap-3 border-b border-gray-200 pb-4 dark:border-gray-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5.5A2.5 2.5 0 016.5 3H20v18H6.5A2.5 2.5 0 014 18.5v-13zM4 18.5A2.5 2.5 0 016.5 16H20M8 7h7M8 11h5"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-white">
                    Detail Akademik
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Lengkapi informasi tahun ajaran dengan benar.
                  </p>
                </div>
              </div>

              {/* Error umum */}
              {generalError && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                >
                  <svg
                    className="h-5 w-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v5M12 16h.01"
                    />
                  </svg>
                  <p>{generalError}</p>
                </div>
              )}

              {/* Nama */}
              <div>
                <Label htmlFor="nama">
                  Nama Tahun Ajaran <span className="text-red-500">*</span>
                </Label>

                <div className="mt-2">
                  <Input
                    id="nama"
                    type="text"
                    value={nama}
                    placeholder="Contoh: Tahun Ajaran 2026/2027"
                    disabled={loading}
                    error={Boolean(errors.nama?.length)}
                    onChange={(event) => {
                      this.setState({ nama: event.target.value });
                      this.clearFieldError("nama");
                    }}
                  />
                </div>

                {errors.nama?.map((message, index) => (
                  <p
                    key={`nama-${index}`}
                    className="mt-2 flex items-center gap-1.5 text-sm text-red-500"
                  >
                    <span>!</span>
                    {message}
                  </p>
                ))}

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Gunakan nama yang mudah dikenali oleh admin.
                </p>
              </div>

              {/* Tahun */}
              <div>
                <Label htmlFor="tahun">
                  Tahun <span className="text-red-500">*</span>
                </Label>

                <div className="mt-2">
                  <Input
                    id="tahun"
                    type="number"
                    value={tahun}
                    placeholder="Contoh: 2026"
                    disabled={loading}
                    error={Boolean(errors.tahun?.length)}
                    onChange={(event) => {
                      this.setState({ tahun: event.target.value });
                      this.clearFieldError("tahun");
                    }}
                  />
                </div>

                {errors.tahun?.map((message, index) => (
                  <p
                    key={`tahun-${index}`}
                    className="mt-2 flex items-center gap-1.5 text-sm text-red-500"
                  >
                    <span>!</span>
                    {message}
                  </p>
                ))}

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Masukkan tahun awal periode akademik dalam format 4 digit.
                </p>
              </div>

              {/* Tipe */}
              <div>
                <Label htmlFor="tipe">
                  Tipe Semester <span className="text-red-500">*</span>
                </Label>

                <div className="mt-2">
                  <Select
                    options={[
                      { value: "Ganjil", label: "Ganjil" },
                      { value: "Genap", label: "Genap" },
                    ]}
                    placeholder="Pilih tipe semester"
                    className={
                      errors.tipe?.length ? "border border-red-500" : ""
                    }
                    onChange={(value) => {
                      this.setState({
                        tipe: value as "Ganjil" | "Genap",
                      });
                      this.clearFieldError("tipe");
                    }}
                  />
                </div>

                {errors.tipe?.map((message, index) => (
                  <p
                    key={`tipe-${index}`}
                    className="mt-2 flex items-center gap-1.5 text-sm text-red-500"
                  >
                    <span>!</span>
                    {message}
                  </p>
                ))}

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Pilih semester Ganjil atau Genap sesuai periode akademik.
                </p>
              </div>

              {/* Informasi */}
              <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11v5M12 8h.01"
                  />
                </svg>

                <div>
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Informasi
                  </p>
                  <p className="mt-1 text-sm leading-6 text-blue-700 dark:text-blue-200/80">
                    Periksa kembali nama, tahun, dan tipe semester sebelum
                    menyimpan. Pastikan kombinasi tahun dan tipe semester tidak
                    bertentangan dengan data akademik yang sudah tersedia.
                  </p>
                </div>
              </div>

              {/* Tombol */}
              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-800 sm:flex-row">
                <Link to="/tahun-ajaran">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    Kembali
                  </Button>
                </Link>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? (
                    <ButtonSpinner text="Menyimpan..." />
                  ) : (
                    "Simpan Tahun Ajaran"
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </ComponentCard>
      </div>
    );
  }
}

// Lama

// import ComponentCard from "@/components/common/ComponentCard";
// import Form from "@/components/form/Form";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Select from "@/components/form/Select";
// import Button from "@/components/ui/button/Button";
// import { Component, FormEvent, ReactNode } from "react";
// import { createTahunAjaran } from "../services/tahun-ajaran.service";
// import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
// import { Link } from "react-router";

// interface CreateTahunAjaranState {
//   nama: string;
//   tahun: string;
//   tipe: "Ganjil" | "Genap" | undefined;
//   loading: boolean;
//   errors: ValidationError | undefined;
// }

// interface ValidationError {
//   message: string;
//   errors: [];
// }

// export default class CreateTahunAjaran extends Component<
//   {},
//   CreateTahunAjaranState
// > {
//   state: CreateTahunAjaranState = {
//     nama: "",
//     tahun: "",
//     tipe: undefined,
//     loading: false,
//     errors: undefined,
//   };

//   handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     this.setState({
//       loading: true,
//     });
//     const { nama, tahun, tipe } = this.state;

//     try {
//       const result = await createTahunAjaran(nama, tahun, tipe);
//       this.setState({ errors: result });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   };
//   render(): ReactNode {
//     const { nama, tahun, tipe, loading, errors } = this.state;
//     return (
//       <ComponentCard title="Form Tambah Tahun Ajaran">
//         <Form onSubmit={this.handleSubmit}>
//           <div className="mt-3">
//             <Label>Nama</Label>
//             <Input
//               value={nama}
//               error={errors?.errors.nama != null}
//               onChange={(event) => {
//                 this.setState({
//                   nama: event.target.value,
//                 });
//               }}
//             />
//             {errors?.errors?.nama?.map((item) => {
//               return <span className="text-red-600 text-sm">{item}</span>;
//             })}
//           </div>

//           <div className="mt-3">
//             <Label>Tahun</Label>
//             <Input
//               value={tahun}
//               type="number"
//               error={errors?.errors.tahun != null}
//               onChange={(event) => {
//                 this.setState({
//                   tahun: event.target.value,
//                 });
//               }}
//             />
//             {errors?.errors?.tahun?.map((item) => {
//               return <span className="text-red-600 text-sm">{item}</span>;
//             })}
//           </div>

//           <div className="mt-3">
//             <Label>Tipe</Label>
//             <Select
//               className={`border ${
//                 errors?.errors?.tipe != null ? "border-red-600" : ""
//               }`}
//               placeholder="Pilih tipe"
//               options={[
//                 { value: "Ganjil", label: "Ganjil" },
//                 { value: "Genap", label: "Genap" },
//               ]}
//               onChange={(value) => {
//                 this.setState({
//                   tipe: value,
//                 });
//               }}
//             />
//             {errors?.errors?.tipe?.map((item) => {
//               return <span className="text-red-600 text-sm">{item}</span>;
//             })}
//           </div>
//           <Link to={"/tahun-ajaran"} className="me-2">
//             <Button variant="outline">Kembali</Button>
//           </Link>
//           <Button disabled={loading} className="mt-3">
//             {loading ? (
//               <>
//                 <ButtonSpinner text="Menyimpan..." />
//               </>
//             ) : (
//               <>Simpan</>
//             )}
//           </Button>
//         </Form>
//       </ComponentCard>
//     );
//   }
// }

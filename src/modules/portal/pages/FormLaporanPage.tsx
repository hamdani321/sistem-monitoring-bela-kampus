import React, { useState } from "react";
import {
  Camera,
  Video,
  User,
  Phone,
  FileText,
  Upload,
  X,
  Image as ImageIcon,
  ClipboardList,
} from "lucide-react";
import { createReportKegiatan } from "../services/portal.service";
import { ReportKegiatanPayload } from "@/modules/types/report-kegiatan-payload";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

interface CreateLaporanValidationErrors {
  message: string;
  errors: {
    nama_pic: string[] | null;
    nomor_hp_pic: string[] | null;
    foto: string[] | null;
    video: string[] | null;
    deskripsi: string[] | null;
  };
}

export default function FormLaporanPage() {
  const { registrasiId } = useParams();
  const navigate = useNavigate();

  const [namaPic, setNamaPIC] = useState<string>("");
  const [nomorHpPIC, setNomorHpPIC] = useState<string>("");
  const [foto, setFoto] = useState<File[]>([]);
  const [linkVideo, setLinkVideo] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");

  const [errors, setErrors] = useState<CreateLaporanValidationErrors>();

  const [preview, setPreview] = useState<string[]>([]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    const newFiles = [...foto, ...validFiles].slice(0, 5);
    setFoto(newFiles);

    preview.forEach((url) => URL.revokeObjectURL(url));
    setPreview(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const removeFoto = (index: number) => {
    const newFiles = foto.filter((_, i) => i !== index);
    setFoto(newFiles);

    preview.forEach((url) => URL.revokeObjectURL(url));
    setPreview(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const payload: ReportKegiatanPayload = {
        nama_pic: namaPic,
        nomor_hp_pic: nomorHpPIC,
        foto: foto,
        link_video: linkVideo,
        registrasi_id: registrasiId,
        deskripsi: deskripsi,
      };
      const result = await createReportKegiatan(payload);
      Swal.fire({
        title: "Sukses!",
        text: result.message,
        icon: "success",
      }).then(() => {
        navigate(`/portal/registrasi/${registrasiId}/report`);
      });
    } catch (error: any) {
      setErrors(error);
    }
  };

  return (
    <>
      {/* <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6"> */}
      {/* Header */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <span>Kegiatan Bela Kampus</span>
          <span>/</span>
          <span className="font-medium text-blue-600">Laporan Kegiatan</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Laporan Kegiatan
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Lengkapi formulir berikut untuk melaporkan kegiatan Bela Kampus
              yang telah dilaksanakan.
            </p>
          </div>

          <div className="flex h-11 w-fit items-center gap-2 rounded-xl bg-blue-50 px-4 text-sm font-semibold text-blue-700">
            <ClipboardList size={18} />
            Form Pelaporan
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        {/* Form Header */}
        <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-5 md:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Informasi Laporan</h2>
              <p className="text-xs text-gray-500">
                Isi seluruh informasi kegiatan dengan benar.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-7 p-5 md:p-7">
          {/* PIC */}
          <section>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">
                Informasi Penanggung Jawab
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Informasi mahasiswa yang bertanggung jawab atas kegiatan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama PIC <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    value={namaPic}
                    onChange={(event) => {
                      setNamaPIC(event.target.value);
                    }}
                    placeholder="Masukkan nama penanggung jawab"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nomor HP PIC <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="number"
                    value={nomorHpPIC}
                    onChange={(event) => {
                      setNomorHpPIC(event.target.value);
                    }}
                    placeholder="Contoh: 081234567890"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-100" />

          {/* Dokumentasi Foto */}
          <section>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">
                Dokumentasi Kegiatan
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Unggah foto sebagai bukti pelaksanaan kegiatan Bela Kampus.
              </p>
            </div>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 px-5 py-8 transition hover:border-blue-400 hover:bg-blue-50/40">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Camera size={26} />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Klik untuk mengunggah foto
              </p>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG atau JPEG (Maksimal 5 foto)
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
                <Upload size={15} />
                Pilih Foto
              </div>
              <input
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleFotoChange}
                className="hidden"
              />
            </label>

            {preview.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {preview.map((url, index) => (
                  <div
                    key={url}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={url}
                      alt={`Dokumentasi ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFoto(index)}
                      className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white opacity-100 transition hover:bg-red-500"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="border-t border-gray-100" />

          {/* Video */}
          <section>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">Video Kegiatan</h3>
              <p className="mt-1 text-xs text-gray-500">
                Sertakan tautan video dokumentasi kegiatan jika tersedia.
              </p>
            </div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Link Video
            </label>
            <div className="relative">
              <Video
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="url"
                value={linkVideo}
                onChange={(event) => {
                  setLinkVideo(event.target.value);
                }}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Gunakan link Google Drive, YouTube, atau platform berbagi video
              lainnya.
            </p>
          </section>

          <div className="border-t border-gray-100" />

          {/* Deskripsi */}
          <section>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800">
                Deskripsi Kegiatan
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Ceritakan pelaksanaan dan hasil kegiatan yang telah dilakukan.
              </p>
            </div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              value={deskripsi}
              onChange={(event) => {
                setDeskripsi(event.target.value);
              }}
              placeholder="Jelaskan kegiatan yang dilaksanakan, lokasi kegiatan, sasaran peserta, proses pelaksanaan, serta hasil yang diperoleh..."
              className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </section>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
          <p className="text-xs text-gray-500">
            <span className="text-red-500">*</span> Wajib diisi
          </p>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="reset"
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20"
            >
              <Upload size={17} />
              Kirim Laporan
            </button>
          </div>
        </div>
      </form>

      <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="mt-0.5 text-amber-600">
          <ImageIcon size={19} />
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-800">Perhatian</p>
          <p className="mt-1 text-xs leading-relaxed text-amber-700">
            Pastikan dokumentasi yang diunggah merupakan foto asli kegiatan Bela
            Kampus. Periksa kembali informasi sebelum mengirimkan laporan.
          </p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

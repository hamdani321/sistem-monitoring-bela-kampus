import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
import { ReportKegiatanPayload } from "@/modules/types/report-kegiatan-payload";
import { useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: ReportKegiatanPayload) => void;
  loadingSubmit: boolean;
};

// const initialForm: FormData = {
//   nama_pic: "",
//   nomor_hp_pic: "",
//   foto: null,
//   link_video: "",
//   deskripsi: "",
// };

export default function ModalLaporanKegiatan({
  open,
  loadingSubmit,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ReportKegiatanPayload>({
    nama_pic: "",
    nomor_hp_pic: "",
    foto: null,
    link_video: "",
    deskripsi: "",
    registrasi_id: 0,
  });
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const updateField = (
    field: keyof ReportKegiatanPayload,
    value: string | File | null,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran foto maksimal 5 MB.");
      return;
    }

    setError("");
    updateField("foto", file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.foto) {
      setError("Silakan unggah foto kegiatan terlebih dahulu.");
      return;
    }

    onSubmit?.(form);
  };

  const closeModal = () => {
    setError("");
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="flex max-h-[95dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl animate-[modalIn_250ms_ease-out] sm:max-h-[90dvh] sm:rounded-3xl"
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-6 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full border-[24px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-20 right-28 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-inner">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
                </svg>
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-100">
                  BELA KAMPUS
                </p>
                <h2
                  id="modal-title"
                  className="text-xl font-bold tracking-tight sm:text-2xl"
                >
                  Laporan Kegiatan
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-indigo-100">
                  Lengkapi informasi kegiatan dan unggah dokumentasi sebagai
                  bukti pelaksanaan.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeModal}
              aria-label="Tutup modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white/80 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative mt-5 flex items-center gap-2 text-xs text-indigo-100">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5m0-8h.01" />
            </svg>
            <span>Pastikan data dan dokumentasi sudah benar.</span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-6 px-6 py-6 sm:px-8">
            {/* Informasi PIC */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Informasi Penanggung Jawab
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Identitas PIC kegiatan
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="nama_pic" className={labelClass}>
                    Nama PIC <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="nama_pic"
                    name="nama_pic"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={form.nama_pic}
                    onChange={(e) => updateField("nama_pic", e.target.value)}
                    placeholder="Masukkan nama penanggung jawab"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="nomor_hp_pic" className={labelClass}>
                    Nomor HP PIC <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50/70 transition focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/10">
                    <span className="flex items-center gap-2 border-r border-gray-200 px-3 text-sm font-medium text-gray-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.9L7.7 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.9-.6l2.8.5a2 2 0 0 1 2.3 2.6Z" />
                      </svg>
                      +62
                    </span>
                    <input
                      id="nomor_hp_pic"
                      name="nomor_hp_pic"
                      type="tel"
                      required
                      autoComplete="tel-national"
                      maxLength={15}
                      value={form.nomor_hp_pic}
                      onChange={(e) =>
                        updateField(
                          "nomor_hp_pic",
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      placeholder="81234567890"
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    Masukkan nomor tanpa angka 0 di depan.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Dokumentasi */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Dokumentasi Kegiatan
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Foto dan video pelaksanaan kegiatan
                  </p>
                </div>
              </div>

              <label className={labelClass}>
                Foto Kegiatan <span className="text-rose-500">*</span>
              </label>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  handleFile(e.dataTransfer.files?.[0]);
                }}
                className={`rounded-2xl border-2 border-dashed p-5 text-center transition sm:p-7 ${
                  dragging
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-gray-50/70 hover:border-indigo-300 hover:bg-indigo-50/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200 transition hover:scale-105 hover:ring-indigo-300"
                  aria-label="Pilih foto kegiatan"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 16V4m-5 5 5-5 5 5" />
                    <path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2" />
                  </svg>
                </button>

                <p className="mt-4 text-sm font-semibold text-gray-800">
                  {form.foto ? form.foto.name : "Klik untuk mengunggah foto"}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  atau tarik dan lepaskan file di sini
                </p>
                <p className="mt-3 text-[11px] text-gray-400">
                  JPG, PNG, WEBP · Maksimal 5 MB
                </p>

                {form.foto && (
                  <button
                    type="button"
                    onClick={() => {
                      updateField("foto", null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="mt-3 text-xs font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Hapus foto
                  </button>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="link_video" className={labelClass}>
                  Link Video <span className="text-gray-400">(Opsional)</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="3" />
                      <path d="m10 9 5 3-5 3z" />
                    </svg>
                  </div>
                  <input
                    id="link_video"
                    name="link_video"
                    type="url"
                    value={form.link_video}
                    onChange={(e) => updateField("link_video", e.target.value)}
                    placeholder="https://youtube.com/..."
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Gunakan link video yang dapat diakses oleh pihak penilai.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Deskripsi */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M8 13h8m-8 4h8" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Deskripsi Kegiatan
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Ceritakan pelaksanaan kegiatan secara ringkas
                  </p>
                </div>
              </div>

              <label htmlFor="deskripsi" className={labelClass}>
                Deskripsi <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows={4}
                required
                minLength={10}
                maxLength={2000}
                value={form.deskripsi}
                onChange={(e) => updateField("deskripsi", e.target.value)}
                placeholder="Jelaskan tujuan, proses pelaksanaan, hasil, dan hal penting lainnya dari kegiatan..."
                className={`${inputClass} min-h-28 resize-y leading-relaxed`}
              />
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-gray-400">Minimal 10 karakter.</p>
                <p className="text-xs tabular-nums text-gray-400">
                  {form.deskripsi.length}/2000
                </p>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5m0 3h.01" />
                </svg>
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-gray-100 bg-white/95 px-6 py-4 backdrop-blur sm:px-8">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:translate-y-0"
              >
                {loadingSubmit ? (
                  <>
                    {" "}
                    <ButtonSpinner text="Mohon tunggu..." />
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    Simpan Laporan
                  </>
                )}

                {/* <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="m5 12 4 4L19 6" />
                </svg>
                Simpan Laporan */}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

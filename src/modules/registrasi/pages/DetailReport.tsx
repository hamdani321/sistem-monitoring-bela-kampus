import { ReportKegiatan } from "@/modules/models/report_kegiatan";
import { Component, ReactNode } from "react";
import { useParams, useNavigate } from "react-router";
import { getReportKegiatan as getDataReportKegiatan } from "../services/registrasi.service";

export default function DetailReport() {
  const { reportKegiatanId } = useParams();
  const navigate = useNavigate();

  return (
    <DetailReportPage
      reportKegiatanId={reportKegiatanId}
      onBack={() => navigate(-1)}
    />
  );
}

interface DetailReportPageProps {
  reportKegiatanId: string | undefined;
  onBack: () => void;
}

interface DetailReportPageState {
  loading: boolean;
  error: string | null;
  report_kegiatan: ReportKegiatan | null;
}

class DetailReportPage extends Component<
  DetailReportPageProps,
  DetailReportPageState
> {
  state: DetailReportPageState = {
    report_kegiatan: null,
    loading: true,
    error: null,
  };

  getValidUrl(value: string | null | undefined): string | null {
    if (!value?.trim()) return null;

    try {
      const url = new URL(value);

      return ["http:", "https:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  getWhatsAppUrl(phone: string | null | undefined): string | null {
    if (!phone?.trim()) return null;

    const digits = phone.replace(/\D/g, "");
    const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;

    return normalized ? `https://wa.me/${normalized}` : null;
  }

  async getReportKegiatan() {
    if (!this.props.reportKegiatanId) {
      this.setState({
        loading: false,
        error: "ID laporan kegiatan tidak valid.",
      });
      return;
    }

    try {
      const result = await getDataReportKegiatan(this.props.reportKegiatanId);

      this.setState({
        report_kegiatan: result ?? null,
        loading: false,
        error: result ? null : "Data laporan kegiatan tidak ditemukan.",
      });
    } catch {
      this.setState({
        loading: false,
        error: "Gagal mengambil data laporan kegiatan. Silakan coba kembali.",
      });
    }
  }

  componentDidMount(): void {
    this.getReportKegiatan();
  }

  renderInfo(
    label: string,
    value: string | number | null | undefined,
    icon: ReactNode,
    color: string
  ) {
    return (
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-1 break-words text-sm font-semibold text-slate-800">
            {value !== null && value !== undefined && String(value).trim()
              ? value
              : "Belum tersedia"}
          </p>
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

        <h2 className="mt-5 text-lg font-bold text-slate-800">
          Memuat laporan kegiatan
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Mohon tunggu, data sedang dipersiapkan.
        </p>
      </div>
    );
  }

  renderError() {
    const { error } = this.state;

    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 text-rose-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-10 w-10"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
          </svg>
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-800">
          Laporan tidak dapat ditampilkan
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={this.props.onBack}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Kembali
          </button>

          <button
            type="button"
            onClick={() => {
              this.setState(
                { loading: true, error: null },
                () => void this.getReportKegiatan()
              );
            }}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  render(): ReactNode {
    const { loading, error, report_kegiatan } = this.state;

    if (loading) {
      return this.renderLoading();
    }

    if (error || !report_kegiatan) {
      return this.renderError();
    }

    const report = report_kegiatan;

    // const fotoUrl = this.getValidUrl(report.foto);
    const fotoUrl = `http://localhost:8000/storage/${report.foto}`;
    console.log(fotoUrl);

    const videoUrl = this.getValidUrl(report.video);
    const nomorHp = report.nomor_hp_pic?.trim();
    const whatsappUrl = this.getWhatsAppUrl(nomorHp);

    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Tombol kembali */}
          <button
            type="button"
            onClick={this.props.onBack}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
              <path d="M20 12H9" />
            </svg>
            Kembali
          </button>

          {/* Header */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-900/10 sm:p-8">
            <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-50">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Dokumentasi Kegiatan
                </span>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Detail Report Kegiatan
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                  Informasi lengkap, dokumentasi, dan penanggung jawab kegiatan
                  Bela Kampus.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-9 w-9"
                  aria-hidden="true"
                >
                  <path d="M8 4h8l4 4v12H4V4h4Z" />
                  <path d="M14 4v5h5M8 13h8M8 17h6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Konten utama */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
            {/* Foto dan deskripsi */}
            <div className="space-y-6 lg:col-span-3">
              {/* Foto */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="m21 15-5-5L5 21" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">Foto Kegiatan</h2>
                    <p className="text-xs text-slate-500">
                      Dokumentasi pelaksanaan kegiatan
                    </p>
                  </div>
                </div>
                <img
                  src={fotoUrl}
                  alt="Dokumentasi kegiatan"
                  className="max-h-[480px] w-full bg-slate-100 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                {/* {fotoUrl ? (
                  <img
                    src={fotoUrl}
                    alt="Dokumentasi kegiatan"
                    className="max-h-[480px] w-full bg-slate-100 object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex min-h-64 flex-col items-center justify-center bg-slate-50 px-6 py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="h-8 w-8"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>

                    <p className="font-semibold text-slate-700">
                      Foto belum tersedia
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Belum ada dokumentasi foto untuk kegiatan ini.
                    </p>
                  </div>
                )} */}
              </section>

              {/* Deskripsi */}
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                      <path d="M14 2v6h6M8 13h8M8 17h8" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      Deskripsi Kegiatan
                    </h2>
                    <p className="text-xs text-slate-500">
                      Ringkasan laporan kegiatan
                    </p>
                  </div>
                </div>

                {report.deskripsi?.trim() ? (
                  <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-600 sm:text-base">
                    {report.deskripsi}
                  </p>
                ) : (
                  <p className="text-sm italic text-slate-400">
                    Belum ada deskripsi kegiatan.
                  </p>
                )}
              </section>
            </div>

            {/* Informasi laporan */}
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-bold text-slate-800">
                    Informasi Kegiatan
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Identitas laporan dan penanggung jawab
                  </p>
                </div>

                <div className="space-y-5">
                  {this.renderInfo(
                    "ID Registrasi",
                    report.registrasi_id,
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M8 4h8l4 4v12H4V4h4ZM14 4v5h5M8 13h8M8 17h5" />
                    </svg>,
                    "bg-indigo-50 text-indigo-600"
                  )}

                  {this.renderInfo(
                    "NIM Mahasiswa",
                    report.nim_mahasiswa,
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="m2 10 10-6 10 6-10 6-10-6Z" />
                      <path d="M6 13v5c4 3 8 3 12 0v-5M22 10v6" />
                    </svg>,
                    "bg-blue-50 text-blue-600"
                  )}

                  {this.renderInfo(
                    "Nama PIC",
                    report.nama_pic,
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21a8 8 0 0 1 16 0" />
                    </svg>,
                    "bg-violet-50 text-violet-600"
                  )}

                  <div className="border-t border-slate-100 pt-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 3.18 2 2 0 0 1 4.07 1h3a2 2 0 0 1 2 1.72l.45 3a2 2 0 0 1-.57 1.7L7.2 9.17a16 16 0 0 0 6 6l1.75-1.75a2 2 0 0 1 1.7-.57l3 .45a2 2 0 0 1 1.72 2Z" />
                        </svg>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-slate-500">
                          Nomor HP PIC
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                          {nomorHp || "Belum tersedia"}
                        </p>

                        {nomorHp && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={`tel:${nomorHp}`}
                              className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                            >
                              Telepon
                            </a>

                            {whatsappUrl && (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                              >
                                WhatsApp ↗
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Video */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-6 w-6"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path
                          d="m10 8 6 4-6 4V8Z"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-800">
                        Video Kegiatan
                      </h2>
                      <p className="text-xs text-slate-500">
                        Rekaman dokumentasi
                      </p>
                    </div>
                  </div>

                  {videoUrl ? (
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path
                          d="m10 8 6 4-6 4V8Z"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                      Lihat Video
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                      <p className="text-sm font-medium text-slate-600">
                        Video belum tersedia
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Tautan video belum ditambahkan ke laporan.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Catatan */}
              <div className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 p-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 11v5M12 7h.01" />
                </svg>

                <p className="text-xs leading-5 text-indigo-800">
                  Informasi ini merupakan dokumentasi laporan kegiatan mahasiswa
                  pada sistem Bela Kampus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

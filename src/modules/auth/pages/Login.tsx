import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
import Alert from "@/components/ui/alert/Alert";
import { useAuth } from "@/context/UseAuth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const user = await login(email.trim(), password);

      if (!user) {
        setErrorMessage(
          "Email atau password tidak valid. Silakan periksa kembali."
        );
        return;
      }

      navigate("/dashboard");
    } catch {
      setErrorMessage(
        "Terjadi kesalahan saat login. Silakan coba beberapa saat lagi."
      );
    } finally {
      setLoading(false);
    }

    // Hubungkan dengan fungsi login dari useAuth() atau API Laravel.
  };

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Panel branding */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#102a56] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

        <a href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-900 shadow-lg">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path d="m2 9 10-5 10 5-10 5L2 9Z" />
              <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
            </svg>
          </div>

          <div>
            <p className="text-lg font-extrabold tracking-wide">BELA KAMPUS</p>
            <p className="text-xs text-blue-200">
              Sistem Informasi Kemahasiswaan
            </p>
          </div>
        </a>

        <div className="relative z-10 my-16 max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Portal resmi kampus
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight xl:text-5xl">
            Satu langkah untuk kontribusi yang lebih berarti.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-blue-100/80">
            Kelola registrasi, akses informasi, dan ikuti kegiatan Bela Kampus
            dengan lebih mudah melalui satu platform yang terintegrasi.
          </p>

          {/* Ilustrasi dekoratif */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-400/15 text-blue-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 10h.01M15 10h.01M9 13h.01M15 13h.01" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Semua dalam satu portal</p>
                <p className="mt-1 text-sm text-blue-100/70">
                  Informasi dan administrasi lebih terorganisir.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-blue-200">Akses</p>
                <p className="mt-1 font-semibold">Mudah & praktis</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-blue-200">Pengelolaan</p>
                <p className="mt-1 font-semibold">Terintegrasi</p>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-blue-200/70">
          © {new Date().getFullYear()} Sistem Informasi Bela Kampus
        </p>
      </section>

      {/* Panel form login */}
      <section className="flex min-h-screen flex-col justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
        <div className="mx-auto w-full max-w-md">
          {/* Logo untuk mobile */}
          <a href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-900 text-white">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="m2 9 10-5 10 5-10 5L2 9Z" />
                <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
              </svg>
            </div>
            <div>
              <p className="font-extrabold tracking-wide text-slate-900">
                BELA KAMPUS
              </p>
              <p className="text-xs text-slate-500">
                Sistem Informasi Kemahasiswaan
              </p>
            </div>
          </a>

          <div className="mb-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-800">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <path d="m10 17 5-5-5-5M15 12H3" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Selamat datang!
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Masuk menggunakan akun terdaftar untuk melanjutkan ke Sistem
              Informasi Bela Kampus.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage ? (
              <Alert message={errorMessage} title="Error" variant="error" />
            ) : null}

            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email atau NIM
              </label>

              <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5 shrink-0 text-slate-400 group-focus-within:text-blue-600"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                </svg>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="Masukkan email atau NIM"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="min-w-0 w-full border-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700"
                >
                  Kata sandi
                </label>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-5 w-5 shrink-0 text-slate-400"
                  aria-hidden="true"
                >
                  <rect x="4" y="10" width="16" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="min-w-0 w-full border-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                  className="shrink-0 rounded-md p-1 text-slate-400 transition hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 5.2A11.4 11.4 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.2 3.1M6.2 6.2C3.8 7.8 2.8 10 2.5 12c.5 1.3 2.2 4.2 5.5 5.8A10.5 10.5 0 0 0 12 19" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-800 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/25 active:translate-y-0"
            >
              {loading ? (
                <>
                  <ButtonSpinner text="Please Wait..." />
                </>
              ) : (
                <>
                  Masuk Ke Dashboard
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </>
              )}

              {/*  */}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">AKSES PORTAL RESMI</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="mt-0.5 text-emerald-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Akses akun yang aman
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Pastikan Anda menggunakan akun resmi dan tidak membagikan kata
                sandi kepada orang lain.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Sistem Informasi Bela Kampus.
            <br />
            Seluruh hak cipta dilindungi.
          </p>
        </div>
      </section>
    </main>
  );
}

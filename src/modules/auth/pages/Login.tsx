import { FormEvent, useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";

export default function Login() {
  // const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //     event.preventDefault();

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

      navigate("/dashboard", { replace: true });
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

                <a
                  href="/forgot-password"
                  className="text-xs font-semibold text-blue-700 transition hover:text-blue-900"
                >
                  Lupa kata sandi?
                </a>
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

            {/* <label className="flex cursor-pointer items-center gap-3 py-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-700 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">Ingat saya</span>
            </label> */}

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

// Lama

// import { FormEvent, useState } from "react";
// import { useNavigate } from "react-router";

// import PageMeta from "@/components/common/PageMeta";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import { EyeCloseIcon, EyeIcon } from "@/icons";
// import AuthLayout from "@/pages/AuthPages/AuthPageLayout";
// import Button from "@/components/ui/button/Button";
// import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
// import { useAuth } from "@/context/UseAuth";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (loading) return;

//     setLoading(true);
//     setErrorMessage("");

//     try {
//       const user = await login(email.trim(), password);

//       if (!user) {
//         setErrorMessage(
//           "Email atau password tidak valid. Silakan periksa kembali."
//         );
//         return;
//       }

//       navigate("/dashboard", { replace: true });
//     } catch {
//       setErrorMessage(
//         "Terjadi kesalahan saat login. Silakan coba beberapa saat lagi."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <PageMeta
//         title="Login | Sistem Bela Kampus"
//         description="Masuk ke Sistem Bela Kampus untuk mengelola registrasi dan aktivitas Bela Kampus."
//       />

//       <AuthLayout>
//         <div className="flex min-h-full flex-1 flex-col justify-center">
//           <div className="mx-auto w-full max-w-md">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.7"
//                   className="size-7"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 3 20 6v5c0 5-3.4 8.2-8 10-4.6-1.8-8-5-8-10V6l8-3Z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m9 12 2 2 4-4"
//                   />
//                 </svg>
//               </div>

//               <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-500">
//                 Sistem Bela Kampus
//               </p>

//               <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
//                 Selamat datang!
//               </h1>

//               <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
//                 Masuk ke akun Anda untuk melanjutkan pengelolaan kegiatan Bela
//                 Kampus.
//               </p>
//             </div>

//             {/* Login Form */}
//             <form onSubmit={handleLogin} className="space-y-5">
//               <div className="space-y-2">
//                 <Label htmlFor="email">
//                   Email <span className="text-error-500">*</span>
//                 </Label>

//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="username"
//                   placeholder="nama@email.com"
//                   value={email}
//                   onChange={(event) => {
//                     setEmail(event.target.value);
//                     setErrorMessage("");
//                   }}
//                   required
//                   disabled={loading}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="password">
//                   Password <span className="text-error-500">*</span>
//                 </Label>

//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     placeholder="Masukkan password Anda"
//                     value={password}
//                     onChange={(event) => {
//                       setPassword(event.target.value);
//                       setErrorMessage("");
//                     }}
//                     required
//                     disabled={loading}
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((previous) => !previous)}
//                     disabled={loading}
//                     aria-label={
//                       showPassword
//                         ? "Sembunyikan password"
//                         : "Tampilkan password"
//                     }
//                     aria-pressed={showPassword}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 transition hover:text-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed dark:text-gray-400"
//                   >
//                     {showPassword ? (
//                       <EyeIcon className="size-5 fill-current" />
//                     ) : (
//                       <EyeCloseIcon className="size-5 fill-current" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Error Message */}
//               {errorMessage && (
//                 <div
//                   role="alert"
//                   aria-live="polite"
//                   className="flex items-start gap-3 rounded-xl border border-error-200 bg-error-50 p-4 text-sm text-error-600 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-400"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                     className="mt-0.5 size-5 shrink-0"
//                     aria-hidden="true"
//                   >
//                     <circle cx="12" cy="12" r="9" />
//                     <path strokeLinecap="round" d="M12 8v4m0 4h.01" />
//                   </svg>

//                   <p>{errorMessage}</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <div className="pt-2">
//                 <Button
//                   type="submit"
//                   disabled={loading || !email.trim() || !password}
//                   className="w-full"
//                   size="sm"
//                 >
//                   {loading ? (
//                     <ButtonSpinner text="Sedang masuk..." />
//                   ) : (
//                     <span className="flex items-center justify-center gap-2">
//                       Masuk ke Akun
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         className="size-4"
//                         aria-hidden="true"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M5 12h14m-6-6 6 6-6 6"
//                         />
//                       </svg>
//                     </span>
//                   )}
//                 </Button>
//               </div>
//             </form>

//             {/* Footer */}
//             <div className="mt-8 border-t border-gray-200 pt-5 dark:border-gray-800">
//               <p className="text-center text-xs leading-5 text-gray-400 dark:text-gray-500">
//                 Sistem Bela Kampus
//                 <span className="mx-2">•</span>
//                 Platform pengelolaan kegiatan kampus
//               </p>
//             </div>
//           </div>
//         </div>
//       </AuthLayout>
//     </>
//   );
// }

//lama

// import { FormEvent, useState } from "react";
// import PageMeta from "@/components/common/PageMeta";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import { EyeCloseIcon, EyeIcon } from "@/icons";
// import AuthLayout from "@/pages/AuthPages/AuthPageLayout";
// import Button from "@/components/ui/button/Button";
// import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
// import { useNavigate } from "react-router";
// import { useAuth } from "@/context/UseAuth";
// export default function Login() {
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigator = useNavigate();

//   const handleLogin = async (event: FormEvent) => {
//     event.preventDefault();
//     setLoading(true);
//     const user = await login(email, password);
//     if (user) {
//       return navigator("/dashboard");
//     }
//     setLoading(false);
//     console.log("Login gagal");
//   };
//   return (
//     <>
//       <PageMeta
//         title="Welcome To Sistem Bela Kampus"
//         description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <AuthLayout>
//         <div className="flex flex-col flex-1">
//           <div className="w-full max-w-md pt-10 mx-auto"></div>
//           <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//             <div>
//               <div className="mb-5 sm:mb-8">
//                 <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//                   Sign In
//                 </h1>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Enter your email and password to sign in!
//                 </p>
//               </div>
//               <div>
//                 <form onSubmit={handleLogin}>
//                   <div className="space-y-6">
//                     <div>
//                       <Label>
//                         Email <span className="text-error-500">*</span>{" "}
//                       </Label>
//                       <Input
//                         value={email}
//                         onChange={(event) => setEmail(event.target.value)}
//                         placeholder="masukan email"
//                       />
//                     </div>
//                     <div>
//                       <Label>
//                         Password <span className="text-error-500">*</span>{" "}
//                       </Label>
//                       <div className="relative">
//                         <Input
//                           value={password}
//                           onChange={(event) => setPassword(event.target.value)}
//                           type={showPassword ? "text" : "password"}
//                           placeholder="masukan password"
//                         />
//                         <span
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                         >
//                           {showPassword ? (
//                             <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                           ) : (
//                             <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                           )}
//                         </span>
//                       </div>
//                     </div>

//                     <div>
//                       <Button disabled={loading} className="w-full" size="sm">
//                         {loading ? (
//                           <>
//                             <ButtonSpinner text="Please Wait..." />
//                           </>
//                         ) : (
//                           <>LOGIN</>
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </AuthLayout>
//     </>
//   );
// }

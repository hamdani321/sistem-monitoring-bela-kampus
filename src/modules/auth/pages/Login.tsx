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

import { FormEvent, useState } from "react";
import PageMeta from "@/components/common/PageMeta";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import AuthLayout from "@/pages/AuthPages/AuthPageLayout";
import Button from "@/components/ui/button/Button";
import ButtonSpinner from "@/components/ui/spinner/ButtonSpinner";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/UseAuth";
export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const user = await login(email, password);
    if (user) {
      return navigator("/dashboard");
    }
    setLoading(false);
    console.log("Login gagal");
  };
  return (
    <>
      <PageMeta
        title="Welcome To Sistem Bela Kampus"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <div className="flex flex-col flex-1">
          <div className="w-full max-w-md pt-10 mx-auto"></div>
          <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div className="mb-5 sm:mb-8">
                <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enter your email and password to sign in!
                </p>
              </div>
              <div>
                <form onSubmit={handleLogin}>
                  <div className="space-y-6">
                    <div>
                      <Label>
                        Email <span className="text-error-500">*</span>{" "}
                      </Label>
                      <Input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="masukan email"
                      />
                    </div>
                    <div>
                      <Label>
                        Password <span className="text-error-500">*</span>{" "}
                      </Label>
                      <div className="relative">
                        <Input
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          type={showPassword ? "text" : "password"}
                          placeholder="masukan password"
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        >
                          {showPassword ? (
                            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          ) : (
                            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                          )}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Button disabled={loading} className="w-full" size="sm">
                        {loading ? (
                          <>
                            <ButtonSpinner text="Please Wait..." />
                          </>
                        ) : (
                          <>LOGIN</>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

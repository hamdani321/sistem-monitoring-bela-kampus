import { Outlet, Navigate } from "react-router";
import { useAuth } from "./UseAuth";

export function ProtectionRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex w-full max-w-sm flex-col items-center px-6 text-center">
            {/* Logo / Icon */}

            {/* Title */}
            <h1 className="text-xl font-semibold tracking-tight text-slate-800">
              Menyiapkan Aplikasi
            </h1>
            {/* Description */}
            <p className="mt-2 text-sm text-slate-500">Tunggu sebentar</p>

            {/* Footer */}
            {/* <p className="mt-5 text-xs text-slate-400">
              Mohon jangan tutup halaman ini.
            </p> */}
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

import { Routes, Route, BrowserRouter } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SekolahPage from "./modules/sekolah/pages/SekolahPage";
import Dashboard from "./modules/dashboard/pages/DashboardPage";
import Mahasiswa from "./modules/mahasiswa/pages/MahasiswaPage";
import Portal from "./modules/portal/pages/PortalPage";
import Login from "./modules/auth/pages/Login";
import { ProtectionRoutes } from "./context/ProtectionRoutes";
import Registrasi from "./modules/registrasi/pages/RegistrasiPage";
import PermissionRoute from "./context/PermissionRoute";
import TahunAjaran from "./modules/tahun_ajaran/pages/TahunAjaranPage";
import CreateTahunAjaran from "./modules/tahun_ajaran/pages/CreateTahunAjaranPage";
import UsersPage from "./modules/users/pages/UsersPage";
import ReportPage from "./modules/registrasi/pages/ReportPage";
import ReportKegiatanPage from "./modules/portal/pages/ReportKegiatanPage";
import DetailReportPage from "./modules/registrasi/pages/DetailReportPage";
import DataPortalPage from "./modules/data_portal/pages/DataPortalPage";
import DetailPortalPage from "./modules/data_portal/pages/DetailPortalPage";
import CreateSekolahPage from "./modules/sekolah/pages/CreateSekolahPage";
import CreateMahasiswaPage from "./modules/mahasiswa/pages/CreateMahasiswaPage";
import ProdiPage from "./modules/prodi/pages/ProdiPage";
import RegistrasiPortalPage from "./modules/portal/pages/RegistrasiPortalPage";
import { KelasPage } from "./modules/kelas/pages/KelasPage";
import { CreatePortalPage } from "./modules/data_portal/pages/CreatePortalPage";
import { EditSekolahPage } from "./modules/sekolah/pages/EditSekolahPage";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectionRoutes />}>
            <Route element={<AppLayout />}>
              {/* <Route index path="/" element={<Home />} /> */}

              {/* Costum Route */}

              {/* Route yang hanya bisa diakses admin */}
              <Route element={<PermissionRoute allowedRoles={["admin"]} />}>
                <Route path="/registrasi" element={<Registrasi />} />
                <Route path="/registrasi/:id" element={<ReportPage />} />
                <Route
                  path="/registrasi/report-kegiatan/:reportKegiatanId"
                  element={<DetailReportPage />}
                />

                <Route path="/sekolah" element={<SekolahPage />} />
                <Route path="/sekolah/create" element={<CreateSekolahPage />} />
                <Route path="/sekolah/:id" element={<EditSekolahPage />} />

                <Route path="/mahasiswa" element={<Mahasiswa />} />
                <Route
                  path="/mahasiswa/create"
                  element={<CreateMahasiswaPage />}
                />

                <Route path="/kelas" element={<KelasPage />} />

                <Route path="/prodi" element={<ProdiPage />} />

                <Route path="/data-portal" element={<DataPortalPage />} />
                <Route
                  path="/data-portal/create"
                  element={<CreatePortalPage />}
                />
                <Route path="/data-portal/:id" element={<DetailPortalPage />} />

                <Route path="/tahun-ajaran" element={<TahunAjaran />} />
                <Route
                  path="/tahun-ajaran/create"
                  element={<CreateTahunAjaran />}
                />

                <Route path="/users" element={<UsersPage />} />
              </Route>

              {/* Route yang hanya bisa diakses mahasiswa */}
              <Route element={<PermissionRoute allowedRoles={["mahasiswa"]} />}>
                <Route path="/portal" element={<Portal />} />
                <Route
                  path="/portal/registrasi/:portalId"
                  element={<RegistrasiPortalPage />}
                />

                <Route
                  path="/portal/registrasi/:registrasiId/report"
                  element={<ReportKegiatanPage />}
                />

                {/* <Route path="/report" element={<ReportPageMahasiswa />} /> */}
              </Route>

              {/* Route yang bisa diakses oleh kedua role */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route index path="/" element={<Login />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

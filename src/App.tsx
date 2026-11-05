import { Routes, Route, BrowserRouter } from "react-router";
// import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import SekolahPage from "./modules/sekolah/pages/SekolahPage";
import Dashboard from "./modules/dashboard/pages/DashboardPage";
import Mahasiswa from "./modules/mahasiswa/pages/MahasiswaPage";
import Portal from "./modules/portal/pages/PortalPage";
import Login from "./modules/auth/pages/Login";
import { ProtectionRoutes } from "./context/ProtectionRoutes";
// import RegistrasiPortal from "./modules/portal/pages/RegistrasiPortal";
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

                {/* Portal */}
                {/* <Route path="/portal/:id" element={<DetailPortal />} /> */}

                {/* Data Portal */}

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
              </Route>

              {/* Route yang bisa diakses oleh kedua role */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/portal" element={<Portal />} /> */}
              {/* <Route path="/undangan" element={<Undangan />} /> */}

              {/* Costum Route */}

              {/* Others Page */}
              {/* <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} /> */}

              {/* Forms */}
              {/* <Route path="/form-elements" element={<FormElements />} /> */}

              {/* Tables */}
              {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

              {/* Ui Elements */}
              {/* <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} /> */}

              {/* Charts */}
              {/* <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} /> */}
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route index path="/" element={<Login />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

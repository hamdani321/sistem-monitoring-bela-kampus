import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router";
// import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Sekolah from "./modules/sekolah/pages/Sekolah";
import Dashboard from "./modules/dashboard/pages/Dashboard";
import Mahasiswa from "./modules/mahasiswa/pages/Mahasiswa";
import Portal from "./modules/portal/pages/Portal";
import Login from "./modules/auth/pages/Login";
import { ProtectionRoutes } from "./context/ProtectionRoutes";
import RegistrasiPortal from "./modules/portal/pages/RegistrasiPortal";
import Registrasi from "./modules/registrasi/pages/Registrasi";
import PermissionRoute from "./context/PermissionRoute";
import TahunAjaran from "./modules/tahun_ajaran/pages/TahunAjaran";
import CreateTahunAjaran from "./modules/tahun_ajaran/pages/CreateTahunAjaran";
import Users from "./modules/users/pages/Users";
import Report from "./modules/registrasi/pages/Report";
import ReportKegiatanPage from "./modules/portal/pages/ReportKegiatanPage";
import DetailReport from "./modules/registrasi/pages/DetailReport";
import DataPortal from "./modules/data_portal/pages/DataPortal";
import { CreatePortal } from "./modules/data_portal/pages/CreatePortal";
import DetailPortal from "./modules/data_portal/pages/DetailPortal";
import CreateSekolah from "./modules/sekolah/pages/CreateSekolah";
import CreateMahasiswa from "./modules/mahasiswa/pages/CreateMahasiswa";
import Prodi from "./modules/prodi/pages/Prodi";
import { Kelas } from "./modules/kelas/pages/Kelas";
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
                <Route path="/registrasi/:id" element={<Report />} />
                <Route
                  path="/registrasi/report-kegiatan/:reportKegiatanId"
                  element={<DetailReport />}
                />

                <Route path="/sekolah" element={<Sekolah />} />
                <Route path="/sekolah/create" element={<CreateSekolah />} />

                <Route path="/mahasiswa" element={<Mahasiswa />} />
                <Route path="/mahasiswa/create" element={<CreateMahasiswa />} />

                <Route path="/kelas" element={<Kelas />} />

                <Route path="/prodi" element={<Prodi />} />

                {/* Portal */}
                {/* <Route path="/portal/:id" element={<DetailPortal />} /> */}

                {/* Data Portal */}

                <Route path="/data-portal" element={<DataPortal />} />
                <Route path="/data-portal/create" element={<CreatePortal />} />
                <Route path="/data-portal/:id" element={<DetailPortal />} />

                <Route path="/tahun-ajaran" element={<TahunAjaran />} />
                <Route
                  path="/tahun-ajaran/create"
                  element={<CreateTahunAjaran />}
                />

                <Route path="/users" element={<Users />} />
              </Route>

              {/* Route yang hanya bisa diakses mahasiswa */}
              <Route element={<PermissionRoute allowedRoles={["mahasiswa"]} />}>
                <Route path="/portal" element={<Portal />} />
                <Route
                  path="/portal/registrasi/:portalId"
                  element={<RegistrasiPortal />}
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
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Auth Layout */}
          <Route index path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

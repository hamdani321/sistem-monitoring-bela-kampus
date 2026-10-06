import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
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
import Home from "./pages/Dashboard/Home";
import Sekolah from "./modules/sekolah/pages/Sekolah";
import Dashboard from "./modules/dashboard/pages/Dashboard";
import Mahasiswa from "./modules/mahasiswa/pages/Mahasiswa";
import Kelompok from "./modules/kelompok/pages/Kelompok";
import Portal from "./modules/portal/pages/Portal";
import DetailPortal from "./modules/portal/pages/DetailPortal";
import { CreatePortal } from "./modules/portal/pages/CreatePortal";
import Login from "./modules/auth/pages/Login";
import { ProtectionRoutes } from "./context/ProtectionRoutes";
import KelompokPortal from "./modules/portal/pages/KelompokPortal";
import RegistrasiPortal from "./modules/portal/pages/RegistrasiPortal";
import { KelompokAnggota } from "./modules/kelompok/pages/KelompokAnggota";
import Undangan from "./modules/undangan/pages/Undangan";
import Registrasi from "./modules/registrasi/pages/Registrasi";
import PermissionRoute from "./context/PermissionRoute";
import TahunAjaran from "./modules/tahun_ajaran/pages/TahunAjaran";
import CreateTahunAjaran from "./modules/tahun_ajaran/pages/CreateTahunAjaran";
import Users from "./modules/users/pages/Users";
import ReportKegiatan from "./modules/report_kegiatan/pages/ReportKegiatan";
import FormReportKegiatan from "./modules/report_kegiatan/pages/FormReportKegiatan";

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

              <Route path="/dashboard" element={<Dashboard />} />

              <Route element={<PermissionRoute allowedRoles={["admin"]} />}>
                <Route path="/registrasi" element={<Registrasi />} />

                <Route path="/sekolah" element={<Sekolah />} />
                <Route path="/mahasiswa" element={<Mahasiswa />} />
              </Route>

              <Route path="/kelompok" element={<Kelompok />} />
              <Route
                path="/kelompok/member/:id"
                element={<KelompokAnggota />}
              />

              <Route path="/portal" element={<Portal />} />
              <Route path="/portal/:id" element={<DetailPortal />} />
              <Route path="/portal/create" element={<CreatePortal />} />
              <Route
                path="/portal/registrasi/:portalId"
                element={<RegistrasiPortal />}
              />
              <Route
                path="/portal/kelompok/:kelompokId"
                element={<KelompokPortal />}
              />

              <Route path="/undangan" element={<Undangan />} />

              <Route path="/tahun-ajaran" element={<TahunAjaran />} />
              <Route
                path="/tahun-ajaran/create"
                element={<CreateTahunAjaran />}
              />

              <Route path="/users" element={<Users />} />

              <Route path="/report-kegiatan" element={<ReportKegiatan />} />
              <Route
                path="/report-kegiatan/registrasi/:registrasiId"
                element={<FormReportKegiatan />}
              />
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

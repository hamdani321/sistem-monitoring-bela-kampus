import { useNavigate } from "react-router";
import ComponentPermission from "@/context/ComponentPermission";
import DashboardMahasiswa from "../components/DashboardMahasiswa";
import DashboardAdmin from "../components/DashboardAdmin";

export default function DashboardPage() {
  const navigate = useNavigate();
  return (
    <>
      <ComponentPermission allowedRoles={["admin"]}>
        <DashboardAdmin navigate={navigate} />
      </ComponentPermission>

      <ComponentPermission allowedRoles={["mahasiswa"]}>
        <DashboardMahasiswa />
      </ComponentPermission>
    </>
  );
}

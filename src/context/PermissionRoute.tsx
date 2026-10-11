import { Navigate, Outlet } from "react-router";
import { useAuth } from "./UseAuth";

export default function PermissionRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const { roles } = useAuth();

  const isRoleAllowed = roles.some((role) => {
    return allowedRoles.includes(role);
  });

  if (!isRoleAllowed) {
    return <Navigate to="*" />;
  }

  return <Outlet />;
}

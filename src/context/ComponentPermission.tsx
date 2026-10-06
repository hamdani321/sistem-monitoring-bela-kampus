import React from "react";
import { useAuth } from "./UseAuth";

export default function ComponentPermission({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { roles } = useAuth();

  const isRoleAllowed = roles.some((role) => {
    return allowedRoles.includes(role);
  });

  if (!isRoleAllowed) {
    return null;
  }

  return children;
}

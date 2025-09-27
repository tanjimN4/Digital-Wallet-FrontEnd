import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, allowedRoles?: TRole | TRole[]) => {
  return function AuthWrapper(props: any) {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) return <p className="text-center p-6">Loading...</p>;

    const userRole = data?.data?.role;

    // Not logged in
    if (!userRole) return <Navigate to="/login" />;

    // Role not allowed
    if (allowedRoles) {
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      if (!roles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
      }
    }

    return <Component {...props} />;
  };
};

import React from "react";
import { NotAuthRoutes } from "./NotAuthRoutes.tsx";
import { MainLayoutRoutes } from "./MainLayoutRoutes.tsx";
import { useAuthStore } from "@/entities/Login";

const RequireAuth = ({
  children,
  routesWithAuth,
}: {
  children: React.ReactNode;
  routesWithAuth: React.ReactNode;
}) => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return children; // : <AppRedirect path="/login"/>;
  }
  return routesWithAuth;
};

export const AppRouter = () => {
  return (
    <RequireAuth routesWithAuth={<MainLayoutRoutes />}>
      <NotAuthRoutes />
    </RequireAuth>
  );
};

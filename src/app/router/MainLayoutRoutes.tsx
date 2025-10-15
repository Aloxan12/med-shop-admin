import { useRoutes } from "react-router-dom";
import React, { useMemo } from "react";
import type { IRouteObjectExtended } from "./types";
import { RoutesByRole } from "./Roles";

interface IUserRoutes {
  routesByUserRole: IRouteObjectExtended[];
}

const UserRoutes = ({ routesByUserRole }: IUserRoutes) => {
  const element = useRoutes(routesByUserRole);
  return <React.Fragment>{element}</React.Fragment>;
};

export const MainLayoutRoutes = () => {
  const currentRole = ""; // useAppSelector(getUserRole);

  const routesByUserRole = useMemo(() => {
    return RoutesByRole({ roles: currentRole as string });
  }, [currentRole]);

  if (routesByUserRole.length === 0) {
    return <div>Маршруты не найдены</div>;
  }

  return <UserRoutes routesByUserRole={routesByUserRole} />;
};

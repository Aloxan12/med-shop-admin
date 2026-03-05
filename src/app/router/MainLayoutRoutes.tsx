import { useRoutes, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  const chatId = searchParams.get("chat_id");
  const chatIdQuery = chatId ? `?chat_id=${chatId}` : "";

  const routesByUserRole = useMemo(() => {
    return RoutesByRole({ roles: currentRole as string, chatIdQuery });
  }, [currentRole, chatIdQuery]);

  if (routesByUserRole.length === 0) {
    return <div>Маршруты не найдены</div>;
  }

  return <UserRoutes routesByUserRole={routesByUserRole} />;
};

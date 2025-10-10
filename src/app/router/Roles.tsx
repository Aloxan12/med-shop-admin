import type { IRouteObjectExtended, IRoutesByRole } from "./types";
import { LogoutPage } from "../../pages/Logout";
import { MainLayout } from "@/widgets/MainLayout";
import { routeConfig } from "./routeConfig";
import { Suspense } from "react";
import { AppLoader } from "@/shared/ui/AppLoader/AppLoader";
import { Navigate } from "react-router-dom";

const routeConfigFn = (roles: string) =>
  routeConfig
    .filter(
      (routeItem) =>
        !routeItem.roles || routeItem.roles.some((role) => roles === role),
    )
    .map(
      (routeItem) =>
        ({
          ...routeItem,
          element: routeItem.element ? (
            <Suspense fallback={<AppLoader loaderType="main" />}>
              {routeItem.element}
            </Suspense>
          ) : null,
          children: routeItem.children?.map((childrenRouteItem) =>
            childrenRouteItem.element
              ? {
                  ...childrenRouteItem,
                  element: (
                    <Suspense fallback={<AppLoader loaderType="main" />}>
                      {childrenRouteItem.element}
                    </Suspense>
                  ),
                }
              : childrenRouteItem,
          ),
          roles: undefined,
        }) as IRouteObjectExtended,
    );

export const RoutesByRole = ({ roles }: IRoutesByRole) => {
  const roleRoutes: IRouteObjectExtended[] = routeConfigFn(roles);

  const resultRole: IRouteObjectExtended[] = [
    {
      element: <MainLayout />,
      path: "/",
      children: roleRoutes,
    },
    {
      path: "/logout",
      element: <LogoutPage />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];
  return resultRole;
};

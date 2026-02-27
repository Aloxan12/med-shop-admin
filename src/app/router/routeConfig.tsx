import { allRouterPaths } from "./allRouterPaths.ts";
import { MainPage } from "@/pages/MainPage";
import type { IRouteObjectExtended } from "./types.ts";
import { UsersPage } from "@/pages/UsersPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { ProductsPage } from "@/pages/ProductsPage";

export const routeConfig: IRouteObjectExtended[] = [
  {
    path: allRouterPaths.main,
    element: <MainPage />,
  },
  {
    path: allRouterPaths.users,
    element: <UsersPage />,
  },
  {
    path: allRouterPaths.products,
    element: <ProductsPage />,
  },
  {
    path: allRouterPaths.categories,
    element: <CategoriesPage />,
  },
  // {
  //   path: allRouterPaths.main,
  //   children: [
  //     {
  //       path: allRouterPaths.main,
  //       element: <MainPage />,
  //     },
  //   ],
  // },
  {
    path: "",
    element: <div>Нет доступна для данной роли</div>,
  },
];

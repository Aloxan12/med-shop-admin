import { lazy } from "react";

export const ProductsPageAsync = lazy(
  () => import("@/pages/ProductsPage/ui/ProductsPage.tsx"),
);

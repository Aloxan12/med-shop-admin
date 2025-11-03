import { lazy } from "react";

export const UsersPageAsync = lazy(
  () => import("@/pages/UsersPage/ui/UsersPage.tsx"),
);

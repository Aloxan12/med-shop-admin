import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export interface IRoutesByRole {
  roles: string;
  chatIdQuery?: string;
}

interface RouteObjectExtendedBase {
  roles?: string[]; // RoleType
}

interface IndexRouteObjectExtended
  extends IndexRouteObject,
    RouteObjectExtendedBase {}

interface NonIndexRouteObjectExtended
  extends NonIndexRouteObject,
    RouteObjectExtendedBase {
  children?: IRouteObjectExtended[];
}

export type IRouteObjectExtended =
  | IndexRouteObjectExtended
  | NonIndexRouteObjectExtended;

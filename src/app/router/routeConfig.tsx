import {allRouterPaths} from './allRouterPaths.ts';
import {MainPage} from '@/pages/MainPage';
import type {IRouteObjectExtended} from "./types.ts";

export const routeConfig: IRouteObjectExtended[] = [
    {
        path: allRouterPaths.main,
        element: <MainPage/>,
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
        path: '',
        element: <div>Нет доступна для данной роли</div>,
    },
];

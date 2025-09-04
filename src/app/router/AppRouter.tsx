import React from "react";
import {Navigate, useLocation, useMatch} from "react-router-dom";
import {NotAuthRoutes} from "./NotAuthRoutes.tsx";
import {MainLayoutRoutes} from "./MainLayoutRoutes.tsx";

interface IRedirect {
    path?: string;
}

export const AppRedirect = ({path = '/'}: IRedirect) => {
    const location = useLocation();
    return <Navigate to={path} state={{from: location}} replace/>;
};

const RequireAuth = ({
                         children,
                         routesWithAuth,
                     }: {
    children: React.ReactNode;
    routesWithAuth: React.ReactNode;
}) => {
    const isAuthenticated = false // useAppSelector((state) => state.auth.accessToken);
    const {rehydrated} = {rehydrated: false}// useAppSelector((state) => state.system);
    const isSameUrl = !!useMatch('login');
    if (!rehydrated) {
        return null;
    }

    if (!isAuthenticated) {
        return isSameUrl ? children : <AppRedirect path="/login"/>;
    }
    return routesWithAuth;
};

export const AppRouter = () => {
    return (
        <RequireAuth routesWithAuth={<MainLayoutRoutes/>}>
            <NotAuthRoutes/>
        </RequireAuth>
    );
}
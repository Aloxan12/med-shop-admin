import React from "react";
import {Navigate, useLocation} from "react-router-dom";
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
    const isAuthenticated = localStorage.getItem("user"); // useAppSelector((state) => state.auth.accessToken);
    const {rehydrated} = {rehydrated: true}// useAppSelector((state) => state.system);
    // const isSameUrl = !!useMatch('login');
    console.log('isAuthenticated', isAuthenticated)
    if (!rehydrated) {
        return null;
    }

    if (!isAuthenticated) {
        return children // : <AppRedirect path="/login"/>;
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
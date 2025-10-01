import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {MainLayoutRoutes} from './MainLayoutRoutes';
import {AppLoader} from '@/shared/ui/AppLoader';
import {LoginPage} from '@/pages/Login';
import {GoogleCallbackPage} from "@/pages/GoogleCallbackPage";

export const NotAuthRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={<AppLoader loaderType="main"/>}>
                        <MainLayoutRoutes/>
                    </Suspense>
                }
            />
            <Route
                path="/login"
                element={
                    <Suspense fallback={<AppLoader loaderType="main"/>}>
                        <LoginPage/>
                    </Suspense>
                }
            />
            <Route
                path="/google-callback"
                element={
                    <Suspense fallback={<AppLoader loaderType="main"/>}>
                        <GoogleCallbackPage/>
                    </Suspense>
                }
            />
        </Routes>
    );
};

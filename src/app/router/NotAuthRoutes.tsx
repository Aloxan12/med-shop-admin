import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayoutRoutes } from './MainLayoutRoutes';
import { AppLoader } from '@/shared/ui/AppLoader';
import { LoginPage } from '@/pages/Login';

export const NotAuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<AppLoader loaderType="main" />}>
            <MainLayoutRoutes />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<AppLoader loaderType="main" />}>
            <LoginPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

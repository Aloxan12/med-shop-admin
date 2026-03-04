import { Suspense } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { AppLoader } from "@/shared/ui/AppLoader";
import { LoginPage } from "@/pages/Login";
import { GoogleCallbackPage } from "@/pages/GoogleCallbackPage";

export const NotAuthRoutes = () => {
  const [searchParams] = useSearchParams();

  const chatId = searchParams.get("chat_id");
  const chatIdQuery = chatId ? `?chat_id=${chatId}` : "";
  return (
    <Routes>
      {/*<Route*/}
      {/*  path="/*"*/}
      {/*  element={*/}
      {/*    <Suspense fallback={<AppLoader loaderType="main" />}>*/}
      {/*      <MainLayoutRoutes />*/}
      {/*    </Suspense>*/}
      {/*  }*/}
      {/*/>*/}
      <Route
        index
        path="/login"
        element={
          <Suspense fallback={<AppLoader loaderType="main" />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="/google-callback"
        element={
          <Suspense fallback={<AppLoader loaderType="main" />}>
            <GoogleCallbackPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={<Navigate to={`/login${chatIdQuery}`} replace />}
      />
    </Routes>
  );
};

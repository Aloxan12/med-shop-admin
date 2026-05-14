import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/app/router/AppRouter.tsx";
import { QueryProvider } from "@/app/providers/QueryProvider.tsx";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import "./shared/styles/global.scss";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryProvider>
          <AppRouter />
          <Toaster position="top-right" />
        </QueryProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

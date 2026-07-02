import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import AuthProvider from "./component/context/ContextProvider.jsx";

import "./index.css";

import RouterConfig from "./config/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterConfig />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  </StrictMode>,
);

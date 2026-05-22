import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import RouterConfig from "./config/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterConfig />
  </StrictMode>,
);

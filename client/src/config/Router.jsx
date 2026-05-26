import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [
  { path: "/", element: <LandingPage /> },

  { path: "/login", element: <RegisterPage /> },

  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

const routerData = createBrowserRouter(routes);
export default function RouterConfig() {
  return <RouterProvider router={routerData} />;
}

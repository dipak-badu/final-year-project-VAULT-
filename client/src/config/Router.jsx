import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgetPassword from "../pages/ForgetPassword";
const routes = [
  { path: "/", element: <LandingPage /> },

  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/forgot-password", element: <ForgetPassword /> },

  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

const routerData = createBrowserRouter(routes);
export default function RouterConfig() {
  return <RouterProvider router={routerData} />;
}

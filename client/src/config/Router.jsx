import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgetPassword from "../pages/ForgetPassword";
import NewTransaction from "../pages/NewTransaction";
import Dashboard from "../pages/dashboard/Dashboard";
import Transaction from "../pages/dashboard/Transaction";
// import UserDashboard from "../pages/dashboard/UserDashboard";
const routes = [
  { path: "/", element: <LandingPage /> },

  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/forgot-password", element: <ForgetPassword /> },

  {
    path: "/user",
    element: <Dashboard />,
    children: [
      { index: true, element: <Transaction /> },
      { path: "new-transaction", element: <NewTransaction /> },
    ],
  },

  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
];

const routerData = createBrowserRouter(routes);
export default function RouterConfig() {
  return <RouterProvider router={routerData} />;
}

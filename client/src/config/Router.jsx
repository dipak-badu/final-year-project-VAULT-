import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgetPassword from "../pages/ForgetPassword";
import NewTransaction from "../pages/NewTransaction";
import Dashboard from "../pages/dashboard/Dashboard";
import Transaction from "../pages/dashboard/Transaction";
import Overview from "../pages/dashboard/Overview";
// import UserDashboard from "../pages/dashboard/UserDashboard";

import OwnerRoute from "./OwnerRoute";

const routes = [
  { path: "/", element: <LandingPage /> },

  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/forgot-password", element: <ForgetPassword /> },

  {
    path: "/user/:userId",
    element: (
      <OwnerRoute>
        <Dashboard />{" "}
      </OwnerRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "new-transaction", element: <NewTransaction /> },
      { path: "transactions", element: <Transaction /> },
      { path: "budgets", element: <h1>Budgets</h1> },
      { path: "reports", element: <h1>Reports</h1> },
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgetPassword from "../pages/ForgetPassword";
import NewTransaction from "../pages/NewTransaction";
import Dashboard from "../pages/dashboard/Dashboard";
import Transaction from "../pages/dashboard/Transaction";
import Overview from "../pages/dashboard/Overview";
import Budget from "../pages/dashboard/Budget";
// import UserDashboard from "../pages/dashboard/UserDashboard";

import OwnerRoute from "./OwnerRoute";
import { TransactionProvider } from "../component/context/TransactionContext";
import Report from "../pages/dashboard/Report";
import { IncomeProvider } from "../component/context/INcomeContext";
import NotFound from "../pages/error/NotFound";

const routes = [
  { path: "/", element: <LandingPage /> },

  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/forgot-password", element: <ForgetPassword /> },

  {
    path: "/user/:userId",
    element: (
      <OwnerRoute>
        <IncomeProvider>
          <TransactionProvider>
            <Dashboard />
          </TransactionProvider>
        </IncomeProvider>
      </OwnerRoute>
    ),
    children: [
      { index: true, element: <Transaction /> },
      { path: "new-transaction", element: <NewTransaction /> },
      { path: "budgets", element: <Budget /> },
      { path: "reports", element: <Report /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

const routerData = createBrowserRouter(routes);
export default function RouterConfig() {
  return <RouterProvider router={routerData} />;
}

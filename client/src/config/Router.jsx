import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgetPassword from "../pages/ForgetPassword";
import NewTransaction from "../pages/NewTransaction";
// import UserDashboard from "../pages/dashboard/UserDashboard";
const routes = [
  { path: "/", element: <LandingPage /> },

  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },

  { path: "/forgot-password", element: <ForgetPassword /> },

  {
    path: "/user",
    element: <h1>User Dashboard</h1>,
    children: [
      { index: true, element: <h1>User Home</h1> },
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

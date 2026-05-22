import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";

const routes = [
  { path: "/", element: <LandingPage /> },
  {
    path: "*",
    element: (
      <>
        <h1>404 Not Found</h1>
      </>
    ),
  },
];

const routerData = createBrowserRouter(routes);
export default function RouterConfig() {
  return <RouterProvider router={routerData} />;
}

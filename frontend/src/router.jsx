import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

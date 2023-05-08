import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./views/Home";
import CreateForm from "./views/CreateForm";
import FormDetail from "./views/FormDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/forms/create",
        element: <CreateForm />,
      },
      {
        path: "/forms/:slug",
        element: <FormDetail />,
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

import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Home from "./views/Home";
import CreateForm from "./views/CreateForm";
import FormDetail from "./views/FormDetail";
import FormResponse from "./views/FormResponse";
import Forbidden from "./views/Forbidden";
import NotFound from "./views/404NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      {
        path: "/404notfound",
        element: <NotFound />,
      },
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
      {
        path: "/forms/:slug/response",
        element: <FormResponse />,
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

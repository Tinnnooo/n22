import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import "./assets/css/bootstrap.css";
import "./assets/css/style.css";

import "./assets/js/bootstrap";
import "./assets/js/popper";
import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);

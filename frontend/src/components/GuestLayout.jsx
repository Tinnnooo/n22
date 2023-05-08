import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Toast from "./Toast";

export default function GuestLayout() {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Vaccination Platform
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <Outlet />

      <Toast />
    </>
  );
}

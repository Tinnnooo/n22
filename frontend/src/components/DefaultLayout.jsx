import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios";
import Toast from "./Toast";

export default function DefaultLayout() {
  const { currentUser, setCurrentUser, userToken, setToken } =
    useStateContext();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  const onLogout = () => {
    axiosClient.post("/v1/auth/logout").then((res) => {
      setToken(null);
      setCurrentUser({});
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Formify
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

          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  {currentUser.name}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link cursor-pointer"
                  href="#"
                  onClick={(e) => onLogout()}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      <Toast />
    </>
  );
}

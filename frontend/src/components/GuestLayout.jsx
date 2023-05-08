import React from "react";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <>
      <nav class="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
        <div class="container">
          <a class="navbar-brand" href="manage-forms.html">
            Formify
          </a>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

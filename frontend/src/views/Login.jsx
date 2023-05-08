import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function Login() {
  const { currentUser, setToken, setCurrentUser, showToast } =
    useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("v1/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setToken(data.user.accessToken);
      })
      .catch((err) => {
        showToast(err.response.data.message, "red");
      });
  };

  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-center mb-4">Formify</h1>
              <div className="card card-default">
                <div className="card-body">
                  <h3 className="mb-3">Login</h3>

                  <form method="post" onSubmit={onSubmit}>
                    <div className="form-group my-3">
                      <label htmlFor="email" className="mb-1 text-muted">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="password" className="mb-1 text-muted">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="mt-4">
                      <button className="btn btn-primary">Login</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React, { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const { showToast } = useStateContext();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [allowed_domains, setAllowedDomains] = useState("");
  const [description, setDescription] = useState("");
  const [limit_one_response, setLimitOneResponse] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault(0);

    // Convert allowed_domains to an array
    let domainsArray = "";
    if (allowed_domains) {
      domainsArray = allowed_domains.split(",").map((domain) => domain.trim());
    }

    axiosClient
      .post("v1/forms", {
        name,
        slug,
        allowed_domains: domainsArray || [],
        description,
        limit_one_response,
      })
      .then(({ data }) => {
        showToast(data.message);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setError(err.response.data.errors);
        }
        showToast(err.response.data.message, "red");
      });
  };

  return (
    <main>
      <header
        className="jumbotron p-3 fade-in-down2"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="container">
          <h1 className="display-4">Create new form</h1>
        </div>
      </header>

      <div className="container">
        <form className="mb-5" method="post" onSubmit={onSubmit}>
          <div
            className="form-group fade-in-down2"
            style={{ animationDelay: "0.3s" }}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && <small className="text-danger">{error.name}</small>}
          </div>
          <div
            className="form-group fade-in-down2"
            style={{ animationDelay: "0.5s" }}
          >
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              className="form-control"
              id="slug"
              placeholder="example: slug-slug"
              name="slug"
              onChange={(e) => setSlug(e.target.value)}
            />
            {error.slug && <small className="text-danger">{error.slug}</small>}
          </div>
          <div
            className="form-group fade-in-down2"
            style={{ animationDelay: "0.7s" }}
          >
            <label htmlFor="allowed_domains">Allowed Domains</label>
            <input
              type="text"
              className="form-control"
              id="allowed_domains"
              placeholder="example: webtech.id, worldskills.org"
              name="allowed_domains"
              onChange={(e) => setAllowedDomains(e.target.value)}
            />
          </div>
          <div
            className="form-group fade-in-down2"
            style={{ animationDelay: "0.9s" }}
          >
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div
            className="custom-control custom-checkbox fade-in-down2"
            style={{ animationDelay: "1s" }}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id="limit_one_response"
              name="limit_one_response"
              checked={limit_one_response}
              onChange={(e) => setLimitOneResponse(e.target.checked)}
            />
            <label
              className="custom-control-label"
              htmlFor="limit_one_response"
            >
              Limit one response
            </label>
          </div>
          <button
            className="btn btn-primary rounded mt-4 fade-in-down2"
            style={{ animationDelay: "1.1s" }}
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </main>
  );
}

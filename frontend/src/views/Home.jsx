import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormListItem from "../components/FormListItem";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function Home() {
  const { forms, setForms } = useStateContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("v1/forms")
      .then(({ data }) => {
        setForms(data.forms);
        setLoading(false);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between px-5 py-5 fade-in-down2"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="shadow-lg">
          <h1 className="text-primary">My Forms</h1>
        </div>

        <Link to="/forms/create" className="btn btn-md bg-primary rounded">
          <span className="text-white font-weight-bold">Create form</span>
        </Link>
      </div>
      <div className="d-flex flex-column flex-md-row p-2 gap-4 px-sm-5 align-items-center justify-content-center ">
        {loading && (
          <div className="text-center font-weight-bold h4">Loading...</div>
        )}
        {!loading && (
          <div
            className="list-group w-100 fade-in-down2"
            style={{ animationDelay: "0.4s" }}
          >
            {forms.length === 0 && (
              <div className="text-center">
                <strong>You don't have any form.</strong>
              </div>
            )}
            {forms.length > 0 &&
              forms.map((form) => <FormListItem key={form.id} form={form} />)}
          </div>
        )}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";

export default function ResponseItem({ slug }) {
  const { responses, setResponses } = useStateContext();
  const [loading, setLoading] = useState(false);
  const { showToast } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`v1/forms/${slug}/responses`)
      .then(({ data }) => {
        setResponses(data.responses);
        setLoading(false);
      })
      .catch((err) => {
        showToast(err.response.data.message, "red");
        if (err.response.status === 403) {
          navigate("/forbidden");
        } else if (err.response.status === 404) {
          navigate("/404notfound");
        }
      });
  }, []);

  return (
    <>
      {loading && (
        <div className="text-center">
          <strong>Loading...</strong>
        </div>
      )}
      {!loading && (
        <>
          <div
            className="d-flex justify-content-between fade-in-down2"
            style={{ animationDelay: "0.4s" }}
          >
            <h4 className="text-success">Response</h4>
            <strong>Total Response: {responses.length}</strong>
          </div>
          <table className="w-100 table table-bordered">
            <thead>
              <tr className="fade-in-down2" style={{ animationDelay: "0.6s" }}>
                <th scope="col">Date</th>
                <th scope="col">User</th>
                <th scope="col">Answers</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr
                  key={index}
                  scope="row"
                  className="fade-in-down2"
                  style={{ animationDelay: "0.8s" }}
                >
                  <td style={{ verticalAlign: "middle" }}>{response.date}</td>
                  <td style={{ verticalAlign: "middle" }}>
                    {response.user.name}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {Object.entries(response.answers).map(([key, value]) => (
                      <li className="list-group-item" key={key}>
                        <strong>{key}: </strong>
                        {value}
                      </li>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

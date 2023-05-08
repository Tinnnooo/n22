import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import QuestionListItem from "../components/QuestionListItem";

export default function FormDetail() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState({});
  const { slug } = useParams();
  const { showToast } = useStateContext();
  const [url, setUrl] = useState("");
  const link = window.location.origin + `/forms/${slug}`;

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`v1/forms/${slug}`)
      .then(({ data }) => {
        setForm(data.form);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setUrl(link);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    showToast("Link copied.");
  };

  return (
    <>
      {loading && (
        <div className="text-center font-weight-bold mt-4">Loading...</div>
      )}
      {!loading && (
        <div>
          <div className="container">
            <div className="border-bottom border-dark mt-5 shadow p-3">
              <div className=" d-flex justify-content-between w-100">
                <h3>{form.name}</h3>
                <div className="d-flex w-50">
                  <input
                    type="text"
                    name="url"
                    className="mx-5 col-lg-8 col-md-6"
                    value={url}
                    readOnly
                  />
                  <button
                    className="btn-sm btn-warning rounded font-weight-bold col-lg-2 col-md-3"
                    onClick={copyLink}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="mt-4 mb-4">
                <h5>{form.description}</h5>
              </div>
            </div>

            <div className="border-top border-dark py-4">
              <div className="d-flex justify-content-between">
                <h4 className="text-secondary">Questions</h4>
                <button type="button" className="btn btn-success">
                  Add Question
                </button>
              </div>
              {form.questions &&
                form.questions.map((q, ind) => (
                  <QuestionListItem key={ind} question={q} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

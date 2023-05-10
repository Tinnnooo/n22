import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import QuestionsItem from "../components/QuestionsItem";
import ResponseItem from "../components/ResponseItem";

export default function FormDetail() {
  const [loading, setLoading] = useState(false);
  const { choiceTypes } = useStateContext();
  const [form, setForm] = useState({});
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [choice_type, setChoiceType] = useState("short answer");
  const [choices, setChoices] = useState([]);
  const [is_required, setIsRequired] = useState(false);
  const [field, setField] = useState([]);
  const { showToast } = useStateContext();
  const [url, setUrl] = useState("");
  const link = window.location.origin + `/forms/${slug}/response`;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`v1/forms/${slug}`)
      .then(({ data }) => {
        setForm(data.form);
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
    setUrl(link);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    showToast("Link copied.");
  };

  function shouldHaveOptions(type = null) {
    type = type || choice_type;
    return ["multiple choice", "dropdown", "checkboxes"].includes(type);
  }

  function onTypeChange(e) {
    setChoiceType(e.target.value);
    if (!shouldHaveOptions() && shouldHaveOptions(e.target.value)) {
      setField([field.length + 1]);
      setChoices([...choices, ""]);
    }
  }

  function addChoices() {
    setField([...field, field.length + 1]);
    setChoices([...choices, ""]);
  }

  function deleteChoice(index) {
    const updatedField = field.filter((_, i) => i !== index);
    setField(updatedField);

    const updatedChoices = [...choices];
    updatedChoices.splice(index, 1);
    setChoices(updatedChoices);
  }

  function resetDefault() {
    setName("");
    setChoiceType("short answer");
    setChoices([]);
    setIsRequired(false);
    setField([]);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(choices);
    const newChoices = choices.filter((choice) => choice.trim() !== "");

    axiosClient
      .post(`v1/forms/${slug}/questions`, {
        name,
        choice_type,
        choices: newChoices,
        is_required,
      })
      .then(({ data }) => {
        showToast(data.message);
        resetDefault();

        setForm((prevForm) => {
          return {
            ...prevForm,
            questions: [...prevForm.questions, data.question],
          };
        });
      })
      .catch((err) => {
        showToast(err.response.data.message, "red");
      });
  };

  const deleteQuestion = (id) => {
    axiosClient
      .delete(`v1/forms/${slug}/questions/${id}`)
      .then(({ data }) => {
        showToast(data.message);

        setForm((prevForm) => {
          const updatedQuestions = prevForm.questions.filter(
            (question) => question.id !== id
          );
          return { ...prevForm, questions: updatedQuestions };
        });
      })
      .catch((err) => {
        showToast(err.response.data.message, "red");
      });
  };

  return (
    <>
      {loading && (
        <div className="text-center font-weight-bold mt-4">Loading...</div>
      )}
      {!loading && (
        <div>
          <div className="container">
            <div
              className="border-bottom border-dark mt-5 shadow py-3 fade-in-down2"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="d-flex justify-content-between w-100 ">
                <h3
                  className="fade-in-down2"
                  style={{ animationDelay: "0.3s" }}
                >
                  {form.name}
                </h3>
                <div className="d-lg-flex d-md-flex w-50 justify-content-between d-sm-block w-25 h-100">
                  <input
                    type="text"
                    name="url"
                    className="d-lg-flex d-md-flex mx-5 col-lg-8 d-none col-md-6 d-sm-none fade-in-down2"
                    style={{ animationDelay: "0.4s" }}
                    value={url}
                    readOnly
                  />
                  <button
                    className="btn-sm btn-warning rounded font-weight-bold col-lg-2 col-md-3 col-sm-7 col-xs-1 col-8 fade-in-down2"
                    style={{ animationDelay: "0.5s" }}
                    onClick={copyLink}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
            <div
              className="d-flex flex-column fade-in-down2"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="mt-4 mb-4">
                <p>{form.description}</p>
              </div>
            </div>

            <div
              className="d-flex border border-dark mb-3 p-3 fade-in-down2"
              style={{ animationDelay: "0.6s" }}
            >
              <QuestionsItem
                questions={form.questions}
                onDelete={deleteQuestion}
              />
            </div>

            <div
              className="border border-dark p-3 mb-3 fade-in-down2"
              style={{ animationDelay: "0.7s" }}
            >
              <form method="post" onSubmit={onSubmit}>
                <div
                  className="d-flex justify-content-end fade-in-down2"
                  style={{ animationDelay: "0.4s" }}
                >
                  <button className="btn btn-success">Save Question</button>
                </div>

                <div
                  className="d-flex gap-3 justify-content-between mb-3 align-items-center mt-2 fade-in-down2"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="w-75">
                    <label htmlFor="name" className="d-block text-dark h4">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      className="mt-1 d-block rounded-md w-100 shadow-md py-1 px-3"
                      value={name}
                      onInput={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="w-25 d-flex flex-wrap justify-content-end">
                    <label
                      htmlFor="choiceType"
                      className="d-block w-75 text-dark"
                    >
                      Choice Type
                    </label>

                    <select
                      name="choice_type"
                      id="choice_type"
                      className="mt-1 d-block w-75 rounded-md bg-white py-1 px-3 shadow"
                      onChange={onTypeChange}
                      value={choice_type}
                    >
                      {choiceTypes.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  className="d-flex form-check fade-in-down2"
                  style={{ animationDelay: "0.6s" }}
                >
                  <input
                    type="checkbox"
                    id="is_required"
                    name="is_required"
                    className="form-check-input"
                    checked={is_required}
                    onChange={(e) => setIsRequired(e.target.checked)}
                  />
                  <label htmlFor="is_required" className="form-check-label">
                    Is Required
                  </label>
                </div>

                <div>
                  {shouldHaveOptions() && (
                    <div
                      className="fade-in-down2"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <h4 className="h6 mb-1 d-flex justify-content-between align-items-center ">
                        Choices
                        <button
                          onClick={addChoices}
                          type="button"
                          className="d-flex align-items-center btn btn-sm py-1 px-2 rounded btn-primary text-white"
                        >
                          Add
                        </button>
                      </h4>

                      {field.length === 0 && (
                        <div className="text-secondary text-center py-3">
                          You don't have any options defined
                        </div>
                      )}

                      {field.length > 0 && (
                        <div>
                          {field.map((num, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center mb-1 mt-2"
                            >
                              <input
                                type="text"
                                value={choices[index]}
                                onInput={(e) => {
                                  const updatedChoices = [...choices];
                                  updatedChoices[index] = e.target.value;
                                  setChoices(updatedChoices);
                                }}
                                className="w-100 rounded-sm py-1 px-2 border"
                              />

                              <button
                                onClick={(e) => deleteChoice(index)}
                                type="button"
                                className="btn btn-danger d-flex align-items-center justify-content-center border border-transparent"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div
              className="border border-dark p-3 fade-in-down2"
              style={{ animationDelay: "1s" }}
            >
              <ResponseItem slug={slug} />
            </div>
          </div>
        </div>
      )}
      <hr />
    </>
  );
}

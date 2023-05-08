import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import QuestionListItem from "../components/QuestionListItem";

export default function FormDetail() {
  const [loading, setLoading] = useState(false);
  const { choiceTypes } = useStateContext();
  const [form, setForm] = useState({});
  const { slug } = useParams();
  const [choice_type, setChoiceType] = useState("short answer");
  const [choices, setChoices] = useState([]);
  const [field, setField] = useState([]);
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

  function shouldHaveOptions(type = null) {
    type = type || choice_type;
    return ['multiple choice', 'dropdown', 'checkboxes'].includes(type);
  }

  function onTypeChange(e) {
    setChoiceType(e.target.value);
    if (!shouldHaveOptions() && shouldHaveOptions(e.target.value)) {
      field.push(1);
    }
  }

  function addChoices() {

  }

  return (
    <>
      {loading && (
        <div className="text-center font-weight-bold mt-4">Loading...</div>
      )}
      {!loading && (
        <div>
          <div className="container">
            <div className="border-bottom border-dark mt-5 shadow py-3">
              <div className="d-flex justify-content-between w-100 ">
                <h3>{form.name}</h3>
                <div className="d-lg-flex d-md-flex w-50 justify-content-between d-sm-block w-25 h-100">
                  <input
                    type="text"
                    name="url"
                    className="d-lg-flex d-md-flex mx-5 col-lg-8 d-none col-md-6 d-sm-none"
                    value={url}
                    readOnly
                  />
                  <button
                    className="btn-sm btn-warning rounded font-weight-bold col-lg-2 col-md-3 col-sm-7 col-xs-1 col-8"
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

            <div className="border border-dark p-3">
              <div className="d-flex justify-content-between">
                <h4 className="text-success">Questions</h4>
                <button type="button" className="btn btn-success">
                  Add Question
                </button>
              </div>

              <div className="d-flex gap-3 justify-content-between mb-3 align-items-center">
                <div className="w-75">
                  <label htmlFor="name" className="d-block text-dark h4">Name</label>
                  <input type="text" id="name" name="name" placeholder="Name" className="mt-1 d-block rounded-md w-100 shadow-md py-2 px-3" />
                </div>

                <div className="w-25">
                  <label htmlFor="choiceType" className="d-block text-sm w-100 h4 text-dark">Choice Type</label>

                  <select name="choice_type" id="choice_type" className="mt-1 d-block w-100 rounded-md bg-white py-2 px-3 shadow" onChange={onTypeChange} value={choice_type}>
                    {choiceTypes.map((type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                {shouldHaveOptions() &&
                  <div>
                    <h4 className="h6 mb-1 d-flex justify-content-between align-items-center ">
                      Choices

                      <button onClick={addChoices} type="button" className="d-flex align-items-center btn btn-sm py-1 px-2 rounded btn-primary text-white">
                        Add
                      </button>
                    </h4>

                    {field.length === 0 &&
                      <div className="text-xs text-gray-600 text-center py-3">
                        You don't have any options defined
                      </div>
                    }

                    {field.length > 0 &&
                      <div>
                        {field.map((num, index) => (
                          <div key={index} className="flex items-center mb-1">
                            <input type="text" value={choices || ''} onInput={e => choices.push(e.target.value)} className="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus: border-indigo-500" />

                            <button onClick={e => deleteOption(index)} type="button" className="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100">
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    }

                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      )}
      <hr />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios";
import FormResponseQuestion from "../components/FormResponseQuestion";

export default function FormResponse() {
  const answers = [];
  const [form, setForm] = useState({});
  const { showToast } = useStateContext();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [surveyFinished, setSurveyFinished] = useState(false);

  useEffect(() => {
    axiosClient
      .get(`v1/forms/${slug}`)
      .then(({ data }) => {
        setForm(data.form);
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

  function answerChanged(question, value) {
    const existingAnswer = answers.find(
      (answer) => answer.question_id === question.id
    );

    if (existingAnswer) {
      existingAnswer.value = value;
    } else {
      const answer = {
        question_id: question.id,
        value: value,
      };
      answers.push(answer);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .post(`v1/forms/${slug}/responses`, {
        answers,
      })
      .then(({ data }) => {
        showToast(data.message);
        setSurveyFinished(true);
      })
      .catch((err) => {
        showToast(err.response.data.message, "red");
      });
  };

  return (
    <>
      <form
        className="container mx-auto col-7"
        onSubmit={onSubmit}
        method="post"
      >
        <div className="d-grid">
          <div className="">
            <h1 className="my-3">{form.name}</h1>
            <p className="text-secondary h6 mb-4">{form.description}</p>
          </div>
        </div>

        {surveyFinished && (
          <div className="py-8 px-6 h4 text-center">Thank you for answers</div>
        )}

        {!surveyFinished && (
          <>
            <div>
              {form.questions &&
                form.questions.map((question, index) => (
                  <FormResponseQuestion
                    question={question}
                    key={index}
                    index={index}
                    answerChanged={(val) => answerChanged(question, val)}
                  />
                ))}
              <button className="d-flex btn btn-primary justify-content-center py-2 px-4 border border-transparent shadow-sm rounded text-white font-weight-bold mt-4">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

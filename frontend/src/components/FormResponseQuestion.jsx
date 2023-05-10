import React from "react";

export default function FormResponseQuestion({
  question,
  index,
  answerChanged,
}) {
  const choices = question.choices.split(",");

  let selectedOptions = "";

  function onCheckboxChange(choice, $event) {
    if ($event.target.checked) {
      selectedOptions += (selectedOptions.length > 0 ? ", " : "") + choice;
    } else {
      selectedOptions = selectedOptions
        .replaceAll(choice + ", ", "")
        .replaceAll(", " + choice, "");
      if (selectedOptions === choice) {
        selectedOptions = "";
      }
    }
    answerChanged(selectedOptions);
  }
  return (
    <>
      <fieldset className="mb-4">
        <div>
          <legend className="h4">
            {index + 1}. {question.name}
          </legend>
        </div>

        <div className="mt-3">
          {question.choice_type === "dropdown" && (
            <div>
              <select
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 d-block w-100 py-2 px-3 border border-secondary bg-white rounded shadow-sm"
              >
                <option value="">Please Select</option>
                {choices.map((choice, index) => (
                  <option key={index} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </div>
          )}

          {question.choice_type === "multiple choice" && (
            <div>
              {choices.map((choice, index) => (
                <div key={index} className="d-flex align-items-center p-1">
                  <input
                    type="radio"
                    name={"question" + question.id}
                    value={choice}
                    onChange={(e) => answerChanged(e.target.value)}
                  />
                  <label htmlFor={question.id} className="ml-3 d-block">
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.choice_type === "checkboxes" && (
            <div>
              {choices.map((choice, index) => (
                <div key={index} className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id={index}
                    onChange={(e) => onCheckboxChange(choice, e)}
                    className="border border-secondary rounded p-1"
                  />
                  <label htmlFor={index} className="ml-3 d-block">
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.choice_type === "short answer" && (
            <div>
              <input
                type="text"
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 d-block w-100 border border-secondary shadow rounded p-1"
              />
            </div>
          )}
          {question.choice_type === "paragraph" && (
            <div>
              <textarea
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 d-block w-100 shadow rounded border border-secondary"
              ></textarea>
            </div>
          )}
          {question.choice_type === "date" && (
            <div>
              <input
                type="date"
                onChange={(e) => answerChanged(e.target.value)}
                className="mt-1 d-block w-100 shadow border border-secondary rounded p-1"
              />
            </div>
          )}
        </div>
      </fieldset>
      <hr className="mb-4" />
    </>
  );
}

import React from "react";

export default function QuestionsListItem({ question, onDelete }) {
  return (
    <>
      <div
        className="row align-items-center mb-2 fade-in-down2"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="col py-1">{question.name}</div>
        <div className="col py-1">{question.choice_type}</div>
        <div className="col py-1">{question.choices || "-"}</div>
        <div className="col-2">
          <button
            className="btn btn-sm btn-danger"
            onClick={(e) => onDelete(question.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

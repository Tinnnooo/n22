import React from "react";
import QuestionsListItem from "./QuestionsListItem";

export default function QuestionsItem({ questions, onDelete }) {
  return (
    <div className="flex-1 w-100">
      <h4
        className="text-success fade-in-down2"
        style={{ animationDelay: "0.4s" }}
      >
        Questions
      </h4>
      <div className="container w-100 p-2">
        <div
          className="row font-weight-bold mb-3 bg-secondary text-white fade-in-down2"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="col">Name</div>
          <div className="col">Choice Type</div>
          <div className="col">Choice</div>
          <div className="col-2">Action</div>
        </div>
        {questions && questions.length === 0 && (
          <div
            className="text-center fade-in-down2"
            style={{ animationDelay: "0.6s" }}
          >
            <strong>You don't have any question</strong>
          </div>
        )}
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => (
            <QuestionsListItem
              key={index}
              question={question}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  );
}

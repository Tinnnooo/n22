import React from "react";

export default function QuestionListItem() {
  return (
    <>
      <div>
        <div className="flex justify-between mb-3">
          <h4>1</h4>

          <div className="flex items-center"></div>
        </div>

        <div className="flex gap-3 justify-between mb-3">
          {/* Question text */}
          <div className="flex-1">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>

            <input
              type="text"
              name="question"
              id="question"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Question type */}
          <div>
            <label
              htmlFor="questionType"
              className="block text-sm font-medium text-gray-700 w-40"
            >
              Question Type
            </label>

            <select
              name="questionType"
              id="questionType"
              className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            ></select>
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label
            htmlFor="questionDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            name="questionDescription"
            id="questionDescription"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div></div>
      </div>
      <hr />
    </>
  );
}

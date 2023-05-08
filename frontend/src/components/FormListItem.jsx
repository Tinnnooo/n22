import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function FormListItem({ form }) {
  const { showToast } = useStateContext();
  const copyLink = () => {
    const link = window.location.origin + `/forms/${form.slug}`;
    navigator.clipboard.writeText(link);
    showToast("Link copied.");
  };
  return (
    <div className="list-group-item list-group-item-action d-flex">
      <div className="d-flex justify-content-between w-100">
        <Link
          to={`/forms/${form.slug}`}
          className="w-100 link"
          aria-current="true"
        >
          <div>
            <h6 className="mb-0">{form.name}</h6>
            <p className="mb-0">{form.description}</p>
          </div>
        </Link>
        <button
          className="btn-sm btn-warning rounded font-weight-bold col-lg-1 col-sm-2 align-center"
          onClick={copyLink}
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}

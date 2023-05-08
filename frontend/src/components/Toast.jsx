import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function Toast() {
  const { toast } = useStateContext();
  return (
    <>
      {toast.show && (
        <div
          className={`toast-message ${
            toast.color === "red" ? "bg-danger" : "bg-success"
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

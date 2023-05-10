import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  choiceTypes: [],
  toast: {
    message: "",
    show: false,
  },
  forms: [],
  responses: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [choiceTypes] = useState([
    "short answer",
    "paragraph",
    "date",
    "multiple choice",
    "dropdown",
    "checkboxes",
  ]);
  const [toast, setToast] = useState({ message: "", show: false, color: "" });
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState([]);

  const showToast = (message, color) => {
    setToast({ message: message, show: true, color: color });
    setTimeout(() => {
      setToast({ message: "", show: false, color: "" });
    }, 3000);
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken", token);
    }
    setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setToken,
        forms,
        setForms,
        toast,
        showToast,
        choiceTypes,
        responses,
        setResponses,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

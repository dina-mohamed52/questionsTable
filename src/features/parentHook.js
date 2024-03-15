import React, { createContext, useContext, useState } from "react";

// Define the context
const ParentContext = createContext();

// Export the context for use in other components
export const useParentContext = () => useContext(ParentContext);

// Define the provider component
export const ParentProvider = ({ children }) => {
  const [parentQuestion, setParentQuestion] = useState("");
  const [parentChoice, setParentChoice] = useState("");
  const [rows, setRows] = useState([
    {
      // Date.now()
      id:0 ,
      question: "",
      selectedType: "",
      parentQuestion: "",
      choice: [],
      inputs:[],
      selectedStage: "",
      checked: false,
      file: null,
    },
  ]);

  const value = {
    rows,
    setRows,
    parentQuestion,
    setParentQuestion,
    parentChoice,
    setParentChoice,
  };

  return (
    <ParentContext.Provider value={value}>{children}</ParentContext.Provider>
  );
};

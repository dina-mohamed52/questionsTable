import React, { useEffect, useState } from "react";
import { CustomSelect } from "../ui/DropDown";
import { FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { useParentContext } from "./parentHook";


function TableCell({ row, deleteRow, index, handleMoveDown, handleMoveUp }) {
 
  const [question, setQuestion] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [checked, setChecked] = useState(false);
  const [choice, setChoice] = useState("");
  const [file, setFile] = useState(null);
  const [inputs, setInputs] = useState([{ id: 0, value: "" }]);

  const {
    parentQuestion,

    rows,
    setRows,
  } = useParentContext();

  
  useEffect(() => {
    // Update the row object in the parent component whenever the local state variables change
    setRows((prevRows) =>
      prevRows.map((prevRow) =>
        prevRow.id === row.id
          ? {
              ...prevRow,
              question,
              selectedType,
              selectedStage,
              checked,
              choice,
              inputs,
              file,
            }
          : prevRow
      )
    );
  }, [
    question,
    selectedType,
    selectedStage,
    checked,
    inputs,
    choice,
    file,
    row.id,
    setRows,
  ]);
  const options = [
    { label: "Essay", value: "essay" },
    { label: "Single Choice", value: "single_choice" },
    { label: "Multi Choice", value: "multi_choice" },
  ];

  const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length, value: "" }]);
  };

  const handleInputChange = (idx, value) => {
    const newInputs = [...inputs];
    newInputs[idx].value = value;
    setInputs(newInputs);

    // setParentChoice(value);
  };

  const handleInputDelete = (idx) => {
    const newInputs = inputs.filter((_, index) => index !== idx);
    setInputs(newInputs);
  };

  const handleDelete = (index) => {
    deleteRow(index);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  
  /////////////////////////////////////////////////////////////
  const handleSupquestion = (id, choice) => {
    const idx = rows.findIndex((row) => row.id === id);
    // Find the index of the current row
    setChoice(choice);
    if (idx >= 0) {
      const newQuestion = {
        id: Date.now(),
        question: "",
        selectedType: "",
        choice: choice, // Use the choice value passed from the current row
        inputs: [],
        selectedStage: "",
        parentQuestion: row.question,
        checked: false,
        file: null,
      };
      const newRows = [...rows];
      newRows.splice(idx + 1, 0, newQuestion); // Insert the new question after the current row
      setRows(newRows);
    }
  };

  // console.log("afterwww", rows);
  // console.log("cccc", choice);

  
  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="py-2 px-4 border">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </td>
        <td className="py-2 px-4 border">
          <CustomSelect
            options={options}
            name="Type"
            value={selectedType}
            onChange={(option) => setSelectedType(option)}
          />
        </td>
        <td className="py-2 px-4 border">
          {(selectedType === "single_choice" ||
            selectedType === "multi_choice") &&
            inputs.map((input, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  type="text"
                  value={input.value}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  className="w-full mb-2 mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
                <span
                  onClick={() => handleInputDelete(idx)}
                  className="mb-3 cursor-pointer"
                >
                  <FaRegTrashAlt style={{ color: "red" }} />
                </span>
                {selectedType === "single_choice" && (
                  <span
                    onClick={() => handleSupquestion(row.id, input.value)}
                    className="mb-3 cursor-pointer"
                  >
                    <FaPlus style={{ color: "LightGray" }} />
                  </span>
                )}
              </div>
            ))}
          {(selectedType === "single_choice" ||
            selectedType === "multi_choice") && (
            <button
              onClick={handleAddInput}
              className="bg-green-500 text-white w-[8.5rem] rounded-md py-2 px-4 cursor-pointer mt-2"
            >
              Add Choice
            </button>
          )}
        </td>
        <td className="py-2 px-4 border">
          <CustomSelect
            options={[
              { label: "Open", value: "open" },
              { label: "Action", value: "action" },
              { label: "Close", value: "close" },
            ]}
            name="Stage"
            value={selectedStage}
            onChange={(option) => {
              console.log("Selected Stage:", option);
              setSelectedStage(option);
            }}
          />
        </td>

        <td className="py-2 px-2 w-[12rem] border">
          {row.parentQuestion ? (
            <div className="flex flex-col items-start">
              <h1 className="text-sn text-gray-600">
                Parent Question: {row.parentQuestion}
              </h1>
              <p className="text-sm text-gray-600">
                Choice:{" "}
                {rows.find((r) => r.question === row.parentQuestion)?.choice}
              </p>
            </div>
          ) : (
            <h1 className="text-gray-700">No Parent Question</h1>
          )}
        </td>
        <td className="py-2 px-4 border">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="h-4 w-4"
          />
          {checked && (
            <div>
              <label
                htmlFor={`file-input-${index}`}
                className="block bg-green-500 text-white w-[8.5rem] rounded-md py-2 px-4 cursor-pointer"
              >
                Choose File
              </label>
              <input
                id={`file-input-${index}`}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
        </td>
        <td className="py-2 px-4 border">
          <button
            onClick={() => handleDelete(index)}
            className="py-1 px-2 w-[8.5rem] bg-red-500 text-white rounded-md focus:outline-none focus:ring focus:ring-red-200"
          >
            Delete Question
          </button>
        </td>
        <td className="py-2 px-4 border">
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleMoveUp(index)}
              className={`px-1 py-1 bg-${
                index === 0 ? "blue" : "blue"
              }-500 text-white rounded-md mb-1 focus:outline-none focus:ring focus:ring-blue-200`}
            >
              &and;
            </button>

            <button
              onClick={() => handleMoveDown(index)}
              className="px-1 py-1 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              &or;
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan={8}></td>
      </tr>
    </>
  );
}

export default TableCell;

import React from "react";
import TableCell from "./TableCell";
import { useParentContext } from "./parentHook";

function Table({ selectedStageF }) {
  const {
    rows,
    setRows,
  } = useParentContext();

  const handleAddNewRow = () => {
    const newRow = {
      id: Date.now(),
      question: "",
      selectedType: "",
      choice: [],
      inputs:[],
      selectedStage: "",
      parentQuestion: "",
      checked: false,
      file: null,
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleMoveUp = (id) => {
    const index = rows.findIndex((row) => row.id === id);
    if (index > 0 && !rows[index].parentQuestion) {
      const newRows = [...rows];
      const temp = newRows[index];
      newRows[index] = newRows[index - 1];
      newRows[index - 1] = temp;
      setRows(newRows);
    }
  };

  const handleMoveDown = (id) => {
    const index = rows.findIndex((row) => row.id === id);
    if (index < rows.length - 1 && !rows[index].parentQuestion) {
      const newRows = [...rows];
      const temp = newRows[index];
      newRows[index] = newRows[index + 1];
      newRows[index + 1] = temp;
      setRows(newRows);
    }
  };
  // console.log(rows)
 const filteredRows = selectedStageF
   ? rows.filter((row) => row.selectedStage === selectedStageF)
   : rows;
     

  
  return (
    <div className="mx-4">
      <table className="min-w-full divide-y divide-gray-200 border-collapse rounded-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 ml-4 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Question
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Type
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Choices
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Stage
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Parent Question
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Attach File
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Delete
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider border">
              Sort
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <TableCell
            
              key={ row.id }
              row={row}
              index={row.id}
              deleteRow={() => deleteRow(row.id)}
              handleMoveDown={() => handleMoveDown(row.id)}
              handleMoveUp={() => handleMoveUp(row.id)}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
          onClick={handleAddNewRow}
        >
          Add new Question
        </button>
      </div>
    </div>
  );
}

export default Table;

import React, { useState } from "react";
import "./App.css";
import Table from "./features/Table";
import { CustomSelect } from "./ui/DropDown";
import { ParentProvider } from "./features/parentHook";

function App() {
  const [selectedStageF, setSelectedStageF] = useState("");

  const handleChange = (value) => {
    setSelectedStageF(value === "all" ? "" : value);
  };

  return (
    <div className="flex flex-col items-end mr-[2rem] mt-[1.5rem]">
      <CustomSelect
        options={[
          { label: "Open", value: "open" },
          { label: "Action", value: "action" },
          { label: "Close", value: "close" },
          { label: "All", value: "all" },
        ]}
        name="Stage"
        value={selectedStageF}
        onChange={handleChange}
        className="mt-2 self-end mr-[2rem]"
      />
      <div className="mt-8">
        <ParentProvider>
          <Table selectedStageF={selectedStageF} />
        </ParentProvider>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ParentProvider } from "./features/parentHook";
// import { createRoot } from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ParentProvider>
      <App />
    </ParentProvider>
  </React.StrictMode>
);

reportWebVitals();

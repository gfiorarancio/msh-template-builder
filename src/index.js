import React from "react";
import ReactDOM from "react-dom/client";
import TemplateBuilder from "./components/ui/template-builder";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TemplateBuilder />
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";
import "materialize-css"; // It installs the JS asset only
import "materialize-css/dist/css/materialize.min.css";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

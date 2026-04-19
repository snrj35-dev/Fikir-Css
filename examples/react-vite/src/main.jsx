import React from "react";
import { createRoot } from "react-dom/client";
import "fikir-css/css";
import "fikir-css/themes/compact";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

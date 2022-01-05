import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./helpers/i18n";
import "react-mde/lib/styles/css/react-mde-all.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import "./helpers/i18n";
import "react-mde/lib/styles/css/react-mde-all.css";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

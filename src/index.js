import React from "react";
import ReactDOM from "react-dom";

import App from "./routes/App/App";
import "./index.css";
import Store from "./redux/categories/store";

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);

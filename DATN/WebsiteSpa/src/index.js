import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { DataProvider } from "./Components/GlobalState";
ReactDOM.render(
  <BrowserRouter>   
      <DataProvider>
        <App />
      </DataProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
reportWebVitals();

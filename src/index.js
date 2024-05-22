import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./components/fontawesome/css/all.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./components/APIs/Api";

// const store =  configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

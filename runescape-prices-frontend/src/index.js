import React from "react";
import ReactDOM from "react-dom/client"; // Note the updated import
import App from "./App";
import { Provider } from "react-redux";
import Store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

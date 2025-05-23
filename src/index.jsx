import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import OktaAuthProvider from "./auth/OktaAuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <OktaAuthProvider>
        <App />
      </OktaAuthProvider>
    </BrowserRouter>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import "./index.css";

const base = "/tenney-web";
const redirect = window.sessionStorage.getItem("redirect");
if (redirect) {
  window.sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", base + redirect);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter basename={base}>
        <App />
      </BrowserRouter>
    </MotionConfig>
  </React.StrictMode>,
);

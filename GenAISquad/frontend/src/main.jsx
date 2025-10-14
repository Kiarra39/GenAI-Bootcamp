import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Mount the React app inside #root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

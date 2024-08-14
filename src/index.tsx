import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EngineContextProvider } from "./services/globals-context-provider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EngineContextProvider>
      <App />
    </EngineContextProvider>
  </React.StrictMode>
);

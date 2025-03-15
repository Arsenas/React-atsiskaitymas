import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </HashRouter>
  </React.StrictMode>
);
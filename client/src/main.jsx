import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import PhotographerContextProvider from "./context/PhotographerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <PhotographerContextProvider>
          <App />
        </PhotographerContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);

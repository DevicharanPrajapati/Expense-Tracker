// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContexts.jsx";
import { DashboardProvider } from "./context/DashboardContext.jsx";

createRoot(document.getElementById("root")).render(
   <AuthProvider>
  <BrowserRouter>
   <DashboardProvider>
    <App />
    </DashboardProvider>
  </BrowserRouter>
  </AuthProvider>
);

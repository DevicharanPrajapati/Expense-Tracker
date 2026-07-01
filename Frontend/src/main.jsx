// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContexts.jsx";
import { BalanceDataProvider } from "./context/BalanceDataContext.jsx";
import { FilterTransactionProvider } from "./context/FilterTransactionContext.jsx";
import { ProfileUpdateProvider } from "./context/ProfileUpdateContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <BalanceDataProvider>
        <FilterTransactionProvider>
          <ProfileUpdateProvider>
            <App />
          </ProfileUpdateProvider>
        </FilterTransactionProvider>
      </BalanceDataProvider>
    </BrowserRouter>
  </AuthProvider>,
);

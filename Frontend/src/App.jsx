import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import TransactionFrom from "./components/TransactionForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Categories from "./pages/Categories";
import CategoryForm from "./components/CategoryForm";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-transaction"
          element={
            <ProtectedRoute>
              <TransactionFrom />
            </ProtectedRoute>
          }
        />

           <Route
          path="/addCategory"
          element={
            <ProtectedRoute>
              <CategoryForm />
            </ProtectedRoute>
          }
        />
      </Route>

   

      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

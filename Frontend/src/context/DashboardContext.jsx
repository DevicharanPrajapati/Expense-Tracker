import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContexts";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { token } = useAuth();

  const [dashboard, setDashboard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/transaction/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data.dashboard);
      setRecentTransactions(res.data.dashboard.recentTransactions);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        fetchDashboard,
        recentTransactions,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
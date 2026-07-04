import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContexts";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { token } = useAuth();

  const [dashboardData, setDashboardData] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
    categoryWiseExpense: [],
    monthlyExpense: [],
    weeklyExpense: [],
  });

  const [dashboardLoading, setDashboardLoading] = useState(false);

  const fetchDashboard = async () => {
    if (!token) return;

    try {
      setDashboardLoading(true);

      const response = await api.get("/transaction/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        dashboardLoading,
        fetchDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
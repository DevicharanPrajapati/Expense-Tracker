import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContexts";

const FilterTransactionContext = createContext();

export const FilterTransactionProvider = ({ children }) => {
  const { token } = useAuth();

  const [filter, setFilter] = useState("all");
  const [filterData, setFilterData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  const getFilteredTransactions = async (selectedFilter) => {
    if (!token || filterLoading) return;

    setFilterLoading(true);

    try {
      const { data } = await api.get(
        `/transaction/filter?filter=${selectedFilter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFilter(selectedFilter);
      setFilterData(data.transactions);
      setMessage(data.message);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Error fetching transactions"
      );
    } finally {
      setLoading(false);
      setFilterLoading(false);
    }
  };

  // Initial load only
  useEffect(() => {
    if (token) {
      getFilteredTransactions("all");
    }
  }, [token]);

  return (
    <FilterTransactionContext.Provider
      value={{
        filter,
        filterData,
        message,
        loading,
        filterLoading,
        getFilteredTransactions,
      }}
    >
      {children}
    </FilterTransactionContext.Provider>
  );
};

export const useFilterTransaction = () => {
  return useContext(FilterTransactionContext);
};
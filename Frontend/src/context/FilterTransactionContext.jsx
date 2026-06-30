import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContexts";

const FilterTransactionContext = createContext();

export const FilterTransactionProvider = ({ children }) => {
  const { token } = useAuth();

  const [filter, setFilter] = useState("all");
  const [filterData, setFilterData] = useState([]);
  const [message, setMessage] = useState("");

  const getFilteredTransactions = async (selectedFilter) => {
    if (!token) return;

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
      console.log("Filtered Transactions:", data.transactions);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFilteredTransactions(filter);
  }, [filter, token]);

  return (
    <FilterTransactionContext.Provider
      value={{
        filter,
        filterData,
        message,
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
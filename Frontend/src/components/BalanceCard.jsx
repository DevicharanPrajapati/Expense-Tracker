import { FaIndianRupeeSign } from "react-icons/fa6";
import { useAuth } from "../context/AuthContexts";
import api from "../services/api";
import { useState } from "react";
import { useEffect } from "react";

const BalanceCard = () => {
  const { token } = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      try {
        const resTotalBal = await api.get("/transaction/incomeTransaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalIncome(resTotalBal.data.totalIncome);
      } catch (error) {
        console.log(error.resTotalBal?.data || error.message);
        console.log(error.resTotalBal?.data || error.message);
      }
    };

    const fetchTotalExpense = async () => {
      try {
        const resTotalExpense = await api.get("/transaction/incomeTransaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTotalExpense(resTotalExpense.data.totalIncome);
      } catch (error) {
        console.log(error.resTotalExpense?.data || error.message);
      }
    };

    if (token) {
      fetchTotalBalance();
      fetchTotalExpense();
    }
  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm font-medium">Total Balance</p>

        <div className="bg-green-100 p-2 rounded-full">
          <FaIndianRupeeSign className="text-green-600 text-lg" />
        </div>
      </div>

      {/* Balance */}
      <div className="flex items-center mt-6">
        <FaIndianRupeeSign className="text-3xl text-gray-800" />
        <span className="text-4xl font-bold text-gray-900">
          {totalIncome.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default BalanceCard;

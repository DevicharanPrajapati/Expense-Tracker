// import React from 'react'
import TransactionList from "../components/TransactionList";
import BalanceCard from "../components/BalanceCard";
import IncomeCard from "../components/IncomeCard";
import ExpenseCard from "../components/ExpenseCard";
import SevingCard from "../components/SavingCard";
import AddTransaction from "../components/AddTransaction";
import { useDashboard } from "../context/DashboardContext";
import FilterCard from "../components/FilterCard";

export const Income = () => {
  const title = "Add Income";
  const titleInc = " Income";

  // const { token } = useAuth();

  const { recentTransactions } = useDashboard();

  const incomeTransactions = recentTransactions.filter(
    (transaction) => transaction.type === "income",
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-2xl">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800">Income</h2>
      <p className="text-gray-500 mb-8">Let's manage your Income.</p>

      {/* Balance Cards */}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left */}
        <IncomeCard />
        <FilterCard />
        <AddTransaction heading={title} />
        <div className="lg:col-span-1">
          <TransactionList
            heading={titleInc}
            dataTransactions={incomeTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default Income;

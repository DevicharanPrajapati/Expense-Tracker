// import React from 'react'
import TransactionList from "../components/TransactionList";
import ExpenseCard from "../components/ExpenseCard";
import AddTransaction from "../components/AddTransaction";
import FilterCard from "../components/FilterCard";
import { useFilterTransaction } from "../context/FilterTransactionContext";

const Expense = () => {
  const title = "Add Expense";
  const titleTran = " Expenses";

  const { filterData } = useFilterTransaction();

  const expenseTransactions = filterData.filter(
    (transaction) => transaction.type === "expense",
  );

  const filterAmount = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

    if (expenseTransactions.length === 0) {
    var errMessage = "No Transactions Found";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 rounded-2xl">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800">Expense</h2>
      <p className="text-gray-500 mb-8">Let's manage your Expenses.</p>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 flex gap-4 ">
          <ExpenseCard amount={filterAmount} />
          <FilterCard />
        </div>

        <AddTransaction heading={title} />
        {/* Right */}
        <div className="lg:col-span-1 ">
          <TransactionList
            heading={titleTran}
            dataTransactions={expenseTransactions}
            errMessage={errMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Expense;

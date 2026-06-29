// import React from 'react'
import api from "../services/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContexts.jsx";
import { useCategory } from "../context/CategoryContext.jsx";
// Add at the top
import { FaPlus } from "react-icons/fa6";
import AddCategoryModal from "../components/CategoryForm.jsx";


const TransactionFrom = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  // console.log(token);
  const { categories } = useCategory();

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    transactionDate: "",
    description: "",
    paymentMethod: "",
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formdata", formData);
    console.log(formData);

    // API call here
    try {
      const response = await api.post("/transaction/addTransaction", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        transactionDate: "",
        description: "",
        paymentMethod: "",
      });

      alert("Transaction add Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
        <h2 className="text-2xl font-bold text-white">Add New Transaction</h2>
        <p className="text-green-100 mt-1">
          Record your income and expenses easily.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Grocery Shopping"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Amount & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="₹ 0.00"
              value={formData.amount}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>

            <button
              type="button"
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
            >
              <FaPlus size={12} />
              Add Category
            </button>
          </div>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Select Category</option>

            {categories
              .filter((cat) => cat.type === formData.type)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          <p className="mt-2 text- text-gray-500">
            Can't find your category? Click{" "}
            <span className="font-medium text-green-600">Add Category</span>.
          </p>
        </div>

        {/* transactionDate */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transaction Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  type: "income",
                  category: "",
                })
              }
              className={`rounded-xl py-3 font-semibold transition ${
                formData.type === "income"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              💰 Income
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  type: "expense",
                  category: "",
                })
              }
              className={`rounded-xl py-3 font-semibold transition ${
                formData.type === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              💸 Expense
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Payment Method
          </label>

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Select Payment Method</option>
            <option value="cash">💵 Cash</option>
            <option value="upi">📱 UPI</option>
            <option value="credit_card">💳 Credit Card</option>
            <option value="debit_card">🏦 Debit Card</option>
            <option value="bank_transfer">🏛 Bank Transfer</option>
            <option value="other">📦 Other</option>
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Note
          </label>
          <textarea
            rows="4"
            name="description"
            placeholder="Write a short note..."
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Button */}

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all"
        >
          Add Transaction
        </button>
      </form>
      {showCategoryModal && (
        <AddCategoryModal onClose={() => setShowCategoryModal(false)} />
      )}
    </div>
  );
};

export default TransactionFrom;

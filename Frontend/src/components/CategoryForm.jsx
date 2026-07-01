import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContexts";
import { useNavigate, Link } from "react-router-dom";

const CategoryForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "expense",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    //Api call to add category
    try {
      const response = await api.post("/category/addCategory", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      alert("Category Added");
       navigate("/add-transaction") 

      setFormData({
        name: "",
        type: "expense",
      });
    } catch (error) {
      console.log(error.response?.data);
    }

    setFormData({
      name: "",
      type: "expense",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Add Category</h2>

        <p className="text-sm text-gray-500 mb-6">
          Create a new category for your transactions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Food, Salary, Rent"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="expense">💸 Expense</option>
              <option value="income">💰 Income</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
          <Link to="/add-transaction">
            <button
              type="button"
              className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </Link>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

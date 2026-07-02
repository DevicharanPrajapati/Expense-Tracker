import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContexts.jsx";

const Register = () => {
  const { registerLoading, setRegisterLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.name.trim()) {
      return "Name is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      return "Email is required";
    }

    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email";
    }

    if (!formData.password) {
      return "Password is required";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    //Vailidation
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (registerLoading) return;
    setRegisterLoading(true);

    // Send data to backend
    try {
      const response = await api.post("/users/register", formData);

      console.log(response.data);

      // alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setRegisterLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Register to start managing your expenses.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">Full Name</label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={registerLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {registerLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-green-600 font-medium ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

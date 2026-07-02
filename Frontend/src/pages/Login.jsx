import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContexts";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const { setUser, setToken, loginLoading, setLoginLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loginLoading) return;

    setLoginLoading(true);

    // Send data to backend
    try {
      const response = await api.post("/users/login", formData);

      localStorage.setItem("token", response.data.token);

      setToken(response.data.token);
      setUser(response.data.user);

      // alert("ok") //check multiple click
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);

      // alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoginLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-green-600">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to manage your expenses.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
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

          <div className="relative">
            <label className="block mb-2 font-medium">Password</label>

            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2/3 -translate-y-1/2 text-gray-500"
            >
              {setShowPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link
            to="/register"
            className="text-green-600 font-medium ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

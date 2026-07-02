import { useState } from "react";
import { Link } from "react-router-dom";
import { useProfileUpdate } from "../context/ProfileUpdateContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePasswordForm = () => {
  const { updatePassword, changePasswordLoading, setChangePasswordLoading } =
    useProfileUpdate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const [error, setError] = useState("");

  const validateUpdatePass = () => {
    if (!formData.password) {
      return "Password is required";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //vailidate newPassword
    const validationError = validateUpdatePass();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    if (changePasswordLoading) return;
    setChangePasswordLoading(true);
    // API Call
    // console.log(formData);
    try {
      await updatePassword(formData);
      // alert("Password updated successfully!");
    } catch (error) {
      console.log(error.message);
    } finally {
      setChangePasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-6">
          <h2 className="text-2xl font-bold">Change Password</h2>
          <p className="text-green-100 text-sm mt-1">
            Update your account password
          </p>
        </div>
        

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Old Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Old Password
            </label>

            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
           {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700">
              {error}
            </div>
          )}
          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <Link to="/profile">
              <button
                type="button"
                className="flex-1 border border-gray-300 rounded-xl py-3 p-4  font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              disabled={changePasswordLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition"
            >
              {changePasswordLoading ? "Updating.." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordForm;

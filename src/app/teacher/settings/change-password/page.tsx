"use client";

import { BASE_URL_USER_SERVICE } from "@/utils/BaseURL";
import encryptPassword from "@/utils/rsa";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    
    // TODO: Gửi API đổi mật khẩu tại đây
    fetch(BASE_URL_USER_SERVICE + "/change-password", {
      method:"POST",
      credentials: 'include',
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ oldPassword: encryptPassword(currentPassword), newPassword: encryptPassword(newPassword) })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          alert("Password changed successfully.");
          setError("");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          alert("change password error.");
          setError("Password current is not correct");
        }
      })

  };

  const isFormValid = currentPassword && newPassword && confirmPassword;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Change Password
      </h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Current Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Confirm New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded-lg font-semibold text-white transition duration-200 ${isFormValid
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

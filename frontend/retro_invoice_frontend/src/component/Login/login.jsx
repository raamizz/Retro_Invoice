"use client";
import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { username, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="text-left mb-4">
            <label className="block text-gray-600 mb-1">Username</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <span className="mr-2 text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Type your username"
                className="w-full focus:outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="text-left mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 relative">
              <span className="mr-2 text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password"
                className="w-full focus:outline-none pr-8 text-sm sm:text-base"
              />
              <span
                className="absolute right-3 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 text-sm sm:text-base"
          >
            LOGIN
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">Or Sign Up</p>
      </div>
    </div>
  );
};

export default Login;
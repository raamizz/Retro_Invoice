"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { mainUrl } from "@/utils/constants";
import { useRouter } from "next/navigation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [response,setResponse]=useState();
  const router =useRouter();
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    
    setErrors({ username: "", password: "" });

    let valid = true;
    const newErrors = {};

    if (!username) {
      newErrors.username = "Email is required";
      valid = false;
    } else if (!validateEmail(username)) {
      newErrors.username = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${mainUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      setResponse(data);
      localStorage.setItem("refreshToken",data.refreshToken);
      sessionStorage.setItem("accessToken",data.accessToken);
      console.log("Login successful:", data);
      alert("Login successful");
      router.push('/dashboard')
            
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
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
            <label className="block text-gray-600 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <span className="mr-2">
                <FaUser />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                className="w-full focus:outline-none text-sm sm:text-base"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div className="text-left mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 relative">
              <span className="mr-2 ">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full focus:outline-none pr-8 text-sm sm:text-base"
              />
              <span
                className="absolute right-3 text-gray-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 text-sm sm:text-base ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">Or Sign Up</p>
      </div>
    </div>
  );
};

export default Login;
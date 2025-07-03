import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate =useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("refreshToken");
    navigate('/login');
  };

  return (
    <header>
      <div className="bg-black flex justify-between items-center px-5 py-4">
        <h1 className="text-white font-medium">RETRO INVOICE</h1>
        <div className="flex gap-2">
          <button className="bg-green-700 hover:bg-green-500 text-white p-2 rounded w-full sm:w-auto">
            Save
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded w-full sm:w-auto">
            Reset
          </button>
          <button
            className="bg-white border border-gray-200 text-gray-800 p-2 rounded w-full sm:w-auto"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

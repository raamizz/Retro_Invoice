import React from 'react';

const Header = () => (
  <header className="bg-black text-white flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-8 py-4 gap-4 sm:gap-0">
    <h1 className="text-2xl font-bold tracking-wide m-0 text-center sm:text-left">RETRO INVOICE</h1>
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full sm:w-auto">Save</button>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded w-full sm:w-auto">Reset</button>
      <button className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded w-full sm:w-auto">LogOut</button>
    </div>
  </header>
);

export default Header; 
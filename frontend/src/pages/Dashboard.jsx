import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {

  return (
    <div className="text-2xl font-bold w-full text-center flex justify-between p-2" >
      <p>Welcome to dashboard</p>
      <Link to='/invoice-form' className="bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold ">
      +Add Invoice
      </Link>
    </div>
  );
}
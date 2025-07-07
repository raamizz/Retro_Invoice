import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {

  return (
   <div>
     <div className="text-2xl font-bold w-full text-center flex justify-between items-center p-2" >
      <p>Welcome to Retro Invoice dashboard</p>
      <Link to='/invoice-form' className="bg-black text-white font-semibold p-2">
      +Add Invoice
      </Link>
     
    </div>
     {/* <Organisationlist/> */}
   </div>
  );
}
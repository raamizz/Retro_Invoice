"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const token = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="flex justify-between">
      <div className="text-2xl font-bold text-center">
        Welcome To The DashBoard!!!!!
      </div>
      <div>
        <Link href={'/invoice-generator'}>
        <button className="w-full py-2 mt-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-full shadow-md hover:opacity-90 text-sm sm:text-base cursor-pointer">
          +Add a invoice
        </button>
        </Link>
      </div>
    </div>
  );
}

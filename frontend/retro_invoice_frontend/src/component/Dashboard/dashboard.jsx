"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router =useRouter();
    const token=localStorage.getItem('refreshToken');
    
    useEffect(()=>{
        if(!token){
            router.push('/login');
        }
    },[]);
  return (
    <div className='text-2xl font-bold w-full text-center'>Welcome To The DashBoard!!!!!</div>
  )
}

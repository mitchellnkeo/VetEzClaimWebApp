import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderPublic from '../../components/Common/HeaderPublic';
import FooterPublic from '../../components/Common/FooterPublic';
import { HiOutlineMenu } from 'react-icons/hi'; 


export default function VABackPayCalculator() {
  const router = useRouter();
  const goToMenu = () => {
    router.push("/va-calculators");
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <HeaderPublic />

        <main className="flex-grow flex flex-col items-center px-4 py-12 relative">
        {/* Top-right menu icon */}
            <button
                onClick={goToMenu}
                className="absolute top-4 left-4 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open Calculator Menu"
            >
                <HiOutlineMenu className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            </button>

            <h1 className="text-3xl font-bold mb-3 text-center">
                VA Back Pay Calculator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-center max-w-xl">
                Estimate the retroactive benefits you may be entitled to receive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full bg-red-500">
                {/* Your code here */}
            </div>
        </main>
        
        <FooterPublic />
    </div>
  );
}


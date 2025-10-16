import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeaderPublic from '../../components/Common/HeaderPublic';
import FooterPublic from '../../components/Common/FooterPublic';

export default function VACalculators() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <HeaderPublic />

      <main className="flex-grow flex flex-col items-center px-4 py-12">
        <h1 className="text-3xl font-bold mb-3 text-center">VA Calculators</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-center max-w-xl">
          Access our free tools to help you calculate your VA disability rating
          and potential back pay. No login required.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
          {/* VA Rating Calculator */}
          <div 
            onClick={() => router.push("/va-rating-calculator")}
            className="cursor-pointer p-8 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 dark:bg-primary p-4 rounded-full">
                <span className="text-2xl">🧮</span>
              </div>
              <h2 className="text-xl font-semibold">VA Rating Calculator</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Calculate your combined VA disability rating with our
                easy-to-use tool.
              </p>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Use Calculator →
              </span>
            </div>
          </div>

          {/* VA Back Pay Calculator */}
          <div
            onClick={() => router.push("/va-back-pay-calculator")}
            className="cursor-pointer p-8 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 dark:bg-primary p-4 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
              <h2 className="text-xl font-semibold">VA Back Pay Calculator</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Estimate the retroactive benefits you may be entitled to receive.
              </p>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Use Calculator →
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterPublic />


    </div>
  );
}

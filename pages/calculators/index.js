import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';

const CalculatorsMenu = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);

  const CalculatorsButtonData  = [
    {
      name: 'VA Rating Calculator',
      onPress: () => {
        router.push('/calculators/va-rating');
      },
      disabled: false,
    },
    {
      name: 'VA Back Pay Calculator',
      onPress: () => {
        router.push('/calculators/va-back-pay');
      },
      disabled: false,
    },
];

  return (
    <FrontLayout title="Calculators">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Calculators"
      />
      
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">VA Calculators</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {CalculatorsButtonData.map((item, idx) => (
          <button
            key={idx}
            onClick={item.onPress}
            disabled={item.disabled}
            className={`w-full rounded-lg p-4 font-semibold text-white transition ${
              item.disabled
                ? 'cursor-not-allowed bg-gray-400'
                : 'cursor-pointer bg-[#035F92] hover:bg-[#024b70]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </FrontLayout>
  );
};

export default CalculatorsMenu;

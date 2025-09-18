import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import { useDispatch } from 'react-redux';
import { setSelectedForm } from '@/store/slices/formSlice';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';

const FormsMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);

  const homeScreenButtonData = [
    {
      name: 'Submit Intent to File',
      onPress: () => router.push('/forms/submit-to-intent'),
      disabled: false,
    },
    {
      name: 'Court of Appeals for Veterans Claims-File Appeal',
      onPress: () => {
        dispatch(setSelectedForm({ id: 'court_appeal' })); // identifier instead of title
        router.push('/forms/menu');
      },
      disabled: false,
    },
    {
      name: 'Submit a Claim',
      onPress: () => {
        dispatch(setSelectedForm({ id: 'submit_claim' }));
        router.push('/forms/menu');
      },
      disabled: !isSubscribed,
    },
    {
      name: 'File An Appeal',
      onPress: () => {
        dispatch(setSelectedForm({ id: 'file_appeal' }));
        router.push('/forms/menu');
      },
      disabled: !isSubscribed,
    },
    {
      name: 'Sworn Statements and Misc Forms',
      onPress: () => {
        dispatch(setSelectedForm({ id: 'misc_forms' }));
        router.push('/forms/menu');
      },
      disabled: !isSubscribed,
    },
    {
      name: 'Request C-file/DD 214',
      onPress: () => {
        dispatch(setSelectedForm({ id: 'request_cfile' }));
        router.push('/forms/menu');
      },
      disabled: !isSubscribed,
    },
    {
      name: 'Request Buddy Statement (Form 21-10210)',
      onPress: () => {
        dispatch(setSelectedForm({ id: 'buddy_statement' }));
        router.push('/forms/buddy-requests');
      },
      disabled: !isSubscribed,
    },
  ];

  return (
    <FrontLayout title="Forms">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Forms"
      />
      
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl">VA Forms</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-5 my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {homeScreenButtonData.map((item, idx) => (
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

export default FormsMenu;

import FrontLayout from '@/components/layouts/FrontLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@/components/Common/Loader';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { revenueCatManager } from '@/services/subscriptionService';
import { PurchasesError, ErrorCode } from '@revenuecat/purchases-js';
import { toast } from 'react-toastify';

export default function Subscription() {
  const router = useRouter();
  const { user, uid } = useSelector((state) => state.auth);
  const [isloading, setIsLoading] = useState(false);
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribedStatus, setIsSubscribedStatus] = useState(isSubscribed == true ? true : false);

  process.env.NODE_ENV === 'development' &&
    console.log('[Subscription] :: isSubscribed:', isSubscribedStatus);
  // process.env.NODE_ENV === 'development' &&
  //   console.log('>> Subscription :: user:', user);
  // process.env.NODE_ENV === 'development' &&
  //   console.log('>> Subscription :: uid:', uid);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const handleSubscribeClick = async () => {
    setIsLoading(true);
    try {
      // Call the singleton purchase function
      await revenueCatManager.handleSubscribe();
      // setIsSubscribedStatus(true);
      openDialog();
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.error('>> err:', err);
      if (
        err instanceof PurchasesError &&
        err.errorCode === ErrorCode.UserCancelledError
      ) {
        toast.error('Subscription cancelled.');
      } else {
        toast.error('Subscription failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsAndConditions = () => {
    process.env.NODE_ENV === 'development' &&
      console.log('Terms and Conditions');
    router.push('/terms-conditions');
  };

  const handleExploreForms = () => {
    process.env.NODE_ENV === 'development' && console.log('Explore Forms');
    router.push('/forms');
  };

  const subscribedMessage = (
    <div className="mt-6 w-full rounded-lg border-l-4 border-green-500 bg-green-100 p-6">
      <h3 className="mb-2 text-lg font-semibold text-green-800">
        🎉 Congratulations! You are subscribed.
      </h3>
      <p className="text-green-700">
        You now have full access to all VA forms. Start exploring and submit
        your forms easily!
      </p>
      <button
        className="mt-4 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-600"
        onClick={handleExploreForms}
      >
        Explore VA Forms
      </button>
    </div>
  );

  const subscriptionDialog = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          🎉 Congratulations!
        </h2>
        <p className="mb-4 text-gray-700">
          You’ve successfully subscribed! Let’s explore VA forms and unlock more
          features.
        </p>
        <button
          onClick={() => {
            closeDialog();
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              window.location.replace('/forms');
            }, 4000);
          }}
          className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );

  return (
    <FrontLayout title="Subscription">
      <Loader show={isloading} />
      <Breadcrumb preUrl="/" preTitle="Home" currentTitle="Subscription" />

      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl dark:text-white-light">Subscription</h1>
            </div>
          </div>
        </div>
      </div>

      {isOpen && subscriptionDialog}

      {isSubscribedStatus == true && subscribedMessage}
      <div className=" mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white-light">
        <div className="rounded-lg bg-primary p-6 text-white">
          <h3 className="mb-4 text-lg font-semibold">Includes ability to:</h3>
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Complete, sign, and submit VA forms for new claims, increases,
                Supplemental Claims, Higher Level Reviews, and Appeals to the
                Board.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Complete, sign, and submit optional VA forms to include Sworn
                Statement in Support of Claim, PTSD Stressor Statements, and
                medical records release.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Request C-file/DD 214, and other documents directly from VA.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>Request buddy statements from others via email.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                File appeals and filing fee waivers directly with the Court of
                Appeals for Veterans Claims.
              </span>
            </li>
          </ul>

          <h4 className="mb-3 mt-6 font-semibold text-yellow-400">
            Additional Features Coming Soon:
          </h4>
          <ul className="list-none space-y-2">
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>Upload supporting documents to the VA.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>Complete Benefits Delivery at Discharge (BDD) Claims.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>
                Record injuries while on active duty and active-duty training.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-yellow-400">✔</span>
              <span>And more!</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-lg bg-yellow-400 p-4 text-center text-black">
          <p className="font-bold">Subscription Fee: $9.99</p>
          <p className="text-sm">Description: Basic Subscription Package</p>
        </div>

        {isSubscribedStatus == false && (
          <button
            className="mt-4 w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primaryHover"
            onClick={handleSubscribeClick}
          >
            Subscribe Now
          </button>
        )}

        <button
          className="hover:font-primary mt-4 w-full rounded-lg border border-gray-400 bg-white py-2 font-semibold transition-colors hover:border-primary  hover:font-bold dark:bg-gray"
          onClick={handleTermsAndConditions}
        >
          Terms and Conditions
        </button>
      </div>
    </FrontLayout>
  );
}

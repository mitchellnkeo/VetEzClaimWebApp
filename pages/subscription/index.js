import FrontLayout from '@/components/layouts/FrontLayout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '@/components/Common/Loader'; 
import Breadcrumb from '@/components/Common/Breadcrumb';
import { revenueCatManager } from '@/services/subscriptionService';
import { PurchasesError, ErrorCode } from "@revenuecat/purchases-js";
import { toast } from 'react-toastify';


export default function Subscription() {
  const router = useRouter();
  const { user, uid } = useSelector((state) => state.auth);
  const [isloading, setIsLoading] = useState(false);
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribedStatus, setIsSubscribedStatus] = useState(false);

  console.log('>> Subscription :: isSubscribed:', isSubscribed);
  console.log('>> Subscription :: user:', user);
  console.log('>> Subscription :: uid:', uid);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    if (isSubscribed) {
      setIsSubscribedStatus(true);
    }
  }, [isSubscribed]);
  

  const handleSubscribeClick = async () => {
    setIsLoading(true);
    try {
      // Call the singleton purchase function
      await revenueCatManager.handleSubscribe();
      setIsSubscribedStatus(true);
      openDialog()
    } catch (err) {    
      console.error('>> err:', err);
      if (err instanceof PurchasesError && err.errorCode === ErrorCode.UserCancelledError) {
        toast.error("Subscription cancelled.");
      } else {
        toast.error("Subscription failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsAndConditions = () => {
    console.log('Terms and Conditions');
    router.push('/terms-conditions');
  }

  const handleExploreForms = () => {
    console.log('Explore Forms');
    router.push('/forms');
  }

  const subscribedMessage = (
    <div className="w-full p-6 mt-6 bg-green-100 border-l-4 border-green-500 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
            🎉 Congratulations! You are subscribed.
        </h3>
        <p className="text-green-700">
            You now have full access to all VA forms. Start exploring and submit your forms easily!
        </p>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors" onClick={handleExploreForms}>
            Explore VA Forms
        </button>
    </div>
  )

  const subscriptionDialog = (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-gray-700 mb-4">
            You’ve successfully subscribed! Let’s explore VA forms and unlock more features.
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
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
  )

  return (
    <FrontLayout title="Subscription">
      <Loader show={isloading} />
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Subscription"
      />

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

        {isSubscribedStatus && subscribedMessage }
        <div className=" max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white-light">
            <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Includes ability to:</h3>
                <ul className="space-y-2 list-none">
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Complete, sign, and submit VA forms for new claims, increases, Supplemental Claims, Higher Level Reviews, and Appeals to the Board.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Complete, sign, and submit optional VA forms to include Sworn Statement in Support of Claim, PTSD Stressor Statements, and medical records release.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Request C-file/DD 214, and other documents directly from VA.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Request buddy statements from others via email.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>File appeals and filing fee waivers directly with the Court of Appeals for Veterans Claims.</span>
                </li>
                </ul>

                <h4 className="font-semibold text-yellow-400 mt-6 mb-3">Additional Features Coming Soon:</h4>
                <ul className="space-y-2 list-none">
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Upload supporting documents to the VA.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Complete Benefits Delivery at Discharge (BDD) Claims.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>Record injuries while on active duty and active-duty training.</span>
                </li>
                <li className="flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1">✔</span>
                    <span>And more!</span>
                </li>
                </ul>
            </div>

            <div className="bg-yellow-400 text-black p-4 mt-6 rounded-lg text-center">
                <p className="font-bold">Subscription Fee: $9.99</p>
                <p className="text-sm">Description: Basic Subscription Package</p>
            </div>

            {!isSubscribed && (
            <button className="bg-primary text-white font-semibold w-full py-3 mt-4 rounded-lg hover:bg-primaryHover transition-colors" onClick={handleSubscribeClick}>
                Subscribe Now
            </button>

            )}

            <button className="w-full py-2 mt-4 font-semibold rounded-lg border border-gray-400 bg-white transition-colors hover:border-primary hover:font-bold  hover:font-primary dark:bg-gray" onClick={handleTermsAndConditions}>
                Terms and Conditions
            </button>

            

        </div>

    </FrontLayout>
  );
}

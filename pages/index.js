// import ServiceList from '@/components/cards/serviceList';
import FrontLayout from '@/components/layouts/FrontLayout';
import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { updateRedirectTo, updateSessionId, updateReloadChat } from '../store/slices/authSlice';
import { transferChatSession } from '@/services/chatService';
import Loader from '@/components/Common/Loader';
import { getProfileStatus } from '@/utils/common';
import { updateProfile, updateChatbotConsent } from '@/store/slices/authSlice';


const Dashboard = () => {
  const [profileStatus, setProfileStatus] = useState(0);
  const { user, redirectTo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { 'assist': aiAssistant } = router.query; // get ?ai-assistant=true
  const isAiAssistant = aiAssistant === 'true';
  const anonymousUid = localStorage.getItem('anonymousUid');
  const localSessionId = localStorage.getItem('chatSessionId');

  useEffect(() => {
    // console.log('[Dashboard] I am mounted');
    // console.log('[Dashboard] redirectTo >>>', redirectTo);
  }, []);

  useEffect(() => {
    const doTransfer = async () => {
      // console.log('[Dashboard] doTransfer >>>', redirectTo);
      // console.log('[Dashboard] anonymousUid >>>', anonymousUid);
      // console.log('[Dashboard] localSessionId >>>', localSessionId);
      // console.log('[Dashboard] user >>>', user);
      setIsLoading(true);
      const profileStatus = getProfileStatus(user);
      try {
        const isReady =
          isAiAssistant &&
          anonymousUid &&
          localSessionId &&
          redirectTo;
  
        if (!isReady) return;
  
        const response = await transferChatSession({
          userId: user.uid,
          anonymousUid: anonymousUid,
          anonymousSessionId: localSessionId,
        }); 
        // console.log('[Dashboard] response >>>', response.data);
  
        if (response?.data) {
          await dispatch(
            updateSessionId({ uid: user.uid, sessionId: response.data })
          ).unwrap();
          await dispatch(updateRedirectTo(null)).unwrap();
          await dispatch(updateReloadChat(true)).unwrap();
        }
        
        if (redirectTo && profileStatus === 2) {
          router.push(redirectTo);
        }
        localStorage.removeItem("chatSessionId");
        localStorage.removeItem("anonymousUid");

      } catch (error) {
        console.error("[doTransfer] Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    doTransfer();
  }, [anonymousUid, localSessionId, isAiAssistant, redirectTo, user]);
  

  useEffect(() => {
    // process.env.NODE_ENV === 'development' && console.log('user Info: ', user);
    if (user) {
        const profileStatus = getProfileStatus(user);
        setProfileStatus(profileStatus);
    }
  }, [user]);


  
  useEffect(() => {
    if (!user) return;
    const syncConsent = async () => {
      try {
        // console.log('[Dashboard] user.hasChatbotConsent >>>', user.hasChatbotConsent);
        // console.log('[Dashboard] isAiAssistant >>>', isAiAssistant);
        if(user.hasChatbotConsent === undefined) {
          // console.log('[Dashboard] updating chatbot consent based on isAiAssistant');
          await dispatch(
            updateProfile({
              uid: user.uid,
              hasChatbotConsent: isAiAssistant,
            })
          ).unwrap();
          dispatch(updateChatbotConsent(isAiAssistant));
        }else {
          // console.log('[Dashboard] updating chatbot consent based on user.hasChatbotConsent');
          dispatch(updateChatbotConsent(user.hasChatbotConsent));
        }
      } catch (err) {
        console.error('Failed to sync chatbot consent', err);
      }
    };
  
    syncConsent();
  }, [user, isAiAssistant]);



  return (
    <FrontLayout title="Dashboard">
      <Loader show={isLoading} />
      <div className="h-[450px]">
        <p className="mb-5 border-b-2 border-gray-200 pb-2 text-2xl dark:border-gray-600 dark:text-white-light">
          Welcome{', '}
          <span className="font-bold dark:text-white-light">
            {user?.firstName + ' ' + user?.lastName}
          </span>
          <br />
          <span className="text-md dark:text-white-light">{user?.email}</span>
        </p>

        <div className="mt-5 pt-2">
          {profileStatus === 0 && (
            <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
              <p className="font-semibold">Your profile is incomplete </p>
              <p className="mt-2">
                Please complete your profile settings to continue.
              </p>
              <a
                href="/profile/settings"
                className="mt-3 inline-block rounded-lg px-4 py-2 text-white"
                style={{ backgroundColor: '#035F92' }}
              >
                Go to Profile Settings
              </a>
            </div>
          )}

          {profileStatus === 1 && (
            <div className="rounded-lg bg-red-100 p-4 text-red-800">
              <p className="font-semibold">Age restriction </p>
              <p className="mt-2">
                Your profile is complete, but you must be at least 18 years old.
              </p>
              <a
                href="/profile/settings"
                className="mt-3 inline-block rounded-lg px-4 py-2 text-white"
                style={{ backgroundColor: '#035F92' }}
              >
                Update Profile Settings
              </a>
            </div>
          )}

          {profileStatus === 2 && (
            <div className="rounded-lg bg-green-100 p-4 text-green-800 dark:bg-gray-600 dark:text-white-light">
              <p className="font-semibold">Profile Complete </p>
              <p className="mt-2">
                You’re ready to proceed! Please go to the forms menu.
              </p>
              <a
                href="/forms"
                className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-white hover:bg-primaryHover  dark:bg-gray-900  dark:text-white-light  dark:hover:bg-gray-800"
              >
                Go to Forms Menu
              </a>
            </div>
          )}
        </div>
      </div>
    </FrontLayout>
  );
};

export default Dashboard;

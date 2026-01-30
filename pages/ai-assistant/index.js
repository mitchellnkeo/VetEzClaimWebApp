import React, { useEffect, useState } from "react";
import HeaderPublic from '../../components/Common/HeaderPublic';
import FooterPublic from '../../components/Common/FooterPublic';
import ChatWindow from '../../components/Common/ChatWindow';
import { useDispatch } from 'react-redux';
import { loginAnnonymousUser } from '../../store/slices/authSlice';
import AuthRequiredModal from '../../components/Common/AuthRequiredModal';
import ChatBotTermsModal from '../../components/Common/ChatBotTermsModal';
import Router from "next/router";
import { getCookie, setCookie } from 'cookies-next';

export default function AiAssistant() { 
  const dispatch = useDispatch();
  const [isAccountCreationRequired, setIsAccountCreationRequired] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = getCookie('vetez_chatbot_consent');
    if (consent === true) {
      setHasConsent(true);
      setShowTerms(false);
    } else {
      setHasConsent(false);
      setShowTerms(true);
    }
  }, []);

  const acceptTerms = () => {
    setCookie('vetez_chatbot_consent', 'true');
    setHasConsent(true);
    setShowTerms(false);
  };

  const declineTerms = () => {
    Router.push('/')
  };

  useEffect(() => {
    const run = async () => {
      await dispatch(loginAnnonymousUser()).unwrap();
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 bg-[url('/assets/images/map.png')] bg-cover bg-center dark:bg-[url('/assets/images/map-dark.svg')]">
        <HeaderPublic />
        <main className="flex-grow flex justify-center items-center ">
            <ChatBotTermsModal
            open={showTerms}
            onAccept={acceptTerms}
            onDecline={declineTerms}
          />

          {hasConsent && 
            
            <ChatWindow open={true} setOpen={() => {}} isExtended={false} setIsExtended={() => {}} isAiAssistant={true} showAuthRequiredModal={() => setIsAccountCreationRequired(true)} />
            
          }
          {isAccountCreationRequired && <AuthRequiredModal onClose={() => setIsAccountCreationRequired(false)} />}
        </main>
    
        <FooterPublic />
    </div>
  );
}

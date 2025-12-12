import React, { useEffect } from "react";
import HeaderPublic from '../../components/Common/HeaderPublic';
import FooterPublic from '../../components/Common/FooterPublic';
import ChatWindow from '../../components/Common/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { loginAnnonymousUser } from '../../store/slices/authSlice';

export default function AiAssistant() { 
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      await dispatch(loginAnnonymousUser()).unwrap();
    };
    run();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <HeaderPublic />
        <main className="flex-grow flex justify-center items-center ">
            <ChatWindow open={true} setOpen={() => {}} isExtended={false} setIsExtended={() => {}} isAiAssistant={true} />
        </main>
    
        <FooterPublic />
    </div>
  );
}

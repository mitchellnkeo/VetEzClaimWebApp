import React, { useEffect } from "react";
import HeaderPublic from '../../components/Common/HeaderPublic';
import FooterPublic from '../../components/Common/FooterPublic';
import ChatWindow from '../../components/Common/ChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { loginAnnonymousUser } from '../../store/slices/authSlice';
import { auth } from '@/firebase/firebase';
import Button from '@/components/FormInputs/Button';

export default function AiAssistant() {
  const dispatch = useDispatch();
  const { tempUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const run = async () => {
      if (tempUser) {
        return;
      }
      await dispatch(loginAnnonymousUser()).unwrap();
      console.log("[AI Assistant] auth >>>", auth.currentUser);
    };
    run();
  }, []);

  const handleCurrentUser = () => {
    console.log("[AI Assistant] auth >>>", auth.currentUser);
  }
  

  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <HeaderPublic />
        <main className="flex-grow flex justify-center items-center ">
            <ChatWindow open={true} setOpen={() => {}} isExtended={false} setIsExtended={() => {}} isAiAssistant={true} />
            <Button onClick={handleCurrentUser}>Current User</Button>
        </main>
    
        <FooterPublic />
    </div>
  );
}

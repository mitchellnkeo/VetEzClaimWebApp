import React, { useState, useRef, useEffect } from 'react';
import { ChatHeadIcon } from '../icons/SvgIcons';
import ChatWindow from './ChatWindow';
import { useSelector, useDispatch } from 'react-redux';
import ChatBotTermsModal from './ChatBotTermsModal';
import {updateProfileConsent, updateChatbotConsent} from '@/store/slices/authSlice';
import Loader from '../Common/Loader';



export default function FloatingChat() {
  const winRef = useRef();
  const [open, setOpen] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const dispatch = useDispatch();
  const { hasChatbotConsent, user } = useSelector((state) => state.auth);
  const [showTerms, setShowTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function onDocClick(e) {
      if (!winRef.current) return;
      if (!winRef.current.contains(e.target) && e.target.id !== 'chat-head')
        setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);


  const acceptTerms = async () => {
    if (!user) {
      setShowTerms(false);
      setOpen(true);
      return;
    }
  
    setIsLoading(true);
  
    try {
      await dispatch(
        updateProfileConsent({
          uid: user.uid,
          hasChatbotConsent: true,
        })
      ).unwrap();
  
      await dispatch(updateChatbotConsent(true)).unwrap();
  
      setShowTerms(false);
      setOpen(true);
    } catch (err) {
      console.error('Failed to accept chatbot terms:', err);
    } finally {
      setIsLoading(false); // always reset loading
    }
  };

  const declineTerms = () => {
    setShowTerms(false);
  };

  return (
    <>
      <Loader show={isLoading} />
      <ChatBotTermsModal
        open={showTerms}
        onAccept={acceptTerms}
        onDecline={declineTerms}
      />
      <div
        id="chat-head"
        onClick={(e) => {
          e.stopPropagation();
          if(hasChatbotConsent){
            setOpen(!open);
            setIsExtended(false);
          }else {
            setShowTerms(true);
          }
        }}
        className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-700 p-[3px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40">
          <div className="hover:bg-primary-700 flex h-full w-full items-center justify-center rounded-full bg-primary text-white transition-colors duration-300">
            <ChatHeadIcon width="28" height="28" />
          </div>
        </div>
      </div>
      
      <ChatWindow open={open} setOpen={setOpen} isExtended={isExtended} setIsExtended={setIsExtended}/>
    
    </>
  );
}

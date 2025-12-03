import React, { useState, useRef, useEffect } from 'react';
import { ChatHeadIcon } from '../icons/SvgIcons';
import ChatWindow from './ChatWindow';

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const winRef = useRef();

  useEffect(() => {
    function onDocClick(e) {
      if (!winRef.current) return;
      if (!winRef.current.contains(e.target) && e.target.id !== 'chat-head')
        setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <>
      <div
        id="chat-head"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
          setIsExtended(false);
        }}
        className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-700 p-[3px] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40">
          <div className="hover:bg-primary-700 flex h-full w-full items-center justify-center rounded-full bg-primary text-white transition-colors duration-300">
            <ChatHeadIcon width="28" height="28" />
          </div>
        </div>
      </div>

      <ChatWindow open={open} setOpen={setOpen} isExtended={isExtended} setIsExtended={setIsExtended} />
    </>
  );
}

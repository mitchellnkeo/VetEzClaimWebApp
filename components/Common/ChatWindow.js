import React, { useRef, useEffect, useState } from 'react';
import { SendIcon, PlusIcon } from '../icons/SvgIcons';
import { set } from 'lodash';

export default function ChatWindow({ open, setOpen }) {
  const winRef = useRef(null);
  const bodyRef = useRef(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!winRef.current) return;
      if (e.target.closest('#chat-head')) return;
      if (!winRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [setOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  const handleSend = () => {
    if (!message.trim() || isThinking) return;

    const userMessage = { sender: 'user', text: message.trim() };
    setChat((prev) => [...prev, userMessage]);

    setMessage('');
    setIsThinking(true);

    // Simulate AI thinking with a delay
    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        text: "🤖 AI: I'm thinking... Here's a dummy response!",
      };
      setChat((prev) => [...prev, aiMessage]);
      setIsThinking(false);
      scrollToBottom();
    }, 1500); // 1.5 seconds delay for thinking
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      ref={winRef}
      className={`fixed bottom-24 right-5 z-[9998] flex h-[450px] w-80 transform flex-col overflow-hidden rounded-2xl
    bg-white/90 from-white/90 to-gray-100 text-gray-900
    shadow-2xl ring-1 ring-gray-300/50 backdrop-blur-sm
    transition-all duration-300 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black
    dark:text-white dark:ring-white/10
    ${
      open
        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
        : 'pointer-events-none translate-y-2 scale-95 opacity-0'
    }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300/50 bg-gray-100/60 p-3 backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
        <span className="flex items-center gap-2 font-semibold">
          🤖 VetEZ ChatBot
        </span>
        <button
          onClick={() => setOpen(false)}
          className="rounded-full px-2 py-1 text-gray-900 hover:bg-gray-300/20 dark:text-white dark:hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-700 flex-1 space-y-3 overflow-auto p-3 text-sm"
      >
        {chat.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex items-center justify-center rounded-md bg-gray-800 p-3">
              <img
                src="/assets/images/logo.svg"
                alt="VetEZ Logo"
                className="h-20 w-20 object-contain"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              VetEZ ChatBot
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Ask me anything about VetEZ services and get instant help!
            </p>
          </div>
        ) : (
          <>
            {chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] break-words rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/60 text-white'
                      : 'bg-gray-300 text-gray-900 dark:bg-white/10 dark:text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex w-full justify-start">
                <div className="max-w-[40%] break-words rounded-lg bg-gray-300 px-3 py-2 text-sm italic leading-relaxed text-gray-900 dark:bg-white/10 dark:text-white">
                  Thinking...
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input Area Wrapper */}
      <div className="flex flex-col border-t border-gray-300/50 bg-gray-100/70 p-2 dark:border-white/10 dark:bg-neutral-900/70">
        {/* File banner above the input row */}
        {selectedFile && (
          <div className="mb-1 flex items-center justify-between rounded-md bg-gray-200 px-3 py-1 text-sm dark:bg-neutral-800/60">
            <span className="truncate">{selectedFile.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        )}

        {/* Actual Input Row */}
        <div className="flex items-end gap-2">
          {/* + File Upload Button */}
          <label
            className={`flex h-8 w-8 cursor-pointer items-center justify-center text-gray-700 dark:text-white ${
              selectedFile ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <PlusIcon />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              disabled={!!selectedFile}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />
          </label>

          {/* Textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isThinking}
            rows={1}
            placeholder="Type a message..."
            className="max-h-20 flex-1 resize-none rounded-md border-none bg-gray-200 p-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800/60 dark:text-white dark:placeholder-gray-400"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isThinking}
            className="mb-1 rounded-md px-1 py-1 text-sm font-medium transition disabled:opacity-50"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

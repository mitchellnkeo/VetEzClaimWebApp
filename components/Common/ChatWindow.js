import React, { useRef, useEffect, useState } from 'react';
import { SendIcon, PlusIcon } from '../icons/SvgIcons';
import { sendChatMessage, getChatMessages } from '@/services/chatService';
import { useSelector } from 'react-redux';
import { updateSessionId } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { AiOutlineFile } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { formsIdList } from '@/utils/staticData';
import { FaRobot } from 'react-icons/fa'; 
import { RiChatNewLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function ChatWindow({ open, setOpen }) {
  const winRef = useRef(null);
  const fileInputRef = useRef(null);
  const bodyRef = useRef(null);
  const { user, uid, sessionId } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const didFetchMessages = useRef(false);
  const [displayedText, setDisplayedText] = useState('');


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

  useEffect(() => {
    const fetchMessages = async () => {
      if (!uid || !sessionId) return;
      if (didFetchMessages.current) return; // ensure called only once
      didFetchMessages.current = true;
  
      try {
        const userId = uid;
        const response = await getChatMessages({ userId, sessionId });
        const messages = response.data; 
  
        messages.forEach((message) => {
          if (message.role === 'user') {
            const hasFile = message.text && message.text !== "";
            const userMessage = { role: 'user', content: message.content, hasFile, fileName: '' };
            setChat(prev => [...prev, userMessage]);
          } else {
            const hasAnalysis = message.text && message.text === "analysis";
            const aiMessage = { 
              role: 'assistant', 
              content: hasAnalysis ? message.content.va_analysis_json : message.content, 
              hasFile: hasAnalysis, 
              fileName: '' 
            };
            setChat(prev => [...prev, aiMessage]);
          }
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      } 
    };
  
    fetchMessages();
  }, []); // empty dependency array ensures it runs once

  // useEffect(() => {
  //   if (chat.length === 0) return;

  //   const lastMsg = chat[chat.length - 1];

  //   // Only stream the last assistant message
  //   if (lastMsg.role === "assistant" && !lastMsg.hasFile) {
  //     let i = 0;
  //     setDisplayedText(""); // reset before streaming

  //     const interval = setInterval(() => {
  //       setDisplayedText((prev) => prev + lastMsg.content.charAt(i));
  //       i++;
  //       scrollToBottom();
  //       if (i >= lastMsg.content.length) clearInterval(interval);
  //     }, 20); // adjust speed here (ms per character)

  //     return () => clearInterval(interval);
  //   }
  // }, [chat]); // runs when a new message is added

  const scrollToBottom = () => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  };

  const handleSend = async () => {
    if (!message.trim() || isThinking) return;
    const hasFile = selectedFile ? true : false;
    const fileName = selectedFile ? selectedFile.name : null;
    try {
      const userMessage = { role: 'user', content: message.trim(), hasFile: hasFile, fileName: fileName };
      setChat((prev) => [...prev, userMessage]);
      setMessage('');
      setIsThinking(true);
      const fileContent = selectedFile ? selectedFile : null;
      setSelectedFile(null);

      const response = await sendChatMessage({
        message: message.trim(),
        userId: uid,
        sessionId: sessionId,
        file: fileContent,
      });
      await dispatch(updateSessionId({ uid, sessionId: response.data.sessionId })).unwrap();
      if( response.data.response.type === 'chat') {
        const aiMessage = { role: 'assistant', content: response.data.response.message, hasFile: false, fileName: fileName };
        setChat((prev) => [...prev, aiMessage]);
      }else {
        const aiMessage = { 
          role: 'assistant', 
          content: response.data.response.data.va_analysis_json, 
          hasFile: true, 
          fileName: fileName };
        setChat((prev) => [...prev, aiMessage]);
      }
    

      scrollToBottom();
    } catch (err) {
      console.error(err);
      const aiMessage = { role: 'assistant', content: 'Something went wrong, please try again.', hasFile: false, fileName: '' };
      setChat((prev) => [...prev, aiMessage]);
      toast.error(err.message);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = async () => {
    await dispatch(updateSessionId({ uid, sessionId: null })).unwrap();
    setChat([]);
    setIsThinking(false);
    setMessage('');
    setSelectedFile(null);
  };


  return (
    <div
      ref={winRef}
      className={`fixed bottom-24 right-5 z-[9998] flex h-[600px] w-96 transform flex-col overflow-hidden rounded-2xl
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
        {/* Left: Chatbot title with icon */}
        <span className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
          <FaRobot className="h-5 w-5" /> VetEZ ChatBot
        </span>

        {/* Right: Action buttons */}
        <div className="flex gap-2">
          {/* New Chat */}
          <button
            onClick={() => startNewChat()} // define this function to reset chat
            className="rounded-full p-1 hover:bg-gray-300/20 dark:hover:bg-white/10"
            title="Start New Chat"
          >
            <RiChatNewLine className="h-4 w-4 text-gray-900 dark:text-white" />
          </button>

          {/* Close Chat */}
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1 hover:bg-gray-300/20 dark:hover:bg-white/10"
            title="Close Chat"
          >
            <RxCross2 className="h-4 w-4 text-gray-900 dark:text-white" />
          </button>
        </div>
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

            {chat.map((msg, idx) => {
             const isLast = idx === chat.length - 1;

              return (
                <div
                  key={idx}
                  className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] break-words rounded-lg px-1 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600/60 text-white'
                        : 'bg-gray-300 text-gray-900 dark:bg-white/10 dark:text-white'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <div className="flex items-center gap-2 p-2">
                        <span>{msg.content}</span>
                        {msg.hasFile && <AiOutlineFile className="text-2xl text-gray-600 dark:text-white" />}
                      </div>
                    ) : (
                      <>
                        {msg.hasFile ? (
                          <>
                            {msg.content ? (
                              <div className="mt-1 space-y-3">
                                {/* General Info */}
                                {msg.content.general_info && (
                                  <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
                                    <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                                      General Information
                                    </h2>
                                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                      <p>
                                        <span className="font-bold">Decision Type:</span>{" "}
                                        {msg.content.general_info.decision_type || "N/A"}
                                      </p>
                                      <p>
                                        <span className="font-bold">Date:</span>{" "}
                                        {msg.content.general_info.date || "N/A"}
                                      </p>
                                      <p>
                                        <span className="font-bold">Issuing Authority:</span>{" "}
                                        {msg.content.general_info.issuing_authority || "N/A"}
                                      </p>
                                      {msg.content.general_info.summary && (
                                        <p className="mt-4">{msg.content.general_info.summary}</p>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {/* Issues */}
                                  {Array.isArray(msg.content.issues) &&
                                  msg.content.issues.length > 0 && (
                                    <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-gray-800">
                                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white p-2">
                                        Issues
                                      </h2>

                                      {msg.content.issues.map((issue, idx2) => (
                                        <div
                                          key={idx2}
                                          className="rounded-xl border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                                        >
                                          <div className="mb-2">
                                            <h3 className="mb-2 text-lg font-semibold text-primary dark:text-blue-400">
                                              {issue.condition || "Unnamed Condition"}
                                            </h3>
                                            <p
                                              className={`my-2 inline-block rounded-md px-2 py-1 text-sm font-medium italic ${
                                                issue.status === "Granted"
                                                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                                  : issue.status === "Denied"
                                                  ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                                  : issue.status === "Deferred"
                                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                                  : "bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300"
                                              }`}
                                            >
                                              Status: {issue.status || "Unknown"}
                                            </p>
                                          </div>

                                          {/* Reason */}
                                          {issue.reason && (
                                            <p className="mb-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
                                              {issue.reason}
                                            </p>
                                          )}

                                          {/* Evidence Considered */}
                                          {issue.evidence_considered && (
                                            <div className="mb-3 rounded-md bg-gray-100 p-3 text-sm dark:bg-gray-700">
                                              <span className="font-semibold">Evidence Considered:</span>
                                              <p className="whitespace-pre-line">{issue.evidence_considered}</p>
                                            </div>
                                          )}

                                          {/* Recommendations */}
                                          {Array.isArray(issue.recommendations) &&
                                            issue.recommendations.length > 0 && (
                                              <div className="flex flex-wrap gap-3">
                                                {issue.recommendations.map((rec, recIdx) => {
                                                  const matchedForm = formsIdList.find(
                                                    (f) => f.formId === rec.formId
                                                  );
                                                  return (
                                                    <button
                                                      key={recIdx}
                                                      onClick={() => {
                                                        if (matchedForm?.formUrl) {
                                                          window.open(
                                                            `${window.location.origin}${matchedForm.formUrl}`,
                                                            "_blank"
                                                          );
                                                        } else {
                                                          toast.warning(
                                                            rec.explanation ||
                                                              "Form route not found for this action."
                                                          );
                                                        }
                                                      }}
                                                      className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-primaryHover"
                                                    >
                                                      {rec.formTitle ||
                                                        matchedForm?.formTitle ||
                                                        `Form ${rec.formId}`}
                                                    </button>
                                                  );
                                                })}
                                              </div>
                                            )}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                {/* Important Dates */}
                                {Array.isArray(msg.content.important_dates) &&
                                  msg.content.important_dates.length > 0 && (
                                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
                                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        Important Dates
                                      </h2>
                                      <ul className="list-inside list-disc text-gray-700 dark:text-gray-300">
                                        {msg.content.important_dates.map((d, idx3) => (
                                          <li key={idx3}>
                                            <span className="font-semibold">{d.date || "Unknown"}:</span>{" "}
                                            {d.description || ""}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                              </div>
                            ) : (
                              <div className="mt-2 space-y-6">Something went wrong</div>
                            )}
                          </>
                        ) : (
                          <div className="p-2">
                            <ReactMarkdown>{ msg.content}</ReactMarkdown>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )
            }
              
            )}


            {isThinking && (
              <div className="flex w-full justify-start">
                <div className="max-w-[40%] break-words rounded-lg bg-gray-300 px-3 py-2 text-sm italic leading-relaxed text-gray-900 dark:bg-white/10 dark:text-white">
                  processing...
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
              selectedFile || isThinking ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <PlusIcon />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              disabled={!!selectedFile || isThinking}
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
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

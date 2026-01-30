import React, { useRef, useEffect, useState } from 'react';
import { SendIcon, PlusIcon } from '../icons/SvgIcons';
import { sendChatMessage, getChatMessages } from '@/services/chatService';
import { useSelector } from 'react-redux';
import { updateSessionId, updateLocalSessionId, updateRedirectTo } from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { AiOutlineFile } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { formsIdList } from '@/utils/staticData';
import { FaRobot } from 'react-icons/fa';
import { RiChatNewLine } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { getProfileStatus } from '@/utils/common';
import { getRandomSuggestedPrompts } from '@/utils/suggestedPrompts';
import { MessagePopup } from '@/utils/toastHelper';
import { stripMarkdown } from '@/utils/utils';


export default function ChatWindow({ open, setOpen, isExtended, setIsExtended, isAiAssistant = false, showAuthRequiredModal = () => {}}) {
  const winRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const bodyRef = useRef(null);
  const { uid, sessionId, reloadChat, user} = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [loadingText, setLoadingText] = useState('Processing...');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addInstructions, setAddInstructions] = useState(true);
  const dispatch = useDispatch();
  const didFetchMessages = useRef(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);


  const showMessage = (msg) => {
    setPopupMessage(msg);
    setShowPopup(true);
  };

  const handleClose = () => setShowPopup(false);


  const fetchMessages = async () => {
    // console.log("[ChatWindow] fetchMessages >>>", uid, sessionId);
    if( isAiAssistant ) return;
    if (!uid || !sessionId) return;
    if (didFetchMessages.current) return; 
    didFetchMessages.current = true;
    setIsLoading(true);
    setLoadingText('Fetching chat history...');

    try {
      const userId = uid;
      setChat([]);
      const response = await getChatMessages({ userId, sessionId });
      const messages = response.data;
      // console.log("[ChatWindow] messages >>>", messages);
      messages.forEach((msg, index) => {
        const isLastMessage = index === messages.length - 1;
        // console.log("[ChatWindow] msg >>>", msg);
        const userMessage = {
          role: 'user',
          content: msg.message || '',
          fileAttached: msg.fileAttached || false,
          fileName: msg.fileName || '',
          responseType: 'chat',
          error: null,
        };

        // console.log("[ChatWindow] userMessage >>>", userMessage);
      
        setChat((prev) => [...prev, userMessage]);
        if (msg.response) {
          const responseType = msg.response.type === 'chat' ? 'chat' : 'analysis';
          const content = msg.response.type === 'chat' ? msg.response : msg.response.va_analysis_json;
          const assistantMessage = {
            role: 'assistant',
            content:  content,
            fileAttached: false,
            fileName: '',
            responseType: responseType,
            error: null,
          };
          // console.log("[ChatWindow] assistantMessage:: response >>>", assistantMessage);
          if( isLastMessage && Array.isArray(content.guided_follow_up_prompts) && content.guided_follow_up_prompts.length > 0){
            // console.log("[ChatWindow] guided_follow_up_prompts >>>", content.guided_follow_up_prompts);
            setSuggestedPrompts(content.guided_follow_up_prompts);
          }
          setChat((prev) => [...prev, assistantMessage]);
        }else {
          const assistantMessage = {
            role: 'assistant',
            content: 'Something went wrong, please try again.',
            fileAttached: false,
            fileName: '',
            responseType: 'chat',
            error: msg.error,
          };
          // console.log("[ChatWindow] assistantMessage:: no response >>>", assistantMessage);
          setChat((prev) => [...prev, assistantMessage]);
        }
      });

    } catch (error) {
      process.env.NODE_ENV === 'development' &&
        console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
      setLoadingText('Processing...');
    }
  };

  useEffect(() => {
      const ta = textareaRef.current;
      if (ta) {
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
        ta.scrollTop = ta.scrollHeight;
      }
    }, [message]);

  useEffect(() => {
    fetchMessages();
  }, [reloadChat]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!winRef.current) return;
      if (e.target.closest('#chat-head')) return;
      if (!winRef.current.contains(e.target)) {
        setOpen(false);
        setIsExtended(false);
      }
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

  const handleSend = async () => {
    let trimmed = message.trim();
    if (!trimmed || isThinking) return;
    setSuggestedPrompts([]);
    try {
      setChat((prev) => [...prev, {
        role: 'user',
        content: trimmed,
        fileAttached: false,
        fileName: '',
        responseType: 'chat',
        error: null,
      }]);
      scrollToBottom();
      setMessage('');
      setIsThinking(true);
      const resp = await sendChatMessage({
        message: trimmed,
        userId: uid,
        sessionId: sessionId,
        file: null,
      });
      if (isAiAssistant) {
        await dispatch(updateLocalSessionId(resp.data.sessionId)).unwrap();
      } else {
        await dispatch(updateSessionId({ uid, sessionId: resp.data.sessionId })).unwrap();
      }

      const isChatting = resp.data.response.type === 'chat'
      const contentReturned = isChatting ? resp.data.response.llmResponse : resp.data.response.llmResponse.va_analysis_json; 
      setChat((prev) => [...prev, {
          role: 'assistant',
          content: contentReturned,
          fileAttached: false,
          fileName: '',
          responseType: resp.data.response.type,
          error: null,
      }]);
      if(Array.isArray(contentReturned.guided_follow_up_prompts)){
        setSuggestedPrompts(contentReturned.guided_follow_up_prompts);
      } 
    
      scrollToBottom();
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.error(err);
      setChat((prev) => [...prev, {
        role: 'assistant',
        content: 'Something went wrong, please try again.',
        fileAttached: false,
        fileName: '',
        responseType: 'chat',
        error: err.message,
      }]);
      toast.error(err.message);
      // console.log(err);
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
    setIsLoading(true);
    setLoadingText('Starting new chat...');
    await dispatch(updateSessionId({ uid, sessionId: null })).unwrap();
    setChat([]);
    setIsLoading(false);
    setLoadingText('Processing...');
    setMessage('');
    setSelectedFile(null);
  };

  const Loader = ({ loading = false, text = 'Loading...' }) => {
    if (!loading) return null; // Don't render anything if not loading

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent">
        {/* Spinner */}
        <div className="mb-2 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-black"></div>
        {/* Text */}
        <span className="font-medium text-gray-700 dark:text-white">
          {text}
        </span>
      </div>
    );
  };

  const extendScreen = (e) => {
    e.stopPropagation();
    setIsExtended(!isExtended);
    if (!isExtended) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // console.log("isExtended >>>", isExtended);

  const handleSuggestionClick = (item) => {
    setMessage(item.prompt);
    setAddInstructions(true);
    // console.log("[ChatWindow] item >>>", item);
  };


  const handleFileInput = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
  
    const file = e.target.files[0];
    setSelectedFile(file);
    // Clear input so user can select the same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const GetStarted = async () => {
    if (!selectedFile || isThinking) return;
    const fileName = selectedFile.name;
    try {
      setIsLoading(true);
      const resp = await sendChatMessage({
        message: '',
        userId: uid,
        sessionId: sessionId,
        file: selectedFile,
      });
      // console.log("[Get Started Resposne:: ]", resp.data)
      setSelectedFile(null);
      if (isAiAssistant) {
        await dispatch(updateLocalSessionId(resp.data.sessionId)).unwrap();
      } else {
        await dispatch(updateSessionId({ uid, sessionId: resp.data.sessionId })).unwrap();
      }

      if (resp.data.response.docType != 'OTHER') {
        const isChatting = resp.data.response.type === 'chat'
        const llmContent = isChatting ?  resp.data.response.llmResponse : resp.data.response.llmResponse.va_analysis_json
        // console.log("[Get Started] resp.data.response >>>", resp.data.response);
        // console.log("[Get Started] llmContent >>>", llmContent);
        setChat((prev) => [...prev, {
          role: 'user',
          content: '',
          fileAttached: true,
          fileName: fileName,
          responseType: 'chat',
          error: null,
        }, {
          role: 'assistant',
          content: llmContent,
          fileAttached: true,
          fileName: fileName,
          responseType: resp.data.response.type,
          error: null,
        }]);
        if(Array.isArray(llmContent.guided_follow_up_prompts)){
          setSuggestedPrompts(llmContent.guided_follow_up_prompts);
        }
        scrollToBottom();
      }else {
        const plainText = stripMarkdown(resp.data.response.llmResponse.message_md);
        if(isAiAssistant){
          showMessage(plainText);
        }else {
          toast.warning(plainText);
        }
        setSelectedFile(null)
        // console.log(resp.data.response.llmResponse);
      }
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.error(err);  
      toast.error(err.message);
      // console.log(err);
      setSelectedFile(null)
    } finally {
        setIsLoading(false);
    }
  };

  
  

  return (
    <div
      ref={winRef}
      className={`
        ${isAiAssistant
          ? `
            relative mx-auto my-2 flex h-[650px] w-full max-w-5xl
            flex-col overflow-hidden
            bg-white/10 dark:backdrop-blur-xl
            ring-1 ring-white/20 dark:ring-0
            `
          : `
            fixed bottom-24 right-5 z-[9998] flex
            ${isExtended ? 'h-[650px]' : 'h-[600px]'}
            ${isExtended ? 'w-4/5' : 'w-96'}
            transform flex-col overflow-hidden rounded-2xl
            ${
              open
                ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none translate-y-2 scale-95 opacity-0'
            }
            `
        }
        ${!isAiAssistant ? `
          bg-white/90 from-white/90 to-gray-100 text-gray-900
          shadow-2xl ring-1 ring-gray-300/50 backdrop-blur-sm
          dark:bg-gradient-to-b dark:from-gray-900 dark:to-black
          dark:text-white dark:ring-white/10
        ` : `
          text-gray-900 dark:text-white
        `}
        transition-all duration-300
      `}
    >

      <MessagePopup
        message={popupMessage}
        open={showPopup}
        onClose={handleClose}
      />

      {/* Header */}
      { !isAiAssistant && (
      <div className="flex items-center justify-between border-b border-gray-300/50 bg-gray-800 p-3 backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
        {/* Left: Chatbot title with icon */}
        <span className="flex items-center gap-2 font-semibold text-white dark:text-white">
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
            <RiChatNewLine className="h-4 w-4 text-white dark:text-white" />
          </button>

          {/* Close Chat */}
          <button
            onClick={() => {
              setIsExtended(false);
              setOpen(false)
            }}
            className="rounded-full p-1 hover:bg-gray-300/20 dark:hover:bg-white/10"
            title="Close Chat"
          >
            <RxCross2 className="h-4 w-4 text-white dark:text-white" />
          </button>

          {/* Extend Screen */}
          <button
            onClick={extendScreen}
            className="rounded-full p-1 hover:bg-gray-300/20 dark:hover:bg-white/10"
            title="Extend Screen"
          >
            {isExtended ? <FaCompress className="h-4 w-4 text-white dark:text-white" /> : <FaExpand className="h-4 w-4 text-white dark:text-white" />}
          </button>


        </div>
      </div>
      )}

      { isAiAssistant && chat.length > 0 && (
        <div className="flex items-center justify-center text-center border-b border-gray-300/50 bg-gray-800 p-3 backdrop-blur dark:border-white/10 dark:bg-neutral-900/60">
          <h2 className="text-xl font-semibold text-white">
            VetEZ AI Assistant
          </h2>
        </div>
      )}

      <Loader loading={isLoading} text={isAiAssistant ? '' : loadingText} />
      {/* Body */}
      <div
        ref={bodyRef}
        className="bg-blue-0 dark:bg-transparent scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent dark:scrollbar-thumb-gray-700 flex-1 space-y-3 overflow-auto p-3 text-sm"
      >
        {chat.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <div className="mb-4 items-center justify-center rounded-md bg-gray-800 p-3">
              <img
                src="/assets/images/logo.svg"
                alt="VetEZ Logo"
                className="h-20 w-20 object-contain"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              VetEZ { isAiAssistant ? 'AI Assistant' : 'ChatBot' }
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {/* Ask me anything about VetEZ services and get instant help! */}
              Please upload a VA decision document to get started
            </p>

            {/* new file upload section */}
            <div className="w-full flex flex-col items-center mt-6">
              {/* <p className="mb-2 text-gray-700 dark:text-gray-300 text-sm text-center">
                Please upload a VA decision document to get started
              </p> */}

              {/* Upload / Replace Button */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className={`flex items-center gap-2 rounded-lg border border-dashed border-gray-400 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <PlusIcon className="h-5 w-5" />
                  {selectedFile ? 'Replace VA Decision Document' : 'Upload VA Decision Document'}
                </button>

                {/* Clear button appears only if a file is selected */}
                {selectedFile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-red-100 dark:bg-red-700 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                disabled={isLoading}
                onChange={(e) => handleFileInput(e)}
              />

              {/* Show selected file name */}
              {selectedFile && (
                <span className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                  Selected file: {selectedFile.name}
                </span>
              )}

              {/* Get Started button */}
              <button
                type="button"
                // disabled={!selectedFile || isLoading}
                onClick={GetStarted} 
                className={`mt-4 w-full max-w-xs rounded-lg bg-primary text-white px-4 py-3 font-medium text-sm hover:bg-blue-600 transition-colors ${
                  !selectedFile || isLoading ? 'hidden opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Get Started
              </button>
            </div>


          </div>
        ) : (
          <>
            {chat.map((msg, idx) => {
              const isLast = idx === chat.length - 1;

              return (
                <div
                  key={idx}
                  className={`flex w-full ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[75%] break-words rounded-lg px-1 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-white'
                        :  'bg-transparent'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <div className="flex items-center gap-2 p-2">
                        {!msg.fileAttached && (
                          <span>{msg.content}</span>
                        )}
                        {msg.fileAttached && (
                          <> 
                            <AiOutlineFile className="text-2xl text-white" />
                            <span>{msg.fileName}</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        {msg.error && (
                          <div className="mt-2 space-y-4 p-2 rounded-xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
                            {msg.content}
                          </div>
                        )}

                        {!msg.error && msg.responseType === 'chat' && (
                          <div className="space-y-4 p-2 rounded-xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
                              {msg.content?.message_md && (
                                <ReactMarkdown>{msg.content.message_md}</ReactMarkdown>
                              )}
                          </div>
                        )}

                        {!msg.error && msg.responseType === 'analysis' && ( 
                          <div >
                          {/* General Info */}
                          {msg.content.general_info && (
                            <div className="mb-3 rounded-xl border border-gray-200 bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-800">
                              <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                                General Information
                              </h2>
                              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                <p>
                                  <span className="font-bold">
                                    Decision Type:
                                  </span>{' '}
                                  {msg.content.general_info
                                    .decision_type || 'N/A'}
                                </p>
                                <p>
                                  <span className="font-bold">Date:</span>{' '}
                                  {msg.content.general_info.date || 'N/A'}
                                </p>
                                <p>
                                  <span className="font-bold">
                                    Issuing Authority:
                                  </span>{' '}
                                  {msg.content.general_info
                                    .issuing_authority || 'N/A'}
                                </p>
                                {msg.content.general_info.summary && (
                                  <p className="mt-4">
                                    {msg.content.general_info.summary}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Issues */}
                          {Array.isArray(msg.content.issues) &&
                            msg.content.issues.length > 0 && (
                              <div className=" mb-3 space-y-5 rounded-xl border border-gray-200 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="p-2 text-xl font-semibold text-gray-800 dark:text-white">
                                  Issues
                                </h2>

                                {msg.content.issues.map((issue, idx2) => (
                                  <div
                                    key={idx2}
                                    className="rounded-xl border border-gray-200 bg-gray-50 p-2 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                                  >
                                    <div className="mb-2">
                                      <h3 className="mb-2 text-lg font-semibold text-primary dark:text-blue-400">
                                        {issue.condition ||
                                          'Unnamed Condition'}
                                      </h3>
                                      <p
                                        className={`my-2 inline-block rounded-md px-2 py-1 text-sm font-medium italic ${
                                          issue.status === 'Granted'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                            : issue.status === 'Denied'
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                            : issue.status === 'Deferred'
                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300'
                                        }`}
                                      >
                                        Status:{' '}
                                        {issue.status || 'Unknown'}
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
                                        <span className="font-semibold">
                                          Evidence Considered:
                                        </span>
                                        <p className="whitespace-pre-line">
                                          {issue.evidence_considered}
                                        </p>
                                      </div>
                                    )}

                                    {/* Recommendations */}
                                    {Array.isArray(
                                      issue.recommendations
                                    ) &&
                                      issue.recommendations.length >
                                        0 && (
                                            <div className="mb-3 rounded-md bg-gray-100 p-3 text-sm dark:bg-gray-700">
                                              <span className="font-semibold">
                                                Recommendate Form to fill:
                                              </span>
                                            <div className="flex flex-wrap gap-3 mt-3">
                                              {issue.recommendations.map(
                                                (rec, recIdx) => {
                                                  const matchedForm =
                                                    formsIdList.find(
                                                      (f) =>
                                                        f.formId ===
                                                        rec.formId
                                                    );
                                                  return (
                                                    <button
                                                      key={recIdx}
                                                      onClick={async () => {
                                                        if (isAiAssistant) {
                                                          if (matchedForm?.formUrl) {
                                                            await dispatch(updateRedirectTo(matchedForm.formUrl)).unwrap();
                                                          // window.location.href = `${window.location.origin}/registration?assist=true`; 
                                                            showAuthRequiredModal();
                                                          } else {
                                                            toast.warning(
                                                              rec.explanation ||
                                                                'Form route not found for this action.'
                                                            );
                                                          }
                                                          return;
                                                        }
                                                        if (
                                                          matchedForm?.formUrl
                                                        ) {
                                                          const profileStatus = getProfileStatus(user);
                                                          if (profileStatus < 2) {
                                                            toast.error('Please complete your profile to access this form.'); 
                                                            return;
                                                          }
                                                          window.open(
                                                            `${window.location.origin}${matchedForm.formUrl}`,
                                                            '_blank'
                                                          );
                                                        } else {
                                                          toast.warning(
                                                            rec.explanation ||
                                                              'Form route not found for this action.'
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
                                                }
                                              )}
                                            </div>
                                            </div>
                                      )}
                                  </div>
                                ))}
                              </div>
                            )}

                          {/* Important Dates */}
                          {Array.isArray(msg.content.important_dates) &&
                            msg.content.important_dates.length > 0 && (
                              <div className="mb-3 rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                  Important Dates
                                </h2>
                                <ul className="list-inside list-disc text-gray-700 dark:text-gray-300">
                                  {msg.content.important_dates.map(
                                    (d, idx3) => (
                                      <li key={idx3}>
                                        <span className="font-semibold">
                                          {d.date || 'Unknown'}:
                                        </span>{' '}
                                        {d.description || ''}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}

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
      {chat.length !== 0 && (
        <div className={`flex flex-col border-t border-gray-300/50 ${isAiAssistant ? 'bg-gray-200 dark:bg-gray' : 'bg-gray-100/70'} p-2 dark:border-white/10 dark:bg-neutral-900/70`}>
          {/* File banner above the input row */}

          {/* Suggestions Bar */}
          {suggestedPrompts.length > 0 && (
            <div className="h-12 overflow-x-auto no-scrollbar">
              <div className="flex h-full items-center gap-2 px-2  no-scrollbar  shadow-[0_-1px_6px_rgba(0,0,0,0.08)] dark:shadow-[0_-1px_6px_rgba(0,0,0,0.35)]">
                {suggestedPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(item)}
                    disabled={isThinking}
                    className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-blue-100 hover:text-blue-700 disabled:opacity-50 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
                  >
                    {item.prompt}
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* {selectedFile && (
            <div className="mb-1 flex items-center justify-between rounded-md bg-gray-200 px-3 py-1 text-sm dark:bg-neutral-800/60">
              <span className="truncate">{selectedFile.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  setAddInstructions(true);
                }}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )} */}

          {/* Actual Input Row */}
          { addInstructions && (
            <div className="flex items-end gap-2">
              {/* + File Upload Button */}
              {/* <label
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
                      if(!message) {
                        setAddInstructions(false);
                      }
                      if (fileInputRef.current) {
                        fileInputRef.current.value = null;
                      }
                    }
                  }}
                />
              </label> */}

              <textarea
              ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isThinking}
                rows={1}
                placeholder="Type a message..."
                className={`max-h-20 flex-1 resize-none rounded-md border-none ${isAiAssistant ? 'bg-gray-50' : 'bg-gray-200'} p-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-800/60 dark:text-white dark:placeholder-gray-400 overflow-y-auto`}
                onInput={(e) => {
                  e.target.style.height = 'auto'; // reset height
                  e.target.style.height = e.target.scrollHeight + 'px'; // expand to fit
                  if (e.target.scrollHeight > e.target.clientHeight) {
                    e.target.scrollTop = e.target.scrollHeight;
                  }
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
          )}

          {/* { !addInstructions && (
              <div className="flex gap-2 w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddInstructions(true);
                  }}
                  className="w-1/2 rounded-md px-3 py-2 text-sm font-medium bg-primary text-white hover:bg-blue-700 transition"
                > 
                  Add Instructions
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddInstructions(true);
                    handleSend();
                  }}
                  className="w-1/2 rounded-md px-3 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Analyze Document
                </button>
              </div>
            )
          } */}

        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import Loader from '@/components/Common/Loader';
import { docsAnalyzerService } from '@/services/DocsAnalyzerService';
import { formsIdList } from '@/utils/staticData';
import {
  recordAnalyzerData,
  getAnalyzerRecordsByUser,
} from '@/firebase/firebaseOperations';
import { FaFilePdf, FaHistory, FaArrowRight } from 'react-icons/fa';
import SubscriptionRequired from '@/components/Common/SubscriptionRequired';
import { doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AnalyzeUI = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const { user, uid } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [historyBtnVisible, setHistoryBtnVisible] = useState(false);
  const [addNewPDFBtnVisible, setAddNewPDFBtnVisible] = useState(false);
  const [showAnalysisHistory, setShowAnalysisHistory] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const MAX_SIZE = 10 * 1024 * 1024;

    if (selectedFile.size > MAX_SIZE) {
      toast.error('File size cannot exceed 10 MB.');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Only PDF, DOCX, or TXT files are allowed.');
      return;
    }

    setFileName(selectedFile.name);
    setDocFile(selectedFile);
    setProgress(0);
    setSuccessMessage('');

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setProgress(pct);
      }
    };

    reader.onloadend = () => {
      setProgress(100);
      setSuccessMessage(`${selectedFile.name} added successfully!`);
    };

    reader.onerror = (error) => {
      toast.error('Error reading file.');
      process.env.NODE_ENV === 'development' &&
        console.error('FileReader error:', error);
    };

    reader.readAsDataURL(selectedFile); // triggers progress events
  };

  const handleAnalyze = async () => {
    if (!doc) {
      toast.error('Please add a PDF, DOCX, or TXT file to analyze.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await docsAnalyzerService(docFile, instructions);
      process.env.NODE_ENV === 'development' &&
        console.log('API response:', response);
      const dataObject = {
        ...response.data,
        instructions: instructions,
        createdAt: new Date().toISOString(),
      };
      await recordAnalyzerData({
        uid,
        analyzerData: response.data,
        instructions: instructions,
      });
      setResult(dataObject);
      setAnalysisHistory([dataObject, ...analysisHistory]);
      setAddNewPDFBtnVisible(true);
      setHistoryBtnVisible(true);
      setShowAnalysisHistory(false);
      setProgress(0);
      setFileName('');
      setInstructions('');
      setSuccessMessage('');
    } catch (err) {
      process.env.NODE_ENV === 'development' && console.log('>>Error:', err);
      setResult(null);
      setAddNewPDFBtnVisible(false);
      setShowAnalysisHistory(false);
      setHistoryBtnVisible(analysisHistory.length > 0);
      toast.error('Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // prevent state update if unmounted

    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        if (uid) {
          const records = await getAnalyzerRecordsByUser(uid);
          process.env.NODE_ENV === 'development' &&
            console.log('records: >>>', records);
          if (isMounted) {
            setAnalysisHistory(records); // only update if component still mounted
            setHistoryBtnVisible(records.length > 0);
          }
        }
      } catch (err) {
        process.env.NODE_ENV === 'development' && console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchRecords();

    return () => {
      isMounted = false; // cleanup on unmount
    };
  }, [uid]);

  const handleViewDetails = (record) => {
    process.env.NODE_ENV === 'development' &&
      console.log('Full record data:', record);
    setResult(record);
    setShowAnalysisHistory(false);
    setHistoryBtnVisible(true);
    setAddNewPDFBtnVisible(true);
  };

  const onAddNewPDF = () => {
    setResult(null);
    setShowAnalysisHistory(false);
    setHistoryBtnVisible(true);
    setAddNewPDFBtnVisible(false);
    setProgress(0);
    setFileName('');
    setInstructions('');
    setSuccessMessage('');
  };

  const onShowAnalysisHistory = () => {
    setResult(null);
    setShowAnalysisHistory(true);
    setHistoryBtnVisible(false);
    setAddNewPDFBtnVisible(true);
  };

  return (
    <FrontLayout title="Document Analyzer">
      <Breadcrumb preUrl="/" preTitle="Home" currentTitle="Document Analyzer" />
      <Loader show={isLoading} />
      {!isSubscribed && <SubscriptionRequired />}

      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">
                Document Analyzer
              </h1>
            </div>
          </div>

          <div className="sticky top-0 z-10 flex justify-center gap-3">
            {addNewPDFBtnVisible && (
              <button
                onClick={onAddNewPDF}
                className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-white-light dark:text-black dark:hover:bg-gray dark:hover:text-white-light"
              >
                <FaFilePdf /> Add New PDF/Docx/Txt File
              </button>
            )}
            {historyBtnVisible && (
              <button
                onClick={onShowAnalysisHistory}
                className="flex cursor-pointer items-center gap-2 rounded-md bg-[#035F92] px-4 py-2 text-sm text-white hover:bg-[#024b70]"
              >
                <FaHistory /> Show Analysis History
              </button>
            )}
          </div>
        </div>
      </div>
      {!showAnalysisHistory && (
        <>
          {!result && (
            <>
              <div className="mt-10 flex items-center justify-center">
                <div className="relative flex h-48 w-3/4 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition hover:border-blue-500">
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  {!fileName && (
                    <div className="flex flex-col items-center text-gray-500">
                      <AiOutlinePlus className="mb-2 text-4xl" />
                      <span>Add VA Decision PDF/Docx/Txt</span>
                    </div>
                  )}

                  {fileName && (
                    <div className="flex w-full flex-col items-center px-4">
                      <div className="mb-2 font-medium text-gray-700 dark:text-white-light">
                        {fileName}
                      </div>
                      <div className="mb-1 h-4 w-1/2 rounded-lg bg-gray-200">
                        <div
                          className="h-4 rounded-lg bg-primary"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="mb-2 text-sm text-gray-600">
                        {progress}%
                      </div>
                      {successMessage && (
                        <div className="font-semibold text-green-600">
                          {successMessage}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {progress === 100 && (
                <div className="mx-auto mt-6 w-3/4">
                  <h2 className="mb-2 text-lg font-medium text-gray-700 dark:text-white-light">
                    Enter any instructions (optional)
                  </h2>

                  <textarea
                    className="h-32 w-full resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white-light"
                    placeholder="Type your instructions here..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />

                  <button
                    className="mt-3 w-full rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primaryHover"
                    onClick={handleAnalyze}
                  >
                    Analyze
                  </button>
                </div>
              )}
            </>
          )}

          {result && (
            <div className="mt-6 space-y-6">
              {/* ===== General Info Section ===== */}
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-white">
                  General Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Decision Type:</span>{' '}
                  {result.general_info.decision_type}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Date:</span>{' '}
                  {result.general_info.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold">Issuing Authority:</span>{' '}
                  {result.general_info.issuing_authority}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {result.general_info.summary}
                </p>
              </div>

              {/* ===== Issues Section ===== */}
              {result.issues.length > 0 && (
                <div className="mb-10 space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-md dark:border-gray-700 dark:bg-gray-800">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Issues
                  </h2>
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="mb-2">
                        <h3 className="mb-2 text-lg font-semibold text-primary dark:text-blue-400">
                          {issue.condition}
                        </h3>
                        <p
                          className={`my-2 inline-block rounded-md px-2 py-1 text-sm font-medium italic
                                ${
                                  issue.status === 'Granted'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                    : issue.status === 'Denied'
                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                    : issue.status === 'Deferred'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800/40 dark:text-gray-300'
                                }
                              `}
                        >
                          Status: {issue.status}
                        </p>
                      </div>

                      <p className="mb-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
                        {issue.reason}
                      </p>

                      {/* Recommendations */}
                      <div className="flex flex-wrap gap-3">
                        {issue.recommendations.map((rec, recIdx) => {
                          // find form by formId from the formsIdList
                          const matchedForm = formsIdList.find(
                            (form) => form.formId === rec.formId
                          );

                          return (
                            <button
                              key={recIdx}
                              onClick={() => {
                                if (matchedForm && matchedForm.formUrl) {
                                  window.open(
                                    `${window.location.origin}${matchedForm.formUrl}`,
                                    '_blank'
                                  );
                                } else {
                                  toast.warning(
                                    'Form route not found for this action.'
                                  );
                                }
                              }}
                              className="rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-primaryHover"
                            >
                              {rec.formTitle ||
                                matchedForm?.formTitle ||
                                'Open Form'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {showAnalysisHistory && (
        <>
          {analysisHistory.length === 0 ? (
            <div className="py-10 text-center italic text-gray-500 dark:text-gray-400">
              No analysis done yet. Please analyze a PDF to see the history.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {analysisHistory.map((record, index) => {
                const info = record?.general_info || {};
                return (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-between gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <FaHistory className="text-3xl text-primary" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {info.decision_type || 'Unknown Decision'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.date
                            ? `Date: ${info.date}`
                            : 'No date available'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.issuing_authority ||
                            'Issuing authority not available'}
                        </p>
                        <p className="mt-2 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                          {info.summary || 'No summary available'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(record)}
                      className="mt-3 flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600 sm:mt-0"
                    >
                      View Details
                      <FaArrowRight />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </FrontLayout>
  );
};

export default AnalyzeUI;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import  {toast} from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';
import Loader from '@/components/Common/Loader';
import { docsAnalyzerService } from '@/services/DocsAnalyzerService';
import { formsIdList } from '@/utils/staticData';
import { recordAnalyzerData, getAnalyzerRecordsByUser } from '@/firebase/firebaseOperations';
import { FaFilePdf, FaHistory, FaArrowRight } from 'react-icons/fa';

const AnalyzeUI = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const { user, uid } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisHistory, setAnalysisHistory] =  useState([]); 
  const [result, setResult] = useState(null);
  const [historyBtnVisible, setHistoryBtnVisible] = useState(false);
  const [addNewPDFBtnVisible, setAddNewPDFBtnVisible] = useState(false);
  const [showAnalysisHistory, setShowAnalysisHistory] = useState(false);



  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed.');
      return;
    }

    setFileName(selectedFile.name);
    setProgress(0);
    setSuccessMessage('');
    setFileBase64('');

    const reader = new FileReader();

    // Progress event – triggers as file is read
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setProgress(pct);
      }
    };

    // Load complete
    reader.onloadend = () => {
      if (reader.result) {
        const base64Data = reader.result.split(',')[1]; // strip metadata
        setFileBase64(base64Data);
        setProgress(100);
        setSuccessMessage('PDF added successfully!');
        console.log('Base64 Preview:', base64Data.slice(0, 100) + '...');
      }
    };

    // Error handling
    reader.onerror = (error) => {
      toast.error('Error reading file.');
      console.error('FileReader error:', error);
    };

    reader.readAsDataURL(selectedFile); // triggers the above events
  };

  const handleAnalyze = async () => {
    if (!fileBase64 || !fileName) {
      toast.error('Please add a PDF, DOCX, or TXT file to analyze.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await docsAnalyzerService(fileBase64, uid, instructions);
      console.log('API response:', response);
      const dataObject = {
        ...response.data,
        instructions: instructions,
        createdAt: new Date().toISOString(),
      };
      await recordAnalyzerData({ uid, analyzerData: response.data, instructions: instructions });
      setResult(dataObject);
      setAnalysisHistory([dataObject, ...analysisHistory]);
      setAddNewPDFBtnVisible(true);
      setHistoryBtnVisible(true);
      setShowAnalysisHistory(false);
      setProgress(0);
      setFileName('');
      setInstructions('');
      setFileBase64('');
      setSuccessMessage('');
    } catch (err) {
      console.log('>>Error:', err);
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
          console.log("records: >>>", records);
          if (isMounted) {
            setAnalysisHistory(records); // only update if component still mounted
            setHistoryBtnVisible(records.length > 0);
          }
        }
      } catch (err) {
        console.error(err);
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
    console.log("Full record data:", record);
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
    setFileBase64('');
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
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Document Analyzer"
      />
       <Loader show={isLoading} />
      
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">Document Analyzer</h1>
            </div>
          </div>

          <div className="sticky top-0 z-10 flex justify-center gap-3">
            {addNewPDFBtnVisible && (
            <button
              onClick={onAddNewPDF}
              className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:bg-white-light dark:text-black dark:hover:bg-gray dark:hover:text-white-light"
            >
              <FaFilePdf /> Add New PDF
            </button>
            )}
            {historyBtnVisible && (
            <button
              onClick={onShowAnalysisHistory} 
              className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white cursor-pointer bg-[#035F92] hover:bg-[#024b70]" 
            >
              <FaHistory />  Show Analysis History
            </button> 
            )}
          </div>
        </div>
      </div>
      {!showAnalysisHistory && (
          <> 
            {!result && (
              <> 
                <div className="flex items-center justify-center mt-10">
                  <div className="w-3/4 h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer relative hover:border-blue-500 transition">
                      <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {!fileName && (
                      <div className="flex flex-col items-center text-gray-500">
                          <AiOutlinePlus className="text-4xl mb-2" />
                          <span>Add VA Decision PDF</span>
                      </div>
                      )}

                      {fileName && (
                      <div className="flex flex-col items-center w-full px-4">
                          <div className="mb-2 text-gray-700 font-medium dark:text-white-light">{fileName}</div>
                          <div className="w-1/2 bg-gray-200 h-4 rounded-lg mb-1">
                          <div 
                              className="bg-primary h-4 rounded-lg" 
                              style={{ width: `${progress}%` }}
                          />
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{progress}%</div>
                          {successMessage && <div className="text-green-600 font-semibold">{successMessage}</div>}
                      </div>
                      )}
                  </div>
                </div>
                {progress === 100 && (
                  <div className="mt-6 w-3/4 mx-auto">
                    <h2 className="text-lg font-medium mb-2 text-gray-700 dark:text-white-light">
                      Enter any instructions (optional)
                    </h2>
                    
                    <textarea
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white-light"
                      placeholder="Type your instructions here..."
                      value={instructions} 
                      onChange={(e) => setInstructions(e.target.value)}
                    />


                    <button
                      className="mt-3 w-full bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition"
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
                <div className="p-5 bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">General Information</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Decision Type:</span> {result.general_info.decision_type}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Date:</span> {result.general_info.date}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-bold">Issuing Authority:</span> {result.general_info.issuing_authority}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    {result.general_info.summary}
                  </p>
                </div>

                {/* ===== Issues Section ===== */}
                <div className="space-y-5 bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-10">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Issues</h2>
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold text-primary dark:text-blue-400 mb-2">
                          {issue.condition}
                        </h3>
                        <p
                            className={`text-sm font-medium italic px-2 py-1 rounded-md inline-block my-2
                              ${
                                issue.status === 'Granted'
                                  ? 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40'
                                : issue.status === 'Denied'
                                  ? 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40'
                                : issue.status === 'Deferred'
                                  ? 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/40'
                                : 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800/40'
                              }
                            `}
                          >
                            Status: {issue.status}
                        </p>

                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line">
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
                                  window.open(`${window.location.origin}${matchedForm.formUrl}`, '_blank');
                                } else {
                                  toast.warning('Form route not found for this action.');
                                }
                              }}
                              className="px-4 py-2 rounded-lg text-white bg-primary hover:bg-primaryHover transition"
                            >
                              {rec.formTitle || matchedForm?.formTitle || 'Open Form'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
      )}

      {showAnalysisHistory && (
        <>  
         {analysisHistory.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 italic">
            No analysis done yet. Please analyze a PDF to see the history.
          </div> 
        ):(
          <div className="mt-6 space-y-4">
            {analysisHistory.map((record, index) => {
              const info = record?.general_info || {};
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-sm gap-5"
                >
                  <div className="flex items-start gap-3">
                    <FaHistory className="text-primary text-3xl" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {info.decision_type || "Unknown Decision"}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {info.date ? `Date: ${info.date}` : "No date available"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {info.issuing_authority ||
                          "Issuing authority not available"}
                      </p>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {info.summary || "No summary available"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(record)}
                    className="flex items-center gap-2 mt-3 sm:mt-0 bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    View Details
                    <FaArrowRight />
                  </button>
                </div>
              );
            })}
          </div>)}
        </>
      )}


    </FrontLayout>
  );
};

export default AnalyzeUI;

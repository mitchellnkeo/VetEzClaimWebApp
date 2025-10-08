import FrontLayout from '@/components/layouts/FrontLayout';
import { useRouter } from 'next/router';
import { getFormHistory } from '@/firebase/firebaseOperations';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loader from '@/components/Common/Loader'; 
import { getFaxStatus } from '@/services/faxPdfService';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { toast } from 'react-toastify';

export default function History() {
  const router = useRouter();
  const { user, uid } = useSelector((state) => state.auth);
  const [historyData, setHistoryData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState([]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const history = await getFormHistory(uid);
      console.log('history:', history);
      setHistoryData(history);
    } catch (error) {
      console.error('Error fetching in-progress forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!uid) return;
    fetchHistory();
  }, [uid]);

  const getStatus = (item) => {
    if (item?.guid) {
      return {
        text: `Submitted To ${
          item?.formId === "NOA" || item?.formId === "Fee Waiver"
            ? "Court"
            : "VA"
        }`,
        color: "text-green-600 font-bold",
      };
    } else if (item?.pdf === true) {
      return { text: "Generated PDF", color: "text-orange-600 font-bold" };
    } else {
      return { text: "In Progress", color: "text-blue-600 font-bold" };
    }
  };

  const getPdfStatus = async (item) => {
    setIsLoading(true);
    const pdfStatus = await getFaxStatus(item?.guid);
    if( pdfStatus.Status === 'Success') {
        console.log('pdfStatus => ', pdfStatus.Result);
        const fields = [
            { label: "File Name", value: pdfStatus.Result?.FileName || '' },
            { label: "Status", value: pdfStatus.Result?.SentStatus || '' },
            { label: "Date Queued", value: pdfStatus.Result?.DateQueued || '' },
            { label: "Date Sent", value: pdfStatus.Result?.DateSent || '' },
            { label: "To Fax Number", value: pdfStatus.Result?.ToFaxNumber || '' },
            { label: "Pages", value: pdfStatus.Result?.Pages || '' },
            { label: "Duration", value: pdfStatus.Result?.Duration || '' },
            { label: "Size", value: pdfStatus.Result?.Size || '' },
          ];
          console.log('fields => ', fields);
        setShowReceipt(true);
        setReceiptData(fields);
    }else {
        toast.error('Error getting PDF status');
    }
    setIsLoading(false);
  };


  return (
    <FrontLayout title="History">
      <Loader show={isloading} />
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle={showReceipt ? "Receipt" : "History"}
      />
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl dark:text-white-light">{showReceipt ? "Receipt" : "History"}</h1>

         </div>
          </div>
        </div>
      </div>
      {!showReceipt ? (
      <div className="mt-10 space-y-4">
        {historyData.length > 0 ? (
         
            <div className="mt-6 space-y-4">
            {historyData.map((item, index) => {
             const status = getStatus(item);
            return (
                
                <div
                key={index}
                className="mx-auto flex justify-between items-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm pr-10 pl-5 dark:bg-gray-800 dark:border-gray-700 dark:text-white-light"
              >
              
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white-light">
                    {item.formTitle}
                  </span>
              {item.timestamp !== '-'? (
                <span className="text-sm font-semibold text-gray-800 dark:text-white-light">
                  Date Submitted: {item.timestamp}
                </span>
              ) : (
                <span className="text-sm italic text-gray-500">
                  Not submitted yet
                </span>
              )}

              {/* Status */}
              <span className={`text-sm mt-1 ${status.color}`}>
                {status.text}
              </span>
                </div>
      
            
                <button
            
                  disabled={!item?.guid}
                  onClick={() =>
                    getPdfStatus(item)
                  }
                  className={`text-sm font-medium ${
                    item?.guid
                      ? "text-blue-600 hover:underline dark:text-white-light"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Open
                </button>
              </div>
            )})}
          </div>
          
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white-light">
            No history found
          </div>
        )}
      </div>
      ) : (
        <>
         {showReceipt && (
            <div className="mt-10 mb-2">
                <button
                type="button"
                onClick={() => setShowReceipt(false)}
                className="text-green-500 font-bold hover:text-green-700 flex items-center gap-2 dark:text-white-light"
                >
                {/* Back arrow icon */}
                <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
                <span>Back to History</span>
                </button>
                </div>
            )}
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white-light">
        
        {receiptData.map((field, index) => (
            <div
                key={`receipt${index}`}
                className="flex justify-between border-b border-gray-200 py-2 dark:text-white-light dark:border-gray-700"
            >
                <p className="text-sm font-semibold text-gray-700 dark:text-white-light">{field.label}</p>
                <p className="text-sm text-gray-900 dark:text-white-light dark:text-white-light">
                {field.value ?? "—"}
                </p>
            </div>
            ))}



        </div>
        </>
        
      )}


    </FrontLayout>
  );
}

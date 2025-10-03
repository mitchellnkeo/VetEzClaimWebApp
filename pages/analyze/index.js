import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FrontLayout from '@/components/layouts/FrontLayout';
import Breadcrumb from '@/components/Common/Breadcrumb';
import { useSelector } from 'react-redux';
import  {toast} from 'react-toastify';
import { AiOutlinePlus } from 'react-icons/ai';

const CalculatorsMenu = () => {
  const router = useRouter();
  const { isSubscribed } = useSelector((state) => state.revenueCat);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF, DOCX, or TXT files are allowed.');
      return;
    }

    setFileName(file.name);
    setSuccessMessage('');
    setProgress(0);

    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        setProgress(pct);
      }
    };

    reader.onloadend = () => {
      setProgress(100);
      setSuccessMessage(`${file.type.includes('pdf') ? 'PDF' : file.type.includes('wordprocessingml.document') ? 'DOCX' : 'TXT'} added successfully!`);
      console.log('File selected:', file.name);
    };

    reader.readAsArrayBuffer(file); // triggers onprogress
  };


  return (
    <FrontLayout title="Document Analyzer">
      <Breadcrumb
        preUrl="/"
        preTitle="Home"
        currentTitle="Document Analyzer"
      />
      
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl dark:text-white-light">Document Analyzer</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="w-96 h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer relative hover:border-blue-500 transition">
            <input 
            type="file" 
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {!fileName && (
            <div className="flex flex-col items-center text-gray-500">
                <AiOutlinePlus className="text-4xl mb-2" />
                <span>Add PDF, DOCX or TXT</span>
            </div>
            )}

            {fileName && (
            <div className="flex flex-col items-center w-full px-4">
                <div className="mb-2 text-gray-700 font-medium">{fileName}</div>
                <div className="w-full bg-gray-200 h-4 rounded mb-1">
                <div 
                    className="bg-blue-500 h-4 rounded" 
                    style={{ width: `${progress}%` }}
                />
                </div>
                <div className="text-sm text-gray-600 mb-2">{progress}%</div>
                {successMessage && <div className="text-green-600 font-semibold">{successMessage}</div>}
            </div>
            )}
        </div>
      </div>

    </FrontLayout>
  );
};

export default CalculatorsMenu;

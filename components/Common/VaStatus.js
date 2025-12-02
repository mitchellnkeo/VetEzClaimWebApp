import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const VaStatus = ({ row }) => {
  const [statusData, setStatusData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(null);

  process.env.NODE_ENV === 'development' && console.log('row:', row);

  const getFaxDetails = async () => {
    setLoadingStatus(true);

    const url = 'https://secure.srfax.com/SRF_SecWebSvc.php';
    const postVariables = {
      action: 'Retrieve_Fax',
      access_id: publicRuntimeConfig.access_id, // Replace with your actual access ID
      access_pwd: publicRuntimeConfig.access_password, // Replace with your actual password
      sFaxDetailsID: row.guid,
      sDirection: 'OUT',
    };

    try {
      const response = await axios.post(
        url,
        new URLSearchParams(postVariables),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const decodedResult = response.data.Result
        ? atob(response.data.Result) // Decodes base64-encoded PDF content
        : null;

      if (decodedResult) {
        // Create a Blob from the decoded PDF and trigger a download
        const blob = new Blob([decodedResult], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${row.guid}_FaxDetails.pdf`;
        link.click();
      } else {
        throw new Error('Failed to retrieve or decode the fax file.');
      }

      setStatusData(response.data);
    } catch (err) {
      setError(err.message || 'Error fetching fax details');
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    if (row.guid) {
      getFaxDetails();
    }
  }, [row.guid]);

  if (!row.guid) {
    return <span className="text-danger">Failed</span>;
  }

  if (loadingStatus) {
    return (
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin text-success"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  }

  if (error) {
    return (
      <>
        <span className="text-danger">Error loading status</span>{' '}
        <span className="cursor-pointer underline" onClick={getFaxDetails}>
          Retry
        </span>
      </>
    );
  }

  if (statusData) {
    return <span className="text-success">Success! File downloaded.</span>;
  }

  return <span className="text-danger">Failed to get status</span>;
};

export default VaStatus;

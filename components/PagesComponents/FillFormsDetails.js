import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import VaStatus from '@/components/Common/VaStatus';

const FillFormsDetails = ({ data }) => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  // Keys to exclude from form details
  const excludeKeys = [
    'userId',
    'id',
    'guid',
    'type',
    'pdf',
    'emailE',
    'status',
    'timestamp',
    'urlDocspring',
  ];

  // Define columns for the DataTable
  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
      width: '60px',
      sortable: true,
    },
    {
      name: 'Form Details',
      cell: (row) => {
        const formDetails = Object.entries(row).filter(
          ([key]) => !excludeKeys.includes(key) && row[key]
        );

        return (
          <ul className="my-2">
            {formDetails.map(([key, value]) => (
              <li key={key} className="capitalize">
                <span>{key}: </span>
                <strong>{value.toString()}</strong>
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      name: 'VA Status',
      selector: (row) => (row.guid ? 'Success' : 'Failed'),
      cell: (row) => <VaStatus row={row} />,
      sortable: true,
    },
  ];

  return (
    <div className="w-full">
      <h2 className="mb-2">Total Fill Forms: {data.length}</h2>
      <DataTable
        columns={columns}
        data={data}
        keyField="id" // Ensure each row has a unique key
        highlightOnHover
        pagination
        defaultSortFieldId={1} // Default sorting by No.
      />
    </div>
  );
};

export default FillFormsDetails;

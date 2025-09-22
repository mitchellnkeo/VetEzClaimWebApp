import React from 'react';
import DataTable from 'react-data-table-component';
import VaStatus from '@/components/Common/VaStatus';

const RequestFilesDetails = ({ data }) => {
  const excludeKeys = [
    'id',
    'guid',
    'status',
    'pdf',
    'type',
    'timestamp',
    'userId',
    'urlDocspring',
  ];

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
          ([key, value]) => !excludeKeys.includes(key) && value
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
      cell: (row) => <VaStatus row={row} />,
      sortable: true,
    },
  ];

  return (
    <div className="w-full">
      <h2 className="mb-2">Total Request Files: {data.length}</h2>
      <DataTable
        columns={columns}
        data={data}
        keyField="id"
        highlightOnHover
        pagination
        defaultSortFieldId={1}
      />
    </div>
  );
};

export default RequestFilesDetails;

import React from 'react';
import DataTable from 'react-data-table-component';
import VaStatus from '@/components/Common/VaStatus';

const MiscFormsDetails = ({ data }) => {
  const renderNestedArray = (nestedArray) => {
    return (
      <ul className="my-2">
        {nestedArray.map((item, index) => (
          <li key={index}>
            {Object.entries(item).map(
              ([key, value]) =>
                value && (
                  <div key={key}>
                    <strong>{key}: </strong> {value.toString().toUpperCase()}
                  </div>
                )
            )}
          </li>
        ))}
      </ul>
    );
  };

  const excludeKeys = [
    'id',
    'employer',
    'employmentStatement',
    'medicalProvider',
    'userId',
    'guid',
    'status',
    'pdf',
    'type',
    'timestamp',
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
            {row.employer && (
              <li>
                <strong>Employer:</strong>
                {renderNestedArray(row.employer)}
              </li>
            )}
            {row.employmentStatement && (
              <li>
                <strong>Employment Statement:</strong>
                {renderNestedArray(row.employmentStatement)}
              </li>
            )}
            {row.medicalProvider && (
              <li>
                <strong>Medical Provider:</strong>
                {renderNestedArray(row.medicalProvider)}
              </li>
            )}
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
      <h2 className="mb-2">Total Misc Forms: {data.length}</h2>
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

export default MiscFormsDetails;

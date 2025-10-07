import React from 'react';

const DropDown = ({ data, value, onChange, label, id, name }) => {
  return (
    <div className="mb-4 dark:text-white-light">
      {label && <label htmlFor={id || name}>{label}</label>}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-input mt-1 block w-full dark:bg-gray-600 dark:text-white-light"
      >
        <option value="">Select</option>
        {data.map((item, index) => {
          let displayName, val;

          if (typeof item === 'string') {
            displayName = val = item;
          } else {
            displayName = item.name;
            val = item.abbreviation || item.name;
          }

          return (
            <option key={index} value={val}>
              {displayName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;

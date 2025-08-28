import React from 'react';
import { useField } from 'formik';

const DropDownExtended = ({
  label,
  fieldCounter, // e.g., "2 of 13"
  hasCounter = false,
  data = [],
  hintsMessage,
  ...props
}) => {
  const [field, meta] = useField(props);
  const error = meta.touched && meta.error;

  return (
    <div>
      {/* Label + Top Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px',
        }}
      >
        {label && (
          <label
            htmlFor={props.id || props.name}
            style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
          >
            {label}
          </label>
        )}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {fieldCounter && (
            <span style={{ fontSize: '12px', color: '#999' }}>
              {fieldCounter}
            </span>
          )}
        </div>
      </div>

      {/* Select Dropdown */}
      <select
        {...field}
        {...props}
        id={props.id || props.name}
        value={field.value}
        onChange={(e) => field.onChange(e)}
        style={{
          width: '100%',
          borderBottom: '1px solid #ccc',
          fontSize: '14px',
          padding: '6px 4px',
        }}
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

      {/* Error + Field Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        <div>
          {hintsMessage && (
            <span style={{ fontSize: '12px', color: '#20c997' }}>
              <p> {hintsMessage}</p>
            </span>
          )}
          {error && (
            <span style={{ fontSize: '12px', color: 'red' }}>
              {' '}
              <p> {error}</p>{' '}
            </span>
          )}
        </div>
        {hasCounter && (
          <div>
            <span style={{ fontSize: '12px', color: '#999' }}>
              {field.value ? field.value.length : 0}/{data.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownExtended;

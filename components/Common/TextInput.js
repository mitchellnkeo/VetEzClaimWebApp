import React from 'react';
import { useField } from 'formik';

export default function TextInput({
  label,
  fieldCounter, // new prop: e.g., "2 of 13"
  hasCounter = false,
  limit = 100,
  multiline = false,
  placeholder = '',
  readOnly = false,
  ...props
}) {
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
        <label
          htmlFor={props.id || props.name}
          style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
        >
          {label}
        </label>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Field counter prop */}
          {fieldCounter && (
            <span style={{ fontSize: '12px', color: '#999' }}>
              {fieldCounter}
            </span>
          )}
        </div>
      </div>

      {!multiline ? (
        <input
          {...field}
          {...props}
          id={props.id || props.name}
          maxLength={limit}
          placeholder={placeholder}
          className={`form-input w-full border-b border-gray-300 text-sm px-3 py-2
            ${readOnly ? 'text-gray-500 bg-gray-100' : 'text-black bg-white'} 
            dark:bg-gray-600 dark:text-white-light form-input`}
          readOnly={readOnly}
        />
      ) : (
        <textarea
          {...field}
          {...props}
          id={props.id || props.name}
          maxLength={limit}
          placeholder={placeholder}
          rows={4}
          className={`form-textarea dark:text-white-light
            w-full
            border
            border-gray-300
            rounded-md
            text-sm
            p-2
            ${readOnly ? 'text-gray-500 bg-gray-100' : 'text-black bg-white'}
          `}
          readOnly={readOnly}
        />
      )}


      {/* Error + Character Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        <div>
          {error && (
            <span style={{ fontSize: '12px', color: 'red' }}>{error}</span>
          )}
        </div>
        {hasCounter && (
          <div>
            <span style={{ fontSize: '12px', color: '#999' }}>
              {field.value ? field.value.length : 0}/{limit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

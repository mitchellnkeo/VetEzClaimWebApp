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
    <div style={{ width: '90%', margin: '10px auto' }}>
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
          style={{ fontSize: '14px', color: '#4361ee', fontWeight: 500 }}
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

      {/* Input / Textarea */}
      {!multiline ? (
        <input
          {...field}
          {...props}
          id={props.id || props.name}
          maxLength={limit}
          placeholder={placeholder}
          style={{
            width: '100%',
            borderBottom: '1px solid #ccc',
            fontSize: '14px',
            padding: '6px 4px',
          }}
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
          style={{
            width: '100%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            padding: '8px',
          }}
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

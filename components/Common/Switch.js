import React from 'react';
import { useField } from 'formik';

export default function Switch({ label, ...props }) {
  const [field, , helpers] = useField({ ...props, type: 'checkbox' });

  const handleChange = (e) => {
    helpers.setValue(e.target.checked);
  };

  return (
    <div
      style={{
        width: '90%',
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Label */}
      <label
        htmlFor={props.id || props.name}
        style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
      >
        {label}
      </label>

      {/* Switch */}
      <label
        className="switch"
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '40px',
          height: '20px',
        }}
      >
        <input
          type="checkbox"
          id={props.id || props.name}
          checked={field.value || false}
          onChange={handleChange}
          style={{ opacity: 0, width: 0, height: 0 }}
        />
        <span
          style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: field.value ? '#4caf50' : '#ccc',
            transition: '.4s',
            borderRadius: '20px',
          }}
        >
          <span
            style={{
              position: 'absolute',
              height: '16px',
              width: '16px',
              left: field.value ? '20px' : '2px',
              bottom: '2px',
              backgroundColor: 'white',
              transition: '.4s',
              borderRadius: '50%',
            }}
          ></span>
        </span>
      </label>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useField, Field } from 'formik';

export default function DateSelectorExtended({
  name,
  label,
  fieldCounter, // new prop: "2 of 13"
  value,
  onChange,
  hintsMessageText,
  editable = true,
  allowFutureDates = false,
  isDOB = false,
  placeholder = 'MM/DD/YYYY',
  referenceDate,
  allowRange = false,
  isStartDate = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = 'text-red-500',
  hintClassName = 'text-yellow-600',
}) {
  const [field, meta, helpers] = useField(name);
  const errorMessage = meta.touched && meta.error;
  const [dateValue, setDateValue] = useState(
    value ? moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD') : ''
  );

  const today = new Date();
  let maxDate;
  let minDate;

  if (isDOB) {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    maxDate = moment(eighteenYearsAgo).format('YYYY-MM-DD');
    minDate = moment(today).subtract(120, 'years').format('YYYY-MM-DD');
  } else if (
    allowRange &&
    referenceDate &&
    moment(referenceDate, 'MM/DD/YYYY', true).isValid()
  ) {
    if (isStartDate) {
      maxDate = moment(referenceDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
    } else {
      minDate = moment(referenceDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
    }
    if (!allowFutureDates && !maxDate) {
      maxDate = moment(today).format('YYYY-MM-DD');
    }
  } else {
    maxDate = allowFutureDates ? undefined : moment(today).format('YYYY-MM-DD');
  }

  useEffect(() => {
    if (value && moment(value, 'MM/DD/YYYY', true).isValid()) {
      setDateValue(moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD'));
    } else {
      setDateValue('');
    }
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val && moment(val, 'YYYY-MM-DD', true).isValid()) {
      onChange(moment(val).format('MM/DD/YYYY'));
    } else {
      onChange('');
    }
    setDateValue(val);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label + Field Counter */}
      {label && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
          }}
          className={labelClassName}
        >
          <label
            htmlFor={name}
            style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
          >
            {label}
          </label>
          {fieldCounter && (
            <span style={{ fontSize: '12px', color: '#999' }}>
              {fieldCounter}
            </span>
          )}
        </div>
      )}

      {/* Date Input */}
      <Field
        type="date"
        id={name}
        name={name}
        value={dateValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={!editable}
        max={maxDate}
        min={minDate}
        className={`form-input w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${inputClassName}`}
      />

      {/* Hint / Error */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',
        }}
      >
        <div>
          {errorMessage && (
            <span style={{ fontSize: '12px', color: 'red' }}>
              {errorMessage}
            </span>
          )}
        </div>
        {hintsMessageText && (
          <span style={{ fontSize: '12px', color: '#999' }}>
            {hintsMessageText}
          </span>
        )}
      </div>
    </div>
  );
}

DateSelectorExtended.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fieldCounter: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hintsMessageText: PropTypes.string,
  editable: PropTypes.bool,
  allowFutureDates: PropTypes.bool,
  isDOB: PropTypes.bool,
  placeholder: PropTypes.string,
  referenceDate: PropTypes.string,
  allowRange: PropTypes.bool,
  isStartDate: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  hintClassName: PropTypes.string,
};

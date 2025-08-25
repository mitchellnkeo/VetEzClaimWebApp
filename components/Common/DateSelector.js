import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Field } from 'formik';

export default function DateSelector({
  name,
  label,
  value,
  onChange,
  errorMessage,
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
  const [dateValue, setDateValue] = useState(
    value ? moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD') : ''
  );

  // Calculate min and max dates
  const today = new Date();
  let maxDate;
  let minDate;

  if (isDOB) {
    // For DOB, max date is 18 years ago from today
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    maxDate = moment(eighteenYearsAgo).format('YYYY-MM-DD');
    minDate = moment(today).subtract(120, 'years').format('YYYY-MM-DD'); // Reasonable min for DOB
  } else if (
    allowRange &&
    referenceDate &&
    moment(referenceDate, 'MM/DD/YYYY', true).isValid()
  ) {
    // Handle date range logic
    if (isStartDate) {
      maxDate = moment(referenceDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
    } else {
      minDate = moment(referenceDate, 'MM/DD/YYYY').format('YYYY-MM-DD');
    }
    if (!allowFutureDates && !maxDate) {
      maxDate = moment(today).format('YYYY-MM-DD');
    }
  } else {
    // Default case: no future dates unless allowed
    maxDate = allowFutureDates ? undefined : moment(today).format('YYYY-MM-DD');
  }

  useEffect(() => {
    if (value && moment(value, 'MM/DD/YYYY', true).isValid()) {
      var formattedDate = moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD');
      setDateValue(formattedDate);
    } else {
      setDateValue('');
    }
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;

    if (val && moment(val, 'YYYY-MM-DD', true).isValid()) {
      const formattedDate = moment(val).format('MM/DD/YYYY');
      onChange(formattedDate);
    } else {
      onChange('');
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Field
        type="date"
        id={name}
        name={name}
        value={dateValue}
        onChange={handleChange}
        placeholder=""
        disabled={!editable}
        max={maxDate}
        min={minDate}
        className={`form-input w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${inputClassName}`}
      />
      {hintsMessageText && (
        <p className={`mt-1 text-sm ${hintClassName}`}>{hintsMessageText}</p>
      )}
      {errorMessage && (
        <p className={`mt-1 text-sm ${errorClassName}`}>{errorMessage}</p>
      )}
    </div>
  );
}

DateSelector.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
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

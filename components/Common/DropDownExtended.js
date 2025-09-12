import React from 'react';
import { useField } from 'formik';

const DropDownExtended = ({
  label,
  name,
  fieldCounter,
  hasCounter = false,
  data = [],
  hintsMessage,
  isTextFieldEnabled = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { value, onBlur } = field;
  const { setValue } = helpers;
  const error = meta.touched && meta.error;

  const handleSelect = (val) => {
    setValue(val);
  };

  return (
    <div>
      {/* Label + Counter */}
      <div className="mb-1 flex justify-between">
        {label && (
          <label
            htmlFor={props.id || name}
            className="text-sm font-medium text-blue-800"
          >
            {label}
          </label>
        )}
        {fieldCounter && (
          <span className="text-xs text-gray-500">{fieldCounter}</span>
        )}
      </div>

      {/* Input + Dropdown */}
      {isTextFieldEnabled ? (
        <div className="flex items-center gap-2">
          <textarea
            {...field}
            id={props.id || name}
            value={value || ''}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            placeholder="Enter or select"
            className="flex-1 rounded-md border border-gray-300 p-2 text-sm"
          />

          <select
            value=""
            onChange={(e) => handleSelect(e.target.value)}
            className="w-24 rounded-md border border-gray-300 p-1 text-sm"
          >
            <option value="" disabled hidden>
              Select
            </option>
            {data.map((item, index) => {
              let displayName, val;
              if (typeof item === 'string') {
                displayName = val = item;
              } else {
                displayName = item.option || item.name;
                val = item.value || item.option || item.name;
              }
              return (
                <option key={index} value={val}>
                  {displayName}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <select
          {...field}
          {...props}
          id={props.id || name}
          className="w-full border-b border-gray-300 p-1 text-sm"
        >
          <option value="">Select</option>
          {data.map((item, index) => {
            let displayName, val;
            if (typeof item === 'string') {
              displayName = val = item;
            } else {
              displayName = item.option || item.name;
              val = item.abbreviation ||item.value || item.option || item.name ;
            }
            return (
              <option key={index} value={val}>
                {displayName}
              </option>
            );
          })}
        </select>
      )}

      {/* Error + Hints + Counter */}
      <div className="mt-1 flex justify-between">
        <div>
          {hintsMessage && (
            <p className="text-xs text-green-500">{hintsMessage}</p>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        {hasCounter && (
          <div>
            <span className="text-xs text-gray-500">
              {value ? value.length : 0}/{data.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownExtended;

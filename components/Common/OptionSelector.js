import React, { useEffect, useState } from 'react';
import { useField } from 'formik';

export default function OptionSelector({
  label,
  name,
  options = [], // [{ option: 'Option 1', isSelected: false }]
  multiSelect = false,
  isOtherAllowed = false,
  fieldCounter,
  hasCounter = false,
  hintsMessage,
  onSelectionChange,
  lockOption = false,
}) {
  const [field, meta, helpers] = useField(name);
  const [localOptions, setLocalOptions] = useState([]);
  const [otherText, setOtherText] = useState('');

  useEffect(() => {
    if (field.value && field.value.length) {
      if (JSON.stringify(localOptions) !== JSON.stringify(field.value)) {
        setLocalOptions(field.value);
      }
  
      const other = field.value.find((o) => (o.option === 'Other' || o.option === 'OTHER'));
      if (other && other.value && other.value !== otherText) {
        setOtherText(other.value);
      }
    } else {
      if (JSON.stringify(localOptions) !== JSON.stringify(options)) {
        setLocalOptions(options);
      }
    }
  }, [field.value, options]);
  

  const triggerCallback = (updatedOptions) => {
    if (onSelectionChange) {
      onSelectionChange(updatedOptions);
    }
  };

  const handleSelect = async (selectedOption) => {
    if (lockOption) return;
    let updatedOptions;
    if (multiSelect) {
      updatedOptions = localOptions.map((o) =>
        o.option === selectedOption ? { ...o, isSelected: !o.isSelected } : o
      );
    } else {
      updatedOptions = localOptions.map((o) => ({
        ...o,
        isSelected: o.option === selectedOption && !o.isSelected,
      }));
    }

    setLocalOptions(updatedOptions);
    await helpers.setValue(updatedOptions);
    triggerCallback(updatedOptions);
  };

  const handleOtherCheck = async () => {
    if (lockOption) return;
    let updatedOptions = [...localOptions];
    const otherIndex = updatedOptions.findIndex((o) => (o.option === 'Other' || o.option === 'OTHER'));
    if (otherIndex === -1) {
      updatedOptions.push({
        option: 'Other',
        isSelected: true,
        value: otherText,
      });
    } else {
      updatedOptions[otherIndex].isSelected = !updatedOptions[otherIndex].isSelected;
      if (!updatedOptions[otherIndex].isSelected) {
        updatedOptions[otherIndex].value = '';
      }
    }
    setLocalOptions(updatedOptions);
    await helpers.setValue(updatedOptions);
    triggerCallback(updatedOptions);
  };

  const handleOtherText = async (text) => {
    setOtherText(text);
    const updatedOptions = localOptions.map((o) =>
      (o.option === 'Other' || o.option === 'OTHER')
        ? { ...o, value: text, isSelected: true }
        : o
    );
    setLocalOptions(updatedOptions);
    await helpers.setValue(updatedOptions);
    triggerCallback(updatedOptions);
  };

  const error = meta.touched && meta.error;

  return (
    <div>
      {/* Label + Counter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px',
        }}
      >
        {label && (
          <label
            htmlFor={name}
            style={{ fontSize: '14px', color: '#035F92', fontWeight: 500 }}
          >
            {label}
          </label>
        )}
        {fieldCounter && (
          <span style={{ fontSize: '12px', color: '#999' }}>
            {fieldCounter}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="flex flex-col gap-1">
        {localOptions.map((o, i) => (
          <div key={i} className="items-top flex gap-2">
            <input
              type="checkbox"
              checked={o.isSelected}
              onChange={() => handleSelect(o.option)}
              className="form-checkbox"

            />
            <label className="dark:text-white-light">{o.option}</label>
            {((o.option === 'Other' || o.option === 'OTHER') && o.isSelected) && (
              <input
                type="text"
                value={otherText}
                onChange={(e) => handleOtherText(e.target.value)}
                placeholder="Specify Other.."
                className="ml-5 rounded border p-1 form-input px-3 py-2"

              />
            )}
          </div>
        ))}

        {/* If Other is allowed but not already in options */}
        {isOtherAllowed && !localOptions.find((o) => (o.option === 'Other' || o.option === 'OTHER')) && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={false}
              onChange={handleOtherCheck}
            />
            <label className="dark:text-white-light">Other</label>
            {otherText && (
              <input
                type="text"
                value={otherText}
                onChange={(e) => handleOtherText(e.target.value)}
                placeholder="Specify Other.."
                className="ml-2 rounded border p-1 form-input px-3 py-2"
              />
            )}
          </div>
        )}
      </div>

      {/* Error + Hint */}
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
        <div>
          {hintsMessage && (
            <span style={{ fontSize: '12px', color: '#0d6efd' }}>
              {hintsMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

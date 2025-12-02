import React, { useRef, useState, useEffect } from 'react';
import SignatureScreen from 'react-signature-canvas';
import { Trash2, ArrowLeft, Pen } from 'lucide-react';

const SignatureField = ({
  value,
  onChange,
  imgWidth = 500,
  imgHeight = 250,
  editMode = false, // parent can toggle this when "Update" is pressed
}) => {
  const sigPadRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [signatureValue, setSignatureValue] = useState(null);
  1;
  // Sync with parent "editMode"
  useEffect(() => {
    setIsEditing(editMode);
  }, [editMode]);

  const handleClear = () => {
    if (!sigPadRef.current) return;
    sigPadRef.current.clear();
    onChange('');
  };

  const handleEnd = () => {
    if (!sigPadRef.current) return;
    const dataURL = sigPadRef.current.toDataURL('image/png'); // better than svg
    process.env.NODE_ENV === 'development' && console.log('dataURL: ', dataURL);
    onChange(dataURL);
  };

  const handleAddNew = () => {
    setIsEditing(true);
    onChange(''); // start blank
    if (sigPadRef.current) sigPadRef.current.clear();
  };

  const handleBack = () => {
    setIsEditing(false);
    onChange(signatureValue);
  };

  // Load existing signature when switching back to edit mode
  useEffect(() => {
    if (value && !isEditing) {
      setSignatureValue(value);
    }
    if (value && sigPadRef.current && isEditing) {
      sigPadRef.current.fromDataURL(value, {
        width: imgWidth,
        height: imgHeight,
        ratio: 1,
      });
    }
  }, [value, isEditing, imgWidth, imgHeight]);

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Signature box */}
      <div
        className="relative flex items-center justify-center rounded-md border border-gray-300 bg-white"
        style={{ width: imgWidth, height: imgHeight }}
      >
        {isEditing ? (
          <>
            <SignatureScreen
              ref={sigPadRef}
              penColor="black"
              canvasProps={{
                width: imgWidth,
                height: imgHeight,
                className: 'rounded-md',
              }}
              onEnd={handleEnd}
            />

            {/* Buttons in edit mode */}
            <div className="absolute right-2 top-2 flex gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                aria-label="Clear signature"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="rounded bg-gray-500 p-2 text-white hover:bg-gray-600"
                aria-label="Back to view"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            {value ? (
              <div className="w-full rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
                <img
                  src={value}
                  alt="Signature"
                  className="h-auto w-full rounded-lg bg-white object-contain"
                />
              </div>
            ) : (
              <span className="text-sm text-gray-400">
                No signature found… Add One
              </span>
            )}

            {/* Add New button in view mode */}
            <button
              type="button"
              onClick={handleAddNew}
              className="absolute right-2 top-2 rounded bg-primary p-2 text-white hover:bg-primaryHover"
              aria-label="Add new signature"
            >
              {/* <Plus className="h-5 w-5" /> */}
              <Pen className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignatureField;

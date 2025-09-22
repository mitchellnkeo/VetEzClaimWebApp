import React, { useRef, useEffect } from 'react';
import SignatureScreen from 'react-signature-canvas';
import { Trash2 } from 'lucide-react';

const SignatureField = ({
  value,
  onChange,
  imgWidth = 500,
  imgHeight = 250,
}) => {
  const sigPadRef = useRef(null);

  const handleClear = () => {
    sigPadRef.current.clear();
    onChange('');
  };

  const handleEnd = () => {
    const dataURL = sigPadRef.current.toDataURL('image/svg+xml');
    onChange(dataURL);
  };

  // Load existing value into the pad if present
  useEffect(() => {
    if (value && sigPadRef.current) {
      sigPadRef.current.fromDataURL(value);
    }
  }, [value]);

  return (
    <div className="relative flex w-full items-center justify-center">
      {/* Signature box */}
      <div
        className="relative rounded-md border border-gray-300"
        style={{ width: imgWidth, height: imgHeight }}
      >
        {/* Signature Pad */}
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

        {/* Clear button (top-right) */}
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-2 rounded bg-red-500 p-2 text-white hover:bg-red-600"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SignatureField;

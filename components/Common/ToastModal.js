import React from 'react';

export default function ToastModal({
  isOpen,
  title,
  message,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        {/* Title */}
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}

        {/* Message */}
        {message && <p className="mb-6 text-sm">{message}</p>}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          {secondaryButtonText && secondaryButtonAction && (
            <button
              className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
              onClick={secondaryButtonAction}
            >
              {secondaryButtonText}
            </button>
          )}

          {primaryButtonText && primaryButtonAction && (
            <button
              className="rounded bg-[#206092] px-4 py-2 text-white hover:bg-[#154664]"
              onClick={primaryButtonAction}
            >
              {primaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

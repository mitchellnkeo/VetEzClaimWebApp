import React, { useState, useEffect } from 'react';

export function MessagePopup({ message, open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-sm p-6 text-center">
        <p className="text-gray-800 dark:text-gray-100 text-sm mb-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}

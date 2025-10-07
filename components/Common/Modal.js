import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

export default function Modal({ open, onClose, children, title }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose} 
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[100000] w-full  max-w-[612px] rounded-lg bg-white p-6 shadow-2xl dark:bg-[#121212]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-white-light"
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>

        {title && <h2 className="mb-4 text-xl font-semibold dark:text-white-light">{title}</h2>}

        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

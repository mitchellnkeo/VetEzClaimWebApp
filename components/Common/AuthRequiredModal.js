import React from "react";
import ReactDOM from "react-dom";
import Router from "next/router";

export default function AuthRequiredModal({ onClose }) {
  if (typeof window === "undefined") return null;

  const onLoginClick = () => {
    Router.push("/login?assist=true");
  };

  const onRegisterClick = () => {
    Router.push("/registration?assist=true");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="relative bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-900">
          VetEZ Claim
        </h2>

        <p className="text-gray-600 mb-6">
          Log in or create an account to continue.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onLoginClick}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primaryHover transition-colors"
          >
            Login
          </button>

          <button
            onClick={onRegisterClick}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Register
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
